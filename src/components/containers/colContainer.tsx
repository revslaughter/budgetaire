import React, { FunctionComponent } from "react";
import GridLayout, { Layout } from "react-grid-layout";

interface ColContainerProps {
  layout: Layout[];
  cols: number;
  width: number;
  rowHeight: number;
}

const ColContainer: FunctionComponent<ColContainerProps> = props => (
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
