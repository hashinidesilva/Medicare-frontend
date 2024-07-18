export const calculateTotalPrice = (
    medicines, consultationFee, investigationFee) => {
  const totalMedicinePrice = medicines.reduce(
      (total, medicine) => total + (parseFloat(medicine?.price) || 0), 0);

  return totalMedicinePrice + (parseFloat(consultationFee) || 0) +
      (parseFloat(investigationFee) || 0);
};

export const getAge = (ageYears, ageMonths) => {
  let ageString = '';
  if (ageYears > 0) {
    ageString += `${ageYears} Y `;
  }
  if (ageMonths > 0) {
    ageString += `${ageMonths} M`;
  }
  return ageString.trim();
};

export const getFullAge = (ageYears, ageMonths) => {
  let ageString = '';
  if (ageYears > 0) {
    ageString += `${ageYears} Years `;
  }
  if (ageMonths > 0) {
    ageString += `${ageMonths} Months`;
  }
  return ageString.trim();
};