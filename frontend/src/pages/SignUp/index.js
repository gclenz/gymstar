import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Type a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Minimum of 8 characters.')
    .required('Password is required.'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Schedulizer's logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Type your full name..." />
        <Input name="email" type="email" placeholder="Type your email..." />
        <Input
          type="password"
          name="password"
          placeholder="Type your password..."
        />

        <button type="submit">Create account</button>
        <Link to="/">Already registered? Log in.</Link>
      </Form>
    </>
  );
}
