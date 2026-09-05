export type UserRow = {
  id: number;
  name: string | null;
  mail: string | null;
  phone: string | null;
  role: number;
  created_at: string | null;
  updated_at: string | null;
};

export type UsersListResponse = {
  currentUser: number;
  data: UserRow[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
};
