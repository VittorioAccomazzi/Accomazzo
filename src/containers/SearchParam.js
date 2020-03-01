import { connect } from 'react-redux'
import SearchParam from '../components/SearchParam'
import {search} from '../slicers/AppSlicer'

export default connect(null, {search})(SearchParam)
