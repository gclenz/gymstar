import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { MdBlock, MdCheck } from 'react-icons/md';
import api from '../../services/api';

import { Container, EnrollmentList, Enrollment } from './styles';

export default function Students() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('/enrollments');

      setEnrollments(response.data);
    }

    loadEnrollments();
  }, []);

  return (
    <>
      <Container>
        <header>
          <h1>Enrollments management</h1>
          <button type="button">Add</button>
        </header>
        <EnrollmentList>
          <thead>
            <tr>
              <th>Student</th>
              <th>Plan</th>
              <th>Start</th>
              <th>End</th>
              <th>Active</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <Enrollment key={enrollment.id}>
                <td>{enrollment.student_id}</td>
                <td>{enrollment.plan_id}</td>
                <td>
                  {format(parseISO(enrollment.start_date), 'MMMM dd, yyyy')}
                </td>
                <td>
                  {format(parseISO(enrollment.end_date), 'MMMM dd, yyyy')}
                </td>
                <td>
                  {enrollment.active ? (
                    <MdCheck color="#00ff00" size={20} />
                  ) : (
                    <MdBlock color="#ff0000" size={20} />
                  )}
                </td>
                <td>
                  <button type="button">Edit</button>
                </td>
                <td>
                  <button type="button">Delete</button>
                </td>
              </Enrollment>
            ))}
          </tbody>
        </EnrollmentList>
      </Container>
    </>
  );
}
