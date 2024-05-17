import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Musíš vložit nadpis!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <div className="blackBlock">
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label className="titleCreate">Nadpis: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(zde napiš nadpis)"
            className="nazevPole"
            
          />
          <label className="titleCreate2">Text: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            as="textarea"
            rows="10"
            cols="30"
            autoComplete="off"
            name="postText"
            placeholder="(zde vlož svůj text)"
            className="textovePole"
          />

          <button className="ten" type="submit"> Přidej</button>
        </Form>
      </Formik>
    </div>
    </div>
  )

}

export default CreatePost;
