import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gymstar" />
          <Link to="/dashboard">Home</Link>
          <Link to="/dashboard">Students</Link>
          <Link to="/dashboard">Plans</Link>
          <Link to="/dashboard">Enrollment</Link>
          <Link to="/dashboard">Help Orders</Link>
        </nav>

        <aside>
          <Profile>
            <strong>Name here</strong>
            <Link to="/">Sign out</Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
