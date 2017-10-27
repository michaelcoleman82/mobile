import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {withRouter} from 'react-router-native'
import Svg, { Path } from "react-native-svg"
import ds from '../path-descriptions/arrow.json'



export default  withRouter( ({history:{push}, onPress, style, to}) =>
  <TouchableOpacity style={style} onPress={()=>  to ?  push(to):  onPress()} >
    <Svg width={20} height={14}>
      {ds.map( (d,i)=><Path  key={i}  fill='white' {...d}/> )}
    </Svg>
  </TouchableOpacity>
)
