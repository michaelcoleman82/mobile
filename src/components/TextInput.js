import React, {Component} from 'react'
import {View, StyleSheet, TextInput} from 'react-native'

export default class extends Component{
  state={focus:false}
  style=StyleSheet.create({
    text:{
      fontFamily:'Montserrat-Light',
      color:'white'
    }
  })
  render (){
    const {focus} = this.state
    const {text} = this.style
    const {style, ...props} = this.props
    return <View  {...{style}} >
      <TextInput
        {...props}
        onFocus={()=>this.setState({focus:true})}
        onBlur={()=>this.setState({focus:false})}
        underlineColorAndroid={focus ? 'white': 'rgba(255,255,255,.5)'}
        placeholderTextColor='rgba(255,255,255,.5)'
        style={text}
        selectionColor='white'
      />
    </View>
  }
}
