import React from 'react';
import {AutoSizer} from 'react-virtualized';
import Tree from './Tree'

export default function TreeSizer ({position}) {
  return (
    <div style={{width: "100%", height: "100%"}}>
      <AutoSizer>
        {(({width, height}) => width === 0 || height === 0 ? null :
            <Tree width={width} height={height} position={position}/>
        )}
      </AutoSizer>
    </div>
  )
}


