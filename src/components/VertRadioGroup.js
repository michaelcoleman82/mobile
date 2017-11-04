import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {CheckBox} from '.'
const {layout:{row}, typography:{p}}= require('../styles')




export default ({
    options,
    getChoice,
    choice,
    style,
    tones,
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

  const pauseRestAndPlay = name => tones.map(
    t =>  t._filename===name ? t.play(): t.pause()
  )


  const playTone = tone =>{
    // console.log(tone)
    switch (tone) {
      case 'Morning Song':
        pauseRestAndPlay('morning');
        break;
      case 'Beep Beep':
        pauseRestAndPlay('beep');
        break;
      case 'Chimes':
        pauseRestAndPlay('chimes');
        break;
      case 'Sunshine':
        pauseRestAndPlay('sunshine');
        break;
      case 'Ring Tone':
        pauseRestAndPlay('ring');
        break;
      case 'Rap Beat':
        pauseRestAndPlay('beat');
        break;
      default: console.log('no dice')
    }


  }

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
      <Text style={p}>{o}</Text>
    </TouchableOpacity>  )}
  </View>
}
