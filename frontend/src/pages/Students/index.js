import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';

import { Container, StudentList, Student } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    const response = await api.get('/students');

    console.tron.log(response.data);

    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function deleteStudent(id) {
    console.tron.log(id);
    await api.delete(`/students/${id}`);

    toast.success(`Student deleted with success.`);
    loadStudents();
  }

  return (
    <>
      <Container>
        <header>
          <h1>Students management</h1>
          <button type="button" onClick={() => history.push('/students/add')}>
            Add
          </button>
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
                  <Link to={`/students/edit/${student.id}`}>Edit</Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </Student>
            ))}
          </tbody>
        </StudentList>
      </Container>
    </>
  );
}
