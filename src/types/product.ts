export type ProductCategory = 
  | 'solar-panels' 
  | 'batteries' 
  | 'inverters' 
  | 'led-lighting' 
  | 'charge-controllers' 
  | 'accessories';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  images: string[];
  description: string;
  isNew?: boolean;
  isPopular?: boolean;
  isDiscount?: boolean;
  specs: {
    [key: string]: string | number;
  };
  relatedProducts?: string[];
};

export type ProductFilter = {
  categories?: ProductCategory[];
  priceRange?: [number, number];
  power?: string[];
  voltage?: string[];
  brand?: string[];
  sort?: 'price-asc' | 'price-desc' | 'popular' | 'new';
  search?: string;
};