import { useEffect } from "react";
import SignUpForm from "../../components/sign-up/sign-up.component";
import SignInForm from "../../components/sign-in-form/sign-in.component";
import "./Authentication.style.scss";
const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;
