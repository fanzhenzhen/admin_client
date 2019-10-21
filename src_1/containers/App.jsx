import {connect} from 'react-redux'

import Counter from '../components/counter'
import { increment,decrement ,incrementAsync} from "../redux/action-creaters/count";


export default connect(
  state=>({count:state.count}),
  {increment,decrement,incrementAsync}
)(Counter)

