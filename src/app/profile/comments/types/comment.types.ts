export interface CommentItem {
  id: number;
  text: string;
  status: number;
  created_at: string;
  products: {
    id: number;
    name: string;
      slug: string;

    images: string[];
    ratings: { rating: number }[];
  };
  users: {
    id: number;
    name: string | null;
  };
}
export interface CommentsResponse {
  success: boolean;
  data: CommentItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
