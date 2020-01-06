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

export default function Students() {
  const [startDate, setStartDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [endDate, setEndDate] = useState();
  const [studentId, setStudentId] = useState();
  const [planId, setPlanId] = useState();
  const [planDuration, setPlanDuration] = useState(1);
  const [price, setPrice] = useState();

  async function loadStudents() {
    const response = await api.get('/students');

    // const studentList = response.data.map(student => {
    //   return {
    //     value: student.id,
    //     label: student.name,
    //   };
    // });

    // console.tron.log(studentList);

    setStudents(response.data);
  }

  async function loadPlans() {
    const response = await api.get('/plans');

    // const planList = response.data.map(plan => {
    //   return {
    //     value: plan.id,
    //     label: plan.title,
    //     duration: plan.duration,
    //   };
    // });

    setPlans(response.data);
  }

  const planData = plans.find(plan => plan.id === planId) || null;

  useEffect(() => {
    loadStudents();
    loadPlans();
    setEndDate(format(new Date(), 'MM/dd/yyyy'));
    setPlanDuration(planData ? planData.duration : 1);
    setPrice(planData ? planData.price * planData.duration : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

  async function createEnrollment() {
    try {
      const response = await api.post('/enrollments', {
        studentId,
        planId,
        date: startDate,
      });

      console.tron.log(response.data);

      toast.success(`Enrollment created!`);
      history.push('/enrollments');
    } catch (err) {
      toast.error(`The enrollment can not be created! ${err}`);
      console.tron.log(err);
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
          <Form onSubmit={createEnrollment}>
            <section>
              <p>Student</p>
              <AsyncSelect
                defaultOptions={students}
                getOptionValue={student => setStudentId(student.id)}
                getOptionLabel={student => student.name}
                name="studentId"
                placeholder="Student"
                // onChange={setStudentId}
              />
            </section>
            <div className="form">
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
              <div>
                <p>Start date</p>
                <DatePicker
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                    setEndDate(
                      format(addMonths(startDate, planDuration), 'MM/dd/yyyy')
                    );
                  }}
                />
              </div>
              <div>
                <p>End date</p>
                <Input name="enddate" value={endDate} readOnly />
              </div>
              <div>
                <p>Price</p>
                <Input name="finalprice" value={price} readOnly />
              </div>
            </div>
            <button type="submit">Create</button>
          </Form>
        </Content>
      </Container>
    </>
  );
}
