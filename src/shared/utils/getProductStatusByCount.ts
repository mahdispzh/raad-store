// صفحه: dashboard/products/AddProductModal.tsx

export const getProductStatus = (stock: number) => {
  if (stock > 0) {
    return {
      text: "موجود",
      color: "primary",
    };
  }

  return {
    text: "ناموجود",
    color: "danger",
  };
};
