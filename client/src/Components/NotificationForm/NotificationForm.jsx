import "./notificationForm.css";
import React, { useEffect, useState } from "react";
import notificationClient from "../../Services/notificationClient";
import userClient from "../../Services/userClient";
const NotificationForm = ({ data, index, reRender }) => {
  const [displayAtt, setDisplayAtt] = useState(false);

  useEffect(() => {
    userClient.getUser().then((myUser) => {
      if (myUser.userName === data.madeBy) {
        setDisplayAtt(true);
      }
    });
  }, []);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const renderSwitch = (category) => {
    switch (category) {
      case "problem":
        return 0;
      case "idea":
        return 1;
      case "note":
        return 2;
      case "announcment":
        return 3;
      case "emergancy":
        return 4;
      default:
        return 0;
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await notificationClient.deleteNotification(notificationId);
      await reRender();
    } catch {
      console.err("err");
      alert("Notification Failed.");
    }
  };
  return (
    <div className="card-wrapper mr-5">
      <div
        className="card-top"
        style={{
          "background-color": colors[renderSwitch(data.category)].primaryColor,
        }}
      ></div>
      <div className="task-holder">
        <span
          className="card-header"
          style={{
            "background-color":
              colors[renderSwitch(data.category)].primaryColor,
            "border-radius": "10px",
          }}
        >
          {data.category}
        </span>
        <h6 id="made-by">{data.madeBy}</h6>
        <br></br>
        <br></br>
        <div
          className="content-holder"
          style={{
            "background-color":
              colors[renderSwitch(data.category)].secondaryColor,
            "border-radius": "10px",
          }}
        >
          <h5>{data.content}</h5>
        </div>
        {displayAtt ? (
          <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
            <i
              className="fas fa-trash-alt"
              style={{
                color: colors[renderSwitch(data.category)].primaryColor,
                cursor: "pointer",
              }}
              onClick={() => {
                deleteNotification(data.id);
              }}
            ></i>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NotificationForm;
