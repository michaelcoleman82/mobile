import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'
import Svg, {Path, Defs, Use, G} from 'react-native-svg'
import {Text, Bed, AlarmCard, User} from '../components'
import d from '../path-descriptions/bed-settings.json'
const {layout:{row}} = require('../styles')



export default p =>{
  const s = StyleSheet.create({
    container:{
      marginTop:'10%',
      flex:1,
    },
    bed:{
      marginTop:'8%',
      alignSelf:'center',
    },
    card:{
      // height:220,
      marginTop:'12%',
    }
  })

  const userConfig = () =>{
    const {mode, ebwuOn, side, save} = p
    return {
      onPress: ()=> save('mode',  mode==='single' ?  'dual' :  'single' ),
      disabled: !ebwuOn,
      style:{margin:8},
      ebwuOn,
    }
  }


  const swapSides=()=> {
    const {side, save} = p
    save('side', side==='A' ?'B': 'A' )
  }


  const alarmConfig = () =>{
    const {daysOfWeek,time, tone, volume, toneMap, getAllChoices, getOneChoice} = p
    return {
      mainMenu:{
        time, tone, volume,
        choice: daysOfWeek,
        getDaysofWeek: getAllChoices('daysOfWeek'),
        getVolume: getOneChoice('volume'),
        options: ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
      },
      timePicker:{
        choice: time,
        getChoice: getOneChoice('time'),
      },
      tonePicker:{
        choice: tone,
        getChoice: getOneChoice('tone'),
        options : Object.keys(toneMap)
      }
    }
  }
  return <View style={s.container}>
    <View  style={{alignSelf:'center'}}  >
      {p.mode =='single'
        ? <User {...userConfig()} />
        : <View  style={row}>
            <User {...userConfig()} />
            <User {...userConfig()} />
          </View>
      }
    </View>
    <Bed  size={180} style={s.bed}  swapSides={swapSides} mode={p.mode} side={p.side}  alarmSet={p.alarmSet} ebwuOn={p.ebwuOn}/>

    <AlarmCard style={s.card}  {...alarmConfig()}/>
  </View>
}
