import React from 'react'
import {TouchableOpacity} from 'react-native'
import Svg, {Path, Defs, Use, G} from 'react-native-svg'
import {user} from '../path-descriptions/bed-settings'

export default ({ebwuOn, ...props}) => <TouchableOpacity {...props}>
  <Svg width="46" height="46" viewBox="0 0 46 46" >
  <Defs>
    <Path id="user" fillRule="evenodd" d={user}/>
  </Defs>
  <G><Use href="#user"  fill="white" fillOpacity={ebwuOn ? 1 : .3} /></G>
  </Svg>
</TouchableOpacity>
