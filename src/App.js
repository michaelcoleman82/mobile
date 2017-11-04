import React, {Component} from 'react'
import {View, StatusBar, StyleSheet, TouchableHighlight, AsyncStorage} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NativeRouter, Switch, Route } from 'react-router-native'
import {BedSettings, Home, UserSettings} from './routes'
import {Text, BackButton, Header} from './components'
import Svg, {Path} from 'react-native-svg'
import {bell} from './path-descriptions'
import moment from 'moment'
import Sound from 'react-native-sound'
Sound.setCategory('Playback')


const {palette:{navy,blue, sunshine}, layout:{row}} = require('./styles')


class ModalContent extends  Component{
  state={interval:{}, flashing:false}

  flash = () =>{
    const {flashing} = this.state
    this.setState({flashing: !flashing})
  }

  componentDidMount = () => this.setState({interval: setInterval(this.flash, 1000)})

  componentWillUnmount = () => clearInterval(this.state.interval)

  style=StyleSheet.create({
    container:{
      borderRadius:8,
      borderWidth:3,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      marginTop:-30,
      width:250,
      height:150,
      elevation:10,
    }
  })

  render (){
    const {container} = this.style
    const {flashing} = this.state
    return <View style={container}>
      <Svg fill="none" height={50}  width={50} viewBox='0 0 24 24' >
        <Path
          fill='none'
          stroke={flashing ? sunshine : blue}
          strokeLinecap="round"
          strokeWidth="2"
          d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"
        />
      </Svg>
    </View>
  }
}




const Modal = ({closeModal, children}) => {

  const s = StyleSheet.create({
    container:{
      backgroundColor:'rgba(0,0,0, 0.8)',
      position:'absolute',
      top:0, bottom:0, left:0, right:0,
      justifyContent:'center',
      alignItems:'center',
    }
  })

  return  <TouchableHighlight  onPress={()=>closeModal()} style={s.container}>
    <View>
      {children}
    </View>
  </TouchableHighlight>
}


class Layout extends Component{


  style = StyleSheet.create({
    container:{flex:1},
    main:{
      zIndex:2,
      paddingLeft: 30,
      paddingRight: 30,
      flex:1,
    }
  })



  render (){
    const {children, connected, location:{pathname}, modal, closeModal }  = this.props
    const {container, header, main} = this.style
    return <View style={container}>
      <StatusBar backgroundColor={modal ?'#080A0E' : navy}/>
      <View style={main}>
        <Header {...{connected,  pathname}} />
        {children}
      </View>
      {modal &&
        <Modal closeModal={closeModal}>
          <ModalContent />
        </Modal>
      }
    </View>
  }
}


export default class extends Component {
  state ={
    alarmSet: false,
    modal: false,
    ebwuOn:true,
    side:'A',
    mode:'single',
    daysOfWeek:[],
    time:'1:00 AM',
    volume:.5,
    tone:'Sunshine',
    toneMap:{
      'Chimes':'chimes.mp3',
      'Beep Beep': 'beep.mp3',
      'Morning Song': 'morning.mp3',
      'Ring Tone': 'ring.mp3',
      'Sunshine': 'sunshine.mp3',
      'Rap Beat': 'beat.mp3',
    },
    timeout:{},
    toneMap2:{
      'Sunshine': new Sound('sunshine.mp3', Sound.MAIN_BUNDLE),
      'Beep Beep': new Sound('beep.mp3', Sound.MAIN_BUNDLE),
      'Morning Sogn': new Sound('morning.mp3', Sound.MAIN_BUNDLE),
      'Ring Tone': new Sound('ring.mp3', Sound.MAIN_BUNDLE),
      'Chimes': new Sound('chimes.mp3', Sound.MAIN_BUNDLE),
      'Rap Beat': new Sound('beat.mp3', Sound.MAIN_BUNDLE),
    }
  }

  style=StyleSheet.create({
    container: {flex: 1}
  })

  closeModal = () => this.setState({modal:false})


  componentDidMount = async () =>{
    this.setState({
      daysOfWeek: JSON.parse(await AsyncStorage.getItem('daysOfWeek'))  || this.state.daysOfWeek,
      side: await AsyncStorage.getItem('side') || this.state.side,
      mode: await AsyncStorage.getItem('mode') || this.state.mode,
      volume: await AsyncStorage.getItem('volume') || this.state.volume,
      tone: await AsyncStorage.getItem('tone') || this.state.tone,
      alarmSet: await AsyncStorage.getItem('alarmSet') || this.state.alarmSet,
    })


  }

  componentWillReceiveProps =({sheetState, time}) =>{

    clearTimeout(this.state.timeout)
    const {tone, toneMap, toneMap2, volume,alarmSet, range} = this.state
    const delta =  +moment(time, 'h:mm A') - +moment()
    const alarm = toneMap2[tone]

    if(delta > 0 && delta < 85000 ){
      return this.setState({
        alarmSet:true,
        timeout: setTimeout(()=>{
          console.log('alarm on!')
          alarm.setVolume(+volume).setNumberOfLoops(-1).play()
          this.setState({modal:true, alarmSet:false})
        }, delta)
      })
    } else if ( (sheetState=='01' || sheetState=='11' || sheetState=='10') && alarmSet==false &&  +moment()  < +moment(time, 'h:mm A').add(5, 'm')   ){
      this.setState({modal:true})
      alarm.setVolume(+volume).setNumberOfLoops(-1).play()
      return
    } else if(sheetState=='00' ){
      this.setState({modal:false})
      alarm.stop()
      return
    }
  }




  save = async (key, value)=> {
      this.setState({[key]:value})
      await AsyncStorage.setItem(
        key,
        typeof(value)==='string'
          ? value
          : JSON.stringify(value)
      )
  }


  getAllChoices = name => choice =>
    this.state[name].indexOf(choice)==-1
      ? this.save(name, [...this.state[name], choice])
      : this.save(name, this.state[name].filter( c=> c!=choice ) )


  getOneChoice = name => choice => name==='time'
    ? this.props.saveTime(name,  choice==this.state[name] ?  this.state[name] :  choice )
    : this.save(name,  choice==this.state[name] ?  this.state[name] :  choice )

  bedConfig ={
      save:this.save,
      getOneChoice: this.getOneChoice,
      getAllChoices:this.getAllChoices,
  }

  gradient = {
    colors: [navy, '#666D89', blue, '#FFECCE'],
    locations: [0, .47, .65, 1]
  }

  render (){

    const {sheetState, time} = this.props
    const {container} = this.style
    const {modal} = this.state

    return <LinearGradient
        {...this.gradient}
        style={container}
      >
        <NativeRouter>
          <Switch>
          <Layout  connected={true} modal={modal} closeModal={this.closeModal} >
            <Route exact path='/' component={Home}/>
            <Route  path='/bed-settings' render={props => <BedSettings  {...this.bedConfig} {...this.state} time={time}  {...props}/>}/>
            <Route  path='/user-settings' render={props => <UserSettings {...props}  sheetState={sheetState} />}/>
          </Layout>
        </Switch>
      </NativeRouter>
    </LinearGradient>
  }
}
