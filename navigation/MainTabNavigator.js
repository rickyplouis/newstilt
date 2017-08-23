import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import FeedScreen from '../screens/FeedScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Feed: {
      screen: FeedScreen,
    },
    Account: {
      screen: AccountScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;

        let usingIOS = () => {
          return Platform.OS === 'ios'
        }

        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = usingIOS() ? `ios-home${focused ? '' : '-outline'}` : 'md-home';
            break;
          case 'Account':
            iconName = usingIOS() ? `ios-person${focused ? '' : '-outline'}` : `md-person`
            break;
          case 'Feed':
            iconName = usingIOS() ? `ios-paper${focused ? '' : '-outline'}` : `md-paper`
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
