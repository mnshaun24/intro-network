import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";

const LoginFormTwo = () => {
 const register = async (values) => {

  const savedUserResponse = axios.post("http://localhost:3001/auth/register", values).catch((err) => {
    if(err) {
      console.log(err)
    }
  })
  if(savedUserResponse) {
    console.log("success")
  }
 }

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          register(values);
          setSubmitting(false);
        }, 400);
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
