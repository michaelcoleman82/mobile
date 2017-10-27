import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {withRouter} from 'react-router-native'
import Svg, {  Circle, G, Polyline, Path, Line, Text} from "react-native-svg"
import {home as d} from '../path-descriptions'
const {palette:{sunshine}} = require('../styles')

const Clock = withRouter(
class extends Component{
  state={strokeOpacity:1}

  handlePress=()=>{
    const {history:{push}} = this.props
    this.setState({strokeOpacity:1})
    push('/bed-settings')

  }

  render (){
    const {on, r, dim, strokeWidth} = this.props
    const {strokeOpacity} = this.state
    return <G
      onPressIn={()=> this.setState({strokeOpacity:0.5})}
      onPressOut={this.handlePress}
      height={r*2} width={r*2}
      strokeOpacity={strokeOpacity}
    >
      <Circle
          cx={dim/2}
          cy={dim/2}
          r={r-strokeWidth*2}
          stroke={on ? sunshine : 'white'}
          strokeWidth={strokeWidth}
          fill='none'
      />
      <Polyline
        points={[dim/2, dim/2.4, dim/2, dim/2, dim/2+20, dim/2+15]}
        fill='none'

        stroke={on ? sunshine : 'white'}
        strokeWidth={10}
        strokeLinecap="round"
      />
    </G>
  }
})





const Guide = ({on, r, dim, strokeWidth}) =>
<G  height={r*2} width={r*2} >
  <Circle
      cx={dim/2}
      cy={dim/2}
      r={r-strokeWidth*2}
      stroke='red'
      strokeWidth={strokeWidth}
      fill='none'
  />
</G>


const Notification = ({cx,cy, fillOpacity, num}) => <G x={cx} y={cy}>
  <Circle  {...{ fillOpacity }} r={14} fill={sunshine} />
  <Text x={-5}  y={-11} fontSize={20} fontWeight='lighter' fill={'white'} >{num}</Text>
</G>



class IconButton extends Component{
  state={ fillOpacity:1, on: false}

  handlePress = ()=> {
    const {i, num, arrangeOrder} = this.props
    const {on} = this.state
    this.setState({fillOpacity:1, on:!on})
    arrangeOrder(num, i, on)

  }

  render (){
    const { d,   cxn, cyn,  num, index, ...rest } = this.props
    const {fillOpacity, on} = this.state
    return <G
      onPressIn={()=> this.setState({fillOpacity:0.5})}
      onPressOut={this.handlePress}
      {...rest}
    >
      <Circle cy='25' cx='25' r='25'  fill='none'   />
      <Path fillOpacity={fillOpacity}  fill='white' d={d}/>
      {on && <Notification  num={num} cx={cxn}  cy={cyn} />}
    </G>
  }
}


const Arrow = props => <Line
    strokeOpacity={0.51}
    strokeLinecap='round'
    strokeWidth={10}
    stroke='white'
  {...props}
/>



export default class extends Component{
  state={size:320, order:[1,2,3,4,5,6,7,8], count:1}

  style = StyleSheet.create({
    container:{
      alignItems: 'center',
      marginTop: '15%',
    }
  })

  iconConfig = size  =>[
    { d: d.lights, x: size/2 - 17,  y:0, cxn:18, cyn:-3 },
    { d: d.shower, x: 240, y:  50, cxn:30, cyn:-8 },
    { d: d.playlist, x: size-50, y:size/2-18, cxn:43, cyn:15 },
    { d: d.coffee, x: 233, y: 230, cxn:35, cyn:35, },
    { d: d.talker, x: size/2-21,  y:size-48,  cxn:21, cyn: 45 },
    { d: d.thermostat, x: 50,   y:230, cxn:-5, cyn:45 },
    { d: d.calendar, x: 15,  y:140,  cxn:-8, cyn:20  },
    { d: d.television, x: 50,  y:45 },
  ]


  arrowConfig = (size, i) => ({
    x1:size/2,
    y1:size/5,
    x2:size/2,
    y2:size/3.5,
    origin:size/2,
    rotate:i*45,
    key: i,
  })


  arrangeOrder= (num, index, on) =>{
    const {order, count} = this.state
    const replace = (n ,i)  =>
        i===index && !on
        ? n = count
        : on && n >=num
          ? n-1
          : n

    this.setState({
      count: on ? count-1 : count+1,
      order: order.map(replace),
    })

  }

  render (){
    const {container}  = this.style
    const {size, order}  = this.state

    return <View style={container}>
      <Svg  height={size+30} width={size+20} >
        <G x='10' y='17'>
          <Clock  dim={size} r={70} strokeWidth={10} />
          {order.map( (_, i) =><Arrow  {...this.arrowConfig(size, i)} />)}
          {this.iconConfig(size).map( (data, i)  =>
            <IconButton key={i} num={order[i]} i={i} arrangeOrder={this.arrangeOrder} {...data} />
          )}
        </G>
      </Svg>
    </View>
  }
}
