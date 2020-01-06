import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '../../../services/api';
import history from '../../../services/history';

import { Container, Content } from '../styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  duration: Yup.number().required('Duration is required.'),
  price: Yup.number().required('Price is required.'),
});

export default function Students() {
  async function createPlan({ title, duration, price }) {
    try {
      const response = await api.post('/plans', {
        title,
        duration,
        price,
      });

      toast.success(`Plan ${response.data.title} created!`);
      history.push('/plans');
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <>
      <Container>
        <header>
          <h1>Add plan</h1>
          <Link to="/plans">Go back</Link>
        </header>
        <Content>
          <Form schema={schema} onSubmit={createPlan}>
            <div>
              <p>Title</p>
              <Input name="title" placeholder="Plan title" />
            </div>
            <section>
              <div>
                <p>Duration</p>
                <Input name="duration" placeholder="Duration" />
              </div>
              <div>
                <p>Price/month</p>
                <Input name="price" placeholder="Price/month" />
              </div>
            </section>
            <button type="submit">Edit</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
