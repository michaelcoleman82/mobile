import React, {Component} from 'react'
import {View, StyleSheet, Text, StatusBar, TouchableHighlight} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import Svg, {Path} from 'react-native-svg'
import {NativeRouter, Switch, Route} from 'react-router-native'
import {Header} from './components'
import {Home, BedSettings, UserSettings} from './routes'
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

  return  <TouchableHighlight  onPress={closeModal} style={s.container}>
    <View>
      {children}
    </View>
  </TouchableHighlight>
}



export default class extends Component{
  state={alarmSet: false, modal: false, timeout:{}}

  //biz logic
  componentWillReceiveProps = p  =>{

    const alarm = p.toneMap[p.tone]
    const delta =  +moment(p.time, 'h:mm A') - +moment()
    const {timeout, alarmSet} = this.state

    clearTimeout(timeout)

    if(delta > 0){
      return this.setState({
        alarmSet:true,
        timeout: setTimeout(()=>{
          alarm.setVolume(+p.volume).setNumberOfLoops(-1).play()
          this.setState({modal:true, alarmSet:false})
        }, delta)
      })
    } else if(
      (p.sheetState=='01' || p.sheetState=='11' || p.sheetState=='10')
       && alarmSet==false
       &&  +moment()  < +moment(p.time, 'h:mm A').add(5, 'm')
     ){
      this.setState({modal:true})
      return alarm.setVolume(+p.volume).setNumberOfLoops(-1).play()
    } else if(p.sheetState=='00' ){
      this.setState({modal:false})
      return alarm.stop()
    }
  }

  closeModal = () => this.setState({modal:false})

  style=StyleSheet.create({
    container:{
      flex:1,
      paddingHorizontal:'5%',
    }

  })


  gradient = {
    colors: [navy, '#666D89', blue, '#FFECCE'],
    locations: [0, .47, .65, 1]
  }



  render (){
    const {alarmSet, modal} = this.state
    const {container} = this.style
    const {connected, sheetState} = this.props
    return <LinearGradient  style={container} {...this.gradient}>
      <StatusBar backgroundColor={modal ?'#080A0E' : navy}/>

      <NativeRouter>
        <View style={{flex:1}}>
          <Header {...{connected}} />
          <Switch>
            <Route  exact path='/' component={Home}  />
            <Route  path='/bed-settings' render={ props =><BedSettings  {...props}  {...this.props} />}  />
            <Route  path='/user-settings' render={props => <UserSettings {...{sheetState, connected, ...props}}   />}/>
          </Switch>
        </View>
      </NativeRouter>

      {modal &&
        <Modal closeModal={this.closeModal} >
          <ModalContent />
        </Modal>
      }
      </LinearGradient>
  }
}
