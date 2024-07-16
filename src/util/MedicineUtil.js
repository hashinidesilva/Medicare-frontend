export const calculateTotalPrice = (
    medicines, consultationFee, investigationFee) => {
  const totalMedicinePrice = medicines.reduce(
      (total, medicine) => total + (parseFloat(medicine?.price) || 0), 0);

  return totalMedicinePrice + (parseFloat(consultationFee) || 0) +
      (parseFloat(investigationFee) || 0);
};