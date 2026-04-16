/**
 * Global Error Handling System
 * Provides centralized error logging and handling to prevent application crashes
 */

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ErrorCategory {
  API = 'api',
  NETWORK = 'network',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  DATABASE = 'database',
  UNKNOWN = 'unknown',
}

export interface AppError {
  id: string;
  message: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: Date;
  stack?: string;
  context?: Record<string, any>;
  userId?: string;
}

class ErrorHandler {
  private errors: AppError[] = [];
  private maxErrors = 100; // Keep last 100 errors in memory
  private listeners: Set<(error: AppError) => void> = new Set();

  /**
   * Log an error with full context
   */
  log(error: Error | string, category: ErrorCategory = ErrorCategory.UNKNOWN, context?: Record<string, any>, severity: ErrorSeverity = ErrorSeverity.MEDIUM): AppError {
    const errorObj: AppError = {
      id: this.generateId(),
      message: typeof error === 'string' ? error : error.message,
      severity,
      category,
      timestamp: new Date(),
      stack: typeof error === 'object' ? error.stack : undefined,
      context,
    };

    // Add to errors array
    this.errors.push(errorObj);
    
    // Keep only last maxErrors
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${severity.toUpperCase()}] [${category.toUpperCase()}]`, errorObj);
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(errorObj));

    return errorObj;
  }

  /**
   * Handle API errors specifically
   */
  logApiError(error: Error | string, context?: Record<string, any>): AppError {
    return this.log(error, ErrorCategory.API, context, ErrorSeverity.HIGH);
  }

  /**
   * Handle network errors
   */
  logNetworkError(error: Error | string, context?: Record<string, any>): AppError {
    return this.log(error, ErrorCategory.NETWORK, context, ErrorSeverity.MEDIUM);
  }

  /**
   * Handle validation errors
   */
  logValidationError(error: Error | string, context?: Record<string, any>): AppError {
    return this.log(error, ErrorCategory.VALIDATION, context, ErrorSeverity.LOW);
  }

  /**
   * Get all logged errors
   */
  getErrors(): AppError[] {
    return [...this.errors];
  }

  /**
   * Get errors by severity
   */
  getErrorsBySeverity(severity: ErrorSeverity): AppError[] {
    return this.errors.filter(e => e.severity === severity);
  }

  /**
   * Get errors by category
   */
  getErrorsByCategory(category: ErrorCategory): AppError[] {
    return this.errors.filter(e => e.category === category);
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Subscribe to error events
   */
  subscribe(listener: (error: AppError) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Generate unique error ID
   */
  private generateId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
export const errorHandler = new ErrorHandler();

/**
 * Safe async wrapper that catches errors and logs them
 * Returns null on error to prevent application crashes
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  fallback?: T,
  context?: Record<string, any>
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    errorHandler.logApiError(error as Error, context);
    return fallback ?? null;
  }
}

/**
 * Safe sync wrapper that catches errors and logs them
 * Returns null on error to prevent application crashes
 */
export function safeSync<T>(
  fn: () => T,
  fallback?: T,
  context?: Record<string, any>
): T | null {
  try {
    return fn();
  } catch (error) {
    errorHandler.logApiError(error as Error, context);
    return fallback ?? null;
  }
}

/**
 * Higher-order component wrapper for error handling
 */
export function withErrorHandler<T extends (...args: any[]) => any>(
  fn: T,
  context?: Record<string, any>
): T {
  return ((...args: any[]) => {
    try {
      return fn(...args);
    } catch (error) {
      errorHandler.log(error as Error, ErrorCategory.UNKNOWN, context);
      return null;
    }
  }) as T;
}
