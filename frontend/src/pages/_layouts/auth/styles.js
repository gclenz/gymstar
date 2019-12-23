import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background-color: #8d80ef;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 5px rgba(125, 125, 125, 0.1);
  max-width: 350px;
  padding: 1rem;
  text-align: center;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;

    span {
      color: red;
      font-size: 0.75rem;
      margin-left: 1.25rem;
      text-align: left;
    }

    input {
      background-color: #ddd;
      border: none;
      border-radius: 0.25rem;
      box-shadow: 0px 4px 5px rgba(125, 125, 125, 0.1);
      margin: 0.5rem;
      padding: 0.75rem;

      &::placeholder {
        color: #333;
      }
    }

    button {
      background-color: #8d80ef;
      border: none;
      border-radius: 0.25rem;
      box-shadow: 0px 4px 5px rgba(125, 125, 125, 0.1);
      color: #fff;
      font-weight: bold;
      margin: 0.5rem;
      padding: 0.75rem;
      transition: background-color 0.5s;

      &:hover {
        background-color: ${darken(0.05, '#8d80ef')};
      }
    }
  }
`;
