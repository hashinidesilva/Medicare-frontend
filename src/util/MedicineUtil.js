export const calculateTotalPrice = (medicines) => {
  return medicines.reduce(
      (total, medicine) => total + (medicine?.price || 0), 0);
};