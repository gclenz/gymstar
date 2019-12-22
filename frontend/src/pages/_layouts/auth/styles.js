import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #514db2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0px 2px 3px rgba(75, 75, 75, 0.1);
  max-width: 315px;
  padding: 2rem;
  text-align: center;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    input {
      background-color: #f5f6f7;
      border: none;
      border-radius: 0.75rem;
      box-shadow: 0px 2px 3px rgba(75, 75, 75, 0.1);
      color: #1e1e1e;
      margin-bottom: 1rem;
      padding: 1rem 1rem;

      &::placeholder {
        color: #999;
      }
    }

    span {
      align-self: flex-start;
      color: #f64c75;
      font-size: 0.8rem;
      margin: -0.5rem 0 1rem 1rem;
    }

    button {
      background-color: #fc7750;
      border: none;
      border-radius: 0.75rem;
      box-shadow: 0px 2px 3px rgba(75, 75, 75, 0.1);
      color: #fff;
      font-weight: bold;
      margin-bottom: 1rem;
      padding: 1rem 1rem;
      transition: background-color 0.5s;

      &:hover {
        background-color: ${darken(0.05, '#fc7750')};
      }
    }
  }

  a {
    color: #514db2;
    font-weight: bold;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
`;
