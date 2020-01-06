import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import { addMonths, format, parseISO } from 'date-fns';

import api from '../../../services/api';
import history from '../../../services/history';

import 'react-datepicker/dist/react-datepicker.css';
import { Container, Content } from './styles';

export default function Students({ match }) {
  const id = match.params.enrollmentId;

  const [enrollment, setEnrollment] = useState();
  const [student, setStudent] = useState();
  const [plans, setPlans] = useState();
  const [planId, setPlanId] = useState();

  async function loadEnrollment() {
    const { data } = await api.get(`/enrollments/${id}`);
    setEnrollment(data);
  }

  async function loadData() {
    const responseStudent = await api.get(`/students/${enrollment.student_id}`);
    setStudent(responseStudent.data);

    const responsePlans = await api.get('/plans');
    setPlans(responsePlans.data);
  }

  useEffect(() => {
    loadEnrollment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (enrollment) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enrollment]);

  async function editEnrollment() {
    if (planId === enrollment.plan_id) {
      toast.error("You can't change your plan to the same one.");
    }

    try {
      const response = await api.put(`/enrollments/${id}`, {
        newPlanId: planId,
      });

      console.tron.log(response.data);

      toast.success(`Enrollment edited!`);
      history.push('/enrollments');
    } catch (err) {
      toast.error(`The enrollment can not be edited!`);
      console.tron.log(err);
    }
  }

  return (
    <>
      <Container>
        <header>
          <h1>Add plan</h1>
          <Link to="/enrollments">Go back</Link>
        </header>
        <Content>
          <Form onSubmit={editEnrollment}>
            <section>
              <p>Student</p>
              <Input
                name="studentname"
                value={student ? student.name : 'Student name'}
                readOnly
              />
              <div>
                <p>Plan</p>
                <AsyncSelect
                  defaultOptions={plans}
                  getOptionValue={plan => setPlanId(plan.id)}
                  getOptionLabel={plan => plan.title}
                  name="planId"
                  placeholder="Plan"
                />
              </div>
            </section>
            <div className="form">
              <div>
                <p>Start date</p>
                <Input
                  name="startdate"
                  value={
                    enrollment
                      ? format(parseISO(enrollment.start_date), 'MM/dd/yyyy')
                      : 'Loading'
                  }
                  readOnly
                />
              </div>
              <div>
                <p>End date</p>
                <input
                  value={
                    enrollment
                      ? format(parseISO(enrollment.end_date), 'MM/dd/yyyy')
                      : 'Loading'
                  }
                  readOnly
                />
              </div>
              <div>
                <p>Price</p>
                <Input
                  name="finalprice"
                  value={enrollment ? enrollment.price : 'Loading'}
                  readOnly
                />
              </div>
            </div>
            <button type="submit">Edit</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
