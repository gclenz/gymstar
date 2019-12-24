import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Container, StudentList, Student } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      console.tron.log(response.data);

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  return (
    <>
      <Container>
        <header>
          <h1>Students management</h1>
          <button type="button">Add</button>
          <input type="text" name="student" placeholder="Search student..." />
        </header>
        <StudentList>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <Student key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button type="button">Edit</button>
                </td>
                <td>
                  <button type="button">Delete</button>
                </td>
              </Student>
            ))}
          </tbody>
        </StudentList>
      </Container>
    </>
  );
}
