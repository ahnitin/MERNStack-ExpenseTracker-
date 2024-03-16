import { useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../UI/ErrorModel";

const Signup = () => {
  const [error, setError] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    if (
      name.trim().length == 0 ||
      email.trim().length == 0 ||
      password.trim().length == 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Enter the valid credentials!",
      });
    } else if (!email.includes("@gmail.com")) {
      setError({
        title: "Invalid Input",
        message: "Enter the valid Email!",
      });
    } else if (password.length <= 6) {
      setError({
        title: "Invalid Input",
        message: "Enter the valid Password!",
      });
    }
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    let obj = {
      name,
      email,
      password,
    };
    console.log(obj);
    try {
      let res = await axios.post("http://localhost:3000/sign-up", obj);
      console.log(res.data.message, res.data.user);
      history.replace("/auth/login"); // errror not a function
    } catch (error) {
      console.log(error);
    }
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <ErrorMessage
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorMessage>
      )}
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={formSubmitHandler}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              ref={nameRef}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              ref={emailRef}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              ref={passwordRef}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-4">
                          <p className="text-center text-muted mt-5 mb-0">
                            Have already an account?{" "}
                            <NavLink
                              to="/auth/login"
                              className="fw-bold text-body"
                            >
                              <u>Login here</u>
                            </NavLink>
                          </p>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            SignUp
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;
