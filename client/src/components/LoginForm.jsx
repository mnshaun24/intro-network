import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { UilPen } from "@iconscout/react-unicons";

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
  const navigate = useNavigate();
  // const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async (values, onSubmitProps) => {};

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
        <form onSubmit={handleSubmit}>
          <section className="grid-cols-4 gap-7">
            {isRegister && (
              <>
                <label
                  for="First Name"
                  className="block mb-2 text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 col-span-4 sm:text-sm sm:col-span-2 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                ></input>
                <label
                  for="Last Name"
                  className="block mb-2 text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 col-span-4 sm:text-sm sm:col-span-2 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                ></input>
                <label
                  for="occupation"
                  className="block mb-2 text-sm font-medium"
                >
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 col-span-4 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                ></input>
                <label
                  for="Location"
                  className="block mb-2 text-sm font-medium"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 col-span-4 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
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
                        <input type="file" {...getInputProps()}>
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
                        </input>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </>
            )}

<label
                  for="Email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 col-span-4 sm:text-sm sm:col-span-2 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={
                    Boolean(touched.email) && Boolean(errors.email)
                  }
                  helperText={touched.email && errors.email}
                ></input>
<label
                  for="Password"
                  className="block mb-2 text-sm font-medium"
                >
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 col-span-4 sm:text-sm sm:col-span-2 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={
                    Boolean(touched.password) && Boolean(errors.password)
                  }
                  helperText={touched.password && errors.password}
                ></input>

          </section>
          <section>
          <button className="btn"
          onClick={() => {
            setPageType(isLogin ? "register" : "login");
            resetForm();
          }}>{isLogin ? "LOGIN" : "REGISTER"}</button>
          {isLogin ? "No account? Sign Up" : "Login here"}
          </section>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
