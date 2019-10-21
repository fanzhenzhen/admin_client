import {connect } from "react-redux";

import {increment,decrement,incrementAsync} from '../redux/action-creaters/count'
import counter from '../components/Counter'

export default connect(
 state=>({count:state.count}),
 {increment,decrement,incrementAsync}
)(counter)