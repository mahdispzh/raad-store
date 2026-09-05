// "use client";

// import { apiClient } from "@/src/shared/api/client";
// import { fetcher } from "@/src/shared/api/fetcher";
// // ======================publics======================

// // ======================
// // BLOGS
// // ======================
// export type Blog = {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   status: number;
//   user_id: number;
//   created_at: string;
//   updated_at: string;
//   comments: number;
// };

// export type BlogsResponse = {
//   data: Blog[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getBlogs = async () => {
//   return fetcher<BlogsResponse>(() => apiClient.get("public/blogs"));
// };

// // ======================
// // BRANDS
// // ======================
// export type Brand = {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
// };

// export type BrandsResponse = {
//   data: Brand[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getBrands = async () => {
//   return fetcher<BrandsResponse>(() => apiClient.get("public/brands"));
// };

// export type BrandResponse = Brand;

// export const getBrandById = async (brandId: number) => {
//   return fetcher<BrandResponse>(() =>
//     apiClient.get(`public/brands/${brandId}`),
//   );
// };

// // ======================
// // CATEGORIES
// // ======================
// export type Category = {
//   id: number;
//   name: string;
//   slug: string;
//   parent_id: number | null;
// };

// export type CategoriesResponse = {
//   data: Category[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getCategories = async () => {
//   return fetcher<CategoriesResponse>(() => apiClient.get("public/categories"));
// };

// export type CategoryResponse = Category;

// export const getCategoryById = async (categoryId: number) => {
//   return fetcher<CategoryResponse>(() =>
//     apiClient.get(`public/categories/${categoryId}`),
//   );
// };

// // ======================
// // COLORS
// // ======================
// export type Color = {
//   id: number;
//   name: string;
//   hex_code: string;
// };

// export type ColorsResponse = {
//   data: Color[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getColors = async () => {
//   return fetcher<ColorsResponse>(() => apiClient.get("public/colors"));
// };

// // ======================
// // DISCOUNTS
// // ======================
// export type Discount = {
//   id: number;
//   code: string;
//   type: number;
//   value: number;
// };

// export type DiscountsResponse = {
//   data: Discount[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getDiscounts = async () => {
//   return fetcher<DiscountsResponse>(() => apiClient.get("public/discounts"));
// };

// // ======================
// // SIZES
// // ======================
// export type Size = {
//   id: number;
//   name: string;
//   sort_order: number;
// };

// export type SizesResponse = {
//   data: Size[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getSizes = async () => {
//   return fetcher<SizesResponse>(() => apiClient.get("public/sizes"));
// };

// // ======================
// // PRODUCT VARIANTS
// // ======================
// export type ProductVariant = {
//   id: number;
//   product_id: number;
//   color_id: number;
//   size_id: number;
//   sku: string;
//   price: number;
//   stock: number;
// };

// export const getProductVariants = async (productId: number) => {
//   return fetcher<ProductVariant[]>(() =>
//     apiClient.get(`public/products/${productId}/variants`),
//   );
// };
// // ======================
// // GET PRODUCTS
// // ======================
// export interface ProductsResponse {
//   data: ProductItem[];
//   meta: PaginationMeta;
// }

// export interface ProductItem {
//   id: number;
//   name: string;
//   description: string;
//   category_id: number;
//   brand_id: number;
//   status: number;
//   created_at: string | null;
//   updated_at: string | null;
//   images: string[];
//   slug: string;
//   brand: ProductBrand;
//   category: ProductCategory;
//   variants: ProductVariant[];
// }

// export interface ProductBrand {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
// }

// export interface ProductCategory {
//   id: number;
//   name: string;
//   slug: string;
// }

// export interface ProductVariant {
//   id: number;
//   product_id: number;
//   color_id: number;
//   size_id: number;
//   sku: string;
//   price: number;
//   stock: number;
//   color: ProductColor;
//   size: ProductSize;
// }

// export interface ProductColor {
//   id: number;
//   name: string;
//   hex_code: string;
// }

// export interface ProductSize {
//   id: number;
//   name: string;
//   sort_order: number;
// }

// export interface PaginationMeta {
//   total: number;
//   page: number;
//   limit: number;
//   hasMore: boolean;
// }

// // Get Products
// export const getPublicProducts = async () => {
//   return fetcher<ProductsResponse>(() => apiClient.get("public/products"));
// };

// // ======================
// // GET PRODUCT
// // ======================
// export const getPublicProductId = async () => {
//   return fetcher<ProductItem>(() =>
//     apiClient.get("public/products/[productId]"),
//   );
// };

// // ====================== PROTECTED ======================

// // ====================== ADDRESSES ======================

// // ====================== GET ADDRESSES ======================
// export type Address = {
//   id: number;
//   user_id: number;
//   province: string;
//   city: string;
//   address: string;
//   postal_code: string;
//   receiver_name: string;
//   receiver_phone: string;
// };

// export type AddressesResponse = {
//   data: Address[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getAddresses = async () => {
//   return fetcher<AddressesResponse>(() => apiClient.get("protected/addresses"));
// };
// // ====================== GET ADDRESSES ID ======================

// export type AddressResponse = Address;

// export const getAddressById = async (addressId: number) => {
//   return fetcher<AddressResponse>(() =>
//     apiClient.get(`protected/addresses/${addressId}`),
//   );
// };
// // ====================== POST ADDRESS ======================
// export type CreateAddressRequest = {
//   province: string;
//   city: string;
//   address: string;
//   postalCode: string;
//   receiverName: string;
//   receiverPhone: string;
// };

// export const createAddress = async (data: CreateAddressRequest) => {
//   return fetcher<Address>(() => apiClient.post("protected/addresses", data));
// };

// // ====================== DELETE ADDRESS ID ======================
// export const deleteAddress = async (addressId: number) => {
//   return fetcher<{ success: boolean }>(() =>
//     apiClient.delete(`protected/addresses/${addressId}`),
//   );
// };

// // ====================== PUT ADDRESS ID======================
// export type UpdateAddressRequest = {
//   province?: string;
//   city?: string;
//   address?: string;
//   postalCode?: string;
//   receiverName?: string;
//   receiverPhone?: string;
// };

// export const updateAddress = async (
//   addressId: number,
//   data: UpdateAddressRequest,
// ) => {
//   return fetcher<Address>(() =>
//     apiClient.put(`protected/addresses/${addressId}`, data),
//   );
// };

// // ====================== BLOGS ======================

// // ====================== GET: BLOGS  ======================
// export const getBlogsProtected = async () => {
//   return fetcher<BlogsResponse>(() => apiClient.get("protected/blogs"));
// };

// // ====================== BRANDS ======================

// // ====================== POST BRAND ======================
// export type CreateBrandRequest = {
//   name: string;
//   slug: string;
//   logoUrl: string;
// };

// export const createBrand = async (data: CreateBrandRequest) => {
//   return fetcher<Brand>(() => apiClient.post("protected/brands", data));
// };
// // ====================== GET BRANDS  ======================
// export const getBrandsProtected = async () => {
//   return fetcher<BrandsResponse>(() => apiClient.get("protected/brands"));
// };
// // ====================== GET BRANDS ID ======================

// export const getBrandByIdProtected = async (brandId: number) => {
//   return fetcher<BrandResponse>(() =>
//     apiClient.get(`protected/brands/${brandId}`),
//   );
// };
// // ====================== DELETE BRAND ID ======================
// export const deleteBrand = async (brandId: number) => {
//   return fetcher<{ success: boolean }>(() =>
//     apiClient.delete(`protected/brands/${brandId}`),
//   );
// };

// // ====================== CARTS ======================

// // ====================== DELETE CART ======================
// export const deleteCart = async () => {
//   return fetcher<{ success: boolean }>(() =>
//     apiClient.delete("protected/carts"),
//   );
// };

// // ====================== CATEGORIES ======================

// // ====================== GET CATEGORIES  ======================
// export const getCategoriesProtected = async () => {
//   return fetcher<CategoriesResponse>(() =>
//     apiClient.get("protected/categories"),
//   );
// };

// // ====================== GET CATEGORY ID  ======================
// export const getCategoryByIdProtected = async (categoryId: number) => {
//   return fetcher<CategoryResponse>(() =>
//     apiClient.get(`protected/categories/${categoryId}`),
//   );
// };
// // ====================== DELETE CATEGORY ID ======================
// export const deleteCategory = async (categoryId: number) => {
//   return fetcher<{ success: boolean }>(() =>
//     apiClient.delete(`protected/categories/${categoryId}`),
//   );
// };

// // ======================  COLORS ======================

// // ====================== POST COLORS ======================
// export type CreateColorRequest = {
//   name: string;
//   hexCode: string;
// };

// export const createColor = async (data: CreateColorRequest) => {
//   return fetcher<Color>(() => apiClient.post("protected/colors", data));
// };

// // ====================== GET COLORS ======================
// export const getColorsProtected = async () => {
//   return fetcher<ColorsResponse>(() => apiClient.get("protected/colors"));
// };
// // ====================== DELETE COLOR ID ======================
// export const deleteColor = async (colorId: number) => {
//   return fetcher<{ success: boolean }>(() =>
//     apiClient.delete(`protected/colors/${colorId}`),
//   );
// };
// // ====================== GET COLORS ID ======================
// export const getColorByIdProtected = async (colorId: number) => {
//   return fetcher<Color>(() => apiClient.get(`protected/colors/${colorId}`));
// };

// // ====================== DISCOUNTS ======================

// // ====================== DELETE DISCOUNT ======================
// export const deleteDiscount = async (discountId: number) => {
//   return fetcher<{ success: boolean }>(() =>
//     apiClient.delete(`protected/discounts/${discountId}`),
//   );
// };

// // ====================== GET: DISCOUNTS  ======================
// export const getDiscountsProtected = async () => {
//   return fetcher<DiscountsResponse>(() => apiClient.get("protected/discounts"));
// };

// // ====================== GET: DISCOUNTS ID ======================
// export const getDiscountByIdProtected = async (discountId: number) => {
//   return fetcher<Discount>(() =>
//     apiClient.get(`protected/discounts/${discountId}`),
//   );
// };

// // ====================== ORDERS ======================
// export type OrderUser = {
//   id: number;
//   phone: string;
//   name: string | null;
//   role: number;
//   created_at: string | null;
// };

// export type OrdersResponse = {
//   currentUser: number;
//   users: OrderUser[];
// };
// // ====================== GET ORDERS ======================

// export const getOrders = async () => {
//   return fetcher<OrdersResponse>(() => apiClient.get("protected/orders"));
// };
// // ====================== PAYMENTS ======================
// export type Payment = {
//   id: number;
//   [key: string]: unknown;
// };

// export type PaymentsResponse = {
//   data: Payment[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };
// // ====================== PAYMENTS (ME) ======================

// export const getMyPayments = async () => {
//   return fetcher<PaymentsResponse>(() =>
//     apiClient.get("protected/payments/me"),
//   );
// };
// // ====================== GET PAYMENTS ======================
// export const getPayments = async () => {
//   return fetcher<PaymentsResponse>(() => apiClient.get("protected/payments"));
// };
// // ====================== GET PRODUCTS ======================
// export type Product = {
//   id: number;
//   [key: string]: unknown;
// };

// export type ProductsResponse = {
//   data: Product[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getProducts = async () => {
//   return fetcher<ProductsResponse>(() => apiClient.get("protected/products"));
// };

// // ====================== PROFILE ======================
// export type Profile = {
//   id: number;
//   name: string | null;
//   phone: string;
//   mail: string | null;
//   role: number;
//   created_at: string | null;
// };
// // ====================== GET PROFILE ======================

// export const getProfile = async () => {
//   return fetcher<Profile>(() => apiClient.get("protected/profile"));
// };
// // ====================== PUT PROFILE ======================
// export type UpdateProfileRequest = {
//   name?: string;
//   mail?: string;
//   phone?: string;
// };

// export const updateProfile = async (data: UpdateProfileRequest) => {
//   return fetcher<Profile>(() => apiClient.put("protected/profile", data));
// };

// // ======================  SIZES ======================

// // ====================== GET SIZES ======================
// export const getSizesProtected = async () => {
//   return fetcher<SizesResponse>(() => apiClient.get("protected/sizes"));
// };

// // ====================== DELETE SIZE ID ======================
// export const deleteSize = async (sizeId: number) => {
//   return fetcher<{ success: boolean }>(() =>
//     apiClient.delete(`protected/sizes/${sizeId}`),
//   );
// };

// // ====================== GET SIZE ID ======================

// export const getSizeByIdProtected = async (sizeId: number) => {
//   return fetcher<Size>(() => apiClient.get(`protected/sizes/${sizeId}`));
// };

// // ====================== USERS ======================

// // ====================== GET USERS ======================
// export type User = {
//   id: number;
//   phone: string;
//   name: string | null;
//   role: number;
//   created_at: string | null;
// };

// export type UsersResponse = {
//   currentUser: number;
//   data: User[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     hasMore: boolean;
//   };
// };

// export const getUsers = async () => {
//   return fetcher<UsersResponse>(() => apiClient.get("protected/users"));
// };

// // ====================== GET USER ID ======================
// export type UserDetails = {
//   id: number;
//   name: string | null;
//   mail: string | null;
//   phone: string;
//   role: number;
//   created_at: string | null;
//   updated_at: string | null;
//   carts: unknown[];
//   orders: unknown[];
//   user_addresses: unknown[];
// };

// export const getUserById = async (userId: number) => {
//   return fetcher<UserDetails>(() => apiClient.get(`protected/users/${userId}`));
// };
// // ====================== DELETE USER ID ======================
// export const deleteUser = async (userId: number) => {
//   return fetcher<{ success: boolean }>(() =>
//     apiClient.delete(`protected/users/${userId}`),
//   );
// };
