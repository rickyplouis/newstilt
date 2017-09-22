import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import SwiperComponent from '../components/SwiperComponent'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "NewsTilt",
    headerLeft: null
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.container}>
        <SwiperComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
