import React from 'react'
import {TouchableOpacity} from 'react-native'
import Svg, {Path, Defs, Use, G} from 'react-native-svg'
import {user} from '../path-descriptions'

export default ({connected, ...props}) => <TouchableOpacity {...props}>
  <Svg width="46" height="46" viewBox="0 0 46 46" >
  <Defs>
    <Path id="user" fillRule="evenodd" d={user.d}/>
  </Defs>
  <G><Use href="#user"  fill="white" fillOpacity={connected ? 1 : .3} /></G>
  </Svg>
</TouchableOpacity>
