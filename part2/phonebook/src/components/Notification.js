import React from "react";

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }

  return notification.type === "error" ? (
    <div className="error" style={{ color: "red" }}>
      {notification.message}
    </div>
  ) : (
    <div className="error" style={{ color: "green" }}>
      {notification.message}
    </div>
  );
};

export default Notification;
