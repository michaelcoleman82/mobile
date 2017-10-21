import React, {Component} from 'react'
import {View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import Svg, { Path } from "react-native-svg"
import { NativeRouter, Switch, Route, Link } from 'react-router-native'
import {Schedule, Home} from './routes'
import {brand as ds} from './path-descriptions'
import {BackButton} from './components'
const {palette:{navy,blue, sunshine}, layout:{row}} = require('./styles')



const Brand = ({width, height, style, connected}) => {
  return <Link component={TouchableOpacity} style={style} to='/'>
    <Svg width={width || 140} height={height || 32} viewBox="0 0 140 32">
      {ds.map( (d, i) =>
         <Path  key={i} fill={connected ? sunshine: 'white'} {...d} />
       )}
    </Svg>
  </Link>

}

const AppBar = (props)=>{
  const s = StyleSheet.create({
    container:{
      flex:1,
      ...row,
    },
    text:{
      color:'white',
      fontWeight:'100',
      marginLeft: 10,
      marginTop:-2.5,
    },
  })
  return <View style={s.container}>
    <BackButton to='/' />
  </View>
}


const Layout = ({children, connected, location:{pathname}})=>{
  const s = StyleSheet.create({
    brand:{
      alignSelf:'center',
    },
  })
  return <View>
    <View style={{height:50}}>
      {pathname =='/' && <AppBar/>}
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
            <Route exact path='/' component={Schedule}/>
            {/* <Route  path='/schedule' component={Schedule}/> */}
          </Layout>
        </Switch>

    </NativeRouter>
    </LinearGradient>

}
