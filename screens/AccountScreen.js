import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import { connect } from 'react-redux';

import AccountList    from '../components/AccountList'
import Account        from '../components/Account';

class AccountScreen extends React.Component {

  static navigationOptions = {
    title: 'Account',
  };

  constructor(props){
    super(props);
    this.state = {
      text: 'Hello World',
    }
  }


  render() {
    console.log('accountProps', this.props);
    return (
      <View style={styles.container}>
        <Text>
          Current User: {this.props.user.email}
        </Text>
        <Text>
          Current ID: {this.props.user._id}
        </Text>
        <AccountList></AccountList>
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    user: state.user.user[state.user.user.length -1]
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

export default connect(
  mapStateToProps
)(AccountScreen);
