export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    artistId: string;
    category: string;
    tags: string[];
    imageUrl: string;
    stockQuantity: number;
    createdAt: string;
    updatedAt: string;
    dimensions: {
      length: number;
      width: number;
      unit: string;
    };
    medium: string;
    style: string;
    available: boolean;
  }