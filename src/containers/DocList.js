import { connect } from 'react-redux'
import DocList from '../components/DocList'

const mapStateToProps = ({docs}) => ({docs})

export default connect(mapStateToProps, null)(DocList)