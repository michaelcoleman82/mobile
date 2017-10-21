import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {CheckBox} from '.'
const {layout:{row}, typography:{p}}= require('../styles')




export default ({options, getChoice, choice})=>{
  const s = StyleSheet.create({
    container:{
      paddingVertical:3,
      ...row
    },
    circle:{
      borderRadius: 8,
      borderColor: 'white',
      borderWidth: 1,
      height: 16,
      width:16,
      alignItems:'center',
      justifyContent:'center',
      marginRight: 12,
    },
    innerCircle:{
      borderRadius: 5,
      backgroundColor: 'white',
      height: 10,
      width:10,
    }
  })
  return <View>
    {options.map( (o,i)=> <TouchableOpacity
      onPress={()=>getChoice(o)}
      style={s.container}
      key={i}
    >
      <View style={s.circle} >
        { choice.indexOf(o)!=-1 && <View style={s.innerCircle} /> }
      </View>
      <Text style={p}>{o}</Text>
    </TouchableOpacity>  )}
  </View>
}

// export default class extends Component{
//   state={choice:'' , on: false}
//   style=StyleSheet.create({
//     container:{
//       paddingVertical:3,
//       ...row
//     },
//     circle:{
//       borderRadius: 8,
//       borderColor: 'white',
//       borderWidth: 1,
//       height: 16,
//       width:16,
//       alignItems:'center',
//       justifyContent:'center',
//       marginRight: 12,
//     },
//     innerCircle:{
//       borderRadius: 5,
//       backgroundColor: 'white',
//       height: 10,
//       width:10,
//     }
//   })
//
//
//   render (){
//     const {options} = this.props
//     const {container, circle, innerCircle} = this.style
//     return <View>
//       {options.map( (o,i)=> <TouchableOpacity
//         onPress={()=>this.setState({choice:o})}
//         style={container}
//         key={i}
//       >
//         <View style={circle} >
//           { choice==o && <View style={innerCircle} /> }
//         </View>
//         <Text style={p}>{o}</Text>
//       </TouchableOpacity>  )}
//     </View>
//   }
// }
