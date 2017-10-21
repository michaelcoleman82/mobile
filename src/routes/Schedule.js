import React, {Component} from 'react'
import {View, StyleSheet, Text, AsyncStorage} from 'react-native'
import {Bed, RadioGroup, AlarmSettings} from '../components'
const {layout:{row}}= require('../styles')

export default class extends Component{

  state={daysOfWeek:['S'], mode:'', side:'', time:'6:00AM', volume:'', tone:''}


  style = StyleSheet.create({
    container:{
      marginTop:25,
      alignItems:'center',
    },
    radio:{
      margin:10
    }
  })


  componentDidMount = async () => {


  this.setState({
    daysOfWeek: JSON.parse(await AsyncStorage.getItem('daysOfWeek'))  || this.state.daysOfWeek,
    mode: await AsyncStorage.getItem('mode') || this.state.mode,
    side: await AsyncStorage.getItem('side') || this.state.side,
    time: await AsyncStorage.getItem('time') || this.state.time,
    volume: await AsyncStorage.getItem('volume') || this.state.volume,
    tone: await AsyncStorage.getItem('tone') || this.state.tone,
  })
}


  getAllChoices = name => choice =>
    this.state[name].indexOf(choice)==-1
      ? this.save(name, [...this.state[name], choice])
      : this.save(name, this.state[name].filter( c=> c!=choice ) )


  getOneChoice = name => choice =>
    this.save(name,  choice==this.state[name] ?  '' :  choice )


  save = async (key, value)=> {
      this.setState({[key]:value})
      await AsyncStorage.setItem(
        key,
        typeof(value)==='string'
          ? value
          : JSON.stringify(value)
      )
  }

  radioConfig = () =>{

    const {daysOfWeek, mode, side} = this.state
    const {radio} = this.style

    return [
      {
        choice: daysOfWeek,
        getChoice: this.getAllChoices('daysOfWeek'),
        options: ['S', 'M', 'T', 'W', 'Th', 'Sa'],
        style: radio
      },
      {
        choice: mode,
        getChoice: this.getOneChoice('mode'),
        options: ['1 Person', '2 Person'],
        style:[radio,{width: '75%'}],
      },
      {
        choice: side,
        getChoice: this.getOneChoice('side'),
        options: ['Side A', 'Side B'],
        style:[radio,{width: '75%'}],
        dontRender: mode !=='2 Person',
      },

    ]
  }

  settingsConfig = () =>{
    const {tone, volume, time} = this.state
    return {
      mainMenu:{
        view:'MainMenu',
        selections: {time, volume, tone},
        getChoice: this.getOneChoice('volume'),
      },
      timePicker:{
        choice: tone,
        getChoice: this.getOneChoice('time'),
      },
      tonePicker:{
        choice: tone,
        getChoice: this.getOneChoice('tone'),
        options : ['Morning Flower', 'Beep Beep','Chimes','Basic Tone']
      }

    }
  }


  render (){
    const {time, volume, tone} = this.state
    const {container} = this.style
    return <View style={container}>
      { this.radioConfig().map ( ({dontRender,...d},i)=>
        !dontRender &&  <RadioGroup  key={i} {...d} />)
      }
      <AlarmSettings {...this.settingsConfig()} />
    </View>
  }
}
