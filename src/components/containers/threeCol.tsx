import React, { FunctionComponent } from "react";
import GridLayout, { Layout } from "react-grid-layout";

interface ThreeColContainerProps {
  layout: Layout[];
}

const ThreeColContainer: FunctionComponent<ThreeColContainerProps> = props => (
  <GridLayout
    layout={props.layout}
    cols={7}
    width={900}
    rowHeight={90}
    autoSize
  >
    {props.children}
  </GridLayout>
);

export default ThreeColContainer;
