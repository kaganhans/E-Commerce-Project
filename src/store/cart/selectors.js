export const selectCartItems = (s) => s.shoppingCart?.cart || [];
export const selectCartSubtotal = (s) =>
  selectCartItems(s).reduce(
    (sum, i) => sum + (Number(i?.product?.price) || 0) * (Number(i?.count) || 0),
    0
  );
