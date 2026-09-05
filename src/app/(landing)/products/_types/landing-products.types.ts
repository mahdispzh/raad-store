export type SortType = "likes" | "views" | "sold" | "newest" | "discount";
export type FilterType = "price" | "color" | null;

export interface Filters {
  minPrice: number;
  maxPrice: number;
  colorIds: number[];
  sort: SortType;
  categoryId?: number | undefined;
}

export interface Color {
  id: number;
  name: string;
  hex_code: string; // یا value: string
}

export interface ProductItemFromApi {
  id: number;
  slug: string;
  name: string;
  images: string[];
  product_variants?: Array<{ price: number }>;
  rate?: number;
  likes?: number;
  isLiked?: boolean;
}
export interface ColorFilterProps {
  show: boolean;
  setShow: (show: boolean) => void;
  selectedColorIds: number[];
  onToggleColor: (id: number) => void;
  colors: Color[];
}

export interface FiltersContainerProps {
  tempPriceRange: { min: number; max: number };
  setTempPriceRange: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  tempSelectedColorIds: number[];
  updateTempColor: (colorId: number) => void;
  activeFilter: "price" | "color" | null;
  setActiveFilter: React.Dispatch<
    React.SetStateAction<"price" | "color" | null>
  >;
  applyFilters: () => void;
  resetFilters: () => void;
  colors: Color[];
}
