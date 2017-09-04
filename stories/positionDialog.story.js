import React from 'react';
import { storiesOf } from '@storybook/react';
import  { PositionDialog } from '../src/PositionDialog';

let meun=(<div>
    <div>22</div>
    <div>222</div>
    <div>3333</div>
</div>)
storiesOf('PositionDialog', module)
    .add('positionDialog', () => (
        <div style={{margin:'200px'}}>
            <PositionDialog meun={meun} position='top'>
                <div style={{width:'140px'}}>PositionTop</div>
            </PositionDialog >
            <PositionDialog meun={meun} position='bottom'>
                <div style={{width:'140px'}}>PositionBootom</div>
            </PositionDialog >
        </div>
    ))
    

