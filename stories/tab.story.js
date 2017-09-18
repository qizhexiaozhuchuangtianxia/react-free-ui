import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tab,TabPane} from '../src/Tab';


storiesOf('Tab', module)
  .add('tab', () => (
    <div>
      <Tab time={300}>
        <TabPane nav={<div>选项一</div>}>内容一</TabPane>
        <TabPane nav={<div>选项二</div>}>内容二</TabPane>
        <TabPane nav={<div>选项三</div>}>内容三</TabPane>
        
      </Tab>
    </div>
  ))


