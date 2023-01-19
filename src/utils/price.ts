export const formatPrice = (amount: number | string = 0) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.ceil(Number(amount)));
};
