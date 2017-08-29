import { configure } from '@storybook/react';

function loadStories() {
    require('../stories/list.story.js');
    require('../stories/renderToBody.story.js');
    require('../stories/buttons.story.js');
    require('../stories/tree.story.js');
    require('../stories/input.story.js');
    require('../stories/table.story.js');
    require('../stories/dragLineDome.story.js');
}

configure(loadStories, module);
