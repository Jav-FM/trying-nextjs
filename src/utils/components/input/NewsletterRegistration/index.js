import classes from "./NewsletterRegistration.module.css";
import { validEmailRedex } from "../../../helpers/constants";
import { useRef, useState, useContext } from "react";
import { NotificationContext } from "../../../../store/NotificationContext";

const NewsletterRegistration = () => {
  const emailInputRef = useRef();
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = async (event) => {
    event.preventDefault();

    setRegistrationComplete(false);
    setInvalidEmail(false);
    const email = emailInputRef.current.value;

    if (email.trim() !== "" && email.match(validEmailRedex)) {
      try {
        notificationCtx.showNotification({
          title: "Signing up...",
          message: "Registering for newsletters.",
          status: "pending",
        });
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        if (response.ok) {
          setRegistrationComplete(true);
          emailInputRef.current.value = "";
          notificationCtx.showNotification({
            title: "Success!",
            message: "Successfully registered for newsletters.",
            status: "success",
          });
          setTimeout(() => {
            setRegistrationComplete(false);
          }, 3000);
        } else {
          await response.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        }
      } catch (e) {
        notificationCtx.showNotification({
          title: "Error!",
          message: e.message,
          status: "error",
        });
      }
    } else {
      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
      }, 3000);
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
      {registrationComplete && (
        <h3 className="center">Your email was registered!</h3>
      )}
      {invalidEmail && <p className="center">Enter a valid email.</p>}
    </section>
  );
};

export default NewsletterRegistration;
