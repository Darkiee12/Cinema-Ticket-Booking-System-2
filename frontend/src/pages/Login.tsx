import React, { useEffect, useState } from "react";
import email_icon from "../assets/login/email.png";
import password_icon from "../assets/login/password.png";
import { useRef } from "react";
import UserService from "../services/UserService";


const LoginSignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loading = false;

  const [action, setAction] = useState("Sign Up");

  // UserService.addUser(user);

  return (
    <div className="flex w-[600px] flex-col mt-[200px] m-auto pb-[30px] bg-[#fffff]">
      <div className="flex flex-col items-center gap-[9px] w-full mt-[30px];">
        <div className="text-[#3c009d] text-5xl font-bold">{action}</div>
        <div className="-[61px] h-1.5 rounded-[9px]"></div>
      </div>
      <div className="flex flex-col gap-[25px] mt-[55px]">
        <div className="flex items-center w-[480px] h-20 m-auto rounded-md bg-[#eaeaea]">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="flex items-center w-[480px] h-20 m-auto rounded-md bg-[#eaeaea]">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="flex items-center w-[480px] h-20 m-auto rounded-md [bg-#eaeaea]">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
            />
            <input type="Full Name" placeholder="Full Name" />
          </div>
        )}
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="flex items-center w-[480px] h-20 m-auto rounded-md bg-[#eaeaea]">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
            />
            <input type="Phone Number" placeholder="PhoneNumber" />
          </div>
        )}
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="text-[#797979] text-lg mt-[27px] pl-[62px]">
          Forgot Password?
          <span className="text-[#37189e] cursor-pointer"> Click here!</span>
        </div>
      )}
      <div className="lex gap-[30px] mx-auto my-[60px]">
        <div
          className={
            action === "Login"
              ? "text-[#797979] bg-[#eaeaea]"
              : "flex justify-center items-center w-[220px] h-[60px] text-white bg-[#37189e] text-xl font-bold cursor-pointer rounded-[50px]"
          }
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={
            action === "Sign Up"
              ? "ext-[#797979] bg-[#eaeaea]"
              : "flex justify-center items-center w-[220px] h-[60px] text-white bg-[#37189e] text-xl font-bold cursor-pointer rounded-[50px]"
          }
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};
export default LoginSignUp;
