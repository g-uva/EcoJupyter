import * as React from 'react';

import { Widget } from '@lumino/widgets';
import { ReactWidget } from '@jupyterlab/ui-components';

interface AppProps {
  widgetComponent: Widget;
}

function MyComponent() {
  return <div>My Widget</div>;
}
class MyWidget extends ReactWidget {
  render() {
    return <MyComponent />;
  }
}

export default function App({ widgetComponent }: AppProps) {
  const myWidget: Widget = new MyWidget();
  Widget.attach(myWidget, widgetComponent.node);
}
