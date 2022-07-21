import { initMagner } from 'magner';

import project from '~/configs';

import 'element-plus/dist/index.css';
import 'magner/style';
import 'features/all.css';

import { ENVIRONMENT } from '~/constants';

console.warn('Environment is:', ENVIRONMENT);

initMagner(project);
