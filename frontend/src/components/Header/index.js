import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gymstar" />
          <Link to="/students">Students</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/enrollments">Enrollments</Link>
          <Link to="/helporders">Help Orders</Link>
        </nav>

        <aside>
          <Profile>
            <strong>{userData.name}</strong>
            <Link onClick={handleSignOut} to="/">
              Sign out
            </Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
