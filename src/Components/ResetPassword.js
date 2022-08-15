import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ForgetPassword = () => {
  const [credentials, setCredentials] = useState({
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const params = useParams();
  const host = `http://localhost:8000`;
  const [errorMsg, setErrorMsg] = useState("");
  const handleOnClick = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      try {
        const response = await fetch(
          `${host}/api/auth/passwordreset/${params.resetToken}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ password: credentials.password }),
          }
        );
        const data = await response.json();
        if (data.success === true) {
          setMsg("Password successfully changed.");
        }
      } catch (error) {
        setError(true);
        setErrorMsg(error.message);
      }
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="mt-10">
        <h1 className="text-3xl font-mono text-center my-4">
          Reset password here
        </h1>
        <div className="form-data mt-14 shadow-gray-700/50 rounded-md shadow-lg text-indigo-900 p-8 w-96 mx-auto h-auto flex justify-center items-center">
          <form action="" method="post">
            <div className="form-input my-3">
              <label htmlFor="password" className="text-xl font-poppins">
                New Password:{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                placeholder="**********"
                className="border-2 outline-blue-500 py-1 my-1 px-3 text-black rounded-sm outline-1 w-full "
                value={credentials.password}
                onChange={onChange}
              />
            </div>
            <div className="form-input my-3">
              <label htmlFor="cpassword" className="text-xl font-poppins">
                New Password:{" "}
              </label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                autoComplete="off"
                placeholder="**********"
                className="border-2 outline-blue-500 py-1 my-1 px-3 text-black rounded-sm outline-1 w-full "
                value={credentials.cpassword}
                onChange={onChange}
              />
            </div>

            <div className="button flex justify-center">
              <button
                onClick={handleOnClick}
                className="btn mt-2 uppercase bg-blue-600 py-2 px-8 rounded-md shadow-gray-700/40 shadow-md  text-white hover:bg-blue-800 font-rotobo text-sm"
              >
                Reset Password
              </button>
            </div>
            <p className="text-blue-800 underline mt-2">
              Get back to <Link to="/login">Login</Link>
            </p>
            {error && (
              <p className="text-red-700 text-center mt-2"> {errorMsg} </p>
            )}
            {msg && <p className="mt-2 bg-green-700 text-white">{msg}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
