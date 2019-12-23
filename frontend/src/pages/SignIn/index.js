import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

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
  function handleSubmit(data) {
    console.tron.log(data);
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

        <button type="submit">Access</button>
      </Form>
    </>
  );
}
