import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import StudentAdd from '../pages/Students/Add';
import StudentEdit from '../pages/Students/Edit';
import Plans from '../pages/Plans';
import Enrollments from '../pages/Enrollments';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/add" component={StudentAdd} isPrivate />
      <Route path="/students/edit" component={StudentEdit} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/enrollments" component={Enrollments} isPrivate />
      <Route path="/helporders" component={HelpOrders} isPrivate />

      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
}
