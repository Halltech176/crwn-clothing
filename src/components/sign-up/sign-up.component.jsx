import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../Button/Button.component";
import "./sign-up.style.scss";

const defaultFormFields = -{
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  console.log(formFields);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSumbit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const response = await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      console.log(response);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("cannot create user already in use");
      }
      console.error(err);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Dont't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSumbit}>
        <FormInput
          label="Display Name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
          type="text"
        />

        <FormInput
          label="Email"
          onChange={handleChange}
          value={email}
          name="email"
          required
          type="email"
        />

        <FormInput
          label="Password"
          onChange={handleChange}
          name="password"
          value={password}
          required
          type="password"
        />

        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
          type="password"
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
