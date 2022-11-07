function countDiscount(price, discount) {
  const cuttedPrice = (price * discount) / 100;
  const priceAfterDiscount = price - cuttedPrice;
  return new Intl.NumberFormat("id-id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(priceAfterDiscount);
}

export default countDiscount;
