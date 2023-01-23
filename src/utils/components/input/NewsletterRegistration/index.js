import classes from "./NewsletterRegistration.module.css";
import { validEmailRedex } from "../../../helpers/constants";
import { useRef, useState } from "react";

const NewsletterRegistration = () => {
  const emailInputRef = useRef();
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const registrationHandler = async (event) => {
    event.preventDefault();
    setRegistrationComplete(false);
    setInvalidEmail(false);
    const email = emailInputRef.current.value;
    if (email.trim() !== "" && email.match(validEmailRedex)) {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.status === 201) {
        setRegistrationComplete(true);
        emailInputRef.current.value = "";
        setTimeout(() => {
          setRegistrationComplete(false);
        }, 3000);
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
