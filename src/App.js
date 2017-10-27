import React, {Component} from 'react'
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Svg, { Path, Circle } from "react-native-svg"
import { NativeRouter, Switch, Route, Link, withRouter } from 'react-router-native'
import {BedSettings, Home, AlarmSettings, UserSettings} from './routes'
import {brand as ds} from './path-descriptions'
import {BackButton, Text} from './components'
const {palette:{navy,blue, sunshine}, layout:{row}} = require('./styles')



const Brand = ({width, height, style, connected}) => {
  return <Link component={TouchableOpacity} style={style} to='/'>
  {console.log(connected, '---connected')}
    <Svg width={width || 140} height={height || 32} viewBox="0 0 140 32">
      {ds.map( (d, i) =>
         <Path  key={i} fill={connected ? sunshine: 'white'} {...d} />
       )}
    </Svg>
  </Link>

}


const SettingsButton = withRouter( ({history:{push}})=>{
  const s = StyleSheet.create({})
  return <TouchableOpacity onPress={()=>push('/user-settings')}  style={{marginLeft:20}}>
    {[...Array(3)].map( (_,i) => <Svg  key={i} width={6} height={6}>
      <Circle cx={3} cy={3} r={1.5}  fill='white'/>
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

const AppBar = ({pathname})=>{
  const s = StyleSheet.create({
    container:{
      flex:1,
      ...row,
      justifyContent:'space-between',
    },
    text:{
      color:'white',
      fontWeight:'100',
      marginLeft: 10,
      marginTop:-2.5,
    },
  })
  return <View style={s.container}>
    { pathname==='/'
      ? <View/>
      : pathname==='/user-settings'
        ?  <BarButton label='Cancel' />
        : <BackButton to='/'   />
    }
    {pathname==='/user-settings' ? <BarButton label='Save' />   :  <SettingsButton />}
  </View>
}


const Layout = ({children, connected, location:{pathname}})=>{
  const s = StyleSheet.create({
    brand:{
      alignSelf:'center',
    },
  })
  return <View style={{flex:1}}>
    <View style={{height:50}}>
      <AppBar {...{pathname}}/>
    </View>
    <Brand  {...{connected, style:s.brand}} />
    {children}
  </View>
}


export default ({sheetState, connected})=>{
  const s = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 30,
      paddingRight: 30,
    }
  });

  const colors = [navy, '#666D89', blue, '#FFECCE']
  const locations = [0, .47, .65, 1]

  return <LinearGradient
      {...{colors, locations}}
      style={s.container}
    >
    <StatusBar backgroundColor={navy}/>
    <NativeRouter>

        <Switch>
          <Layout connected={connected} >
            <Route exact path='/' component={Home}/>
            <Route  path='/bed-settings' component={BedSettings}/>
            <Route  path='/user-settings' component={UserSettings}/>
          </Layout>
        </Switch>

    </NativeRouter>
    </LinearGradient>

}
