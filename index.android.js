import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
const {AWSIoTData:{device}} = require('./aws-iot-device-sdk-js-react-native')


const subscribe =  cb =>
  fetch('https://1x9x7zmvd6.execute-api.us-east-1.amazonaws.com/dev/get-keys')
  .then( res =>  res.ok ?  res.json() : Promise.reject('no dice'))
  .then( keys =>{
    const client = device({
      clientId: 'app',
      protocol:'wss',
      ...keys
    })
    client.on('connect', ()=> {
      console.log('connected')
      client.subscribe('sheet_state')
    })
    client.on('message', (_, message)=> cb(String.fromCharCode(...message)) )
    client.on('error', err => console.error(err))
  })


export default class EBWU extends Component {

  constructor() {
    super()
    subscribe( sheetState => this.setState({sheetState}))
  }


  state = {sheetState:''}


  render() {

    const {sheetState} = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to EBWU!
        </Text>
        <Text style={styles.instructions}>
          Sheet State:
        </Text>
        <Text style={[styles.instructions, {fontSize: 32}]}>
          {sheetState}
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
