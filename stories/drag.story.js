import React from 'react';
import { storiesOf } from '@storybook/react';
import  DragDemo from '../src/Drag/DragDemo';

storiesOf('DragDemo', module)
  .add('dragDemo', () => (
    <div>
      <DragDemo />
    </div>
  ))


