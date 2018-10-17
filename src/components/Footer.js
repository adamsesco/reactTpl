import React, { Component } from 'react';
import { View, Text } from 'react-native';

class FooterTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ position: 'relative', bottom: 0, height:60, backgroundColor: '#302A77', flex: 1}}>
        <Text> Footer </Text>
      </View>
    );
  }
}

export default FooterTpl;
