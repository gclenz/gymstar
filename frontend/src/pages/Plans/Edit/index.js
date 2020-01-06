import React, { useState, useEffect } from 'react';
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

export default function Plans({ match }) {
  const [plan, setPlan] = useState({});

  const id = match.params.planId;

  async function loadPlan() {
    const response = await api.get(`/plans/${id}`);

    console.tron.log(response.data);

    setPlan(response.data);
  }

  useEffect(() => {
    loadPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function editPlan({ title, duration, price }) {
    const response = await api.put(`/plans/${id}`, {
      title,
      duration,
      price,
    });

    toast.success(`Plan ${response.data.title} edited!`);
    loadPlan();
  }

  return (
    <>
      <Container>
        <header>
          <h1>Edit plan</h1>
          <Link to="/plans">Go back</Link>
        </header>
        <Content>
          <Form schema={schema} onSubmit={editPlan} initialData={plan}>
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
              <div>
                <p>Total price</p>
                <Input value={plan.price * plan.duration} name="totalprice" />
              </div>
            </section>
            <button type="submit">Edit</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
