import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';

import { Container, HelpOrderText, SubmitButton } from './styles';

export default function NewHelpOrder({ navigation }) {
  const [question, setQuestion] = useState('');

  const id = useSelector(state => state.auth.id);

  async function sendHelpOrder() {
    try {
      await api.post(`/students/${id}/helporders`, {
        question,
      });
      Alert.alert('Success', 'Your help order has been send.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Try again later.');
    }
  }

  return (
    <Container>
      <HelpOrderText
        placeholder="Type your doubt."
        multiline
        returnKeyType="send"
        onSubmitEditing={sendHelpOrder}
        value={question}
        onChangeText={setQuestion}
      />
      <SubmitButton onPress={sendHelpOrder}>Send</SubmitButton>
    </Container>
  );
}

NewHelpOrder.navigationOptions = ({ navigation }) => ({
  title: 'Create help order',
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
