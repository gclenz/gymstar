import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #8d80ef;
  padding: 15px;
`;

export const Question = styled.View`
  background-color: #fff;
  border-radius: 4px;
  height: 200px;
  margin-bottom: 15px;
  padding: 15px;
`;
export const QuestionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
export const QuestionText = styled.Text`
  font-size: 16px;
`;
export const Answer = styled.View`
  background-color: ${props => (props.answer ? '#fff' : '#888')};
  border-radius: 4px;
  height: 200px;
  margin-bottom: 15px;
  padding: 15px;
`;

export const AnswerTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
export const AnswerText = styled.Text`
  font-size: 16px;
`;
