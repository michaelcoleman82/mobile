import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { Link, withRouter } from 'react-router-native'
import Svg, { Path, Circle } from "react-native-svg"
import Icon from 'react-native-vector-icons/FontAwesome'
import {Text, BackButton} from '../components'
import {brand as ds} from '../path-descriptions'
const {palette:{navy,blue, sunshine}, layout:{row}} = require('../styles')

const Brand = ({width, height, style, connected}) => {
  return <Link component={TouchableOpacity} style={style} to='/'>
    <Svg width={width || 140} height={height || 32} viewBox="0 0 140 32">
      {ds.map( (d, i) =>
        <Path  key={i} fill={connected ? sunshine: 'white'} {...d} />
      )}
    </Svg>
  </Link>
}

const SettingsButton = withRouter( ({history:{push}})=>{
  const s = StyleSheet.create({
    container:{
      alignItems:'flex-end',
      // flex:1,
      paddingVertical:4,
      width:60,
    }
  })
  return <TouchableOpacity onPress={()=>push('/user-settings')}  style={s.container}>
    {[...Array(3)].map( (_,i) => <Svg  key={i} width={8} height={8}>
      <Circle cx={4} cy={4} r={2}  fill='white'/>
    </Svg>
    )}
  </TouchableOpacity>
})


const BarButton = withRouter( ({label, history:{goBack}})=>{
  const s = StyleSheet.create({})
  return <TouchableOpacity onPress={()=> goBack()}>
    <Text>{label}</Text>
  </TouchableOpacity>
})


export default({pathname, connected})=>{
  const s = StyleSheet.create({
    text:{
      color:'white',
      fontWeight:'100',
      marginLeft: 10,
      marginTop:-2.5,
    },
    appBar:{
      height:50,
      // flex:1,
      ...row,
      justifyContent:'space-between',
    },
    brand:{
      alignSelf:'center',
    }
  })

  return <View >
    <View style={s.appBar}>
      { pathname==='/'
      ? <View/>
      : pathname==='/user-settings'
      ? <BarButton label='Cancel' />
      : <BackButton to='/'   />
    }
    {pathname==='/user-settings'
    ? <BarButton label='Save' />
    : <SettingsButton />
  }
    </View>
    <Brand style={s.brand} connected={connected} />
  </View>
}
