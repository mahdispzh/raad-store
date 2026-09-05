export type CommentRow = {
  id: number;
  product_id: number;
  parent_id: number | null;
  text: string;
  created_at: string | null;
  user_id: number;
  isUnknown: boolean;
  status: number; // 0: در انتظار بررسی | 1: تایید شده | 2: رد شده
  users: {
    id: number;
    name: string | null;
  };
  products: {
    id: number;
    name: string;
    slug: string;
    images: string[];
    ratings: { rating: number }[];
  };
};

export type CommentsListResponse = {
  success: boolean;
  data: CommentRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
