import { configure } from '@storybook/react';

function loadStories() {
    require('../stories/list.story.js');
    require('../stories/renderToBody.story.js');
    require('../stories/buttons.story.js');
    require('../stories/tree.story.js');
}

configure(loadStories, module);
