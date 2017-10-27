import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'
import Svg, {Path, Defs, Use, G} from 'react-native-svg'
import {Text, Bed, AlarmCard, User} from '../components'
import d from '../path-descriptions/bed-settings.json'
const {layout:{row}} = require('../styles')



export default class extends Component{
  state={
    ebwuOn:true,
    side:'A',
    mode:'single',
    daysOfWeek:[],
    time:'-- : --',
    volume:0,
    tone:'--'
  }

  componentWillMount = async () => {
  this.setState({
    daysOfWeek: JSON.parse(await AsyncStorage.getItem('daysOfWeek'))  || this.state.daysOfWeek,
    side: await AsyncStorage.getItem('side') || this.state.side,
    mode: await AsyncStorage.getItem('mode') || this.state.mode,
    time: await AsyncStorage.getItem('time') || this.state.time,
    volume: await AsyncStorage.getItem('volume') || this.state.volume,
    tone: await AsyncStorage.getItem('tone') || this.state.tone,
  })
}

  style = StyleSheet.create({
    container:{
      marginTop:30,
      flex:1
    },
    bed:{
      marginTop:15,
      alignSelf:'center',
    },
    card:{
      height:215,
      marginTop:30
    }
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

    userConfig = () =>{
      const {mode, ebwuOn, side} = this.state
      return {
        onPress: ()=> this.save('mode',  mode==='single' ?  'dual' :  'single' ),
        disabled: !ebwuOn,
        style:{margin:8},
        ebwuOn,
      }
    }

  swapSides=()=> {
    const {side} =this.state
    this.save('side', side==='A' ?'B': 'A' )
  }

  alarmConfig = () =>{
    const {daysOfWeek,time, tone, volume} = this.state
    return {
      mainMenu:{
        time, tone, volume,
        choice: daysOfWeek,
        getDaysofWeek: this.getAllChoices('daysOfWeek'),
        getVolume: this.getOneChoice('volume'),
        options: ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
      },
      timePicker:{
        choice: time,
        getChoice: this.getOneChoice('time'),
      },
      tonePicker:{
        choice: tone,
        getChoice: this.getOneChoice('tone'),
        options : ['Morning Flower', 'Beep Beep','Chimes','Basic Tone','Sunshine', 'Rap Music']
      }

    }
  }

  render (){
    const { container, bed, card} = this.style
    const {mode,ebwuOn,side} = this.state
    const { history:{push}} = this.props
    return <View style={container}>
      <View  style={{alignSelf:'center'}} >
        {mode =='single'
          ? <User {...this.userConfig()} />
          : <View  style={row}>
              <User {...this.userConfig()} />
              <User {...this.userConfig()} />
            </View>
        }
      </View>
      <Bed  style={bed}  swapSides={this.swapSides} {...{ebwuOn, mode,side}}/>
      <AlarmCard style={card}  {...this.alarmConfig()}/>
    </View>
  }
}
