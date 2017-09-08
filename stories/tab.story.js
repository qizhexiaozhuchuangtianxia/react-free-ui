import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tab,TabPane} from '../src/Tab';


storiesOf('Tab', module)
  .add('tab', () => (
    <div>
      <Tab time={300}>
        <TabPane nav={<div>选项一</div>}>111111111111111111111111</TabPane>
        <TabPane nav={<div>选项二</div>}>222222222222222222222222</TabPane>
        <TabPane nav={<div>选项三</div>}>333333333333333333333333</TabPane>
        
      </Tab>
    </div>
  ))


