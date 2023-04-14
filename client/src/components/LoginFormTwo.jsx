import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";

const LoginFormTwo = () => {
 const register = async (values) => {

  // * Append image data with rest of values

  const savedUserResponse = axios.post("http://localhost:3001/auth/register", values).catch((err) => {
    if(err) {
      console.log(err)
    }
  })
  if(savedUserResponse) {
    console.log("success")
  }
 }

 const login = async (values) => {
  
  const loggedInUserResponse = axios.post("http://localhost:3001/auth/login", values).catch((err) => {
    if(err) {
      console.log(err)
    }
  })
  if(loggedInUserResponse) {
    console.log("did it")
  }
 }

 const handleFormSubmit = async (values) => {
  await register(values)
 }

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleFormSubmit(values);
          setSubmitting(false);
        }, 200);
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />
        <ErrorMessage name="firstName" />

        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
        <ErrorMessage name="lastName" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default LoginFormTwo;
