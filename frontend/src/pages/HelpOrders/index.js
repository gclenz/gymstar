import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { Form, Textarea } from '@rocketseat/unform';
import api from '../../services/api';

import { Container, HelpOrderList, HelpOrder } from './styles';
import '../../components/Modal/styles.css';

Modal.setAppElement('#root');

export default function Students() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [questionId, setQuestionId] = useState();
  const [question, setQuestion] = useState('');

  async function loadHelpOrders() {
    const response = await api.get('helporders');

    setHelpOrders(response.data);
  }

  useEffect(() => {
    loadHelpOrders();
  }, []);

  function openModal(id, questionText) {
    setModalIsOpen(true);
    setQuestionId(id);
    setQuestion(questionText);
  }

  function closeModal() {
    setModalIsOpen(false);
    setQuestionId('');
    setQuestion('');
  }

  async function sendAnswer({ answer }) {
    if (answer === '') {
      toast.error("You can't give an empty answer.");
      return;
    }

    await api.put(`helporders/${questionId}/answer`, {
      answer,
    });

    toast.success('Your answer has been sent.');

    closeModal();
    loadHelpOrders();
  }

  return (
    <>
      <Container>
        <header>
          <h1>Help orders</h1>
        </header>
        <HelpOrderList>
          <thead>
            <tr>
              <th>Student</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(helporder => (
              <HelpOrder key={helporder.id}>
                <td>{helporder.student_id}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => openModal(helporder.id, helporder.question)}
                  >
                    Answer
                  </button>
                </td>
              </HelpOrder>
            ))}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="Modal"
              overlayClassName="Overlay"
              contentLabel="Example Modal"
            >
              <h3>Student question</h3>
              <p>{question}</p>
              <h3>Answer</h3>
              <Form onSubmit={sendAnswer}>
                <Textarea name="answer" cols="30" rows="10" />
                <button type="submit">Send</button>
              </Form>
            </Modal>
          </tbody>
        </HelpOrderList>
      </Container>
    </>
  );
}
