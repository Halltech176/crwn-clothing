import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../Button/Button.component";
import "./sign-in.style.scss";

const defaultFormFields = -{
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  console.log(formFields);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const SignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  const handleSumbit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect passsword for email");
          break;
        case "auth/user-not-found":
          alert("No user asscociated with this email");
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSumbit}>
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
