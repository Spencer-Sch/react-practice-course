import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { CircularProgress } from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { showErrorToast, showSuccessToast } from '../../Utils/tools';
import { promotionsCollection } from '../../../firebase';
import { getDocs, addDoc, query, where } from 'firebase/firestore';

const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      const q = query(promotionsCollection, where('email', '==', values.email));
      const isOnTheList = await getDocs(q);

      if (isOnTheList.docs.length >= 1) {
        showErrorToast('sorry, you are already on the list');
        formik.resetForm();
        setLoading(false);
        return false;
      }

      await addDoc(promotionsCollection, {
        email: values.email,
      });
      formik.resetForm();
      setLoading(false);
      showSuccessToast('Congratulations!!! :D');
    } catch (error) {
      showErrorToast(error);
    }
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('The email is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error_label">{formik.errors.email}</div>
            ) : null}

            {loading ? (
              <CircularProgress color="secondary" className="progress" />
            ) : (
              <button type="submit">Enroll</button>
            )}

            <div className="enroll_discl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
