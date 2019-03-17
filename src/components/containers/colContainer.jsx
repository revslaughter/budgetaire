import React from "react";
import GridLayout from "react-grid-layout";

const ColContainer = props => (
  <GridLayout
    layout={props.layout}
    cols={props.cols}
    width={props.width}
    rowHeight={props.rowHeight}
    autoSize
  >
    {props.children}
  </GridLayout>
);

export default ColContainer;
