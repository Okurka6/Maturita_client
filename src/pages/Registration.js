import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {

  let navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      navigate("/");;
    });
  };

  return (
    <div className="blackBlock">
    <div className="registr">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label className="labelCreate1">Uživatel </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost3"
            name="username"
            placeholder="(Např. Evžen)"
          />

          <label className="labelCreate2">Heslo </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost2"
            name="password"
            placeholder="12345..."
          />

          <button className="regi" type="submit"> Registrovat</button>
        </Form>
      </Formik>
    </div>
    </div>
  );
}

export default Registration;
