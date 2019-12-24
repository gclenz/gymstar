import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Container, HelpOrderList, HelpOrder } from './styles';

export default function Students() {
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('helporders');

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, []);

  console.tron.log(helpOrders);

  return (
    <>
      <Container>
        <header>
          <h1>Help orders</h1>
        </header>
        <HelpOrderList>
          <thead>
            <tr>
              <th>Student</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(helporder => (
              <HelpOrder key={helporder.id}>
                <td>{helporder.student_id}</td>
                <td>
                  <button type="button">Answer</button>
                </td>
              </HelpOrder>
            ))}
          </tbody>
        </HelpOrderList>
      </Container>
    </>
  );
}
