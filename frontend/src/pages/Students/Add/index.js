import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '../../../services/api';
import history from '../../../services/history';

import { Container, Content } from '../styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  email: Yup.string()
    .email('Type a valid email.')
    .required('Email is required.'),
  age: Yup.number().required('Age is required.'),
  weight: Yup.number().required('Weight is required.'),
  height: Yup.number().required('Height is required.'),
});

export default function Students() {
  async function createUser({ name, email, age, weight, height }) {
    const response = await api.post('/students', {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success(`Student ${response.data.name} created!`);
    history.push('/students');
  }

  return (
    <>
      <Container>
        <header>
          <h1>Add student</h1>
          <button type="button" onClick={() => history.push('/students')}>
            Go back
          </button>
        </header>
        <Content>
          <Form schema={schema} onSubmit={createUser}>
            <div>
              <p>Name</p>
              <Input name="name" placeholder="Full name" />
            </div>
            <div>
              <p>Email</p>
              <Input name="email" type="email" placeholder="Email" />
            </div>

            <section>
              <div>
                <p>Age</p>
                <Input name="age" placeholder="Age" />
              </div>
              <div>
                <p>Weight</p>
                <Input name="weight" placeholder="Weight" />
              </div>
              <div>
                <p>Height</p>
                <Input name="height" placeholder="Height" />
              </div>
            </section>
            <button type="submit">Create</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
