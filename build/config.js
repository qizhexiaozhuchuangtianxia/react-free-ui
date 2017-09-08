import { configure } from '@storybook/react';

function loadStories() {
    require('../stories/list.story.js');
    require('../stories/renderToBody.story.js');
    require('../stories/buttons.story.js');
    require('../stories/tree.story.js');
    require('../stories/input.story.js');
    require('../stories/table.story.js');
    require('../stories/dragLineDome.story.js');
    require('../stories/positionDialog.story.js');
    require('../stories/drawer.story.js');
    require('../stories/tab.story.js');
}

configure(loadStories, module);
