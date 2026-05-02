// Utility to dynamically load images from /public/images/friends directory

export interface FriendImage {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export function getFriendImages(): FriendImage[] {
  // Since we can't dynamically read the public directory in Next.js at build time,
  // we'll define the known images from the friends directory
  const friendImages = [
    { id: 1, name: "Brand 1", slug: "brand-1", image: "/images/friends/pngwing.com.png" },
    { id: 2, name: "Brand 2", slug: "brand-2", image: "/images/friends/pngwing.com (1).png" },
    { id: 3, name: "Brand 3", slug: "brand-3", image: "/images/friends/pngwing.com (2).png" },
    { id: 4, name: "Brand 4", slug: "brand-4", image: "/images/friends/pngwing.com (3).png" },
    { id: 5, name: "Brand 5", slug: "brand-5", image: "/images/friends/pngwing.com (4).png" },
    { id: 6, name: "Brand 6", slug: "brand-6", image: "/images/friends/pngwing.com (5).png" },
    { id: 7, name: "Brand 7", slug: "brand-7", image: "/images/friends/pngwing.com (6).png" },
    { id: 8, name: "Brand 8", slug: "brand-8", image: "/images/friends/pngwing.com (7).png" },
  ];

  return friendImages;
}
