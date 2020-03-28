import React from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, ALIGN_LEFT, ALIGN_CENTER, TOOL_AUTO} from 'react-svg-pan-zoom';
import AccomazzoTree from './AccomazzoFamilyTree'

let graph = require('./SvgInfo.json');

export default class Tree extends React.PureComponent {

  constructor() {
    super();
    this.state = {tool: TOOL_AUTO, value: INITIAL_VALUE}
    this.Viewer = null
    this.point  = null
  }



  componentDidMount() {
    this.Viewer.fitToViewer(ALIGN_LEFT, ALIGN_CENTER)
  }

  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({value: nextValue})
  }

  handleClick(e) {
    let xTollerance = 150;
    let yTollerance = 60;
    let minDx = 2*xTollerance;
    let minDy = 2*yTollerance;
    let url = null;

    graph.list.forEach((i)=>{
      let dx = e.x-i.pos.x;
      let dy = e.y-i.pos.y;
      if( dx > 0 && dy > 0 && dx*dx+dy*dy<minDx*minDx+minDy*minDy){
        minDx = dx;
        minDy = dy;
        url = i.link
      }
    })

    if( minDx < xTollerance && minDy < yTollerance && url ) window.open(url, "_blank");
  }

  handleTouchStart (e){
    this.point = null;
    console.log(`handleTouchStart ${e.points.length}`)
    if( e && e.points && e.points.length===1) this.point=e.points[0];
  }

  handleTouchMove(e){
    console.log(`handleTouchMove ${e.points.length}`)
    this.point = null;
  }

  handleTouchEnd(e){
    console.log(`handleTouchEnd ${e.points.length}`)    
    if( this.point ) this.handleClick(this.point)
    this.point = null;
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
          onClick={e=>this.handleClick(e)}
          onTouchStart={e=>this.handleTouchStart(e)}
          onTouchMove={e=>this.handleTouchMove(e)}
          onTouchEnd={e=>this.handleTouchEnd(e)}
        >

          <svg width={graph.width} height={graph.height}>
            <rect width={graph.width} height={graph.height} fill="#D0D0D0" />
            <AccomazzoTree/>
          </svg>

        </ReactSVGPanZoom>
    );
  }
}