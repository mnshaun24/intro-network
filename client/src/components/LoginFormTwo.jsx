import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

const LoginFormTwo = () => {
  const [pageType, setPageType] = useState("login");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("Please input a valid first name"),
    lastName: yup.string().required("Please input a valid last name"),
    email: yup
      .string()
      .email("Please input a valid email address")
      .required("required"),
    password: yup.string().required("required"),
    location: yup.string(),
    occupation: yup.string(),
    picture: yup.string(),
  });

  // const loginSchema = yup.object().shape({
  //   email: yup
  //     .string()
  //     .email("Please input a valid email address")
  //     .required("required"),
  //   password: yup.string().required("required"),
  // });

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  };

  // const initialValuesLogin = {
  //   email: "",
  //   password: "test",
  // };

  const register = async (values) => {
    const savedUserResponse = axios
      .post("http://localhost:3001/auth/register", values)
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    if (savedUserResponse) {
      console.log("success");
    }
  };

  return (
    <Formik
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          register(values);
          setSubmitting(false);
        }, 400);
      }}
    >
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
          <Form className="space-y-4 md:space-y-6">
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
                    <Field
                      name="firstName"
                      type="text"
                      className="bg-gray-50 form-input border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                    <ErrorMessage name="firstName" />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium"
                    >
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className="bg-gray-50 form-input border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                    <ErrorMessage name="lastName" />
                  </div>

                  <label
                    htmlFor="Occupation"
                    className="block text-sm font-medium"
                  >
                    Occupation
                  </label>
                  <Field
                    name="Occupation"
                    type="text"
                    className="bg-gray-50 border form-input border-gray-300 text-gray-900 col-span-4 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                  <ErrorMessage name="Occupation" />

                  <label
                    htmlFor="Location"
                    className="block text-sm font-medium"
                  >
                    Location
                  </label>
                  <Field
                    name="Location"
                    type="text"
                    className="bg-gray-50 form-input border border-gray-300 text-gray-900 col-span-4 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                  <ErrorMessage name="Location" />
                </div>
              )}

              <label htmlFor="email" className="block my-2 text-sm font-medium">
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                className="bg-gray-50 form-input border border-gray-300 text-gray-900 col-span-4 sm:text-sm sm:col-span-2 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
              <ErrorMessage name="email" />

              <label
                htmlFor="password"
                className="block my-2 text-sm font-medium"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="bg-gray-50 form-input border border-gray-300 text-gray-900 col-span-4 sm:text-sm sm:col-span-2 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
              <ErrorMessage name="password" />
            </section>

            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Field
                    name="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-3 text-sm text-gray-500 remember-text"
                >
                  Remember me
                </label>
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
          </Form>
          <p
            className="underline hover:cursor-pointer text-base"
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
            }}
          >
            {isLogin ? "No account? Sign up" : "Login here"}
          </p>
          </div>
        </div>
      </section>
    </Formik>
  );
};

export default LoginFormTwo;
