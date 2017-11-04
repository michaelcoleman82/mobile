import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {CheckBox, Text} from '.'
const {layout:{row}}= require('../styles')




export default ({
    options,
    getChoice,
    choice,
    style,
    toneMap,
    volume,
  })=>{

  const s = StyleSheet.create({
    container:{
      paddingVertical:3,
      ...row
    },
    circle:{
      borderRadius: 8,
      borderColor: 'white',
      borderWidth: 1,
      height: 16,
      width:16,
      alignItems:'center',
      justifyContent:'center',
      marginRight: 12,
    },
    innerCircle:{
      borderRadius: 5,
      backgroundColor: 'white',
      height: 10,
      width:10,
    }
  })


  const playTone = tone => 
    Object.keys(toneMap).map( key =>
      key===tone  ? toneMap[key].play()  : toneMap[key].setCurrentTime(0).pause()
  )



  return <View style={style}>
    {options.map( (o,i)=> <TouchableOpacity
      onPress={()=>{
        getChoice(o)
        playTone(o)
      }}
      style={s.container}
      key={i}
    >
      <View style={s.circle} >
        { choice.indexOf(o)!=-1 && <View style={s.innerCircle} /> }
      </View>
      <Text >{o}</Text>
    </TouchableOpacity>  )}
  </View>
}
