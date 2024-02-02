import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const host = `http://localhost:8000`;
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const handleOnClick = async (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      console.log("button clicked", credentials);
      setError(false);
      
      try {
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        })
        const data = await response.json();
        console.log(data);
        
        if(data.success === true){
          console.log("login successful");
          localStorage.setItem("auth-token", data.token);

          try {
            const response = await fetch(`${host}/api/auth/getuserdata`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("auth-token")
              }
            })
            const data = await response.json();
            console.log(JSON.stringify(data.data));

            if(data){
              localStorage.setItem("data", JSON.stringify(data.data));
            }
          } catch (error) {
            setError(true);
            setErrorMsg(error);
          }
          navigate("/");
        }else{
          setError(true);
          setErrorMsg(data.error)
        }
      } catch (error) {
        setError(true);
        setErrorMsg(error);
      }
        
      } else {
        setError(true);
        setErrorMsg("Email and password field cannot be blank")
      }
    };
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [validationErr, setValidationErr] = useState("");

  return (
    <>
      <div className="mt-10">
        <h1 className="text-3xl font-mono text-center my-4">
          Login to Your Account
        </h1>
        <div className="form-data mt-14 shadow-gray-700/50 rounded-md shadow-lg text-indigo-900 p-8 w-96 mx-auto h-auto flex justify-center items-center">
          <form action="" method="post">
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
                className="border-2 outline-blue-500 py-1 my-1 px-3 text-black rounded-sm outline-1 w-full "
                value={credentials.email}
                onChange={onChange}
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                onBlur={(e) => {
                  if(!e.target.value.match(e.target.pattern)){
                    console.log("Email is invalid")
                    setValidationErr("Invalid email");
                  }else{
                    setValidationErr("");
                  }
                  console.log(e.target.pattern)
                }}
                required
              />
              {validationErr && <p className="text-red-800 text-center">{validationErr}</p>}
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
                className="border-2 outline-blue-500 py-1 px-3 my-1 text-black rounded-sm outline-1 w-full"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>
            <p className="text-blue-600 underline"><Link to="/forgetpassword">Forget password?</Link></p>
            <div className="button flex justify-center">
              <button
                onClick={handleOnClick}
                className="btn mt-2 uppercase bg-blue-600 py-2 px-8 rounded-md shadow-gray-700/40 shadow-md  text-white hover:bg-blue-800 font-rotobo text-sm"
              >
                Login
              </button>
            </div>
           {error &&  <p className="text-red-700 text-center mt-2"> {errorMsg} </p>}
            <p className="mt-2">
              Don't have an account?{" "}
              <Link className="text-blue-600 hover:underline" to="/register">
                Create an account!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
