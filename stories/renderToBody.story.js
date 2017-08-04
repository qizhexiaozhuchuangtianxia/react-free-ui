import React from 'react';
import { storiesOf } from '@storybook/react';
import  { RenderToBody } from '../src/Body';
import Dialog from '../src/Dialog/Dialog';
storiesOf('Body', module)
    .add('body', () => (
        <RenderToBody childrenElement={() => <Dialog open={true}><div>dialog</div></Dialog>}>

        </RenderToBody>
    ));


storiesOf('Dialog', module)
    .add('dialog', () => (
        <Dialog open={true} title="我是标题" titleStyle={{}}><div>dialogss</div></Dialog>
    ));