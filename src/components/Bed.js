import React from "react"
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Svg, {  Rect, G, Path, Circle } from "react-native-svg"
import {Text} from '.'
const {palette:{blue, sunshine, navy}, layout:{row}} = require('../styles')
import {frame} from '../path-descriptions/bed'
import left from '../path-descriptions/arrow.json'
import right from '../path-descriptions/arrow-right.json'




const Pillow = props=> <Rect
    {...props}
    y={15}
    width={92}
    height={45}
    rx={8}
    ry={8}
    fill='none'
    stroke='white'
    strokeWidth={2}
  />


const SideA = () =><Path
    y={2}
    x={2}
    fillOpacity={.5}
    fill='white'
    d='M 0 10C 0 4.47715 4.47715 0 10 0L 113 0L 113 226L 10 226C 4.47715 226 0 221.523 0 216L 0 10Z'
  />
const SideB = () =><Path
    y={2}
    x={115}
    fillOpacity={.5}
    fill='white'
    d='M 0 0L 103 0C 108.523 0 113 4.47715 113 10L 113 216C 113 221.523 108.523 226 103 226L 0 226L 0 0Z'
  />


export default ({ebwuOn, mode, side ,style, swapSides})=> {

  const s = StyleSheet.create({
    label:{
      ...row,
      position:'absolute',
      top:150, left:0, right: 0, bottom:0,
      justifyContent: 'center',
      zIndex:1,
    },
    swap:{
      position:'absolute',
      top:100, left:93, right: 0, bottom:0,
      alignItems: 'center',
      justifyContent:'center',
      // zIndex:1,
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
      <Svg width="230" height="230" >
        { !ebwuOn
          ? null
          : mode=='none'
            ? null
            : mode==='single'
            ? <G>
                <SideA   />
                <SideB  />
              </G>
            :  side=='A'
                ? <SideB/>
                : <SideA />
                // : null
        }
        <G strokeOpacity={ebwuOn ? 1 : .3}
          fill='none'
          stroke='white'
          strokeWidth={2}
        >
          <Rect
            x={2}
            y={2}
            width={226}
            height={226}
            rx="10"
            ry="10"
          />
          <Pillow x={15} />
          <Pillow x={124}/>
        </G>
      </Svg>
      <View style={s.label }>
        {!ebwuOn
          ? <View style={row}>
              <Text style={s.text}>not connected </Text>
            </View>
          : mode=='none'
            ? null
            : mode==='single'
              ? <Text>You</Text>
              :  <View style={s.dual}>
                  <Text>{ side ==='A' ? 'Partner' : 'You'}</Text>
                  <Text>{ side ==='A' ? 'You' : 'Partner'}</Text>
                 </View>


        }
      </View>
      { ebwuOn && mode==='dual'
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
