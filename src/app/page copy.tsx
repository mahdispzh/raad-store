// "use client";

// // import { getPublicProducts } from "@/src/app/(landing)/products/_services/products.api";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import type { UpdateAddressRequest } from "../lib/react-query";
// import {
//   // ========== PROTECTED POST/DELETE/PUT ==========
//   createAddress,
//   createBrand,
//   createColor,
//   deleteAddress,
//   deleteBrand,
//   deleteCart,
//   deleteCategory,
//   deleteColor,
//   deleteDiscount,
//   deleteSize,
//   deleteUser,
//   // ========== PROTECTED GET ==========
//   getAddressById,
//   getAddresses,
//   // ========== PUBLIC ==========
//   getBlogs,
//   getBlogsProtected,
//   getBrandById,
//   getBrandByIdProtected,
//   getBrands,
//   getBrandsProtected,
//   getCategories,
//   getCategoriesProtected,
//   getCategoryById,
//   getCategoryByIdProtected,
//   getColorByIdProtected,
//   getColors,
//   getColorsProtected,
//   getDiscountByIdProtected,
//   getDiscounts,
//   getDiscountsProtected,
//   getMyPayments,
//   getOrders,
//   getPayments,
//   getProducts,
//   getProductVariants,
//   getProfile,
//   getPublicProductId,
//   getSizeByIdProtected,
//   getSizes,
//   getSizesProtected,
//   getUserById,
//   getUsers,
//   updateAddress,
//   updateProfile,
// } from "../lib/react-query";
// import { apiClient } from "../shared/api/client";
// import { useAuthStore } from "../shared/store/store";

// export default function Page() {
//   const user = useAuthStore((state) => state.user);
//   console.log("ssssssss", user);
//   const accessToken = useAuthStore((state) => state.accessToken);
//   const setToken = useAuthStore((state) => state.setToken);
//   const isAuthenticated = !!accessToken;

//   // ====================== هارد کد توکن ======================
//   useEffect(() => {
//     const hardcodedToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJyb2xlIjoyLCJpYXQiOjE3ODAyMjU3NzcsImV4cCI6MTc4MDIyNjY3N30.fE_9yNFnFE6q37TiW7w0CkfevixieETZSiSWU2Slseg";

//     if (!accessToken) {
//       setToken(hardcodedToken);
//       console.log("توکن هاردکد شد:", hardcodedToken);
//       apiClient.defaults.headers.common["Authorization"] =
//         `Bearer ${hardcodedToken}`;
//       console.log(
//         "Authorization header set:",
//         apiClient.defaults.headers.common["Authorization"],
//       );
//     }
//   }, [accessToken, setToken]);

//   console.log("accessToken from store:", accessToken);
//   console.log("isAuthenticated:", isAuthenticated);

//   // ====================== PUBLIC ======================
//   // //Products
//   // const {
//   //   data: productsPublicData,
//   //   error: productsPublicError,
//   //   isLoading: productsPublicLoading,
//   // } = useQuery({
//   //   queryKey: ["publicProducts"],
//   //   queryFn: getPublicProducts,
//   // });
//   // console.log(
//   //   "productsPublic data",
//   //   productsPublicData,
//   //   productsPublicError,
//   //   productsPublicLoading,
//   // );

//   //ProductId
//   const {
//     data: productPublicIdData,
//     error: productPublicIdError,
//     isLoading: productPublicIdLoading,
//   } = useQuery({
//     queryKey: ["publicProductId"],
//     queryFn: getPublicProductId,
//   });
//   console.log(
//     "productPublicId data",
//     productPublicIdData,
//     productPublicIdError,
//     productPublicIdLoading,
//   );

//   // BLOGS
//   const {
//     data: blogsData,
//     error: blogsError,
//     isLoading: blogsLoading,
//   } = useQuery({
//     queryKey: ["blogs"],
//     queryFn: getBlogs,
//   });
//   console.log("blogs data", blogsData, blogsError, blogsLoading);

//   // BRANDS
//   const {
//     data: brandsData,
//     error: brandsError,
//     isLoading: brandsLoading,
//   } = useQuery({
//     queryKey: ["brands"],
//     queryFn: getBrands,
//   });
//   console.log("brands data", brandsData, brandsError, brandsLoading);

//   // BRAND BY ID
//   const {
//     data: brandByIdData,
//     error: brandByIdError,
//     isLoading: brandByIdLoading,
//   } = useQuery({
//     queryKey: ["brand", 1],
//     queryFn: () => getBrandById(1),
//   });
//   console.log(
//     "brand by id data",
//     brandByIdData,
//     brandByIdError,
//     brandByIdLoading,
//   );

//   // CATEGORIES
//   const {
//     data: categoriesData,
//     error: categoriesError,
//     isLoading: categoriesLoading,
//   } = useQuery({
//     queryKey: ["categories"],
//     queryFn: getCategories,
//   });
//   console.log(
//     "categories data",
//     categoriesData,
//     categoriesError,
//     categoriesLoading,
//   );

//   // CATEGORY BY ID
//   const {
//     data: categoryByIdData,
//     error: categoryByIdError,
//     isLoading: categoryByIdLoading,
//   } = useQuery({
//     queryKey: ["category", 1],
//     queryFn: () => getCategoryById(1),
//   });
//   console.log(
//     "category by id data",
//     categoryByIdData,
//     categoryByIdError,
//     categoryByIdLoading,
//   );

//   // COLORS
//   const {
//     data: colorsData,
//     error: colorsError,
//     isLoading: colorsLoading,
//   } = useQuery({
//     queryKey: ["colors"],
//     queryFn: getColors,
//   });
//   console.log("colors data", colorsData, colorsError, colorsLoading);

//   // DISCOUNTS
//   const {
//     data: discountsData,
//     error: discountsError,
//     isLoading: discountsLoading,
//   } = useQuery({
//     queryKey: ["discounts"],
//     queryFn: getDiscounts,
//   });
//   console.log(
//     "discounts data",
//     discountsData,
//     discountsError,
//     discountsLoading,
//   );

//   // SIZES
//   const {
//     data: sizesData,
//     error: sizesError,
//     isLoading: sizesLoading,
//   } = useQuery({
//     queryKey: ["sizes"],
//     queryFn: getSizes,
//   });
//   console.log("sizes data", sizesData, sizesError, sizesLoading);

//   // PRODUCT VARIANTS
//   const {
//     data: productVariantsData,
//     error: productVariantsError,
//     isLoading: productVariantsLoading,
//   } = useQuery({
//     queryKey: ["productVariants", 1],
//     queryFn: () => getProductVariants(1),
//   });
//   console.log(
//     "product variants data",
//     productVariantsData,
//     productVariantsError,
//     productVariantsLoading,
//   );

//   // ====================== PROTECTED GETS ======================

//   // PROFILE
//   const {
//     data: profileData,
//     error: profileError,
//     isLoading: profileLoading,
//   } = useQuery({
//     queryKey: ["profile"],
//     queryFn: getProfile,
//     enabled: isAuthenticated,
//   });
//   console.log("profile data", profileData, profileError, profileLoading);

//   // ADDRESSES
//   const {
//     data: addressesData,
//     error: addressesError,
//     isLoading: addressesLoading,
//   } = useQuery({
//     queryKey: ["addresses"],
//     queryFn: getAddresses,
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "addresses data",
//     addressesData,
//     addressesError,
//     addressesLoading,
//   );

//   // ADDRESS BY ID
//   const {
//     data: addressByIdData,
//     error: addressByIdError,
//     isLoading: addressByIdLoading,
//   } = useQuery({
//     queryKey: ["address", 10],
//     queryFn: () => getAddressById(10),
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "address by id data",
//     addressByIdData,
//     addressByIdError,
//     addressByIdLoading,
//   );

//   // MY PAYMENTS
//   const {
//     data: myPaymentsData,
//     error: myPaymentsError,
//     isLoading: myPaymentsLoading,
//   } = useQuery({
//     queryKey: ["myPayments"],
//     queryFn: getMyPayments,
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "my payments data",
//     myPaymentsData,
//     myPaymentsError,
//     myPaymentsLoading,
//   );

//   // ORDERS
//   const {
//     data: ordersData,
//     error: ordersError,
//     isLoading: ordersLoading,
//   } = useQuery({
//     queryKey: ["orders"],
//     queryFn: getOrders,
//     enabled: isAuthenticated,
//   });
//   console.log("orders data", ordersData, ordersError, ordersLoading);

//   // PAYMENTS (ALL)
//   const {
//     data: paymentsData,
//     error: paymentsError,
//     isLoading: paymentsLoading,
//   } = useQuery({
//     queryKey: ["payments"],
//     queryFn: getPayments,
//     enabled: isAuthenticated,
//   });
//   console.log("payments data", paymentsData, paymentsError, paymentsLoading);

//   // PRODUCTS
//   const {
//     data: productsData,
//     error: productsError,
//     isLoading: productsLoading,
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: getProducts,
//     enabled: isAuthenticated,
//   });
//   console.log("products data", productsData, productsError, productsLoading);

//   // USERS
//   const {
//     data: usersData,
//     error: usersError,
//     isLoading: usersLoading,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: getUsers,
//     enabled: isAuthenticated,
//   });
//   console.log("users data", usersData, usersError, usersLoading);

//   // USER BY ID
//   const {
//     data: userByIdData,
//     error: userByIdError,
//     isLoading: userByIdLoading,
//   } = useQuery({
//     queryKey: ["user", 63],
//     queryFn: () => getUserById(63),
//     enabled: isAuthenticated,
//   });
//   console.log("user by id data", userByIdData, userByIdError, userByIdLoading);

//   // BLOGS (PROTECTED)
//   const {
//     data: blogsProtectedData,
//     error: blogsProtectedError,
//     isLoading: blogsProtectedLoading,
//   } = useQuery({
//     queryKey: ["blogsProtected"],
//     queryFn: getBlogsProtected,
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "blogs protected data",
//     blogsProtectedData,
//     blogsProtectedError,
//     blogsProtectedLoading,
//   );

//   // BRANDS (PROTECTED)
//   const {
//     data: brandsProtectedData,
//     error: brandsProtectedError,
//     isLoading: brandsProtectedLoading,
//   } = useQuery({
//     queryKey: ["brandsProtected"],
//     queryFn: getBrandsProtected,
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "brands protected data",
//     brandsProtectedData,
//     brandsProtectedError,
//     brandsProtectedLoading,
//   );

//   // BRAND BY ID (PROTECTED)
//   const {
//     data: brandByIdProtectedData,
//     error: brandByIdProtectedError,
//     isLoading: brandByIdProtectedLoading,
//   } = useQuery({
//     queryKey: ["brandProtected", 1],
//     queryFn: () => getBrandByIdProtected(1),
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "brand by id protected data",
//     brandByIdProtectedData,
//     brandByIdProtectedError,
//     brandByIdProtectedLoading,
//   );

//   // CATEGORIES (PROTECTED)
//   const {
//     data: categoriesProtectedData,
//     error: categoriesProtectedError,
//     isLoading: categoriesProtectedLoading,
//   } = useQuery({
//     queryKey: ["categoriesProtected"],
//     queryFn: getCategoriesProtected,
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "categories protected data",
//     categoriesProtectedData,
//     categoriesProtectedError,
//     categoriesProtectedLoading,
//   );

//   // CATEGORY BY ID (PROTECTED)
//   const {
//     data: categoryByIdProtectedData,
//     error: categoryByIdProtectedError,
//     isLoading: categoryByIdProtectedLoading,
//   } = useQuery({
//     queryKey: ["categoryProtected", 1],
//     queryFn: () => getCategoryByIdProtected(1),
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "category by id protected data",
//     categoryByIdProtectedData,
//     categoryByIdProtectedError,
//     categoryByIdProtectedLoading,
//   );

//   // COLORS (PROTECTED)
//   const {
//     data: colorsProtectedData,
//     error: colorsProtectedError,
//     isLoading: colorsProtectedLoading,
//   } = useQuery({
//     queryKey: ["colorsProtected"],
//     queryFn: getColorsProtected,
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "colors protected data",
//     colorsProtectedData,
//     colorsProtectedError,
//     colorsProtectedLoading,
//   );

//   // COLOR BY ID (PROTECTED)
//   const {
//     data: colorByIdProtectedData,
//     error: colorByIdProtectedError,
//     isLoading: colorByIdProtectedLoading,
//   } = useQuery({
//     queryKey: ["colorProtected", 9],
//     queryFn: () => getColorByIdProtected(9),
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "color by id protected data",
//     colorByIdProtectedData,
//     colorByIdProtectedError,
//     colorByIdProtectedLoading,
//   );

//   // DISCOUNTS (PROTECTED)
//   const {
//     data: discountsProtectedData,
//     error: discountsProtectedError,
//     isLoading: discountsProtectedLoading,
//   } = useQuery({
//     queryKey: ["discountsProtected"],
//     queryFn: getDiscountsProtected,
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "discounts protected data",
//     discountsProtectedData,
//     discountsProtectedError,
//     discountsProtectedLoading,
//   );

//   // DISCOUNT BY ID (PROTECTED)
//   const {
//     data: discountByIdProtectedData,
//     error: discountByIdProtectedError,
//     isLoading: discountByIdProtectedLoading,
//   } = useQuery({
//     queryKey: ["discountProtected", 1],
//     queryFn: () => getDiscountByIdProtected(1),
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "discount by id protected data",
//     discountByIdProtectedData,
//     discountByIdProtectedError,
//     discountByIdProtectedLoading,
//   );

//   // SIZES (PROTECTED)
//   const {
//     data: sizesProtectedData,
//     error: sizesProtectedError,
//     isLoading: sizesProtectedLoading,
//   } = useQuery({
//     queryKey: ["sizesProtected"],
//     queryFn: getSizesProtected,
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "sizes protected data",
//     sizesProtectedData,
//     sizesProtectedError,
//     sizesProtectedLoading,
//   );

//   // SIZE BY ID (PROTECTED)
//   const {
//     data: sizeByIdProtectedData,
//     error: sizeByIdProtectedError,
//     isLoading: sizeByIdProtectedLoading,
//   } = useQuery({
//     queryKey: ["sizeProtected", 7],
//     queryFn: () => getSizeByIdProtected(7),
//     enabled: isAuthenticated,
//   });
//   console.log(
//     "size by id protected data",
//     sizeByIdProtectedData,
//     sizeByIdProtectedError,
//     sizeByIdProtectedLoading,
//   );

//   // ====================== MUTATIONS (POST & DELETE) ======================

//   // CREATE ADDRESS
//   const {
//     mutate: createAddressMutation,
//     data: createAddressData,
//     error: createAddressError,
//     isPending: createAddressLoading,
//   } = useMutation({
//     mutationKey: ["createAddress"],
//     mutationFn: createAddress,
//   });
//   console.log(
//     "create address data",
//     createAddressData,
//     createAddressError,
//     createAddressLoading,
//   );

//   // DELETE ADDRESS
//   const {
//     mutate: deleteAddressMutation,
//     data: deleteAddressData,
//     error: deleteAddressError,
//     isPending: deleteAddressLoading,
//   } = useMutation({
//     mutationKey: ["deleteAddress"],
//     mutationFn: deleteAddress,
//   });
//   console.log(
//     "delete address data",
//     deleteAddressData,
//     deleteAddressError,
//     deleteAddressLoading,
//   );

//   // CREATE BRAND
//   const {
//     mutate: createBrandMutation,
//     data: createBrandData,
//     error: createBrandError,
//     isPending: createBrandLoading,
//   } = useMutation({
//     mutationKey: ["createBrand"],
//     mutationFn: createBrand,
//   });
//   console.log(
//     "create brand data",
//     createBrandData,
//     createBrandError,
//     createBrandLoading,
//   );

//   // DELETE BRAND
//   const {
//     mutate: deleteBrandMutation,
//     data: deleteBrandData,
//     error: deleteBrandError,
//     isPending: deleteBrandLoading,
//   } = useMutation({
//     mutationKey: ["deleteBrand"],
//     mutationFn: deleteBrand,
//   });
//   console.log(
//     "delete brand data",
//     deleteBrandData,
//     deleteBrandError,
//     deleteBrandLoading,
//   );

//   // DELETE CART
//   const {
//     mutate: deleteCartMutation,
//     data: deleteCartData,
//     error: deleteCartError,
//     isPending: deleteCartLoading,
//   } = useMutation({
//     mutationKey: ["deleteCart"],
//     mutationFn: deleteCart,
//   });
//   console.log(
//     "delete cart data",
//     deleteCartData,
//     deleteCartError,
//     deleteCartLoading,
//   );

//   // DELETE CATEGORY
//   const {
//     mutate: deleteCategoryMutation,
//     data: deleteCategoryData,
//     error: deleteCategoryError,
//     isPending: deleteCategoryLoading,
//   } = useMutation({
//     mutationKey: ["deleteCategory"],
//     mutationFn: deleteCategory,
//   });
//   console.log(
//     "delete category data",
//     deleteCategoryData,
//     deleteCategoryError,
//     deleteCategoryLoading,
//   );

//   // CREATE COLOR
//   const {
//     mutate: createColorMutation,
//     data: createColorData,
//     error: createColorError,
//     isPending: createColorLoading,
//   } = useMutation({
//     mutationKey: ["createColor"],
//     mutationFn: createColor,
//   });
//   console.log(
//     "create color data",
//     createColorData,
//     createColorError,
//     createColorLoading,
//   );

//   // DELETE COLOR
//   const {
//     mutate: deleteColorMutation,
//     data: deleteColorData,
//     error: deleteColorError,
//     isPending: deleteColorLoading,
//   } = useMutation({
//     mutationKey: ["deleteColor"],
//     mutationFn: deleteColor,
//   });
//   console.log(
//     "delete color data",
//     deleteColorData,
//     deleteColorError,
//     deleteColorLoading,
//   );

//   // DELETE DISCOUNT
//   const {
//     mutate: deleteDiscountMutation,
//     data: deleteDiscountData,
//     error: deleteDiscountError,
//     isPending: deleteDiscountLoading,
//   } = useMutation({
//     mutationKey: ["deleteDiscount"],
//     mutationFn: deleteDiscount,
//   });
//   console.log(
//     "delete discount data",
//     deleteDiscountData,
//     deleteDiscountError,
//     deleteDiscountLoading,
//   );

//   // DELETE SIZE
//   const {
//     mutate: deleteSizeMutation,
//     data: deleteSizeData,
//     error: deleteSizeError,
//     isPending: deleteSizeLoading,
//   } = useMutation({
//     mutationKey: ["deleteSize"],
//     mutationFn: deleteSize,
//   });
//   console.log(
//     "delete size data",
//     deleteSizeData,
//     deleteSizeError,
//     deleteSizeLoading,
//   );

//   // DELETE USER
//   const {
//     mutate: deleteUserMutation,
//     data: deleteUserData,
//     error: deleteUserError,
//     isPending: deleteUserLoading,
//   } = useMutation({
//     mutationKey: ["deleteUser"],
//     mutationFn: deleteUser,
//   });
//   console.log(
//     "delete user data",
//     deleteUserData,
//     deleteUserError,
//     deleteUserLoading,
//   );

//   // ====================== PUT MUTATIONS ======================

//   // UPDATE ADDRESS
//   const {
//     mutate: updateAddressMutation,
//     data: updateAddressData,
//     error: updateAddressError,
//     isPending: updateAddressLoading,
//   } = useMutation({
//     mutationKey: ["updateAddress"],
//     mutationFn: ({
//       addressId,
//       data,
//     }: {
//       addressId: number;
//       data: UpdateAddressRequest;
//     }) => updateAddress(addressId, data),
//   });
//   console.log(
//     "update address data",
//     updateAddressData,
//     updateAddressError,
//     updateAddressLoading,
//   );

//   // UPDATE PROFILE
//   const {
//     mutate: updateProfileMutation,
//     data: updateProfileData,
//     error: updateProfileError,
//     isPending: updateProfileLoading,
//   } = useMutation({
//     mutationKey: ["updateProfile"],
//     mutationFn: updateProfile,
//   });
//   console.log(
//     "update profile data",
//     updateProfileData,
//     updateProfileError,
//     updateProfileLoading,
//   );

//   return null;
// }
