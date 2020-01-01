import React, { useEffect, useState } from 'react';
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

export default function Students({ match }) {
  const [student, setStudent] = useState({});

  const id = match.params.studentId;

  async function loadStudent() {
    const response = await api.get(`/students/${id}`);

    console.tron.log(response.data);

    setStudent(response.data);
  }

  useEffect(() => {
    loadStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function editUser({ name, email, age, weight, height }) {
    const response = await api.put(`/students/${id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success(`Student ${response.data.name} edited!`);
    loadStudent();
  }

  return (
    <>
      <Container>
        <header>
          <h1>Edit student</h1>
          <button type="button" onClick={() => history.push('/students')}>
            Go back
          </button>
        </header>
        <Content>
          <Form schema={schema} onSubmit={editUser} initialData={student}>
            <Input type="text" name="name" placeholder="Full name" />
            <br />
            <Input name="email" type="email" placeholder="Email" />
            <br />
            <div>
              <Input type="text" name="age" placeholder="Age" />
              <Input type="text" name="weight" placeholder="Weight" />
              <Input type="text" name="height" placeholder="Height" />
              <button type="submit">Edit</button>
            </div>
          </Form>
        </Content>
      </Container>
    </>
  );
}
