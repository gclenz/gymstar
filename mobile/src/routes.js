import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';

import HelpOrders from './pages/Help/HelpOrders';
import NewHelpOrder from './pages/Help/NewHelpOrder';
import ViewHelpOrder from './pages/Help/ViewHelpOrder';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Help: {
              screen: createStackNavigator(
                {
                  HelpOrders,
                  NewHelpOrder,
                  ViewHelpOrder,
                },
                {
                  defaultNavigationOptions: {
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                    headerTitleAlign: 'center',
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Help',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#8d80ce',
              inactiveTintColor: '#333',
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
