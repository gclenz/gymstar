import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import {
  Container,
  Question,
  QuestionTitle,
  QuestionText,
  Answer,
  AnswerTitle,
  AnswerText,
} from './styles';

export default function ViewHelpOrder({ navigation }) {
  const id = navigation.getParam('id');
  const [helpOrder, setHelpOrder] = useState({});

  useEffect(() => {
    async function loadHelpOrder() {
      const response = await api.get(`/helporders/${id}`);

      setHelpOrder(response.data);
    }

    loadHelpOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Question>
        <QuestionTitle>Question</QuestionTitle>
        <QuestionText>{helpOrder.question}</QuestionText>
      </Question>
      <Answer answer={helpOrder.answer}>
        <AnswerTitle>Answer</AnswerTitle>
        <AnswerText>
          {helpOrder.answer
            ? helpOrder.answer
            : 'Your question is not answered yet!'}
        </AnswerText>
      </Answer>
    </Container>
  );
}

ViewHelpOrder.navigationOptions = ({ navigation }) => ({
  title: 'See help order',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={30} color="#202023" />
    </TouchableOpacity>
  ),
});
