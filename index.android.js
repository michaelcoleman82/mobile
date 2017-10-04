/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';




export default class EBWU extends Component {
  render() {

    const ws = new WebSocket("ws://echo.websocket.org/")
    ws.onopen = () => {
      console.log('connected')
      ws.send("WebSocket rocks")
    }
    ws.onmessage = evt => console.log(evt.data)


    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to EBWU!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

AppRegistry.registerComponent('EBWU', () => EBWU)
