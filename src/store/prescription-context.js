import React from "react";

const PrescriptionContext = React.createContext({
  items: [],
  addItem: (item) => {
  },
  addItems:(items) =>{}
});

export default PrescriptionContext;