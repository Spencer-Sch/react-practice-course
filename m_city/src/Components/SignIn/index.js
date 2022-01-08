import React, { useState } from 'react';
import { firebase } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AlternateEmail } from '@material-ui/icons';
import { showErrorToast, showSuccessToast } from '../Utils/tools';

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'francis@gmail.com',
      password: 'testing123',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('The email is required'),
      password: Yup.string().required('The email is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    // This portion needed updating to work with current firebase auth
    const auth = getAuth(firebase);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        showSuccessToast('Welcome back!');
        props.history.push('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        showErrorToast(error.message);
      });
  };

  return (
    <div className="container">
      <div className="signin_wrapper" style={{ margin: '100px' }}>
        <form onSubmit={formik.handleSubmit}>
          <h2>Please login</h2>
          <input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          {formik.touched.email && formik.errors.email ? (
            <div className="error_label">{formik.errors.email}</div>
          ) : null}

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          {formik.touched.password && formik.errors.password ? (
            <div className="error_label">{formik.errors.password}</div>
          ) : null}

          {loading ? (
            <CircularProgress color="secondary" className="progress" />
          ) : (
            <button type="submit">Log In</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
