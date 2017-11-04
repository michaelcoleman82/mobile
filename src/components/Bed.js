import React from "react"
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Svg, {  Rect, G, Path, Circle, Polyline } from "react-native-svg"
import {Text} from '.'
const {palette:{blue, sunshine, navy}, layout:{row}} = require('../styles')
// import {frame} from '../path-descriptions/bed'
import left from '../path-descriptions/arrow.json'
import {arrowRight as right} from '../path-descriptions'


const Pillows = ({size, mode, alarmSet,  side, ...props})=> <G>
  <Rect
    x={size/15}
    y={15}
    width={size/2.5 ||  92}
    height={size/5 || 45}
    rx={8}
    ry={8}
    fill='none'
    stroke='white'
    strokeWidth={2}
  />
  {(mode=='single' && alarmSet) || (side=='B' && alarmSet)

  ? <Polyline
      x={size/15}
      points={[25, 35, 30, 40, 46, 26]}
      fill='none'
      stroke= 'white'
      strokeWidth={2}
      strokeLinecap="round"
    />
  : null
  }

  <Rect
    x={size/1.85}
    y={15}
    width={size/2.5 ||  92}
    height={size/5 || 45}
    rx={8}
    ry={8}
    fill='none'
    stroke='white'
    strokeWidth={2}
  />
  {(mode=='single' && alarmSet)  ||  (side=='A' && alarmSet)
  ? <Polyline
      x={size/1.85}
      points={[25, 35, 30, 40, 46, 26]}
      fill='none'
      stroke= 'white'
      strokeWidth={2}
      strokeLinecap="round"
    />
  : null
  }


</G>


const SideA = () =><Path
    y={1}
    x={2}
    fillOpacity={.5}
    fill='white'
    d='M 0 10C 0 4.47715 4.47715 0 10 0L 90 0L 90 180L 10 180C 4.47715 180 0 175.523 0 170L 0 10Z'
  />
const SideB = () =><Path
    y={1}
    x={92}
    fillOpacity={.5}
    fill='white'
    d='M 0 0L 79.2 0C 84.0601 0 88 4.02944 88 9L 88 171C 88 175.971 84.0601 180 79.2 180L 0 180L 0 0Z'
  />


export default ({connected, mode, side ,style, swapSides, size, sheetState, alarmSet})=> {


  const s = StyleSheet.create({
    label:{
      ...row,
      position:'absolute',
      top:120, left:0, right: 0, bottom:0,
      justifyContent: 'center',
      zIndex:1,
    },
    swap:{
      position:'absolute',
      top:size/2.5, left:size/2.5, right: 0, bottom:0,
      alignItems: 'center',
      justifyContent:'center',
      zIndex:1,
      height:40,
      width:40,
      borderRadius:20,
      backgroundColor:'white',
      elevation:5,
    },
    text:{
      color:'rgba(255, 255, 255, 0.5)'
    },
    dual:{
      ...row,
      flex:1,
      justifyContent:'space-around',
    }
  })

  return <View style={style}>
      <Svg width={size || 230} height={size || 230} viewBox={`0 0 ${size+2} ${size+2}`} >
        { !connected || sheetState =='00'
          ? null
          : mode==='single' || sheetState=='11'
            ? <G>
                <SideA   />
                <SideB  />
              </G>
            :  side=='A' || sheetState==='01'
                ? <SideB/>
                :  side==='B' || sheetState==='10'
                  ? <SideA />
                  : null

                // : null
        }
        <G strokeOpacity={connected ? 1 : .3}
          fill='none'
          stroke='white'
          strokeWidth={2}
        >
          <Rect
            x={2}
            y={2}
            width={size-2 || 226}
            height={size-2 || 226}
            rx="10"
            ry="10"
          />
          <Pillows  {...{size, mode, side, alarmSet}} />
        </G>
      </Svg>
      <View style={s.label }>
        {!connected
          ? <View style={row}>
              <Text style={s.text}>not connected </Text>
            </View>
          : mode=='none'
            ? null
            : mode==='single'
              ? <Text>You</Text>
              :  <View style={s.dual}>
                  <Text >{ side ==='A' ? 'Partner' : 'You'}</Text>
                  <Text>{ side ==='A' ? 'You' : 'Partner'}</Text>
                 </View>
        }
      </View>
      { connected && mode==='dual'
        ? <TouchableOpacity  activeOpacity={.5} style={s.swap} onPress={()=>swapSides()}>
            <Svg width={20} height={40}>
              <G>
                {left.map( (d,i)=><Path  y={8} key={i}  fill={blue} {...d}/> )}
                {right.map( (d,i)=><Path y={20} key={i}  fill={blue} {...d}/> )}
              </G>
            </Svg>
          </TouchableOpacity>
        : null
      }
    </View>

}
