import React, { useState, useEffect } from 'react';
import { formatDistance, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';

import {
  Container,
  HelpOrderButton,
  HelpOrdersList,
  HelpOrderWrapper,
  HelpOrderHeader,
  HelpOrdersAnswered,
  HelpOrderDate,
  HelpOrderQuestion,
} from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([]);

  const id = useSelector(state => state.auth.id);

  async function loadHelpOrders() {
    const response = await api.get(`/students/${id}/helporders`);

    const data = response.data.map(checkin => ({
      ...checkin,
      formatedDate: formatDistance(parseISO(checkin.createdAt), new Date(), {
        addSuffix: true,
      }),
    }));

    console.tron.log(data);
    setHelpOrders(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Container>
      <HelpOrderButton onPress={() => navigation.navigate('NewHelpOrder')}>
        New help order
      </HelpOrderButton>

      <HelpOrdersList
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <HelpOrderWrapper
            onPress={() => navigation.navigate('ViewHelpOrder', item)}
          >
            <HelpOrderHeader>
              <HelpOrdersAnswered answer={item.answer}>
                {item.answer ? (
                  <>
                    <Icon name="check-circle" size={20} />
                    Answered
                  </>
                ) : (
                  <>
                    <Icon name="check-circle" size={20} />
                    Unanswered
                  </>
                )}
              </HelpOrdersAnswered>
              <HelpOrderDate>{item.formatedDate}</HelpOrderDate>
            </HelpOrderHeader>
            <HelpOrderQuestion>{item.question}</HelpOrderQuestion>
          </HelpOrderWrapper>
        )}
      />
    </Container>
  );
}

HelpOrders.navigationOptions = {
  title: 'Help orders',
};

export default withNavigationFocus(HelpOrders);
