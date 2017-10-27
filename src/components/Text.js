import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'

export default ({children, style})=>{
  const s = StyleSheet.create({
    text:{
      color:'white',
      fontFamily:'Montserrat-Light',
      fontSize:16,
    }
  })
  return <Text style={[s.text, style]}>{children}</Text>
}
