import React, { Component } from 'react'
import {AsyncStorage} from 'react-native'
import Layout from './Layout'
import Sound from 'react-native-sound'
const {AWSIoTData:{device}} = require('../aws-iot-device-sdk-js-react-native')
Sound.setCategory('Playback')


console.ignoredYellowBox = ['Setting a timer']

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
      client.subscribe('sheet_state') //change to mvp
    })
    client.on('message', (_, message)=> cb(String.fromCharCode(...message)) )
    client.on('error', err => console.error(err))
  })




export default class extends Component {

  constructor() {
    super()
    subscribe(
      (sheetState, connected) => sheetState
        ? this.setState({sheetState})
        : connected
          ? this.setState({connected})
          : null

    )
  }


  state={
    sheetState:null,
    connected:false,
    toneMap:{
      'Sunshine': new Sound('sunshine.mp3', Sound.MAIN_BUNDLE),
      'Beep Beep': new Sound('beep.mp3', Sound.MAIN_BUNDLE),
      'Morning Song': new Sound('morning.mp3', Sound.MAIN_BUNDLE),
      'Ring Tone': new Sound('ring.mp3', Sound.MAIN_BUNDLE),
      'Chimes': new Sound('chimes.mp3', Sound.MAIN_BUNDLE),
      'Rap Beat': new Sound('beat.mp3', Sound.MAIN_BUNDLE),
    },
    time:'--:--',
    side:'A',
    mode:'single',
    daysOfWeek:[],
    volume:.5,
    tone:'Sunshine',
  }



  componentWillMount = async () =>this.setState({
    daysOfWeek: JSON.parse(await AsyncStorage.getItem('daysOfWeek'))  || this.state.daysOfWeek,
    side: await AsyncStorage.getItem('side') || this.state.side,
    mode: await AsyncStorage.getItem('mode') || this.state.mode,
    volume: await AsyncStorage.getItem('volume') || this.state.volume,
    tone: await AsyncStorage.getItem('tone') || this.state.tone,
    time: await AsyncStorage.getItem('time') || this.state.time,
  })


  save = async (key, value)=> {
      this.setState({[key]:value})
      await AsyncStorage.setItem(
        key,
        typeof(value)==='string'
          ? value
          : JSON.stringify(value)
      )
  }


  getAllChoices = name => choice =>
    this.state[name].indexOf(choice)==-1
      ? this.save(name, [...this.state[name], choice])
      : this.save(name, this.state[name].filter( c=> c!=choice ) )


  getOneChoice = name => choice =>
    this.save(name,  choice==this.state[name] ?  this.state[name] :  choice )


  render() {
    return <Layout {...{
      save:this.save,
      getAllChoices: this.getAllChoices,
      getOneChoice:this.getOneChoice,
      ...this.state
    }} />
  }
}
