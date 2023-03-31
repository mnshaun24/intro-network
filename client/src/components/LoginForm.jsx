import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
// import { UilPen } from "@iconscout/react-unicons";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Please input a valid first name"),
  lastName: yup.string().required("Please input a valid last name"),
  email: yup
    .string()
    .email("Please input a valid email address")
    .required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("Please input a valid location"),
  occupation: yup.string().required("Please input a valid occupation"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please input a valid email address")
    .required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // * FormData is here to allow passing image along with rest of form data
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInUserResponse = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInUserResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:border bg-orange-50 login-container">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {isLogin && (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl allText">
                    Sign in to your account
                  </h1>
                </>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <section>
                  {isRegister && (
                    <div className="grid grid-cols-4 gap-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-sm font-medium"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="bg-gray-50 form-input border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                          error={
                            Boolean(touched.firstName) ?
                            Boolean(errors.firstName) : undefined
                          }
                          helpertext={touched.firstName && errors.firstName}
                        ></input>
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="lastName"
                          className="block mb-2 text-sm font-medium"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="bg-gray-50 form-input border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                          error={
                            Boolean(touched.lastName) ?
                            Boolean(errors.lastName) : undefined
                          }
                          helpertext={touched.lastName && errors.lastName}
                        ></input>
                      </div>
                      <label
                        htmlFor="occupation"
                        className="block text-sm font-medium"
                      >
                        Occupation
                      </label>
                      <input
                        type="text"
                        id="occupation"
                        className="bg-gray-50 border form-input border-gray-300 text-gray-900 col-span-4 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        error={
                          Boolean(touched.occupation) ?
                          Boolean(errors.occupation) : undefined
                        }
                        helpertext={touched.occupation && errors.occupation}
                      ></input>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        className="bg-gray-50 form-input border border-gray-300 text-gray-900 col-span-4 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        error={
                          Boolean(touched.location) ? Boolean(errors.location) : undefined
                        }
                        helpertext={touched.location && errors.location}
                      ></input>
                      <div className="col-span-4 border border-solid rounded p-4">
                        <Dropzone
                          acceptedFiled=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={(acceptedFiles) =>
                            setFieldValue("picture", acceptedFiles[0])
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div
                              {...getRootProps()}
                              className="border-2 border-dashed p-4 cursor-pointer"
                            >
                              <input type="file" {...getInputProps()} />
                              {!values.picture ? (
                                <p>Add Picture Here</p>
                              ) : (
                                <>
                                  {" "}
                                  <p className="flexBetweenCenter">
                                    {values.picture.name}
                                  </p>
                                  <i class="uil uil-pen"></i>
                                </>
                              )}
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                  )}

                  <label htmlFor="email" className="block my-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 form-input border border-gray-300 text-gray-900 col-span-4 sm:text-sm sm:col-span-2 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(touched.email) ? Boolean(errors.email) : undefined}
                    helpertext={touched.email && errors.email}
                  />
                  <label
                    htmlFor="password"
                    className="block my-2 text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="**********"
                    className="bg-gray-50 form-input border border-gray-300 text-gray-900 col-span-4 sm:text-sm sm:col-span-2 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={
                      Boolean(touched.password) ? Boolean(errors.password) : undefined
                    }
                    helpertext={touched.password && errors.password}
                  />
                </section>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 remember-text"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium hover:underline text-blue-700 forgot-password-text"
                  >
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="btn">
                  {isLogin ? "LOGIN" : "REGISTER"}
                </button>
                <p
                  className="underline hover:cursor-pointer text-base"
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                  }}
                >
                  {isLogin ? "No account? Sign Up" : "Login here"}
                </p>
              </form>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
};

export default LoginForm;
