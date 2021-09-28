import { Routing } from './new-routing';
import { tablePageController } from 'lib/controllers';

const routing: Routing = {
  routes: [
    {
      view: 'preset',
      preset: {
        preset: 'card',
        config: {},
      },
    },
  ],
};
