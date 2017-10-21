import React, {Component} from 'react'
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class extends Component{
  state={checked:false}
  style=StyleSheet.create({
    container:{
      borderColor:'white',
      borderWidth:1,
      width:15,
      height:15,
      borderRadius:3,
    }
  })

  handlePress = ()=>{
    const {checked} = this.state
    this.setState({checked:!checked})
    this.props.getState(checked)
  }
  render (){
    // const {} = this.props
    const {checked} = this.state
    const {container} = this.style
    const {getState} = this.props
    return <TouchableOpacity
      activeOpacity={1}
      onPress={this.handlePress}
      style={container}
    >
        { checked && <Icon name='check'  color='white'/>}
    </TouchableOpacity>
  }
}
