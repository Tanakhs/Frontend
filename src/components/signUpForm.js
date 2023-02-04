import React, { useState } from "react";
import "../css/signUpForm.css";

function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "userName") {
      setUserName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(userName, email, password, confirmPassword);
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label" htmlFor="userName">
            שם משתמש
          </label>

          <input
            className="form__input"
            type="text"
            value={userName}
            onChange={(e) => handleInputChange(e)}
            id="userName"
            placeholder="שם משתמש"
          />

          <span className="error">{validationErrors["userName"]}</span>
        </div>
        <div className="email">
          <label className="form__label" htmlFor="email">
            אימייל
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="אימייל"
          />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">
            סיסמא
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="סיסמא"
          />
        </div>
        <div className="confirm-password">
          <label className="form__label" htmlFor="confirmPassword">
            אימות סיסמא
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="אימות סיסמא"
          />
        </div>
      </div>
      <div className="footer">
        <button onClick={() => handleSubmit()} type="submit" className="btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
