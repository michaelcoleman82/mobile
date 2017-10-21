import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
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


  state = {sheetState:'', connected:false}

  render() {
    const {sheetState, connected} = this.state
    return <App {...{connected, sheetState}}/>
  }
}


AppRegistry.registerComponent('EBWU', () => EBWU)
