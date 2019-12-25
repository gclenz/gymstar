import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 720px;
  min-height: 300px;
  margin: 2rem auto;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
  }

  input {
    background-color: #fff;
    border: none;
    border-radius: 0.25rem;
    box-shadow: 0px 4px 5px rgba(125, 125, 125, 0.1);
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
    padding: 0.75rem;
    transition: background-color 0.5s;

    &:hover {
      background-color: ${darken(0.05, '#8d80ef')};
    }
  }
`;

export const StudentList = styled.table`
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 5px rgba(125, 125, 125, 0.1);
  padding: 1rem;
  width: 100%;

  th {
    text-align: left;
  }
`;

export const Student = styled.tr`
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
`;

export const Content = styled.div`
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 5px rgba(125, 125, 125, 0.1);
  padding: 1rem;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 100%;
    }
  }

  input {
    background-color: #eee;
    box-shadow: none;
    margin: 1rem;
    max-width: 100%;
  }
`;
