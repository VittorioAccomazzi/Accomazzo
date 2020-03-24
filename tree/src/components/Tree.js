import React from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, ALIGN_LEFT, ALIGN_CENTER, TOOL_AUTO} from 'react-svg-pan-zoom';
import AccomazzoTree from './AccomazzoFamilyTree'

export default class Tree extends React.PureComponent {

  state = {tool: TOOL_AUTO, value: INITIAL_VALUE}
  Viewer = null

  componentDidMount() {
    this.Viewer.fitToViewer(ALIGN_LEFT, ALIGN_CENTER)
  }

  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({value: nextValue})
  }

  render() {
    return (
        <ReactSVGPanZoom
          width={this.props.width} height={this.props.height}
          ref={Viewer => this.Viewer = Viewer}
          tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
          value={this.state.value} onChangeValue={value => this.changeValue(value)}
          scaleFactorMax = {1.0}
          toolbarProps={{SVGAlignY:ALIGN_CENTER}}
          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
        >

          <svg width={8652} height={1392}>
            <rect width="8652" height="1392" fill="#D0D0D0" />
            <AccomazzoTree/>
          </svg>

        </ReactSVGPanZoom>
    );
  }
}