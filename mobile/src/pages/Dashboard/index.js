import React, { useState, useEffect } from 'react';
import { formatDistance, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Title,
  CheckinButton,
  CheckinList,
  CheckinWrapper,
  CheckinCount,
  CheckinDate,
} from './styles';

export default function Dashboard() {
  const [checkins, setCheckins] = useState([]);

  const id = useSelector(state => state.auth.id);

  async function loadCheckins() {
    const response = await api.get(`/students/${id}/checkins`);

    const data = response.data.map(checkin => ({
      ...checkin,
      formatedDate: formatDistance(parseISO(checkin.createdAt), new Date(), {
        addSuffix: true,
      }),
    }));

    console.tron.log(data);
    setCheckins(data);
  }

  useEffect(() => {
    loadCheckins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleNewCheckin() {
    await api.post(`/students/${id}/checkins`);

    loadCheckins();
  }

  return (
    <Container>
      <Title>Check-ins</Title>
      <CheckinButton onPress={handleNewCheckin}>New check-in</CheckinButton>

      <CheckinList
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <CheckinWrapper>
            <CheckinCount>Checkin #{index + 1}</CheckinCount>
            <CheckinDate>{item.formatedDate}</CheckinDate>
          </CheckinWrapper>
        )}
      />
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="place" size={20} color={tintColor} />
  ),
};
