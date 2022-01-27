import { useEffect, useState } from "react";
import axios from "axios";

const NotificationsPage = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/prescriptions",
      {
        params: {processed: false}
      });
    const data = await response.data;
    setNotifications(data);
  }, []);

  return (<div/>);

};

export default NotificationsPage;