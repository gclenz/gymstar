import styled from 'styled-components/native';
import Button from '../../components/Button';

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

export const CheckinButton = styled(Button)``;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CheckinWrapper = styled.View`
  align-items: center;
  background-color: #fff;
  border: 1px solid #8d80ef;
  border-radius: 4px;
  flex-direction: row;
  height: 46px;
  justify-content: space-between;
  margin-top: 15px;
  padding: 15px 30px;
`;

export const CheckinCount = styled.Text`
  color: #8d80ef;
`;

export const CheckinDate = styled.Text`
  color: #8d80ef;
`;
