import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
const {layout:{row}, palette:{navy}, typography:{p}}= require('../styles')



export default ({style, options, getChoice, choice})=>{
  const s = StyleSheet.create({
        container:{
          ...row,
          borderWidth:1,
          borderColor: 'white',
          borderRadius: 5,
          justifyContent:'space-around',
        },
        text:{
          fontFamily: 'Montserrat-Light',
        },
        button:{
          flex:1,
          alignItems:'center',
        }
  })
// choice.indexOf(o)!=-1
// console.log(choice, '--choice')

  return <View style={[style, s.container]}>
        {options.map( (o,i)=>
          <TouchableOpacity
            style={[s.button, {backgroundColor:  choice.indexOf(o)!=-1 ? 'white' : 'transparent' }]}
            key={i} onPress={() =>getChoice(o)}
          >
            <Text style={[p, {color: choice.indexOf(o)!=-1 ? navy : 'white' } ]}>{o}</Text>
          </TouchableOpacity>
         )}
      </View>
}
