import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { Container, PlanList, Plan } from './styles';

export default function Students() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  return (
    <>
      <Container>
        <header>
          <h1>Plans management</h1>
          <button type="button">Add</button>
        </header>
        <PlanList>
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Price</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <Plan key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.price}</td>
                <td>
                  <button type="button">Edit</button>
                </td>
                <td>
                  <button type="button">Delete</button>
                </td>
              </Plan>
            ))}
          </tbody>
        </PlanList>
      </Container>
    </>
  );
}
