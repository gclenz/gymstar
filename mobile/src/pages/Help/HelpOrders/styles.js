import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Button from '../../../components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: #8d80ef;
  align-self: center;
  margin: 10px 20px;
`;

export const HelpOrderButton = styled(Button)``;

export const HelpOrdersList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const HelpOrderWrapper = styled(RectButton)`
  background-color: #fff;
  border: 2px solid #8d80ef;
  border-radius: 4px;
  flex-direction: column;
  height: 110px;
  margin-top: 15px;
  padding: 15px;
`;

export const HelpOrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const HelpOrdersAnswered = styled.Text`
  color: ${props => (props.answer ? 'green' : '#999')};
  font-size: 16px;
  font-weight: bold;
`;

export const HelpOrderDate = styled.Text`
  color: #8d80ef;
  font-size: 16px;
  font-weight: bold;
`;

export const HelpOrderQuestion = styled.Text`
  color: #555;
  font-size: 16px;
`;
