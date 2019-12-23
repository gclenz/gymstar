import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  padding: 0 2rem;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      border-right: 1px solid #eee;
      margin-right: 1rem;
      padding-right: 0.5rem;
    }

    a {
      color: #8d80ef;
      font-weight: bold;
      margin: 0.25rem;
      padding: 0.25rem;
    }
  }

  aside {
    display: flex;
    align-items: center;
    text-align: right;
  }
`;

export const Profile = styled.div`
  strong {
    display: block;
  }

  a {
    color: #333;
    display: block;
  }
`;
