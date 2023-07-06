import React from "react";
import { Button } from "antd";
function LogoutEc(props) {
  const sendData = (send) => {
    props.parentCallback(send);
  };
  const handleLogout = () => {
    sendData(false);
  };
  return (
    <div>
      <Button onClick={handleLogout} danger className="btn-login">
        Log Out
      </Button>
    </div>
  );
}

export default LogoutEc;
