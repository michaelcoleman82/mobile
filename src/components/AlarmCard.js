import React, {Component} from 'react'
import {View, StyleSheet, Slider, TouchableOpacity,ScrollView  } from 'react-native'
import Svg, {Circle, Polyline, Path, G} from 'react-native-svg'
import {Text, BackButton, VertRadioGroup} from '.'
import Icon from 'react-native-vector-icons/FontAwesome'
import {note} from '../path-descriptions'
import Sound from 'react-native-sound'

const {layout:{row}, palette:{blue, navy}} = require('../styles')

Sound.setCategory('Playback')



const ClockIndicator = props => <Svg {...props} >
  <G stroke='white' fill='none' strokeWidth={2}>
    <Circle cy={46} cx={46} r={45} />
    <Polyline
      points={[46, 15, 46, 46, 15, 46,]}
      fill='none'
      stroke= 'white'
      strokeWidth={2}
      strokeLinecap="round"
    />
  </G>
</Svg>



const MainMenu = ({time, tone, volume, options,choice, getDaysofWeek, changeView, getVolume}) =>{

  const s = StyleSheet.create({
    container:{
      alignItems:'center',
    },
    alarm:{
      ...row,
      width:'100%',
      justifyContent:'space-around',
    },
    right:{
      alignItems:'flex-end',
    },
    time:{
      fontFamily:'Montserrat-Regular',
      fontSize:24,
    },
    tone:{
      marginLeft:15,
      fontFamily:'Montserrat-Regular',
    },
    slideContainer:{
      ...row,
      marginTop:15,
    },
    slider:{
      width:116,
    },
    day:{
      margin:8,
      height:22,
      width:22,
      borderRadius: 11,
      alignItems:'center',
      justifyContent:'center',
    },
    text:{
      marginTop:1,
      color:'white',
      fontSize:11,
      fontFamily:'Montserrat-Regular',
    },
    week:{
      ...row,
      margin:10,
    },
    icon:{
      marginLeft:-5,
      color:'white',
      fontSize:20
    }
  })

  return <View style={s.container} >
      <View style={s.week}>
        {options.map( (day,i) =>
          <TouchableOpacity key={i}
            onPress={()=> getDaysofWeek(day)}
            style={[s.day,{backgroundColor:  choice.indexOf(day)!=-1 ? 'white' : 'transparent'}]}
          >
            <Text style={[s.text,{  color: choice.indexOf(day)!=-1 ? blue : 'white'}]}>
              {day}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={s.alarm}>

        <ClockIndicator  width={92} height={92}/>

        <View style={s.right}>

          <TouchableOpacity onPress={()=> changeView(1)} >
            <Text style={s.time}>{time || '--:--'}</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=> changeView(2)} style={[row, {marginTop:10}]}>
            <Svg width={20} height={20}>
              <Path d={note.d} fill='white' />
            </Svg>
            <Text style={s.tone} >{tone}</Text>
          </TouchableOpacity>

          <View style={s.slideContainer}>
            <Icon name='volume-off' color='white' size={20} />
            <Slider
              style={s.slider}
              thumbTintColor='white'
              maximumTrackTintColor='white'
              onSlidingComplete={ v => getVolume(v)}
              value={+volume}
            />
            <Icon name='volume-up' style={s.icon}  />
          </View>

        </View>
      </View>
    </View>
}



class TimePicker extends Component{
  state={offset:0, mins:0, hours:0, meridiem:0}


  style=StyleSheet.create({
    container:{
      flexDirection:'row',
    },
    back:{
      margin:15,
    },
    text:{
      fontFamily:'Montserrat-Regular',
      fontSize:30,
      opacity:0.5
    },
    time:{
      flexDirection:'row',
      width:180,
      marginLeft:40,
      height:180,
    }
  })

  handleScroll=  (time, key) => ({nativeEvent:{contentOffset:{y}}}) =>{


    const {offset}= this.state
    const height = 45.7
    this.setState({offset: y})
    if (  y > offset){
      if( y <Math.round(y/height)*height   ){
        //  time.scrollTo({y: Math.round(y/height)*height })
         this.setState({[key]:  Math.round(y/height)})
       }

    } else{
      if( y >  Math.round(y/height)*height-height && y< Math.round(y/height)*height   ){
        // time.scrollTo({y:Math.round(y/height)*height-height })
        this.setState({[key]:  Math.round(y/height)-1 })
      }
    }

  }

  handleBackPress = async () =>{
    const {getChoice, changeView} = this.props
    const {hours, mins, meridiem} = this.state
    getChoice(`${hours+1}:${mins < 10 ? '0'+mins :mins} ${meridiem ? 'PM': 'AM'}`)
    changeView(0)
  }



  render (){
    const {_hours, _mins, _meridiem} = this.refs
    const {container, back, text, time} = this.style
    const {hours, mins, meridiem} = this.state
    return <View style={container} >
      <BackButton style={back} onPress={this.handleBackPress} />

      <View style={time}>
        <ScrollView onScroll={this.handleScroll(_hours,'hours')} ref='_hours'>
          <View style={{height:60, width:70}}   />
          {[...Array(12)].map( (_,i) =>
            <Text key={i}
              style={[text,
                {textAlign:'right'},
                i===hours && {opacity:1}
              ]}
            >
              {i+1}
            </Text> )}
          <View style={{height:75}}   />
        </ScrollView>
        <View >
          <View style={{height:58}}   />
          <Text style={text}> : </Text>
        </View>
        <ScrollView  onScroll={this.handleScroll(_mins, 'mins')} ref='_mins'>
          <View style={{height:60, width:60}}   />
          {[...Array(60)].map(  (_,i) =>
             <Text  key={i}
               style={[text,
                 i===mins && {opacity:1}
               ]}
             >
               {i < 10 ? '0'+i :i }
             </Text>)}
         <View style={{height:75}}   />
        </ScrollView>
        <ScrollView  onScroll={this.handleScroll(_meridiem, 'meridiem')} ref='_meridiem' >
          <View style={{height:60}}   />
          {['AM', 'PM'].map( (t, i) =>
            <Text key={i}
              style={[
                text,
                {width:70},
                i===meridiem && {opacity:1}
              ]}
            >
              {t}
            </Text>  )}
           <View style={{height:73}}   />
        </ScrollView>
      </View>
    </View>
  }
}


const TonePicker = ({changeView, toneMap, ...props})=>{
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

  const handleBackPress = ()=>{

    Object.keys(toneMap).map( key =>  toneMap[key].pause() )
    // tones.map( t=> t.pause()  )
    changeView(0)
  }

  return <View style={s.container}>
    <BackButton onPress={handleBackPress}/>
    <View style={{height:120}}>

      <ScrollView style={s.scroll}>

        <VertRadioGroup style={{alignSelf:'center'}}    {...{toneMap,...props}}   />
      </ScrollView>
    </View>
  </View>
}


export default class extends Component{
  state={
    viewIndex:0
  }

  style = StyleSheet.create({
    container:{
      marginVertical:7.5,
      flex:1,
    },
    background:{
      height:180,
      backgroundColor:'#1C1E22',
      opacity:0.2,
    },
    content:{
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
    },
  })



  changeView = viewIndex  => this.setState({viewIndex})

  views =()=>{
    const {mainMenu, timePicker, tonePicker} = this.props
    const {tones} = this.state


    return [
      <MainMenu  {...mainMenu} changeView={this.changeView}/>,
      <TimePicker  {...timePicker} changeView={this.changeView}/>,
      <TonePicker   {...tonePicker} changeView={this.changeView}/>,
    ]
  }

  render(){
    const {container, background, content} = this.style
    const {style} = this.props
    const {viewIndex} = this.state
    return <View  style={[container, style]}>
      <View style={background}/>
      <View style={content}>
        {this.views()[viewIndex]}
      </View>
    </View>
  }
}
