import { useState } from "react";

import PrescriptionContext from "./prescription-context";

const PrescriptionProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItemToNotificationsHandler = (item) => {
    setItems((prev) => [item, ...prev]);
  };

  const addItemsToNotificationsHandler = (items) => {
    setItems((prev) => [...new Set(prev.concat(items))]);
  };

  const prescriptionContext = {
    items: items,
    addItem: addItemToNotificationsHandler,
    addItems: addItemsToNotificationsHandler
  };

  return (
    <PrescriptionContext.Provider value={prescriptionContext}>
      {props.children}
    </PrescriptionContext.Provider>
  );
};

export default PrescriptionProvider;