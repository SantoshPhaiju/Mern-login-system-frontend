import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
    const [validationErr, setValidationErr] = useState({
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
    cpasswordErr: ""
  });
  const { username, email, password, cpassword } = credentials;
  const host = `http://localhost:8000`;
  const handleOnClick = async (e) => {
    e.preventDefault();
    if (username && email && password && cpassword) {
      if (password === cpassword) {
        const response = await fetch(`${host}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
          navigate("/login");
        }
        if(data.success === false){
          setValidationErr({...validationErr, emailErr: "This Email is already in use. Please use another email"})
        }else{
          setValidationErr({...validationErr, emailErr: ""})
        }
      }
    } else {
      console.error("provide email");
    }

    console.log("REgister button clicked");
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

 

  return (
    <>
      <div className="mt-10">
        <h1 className="text-3xl font-mono text-center my-4">
          Register New Account
        </h1>
        <div className="form-data mt-4 shadow-gray-700/50 rounded-md shadow-lg text-indigo-900 p-8 w-5/12 mx-auto h-auto flex justify-center items-center">
          <form action="" method="post">
            <div className="form-input my-3">
              <label htmlFor="username" className="text-xl font-poppins">
                Username:{" "}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                placeholder="Enter your username"
                required
                className="border-2 outline-blue-500 py-1 my-1 px-3 text-black rounded-sm outline-1 w-full "
                value={credentials.username}
                onChange={onChange}
                pattern="^[a-zA-Z0-9]{3,30}$"
                onBlur={(e) => {
                  if (!e.target.value.match(e.target.pattern)) {
                    setValidationErr({
                      ...validationErr,
                      usernameErr:
                        "Username must include more than 2 character and it cannot be blank and cannot contain whitespaces",
                    });
                  } else {
                    setValidationErr({ ...validationErr, usernameErr: "" });
                  }
                }}
              />
              {validationErr.usernameErr && (
                <p className="text-red-800 text-center text-sm">
                  {validationErr.usernameErr}
                </p>
              )}
            </div>
            <div className="form-input my-3">
              <label htmlFor="email" className="text-xl font-poppins">
                Email:{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                required
                className="border-2 outline-blue-500 py-1 my-1 px-3 text-black rounded-sm outline-1 w-full "
                value={credentials.email}
                onChange={onChange}
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                onBlur={(e) => {
                  if (!e.target.value.match(e.target.pattern)) {
                    console.log("Email is invalid");
                    setValidationErr({
                      ...validationErr,
                      emailErr: "Invalid email",
                    });
                  } else {
                    setValidationErr({ ...validationErr, emailErr: "" });
                  }
                  console.log(e.target.pattern);
                }}
              />
              {validationErr.emailErr && (
                <p className="text-red-800 text-center text-sm">
                  {validationErr.emailErr}
                </p>
              )}
            </div>
            <div className="form-input my-3">
              <label htmlFor="password" className="text-xl font-poppins">
                Password:{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="*************"
                required
                className="border-2 outline-blue-500 py-1 px-3 my-1 text-black rounded-sm outline-1 w-full"
                value={credentials.password}
                onChange={onChange}
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                onBlur={(e) => {
                  if (!e.target.value.match(e.target.pattern)) {
                    setValidationErr({
                      ...validationErr,
                      passwordErr:
                        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
                    });
                  } else {
                    setValidationErr({ ...validationErr, passwordErr: "" });
                  }
                }}
              />
              {validationErr.passwordErr && (
                <p className="text-red-800 text-center text-sm">
                  {validationErr.passwordErr}
                </p>
              )}
            </div>
            <div className="form-input my-3">
              <label htmlFor="cpassword" className="text-xl font-poppins">
                {" "}
                Confirm Password:{" "}
              </label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                autoComplete="current-password"
                placeholder="*************"
                required
                className="border-2 outline-blue-500 py-1 px-3 my-1 text-black rounded-sm outline-1 w-full"
                value={credentials.cpassword}
                onChange={onChange}
                onBlur={(e) =>{
                  if(credentials.password !== credentials.cpassword){
                    setValidationErr({...validationErr, cpasswordErr: "Password and confirm password do not match"})
                  }else{
                    setValidationErr({...validationErr, cpasswordErr: ""})
                  }
                }}
              />
              {validationErr.cpasswordErr && (
                <p className="text-red-800 text-center text-sm">
                  {validationErr.cpasswordErr}
                </p>
              )}
            </div>
            <div className="button flex justify-center">
              <button
                type="submit"
                onClick={handleOnClick}
                className="btn mt-2 uppercase bg-blue-600 py-2 px-8 rounded-md shadow-gray-700/40 shadow-md  text-white hover:bg-blue-800 font-rotobo text-sm"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
