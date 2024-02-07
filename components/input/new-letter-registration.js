import { useContext, useRef, useState } from "react";

import classes from "./new-letter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const [isInvalid, setIsInvalid] = useState(true);
  let [isSendData, SetIsSendData] = useState(false);
  const emailInputRef = useRef();

  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@")
    ) {
      setIsInvalid(true);
      notificationCtx.showNotification({
        title: "registration",
        message: "Invalid email! ",
        status: "error",
      });

      return;
    }

    setIsInvalid(false);

    // send valid data to API
    setIsInvalid(true);
    notificationCtx.showNotification({
      title: "Registration",
      message: "registring to the new letter! ",
      status: "pending",
    });

    fetch("/api/newsletters", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        response.json().then((data) => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then((data) => {
        SetIsSendData(true);
        notificationCtx.showNotification({
          title: "Registration",
          message: "successfully register to new letter.",
          status: "success",
        });
        emailInputRef.current.value = "";
      })
      .catch((error) => {
        setIsInvalid(true);
        notificationCtx.showNotification({
          title: "Registration",
          message: "failed to register to new letter! Try again ",
          status: "error",
        });
      });
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
        {/* {isInvalid && isSendData && <p>Enter a valid email !</p>} */}
        {/* {!isInvalid && isSendData && <p>successfully register to new letter</p>} */}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
