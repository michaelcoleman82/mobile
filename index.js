import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native'
import App from './src/App'
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
      cb(null, true)
      client.subscribe('sheet_state')
    })
    client.on('message', (_, message)=> cb(String.fromCharCode(...message)) )
    client.on('error', err => console.error(err))
  })




export default class EBWU extends Component {

  constructor() {
    super()
    subscribe(
      (sheetState, connected) => this.setState({sheetState, connected})
    )
  }


  state = {
    sheetState:'',
    connected:false,
    time:'',

  }

  componentDidMount = async () =>{
    this.setState({
      time: await AsyncStorage.getItem('time') || this.state.time,

    })
  }

  saveTime = async (key, value)=> {
      this.setState({[key]:value})
      await AsyncStorage.setItem(
        key,
        typeof(value)==='string'
          ? value
          : JSON.stringify(value)
      )
  }

  render() {
    const {sheetState, connected, time} = this.state
    return <App saveTime={this.saveTime} {...{connected, sheetState, time}}/>
  }
}


AppRegistry.registerComponent('EBWU', () => EBWU)
