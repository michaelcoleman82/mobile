import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Slider} from 'react-native'
import {Bed, BackButton, VertRadioGroup} from '.'
const {layout:{row}, typography:{p}} = require('../styles')


const MainMenu=({changeView, selections:{time, volume,tone}})=> {
  const s = StyleSheet.create({
    label:{
      paddingVertical:17,
      paddingHorizontal: 16,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    slider:{
      marginTop:5,
      marginLeft:25,
      width: 200
    },
    bottomBorder:{
      borderBottomWidth: 1,
      borderColor:'white',
    }
  })

  return <View >
        <TouchableOpacity  style={[s.label, s.bottomBorder]}>
          <Text style={p}>Alarm Time</Text>
          <Text style={p}>{time}</Text>
        </TouchableOpacity>
        <View style={[s.label, s.bottomBorder]} >
          <Text style={p}>Alarm Volume</Text>
          <Slider
            style={s.slider}
            thumbTintColor='white'
            maximumTrackTintColor='white'
          />
        </View>
      <TouchableOpacity style={s.label} onPress={()=> changeView(1)}>
        <Text style={p}>Alarm Tone</Text>
        <Text style={p}>{tone}</Text>
      </TouchableOpacity>
    </View>
}





const TonePicker = ({changeView, ...props})=>{
  const s = StyleSheet.create({
    container:{
      margin:15,
      flex:1,
    },
    scroll:{
      marginTop:10,
      marginHorizontal:12,
    }
  })


  return <View style={s.container}>
    <BackButton onPress={()=>changeView(0)}/>
    <ScrollView style={s.scroll}>
      <VertRadioGroup {...props}   />
    </ScrollView>
  </View>
}


export default class extends Component{
  state={viewIndex:0}
  style=StyleSheet.create({
    container:{
      borderTopWidth:0,
      height: 175,
      width:'100%',
      marginTop: 15,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',

    },
    topBorder:{
      backgroundColor:'white',
      height: 6,
      borderTopLeftRadius:6,
      borderTopRightRadius:6,
      elevation: 2,
    },
  })

  changeView = viewIndex  => this.setState({viewIndex})

  views= () =>{
    const {tonePicker,  timePicker, mainMenu} = this.props
    return [
      <MainMenu  {...mainMenu}  changeView={this.changeView} />,
      <TonePicker  {...tonePicker} changeView={this.changeView} />
    ]
  }


  render (){
    const {container, topBorder} = this.style
    const {viewIndex} = this.state
    return <View style={container}>
      <View  style={topBorder} />
      {this.views()[viewIndex]}
    </View>
  }
}
