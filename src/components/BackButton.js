import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {withRouter} from 'react-router-native'
const {typography:{p}, layout:{row}} = require('../styles')

export default withRouter(
  ({history:{push}, onPress, to})=>{
    const s = StyleSheet.create({
      text:{
        ...p,
        marginLeft:10,
      }
    })
    return <TouchableOpacity style={row}  onPress={()=> onPress() || push(to)} >
      <Icon name='chevron-left' size={11} color='white' />
      <Text style={s.text} >Back</Text>
    </TouchableOpacity>
})
