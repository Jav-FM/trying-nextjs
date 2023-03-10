import { Fragment, useContext } from "react";
import MainHeader from "../MainHeader";
import Notification from "../../common/Notification";
import { NotificationContext } from "../../../../store/NotificationContext";

const Layout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
