import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Type a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password min 8 characters.')
    .required('Password is required.'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Gymstar" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Type your email..." />
        <Input
          type="password"
          name="password"
          placeholder="Type your password..."
        />

        <button type="submit">{loading ? 'Loading...' : 'Access'}</button>
      </Form>
    </>
  );
}
