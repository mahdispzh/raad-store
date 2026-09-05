export interface ProductCommentType {
  id: number;
  username: string;
  date: string;
  rating: number;
  text: string;
  size: string;
  color: string;
}

export interface CommentedProductType {
  image: string;
  title: string;
  variant: string;
  storeName: string;
  guarantee: string;
  price: number;
}

export interface ProductCommentsSummaryType {
  score: number;
  totalVotes: number;
  rating: number;
}
