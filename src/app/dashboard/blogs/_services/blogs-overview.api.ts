import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export type BlogsOverviewResponse = {
  summary: {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    blogsToday: number;
    blogsThisMonth: number;
    averageViews: number;
    averageLikes: number;
  };
  report: {
    topViewedBlogs: {
      id: number;
      title: string;
      view: number | null;
      slug: string;
    }[];
  topLikedBlogs: {
  id: number;
  title: string;
  likes: number | null;
  slug: string;
  image?: string | null; // ✅ اضافه شد
}[];
    mostCommentedBlogs: {
      id: number;
      title: string;
      comments: number | null;
      slug: string;
    }[];
    newestBlogs: {
      id: number;
      title: string;
      slug: string;
      status: number;
      created_at: string | null;
      view: number | null;
      likes: number | null;
      comments: number | null;
    }[];
   topAuthors: {
  id: number;
  name: string | null;
  image_id: number;
  _count: { blogs: number };
}[];
  };
  charts: {
    blogsLast30Days: { date: string; count: number }[];
    blogsByStatus: { name: string; value: number }[];
    monthlyBlogs: { month: string; count: number }[];
    topViewedChart: { name: string; views: number }[];
    topLikedChart: { name: string; likes: number }[];
    mostCommentedChart: { name: string; comments: number }[];
    topAuthorsChart: { name: string; blogs: number }[];
  };
};

export const getBlogsOverview = () => {
  return fetcher<BlogsOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/blogs")
  );
};

export type BlogsMonthlyChartResponse = {
  countByDay: { day: number; value: number }[];
  daysInMonth: number;
};

export const getBlogsMonthlyChart = (month: string | number, year?: number) => {
  return fetcher<BlogsMonthlyChartResponse>(() =>
    apiClient.get("/protected/admin-overview/blogs/monthly", {
      params: year ? { month, year } : { month },
    })
  );
};