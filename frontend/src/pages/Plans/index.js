import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, PlanList, Plan } from './styles';

export default function Students() {
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    const response = await api.get('/plans');

    setPlans(response.data);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function deletePlan(id) {
    await api.delete(`/plans/${id}`);

    toast.success(`Plan deleted with success.`);
    loadPlans();
  }

  return (
    <>
      <Container>
        <header>
          <h1>Plans management</h1>
          <Link to="/plans/add">Add</Link>
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
                  <Link to={`/plans/edit/${plan.id}`}>Edit</Link>
                </td>
                <td>
                  <button type="button" onClick={() => deletePlan(plan.id)}>
                    Delete
                  </button>
                </td>
              </Plan>
            ))}
          </tbody>
        </PlanList>
      </Container>
    </>
  );
}
