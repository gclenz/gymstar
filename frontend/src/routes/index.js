import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import StudentAdd from '../pages/Students/Add';
import StudentEdit from '../pages/Students/Edit';
import Plans from '../pages/Plans';
import PlanAdd from '../pages/Plans/Add';
import PlanEdit from '../pages/Plans/Edit';
import Enrollments from '../pages/Enrollments';
import EnrollmentAdd from '../pages/Enrollments/Add';
import EnrollmentEdit from '../pages/Enrollments/Edit';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/add" component={StudentAdd} isPrivate />
      <Route
        path="/students/edit/:studentId"
        component={StudentEdit}
        isPrivate
      />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/add" exact component={PlanAdd} isPrivate />
      <Route path="/plans/edit/:planId" component={PlanEdit} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route path="/enrollments/add" component={EnrollmentAdd} isPrivate />
      <Route
        path="/enrollments/edit/:enrollmentId"
        component={EnrollmentEdit}
        isPrivate
      />

      <Route path="/helporders" exact component={HelpOrders} isPrivate />

      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
}
