export interface CreateColorDto {
  name: string;
  hexCode: string;
}

export interface UpdateColorDto {
  name: string;
  hexCode: string;
}

export interface ColorResponse {
  id: number;
  name: string;
  hex_code: string;
  created_at?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ColorsListResponse {
  data: ColorResponse[];
  meta: PaginationMeta;
}