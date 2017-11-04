import React, {Component} from 'react'
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native'
import { TextInput, User, Bed} from '../components'
const {palette:{navy}} = require('../styles')

const Button = ({label, style, sheetState})=>{
  const s = StyleSheet.create({
    container:{
      borderRadius:3,
      borderWidth:2,
      borderColor:'white',
      paddingVertical: 5,
      alignItems:'center',
      backgroundColor:'white',
      width:100,
    },
    text:{
      color: navy,
      fontFamily:'Montserrat-Light'
    }
  })
  return  <TouchableHighlight
    style={[s.container, style]}
    underlayColor='rgba(255,255,255,0.5)'
    onPress={()=>console.log('updated')}
  >
    <Text style={s.text}>{label}</Text>
  </TouchableHighlight>
}


export default ({sheetState, connected})=>{

  const s = StyleSheet.create({
    container:{
      marginTop:'15%',
      flex:1,
    },
    input:{
      marginTop:'5%',
    },
    button:{
      marginTop:'5%',
      alignSelf:'center',
    }
  })

  return <View style={s.container}>
    <View>
      <User ebwuOn style={{alignSelf:'center'}}/>
      <TextInput style={s.input} placeholder='Name' />
      <TextInput style={s.input} placeholder='Email'/>
      <Button style={s.button}  label='Update'/>
    </View>
    <View style={{alignSelf:'center', marginTop:'10%'}}>
      <Bed  size={180} {...{sheetState, connected}}  mode='none' side='none'/>
    </View>
  </View>
}
