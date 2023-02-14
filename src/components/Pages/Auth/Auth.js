import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Auth = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitForm = async (e) => {
    e.preventDefault();

    const formBody = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`,
        formBody
      );

      const secureCookie = atob(response.data.localId);
      Cookies.set("admin", secureCookie);
      navigate("/dashboard");
    } catch (err) {
      console.log("failed");
      console.error(err.message);
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="w-1/4 absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-14 flex flex-col items-center space-y-4 rounded-md"
    >
      {/* <div> */}
      <input
        className="p-2 text-lg font-sans focus:outline-none w-full"
        type="email"
        placeholder="Enter email"
        ref={emailInputRef}
      />
      <input
        className="p-2 text-lg font-sans focus:outline-none w-full"
        type="password"
        placeholder="Enter password"
        ref={passwordInputRef}
      />
      {/* </div> */}
      <button
        type="submit"
        className="bg-green-500 py-2 w-1/2 px-6 rounded-full text-lg text-white"
      >
        Sign In
      </button>
    </form>
  );
};

export default Auth;
