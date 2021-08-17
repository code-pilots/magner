import { projectController } from 'core/controllers';
import dataToUrl, { urlToData } from 'app/proxies/get-request';

export default projectController({
  name: 'Alfamed',
  short_name: 'alfamed',
  description: 'Admin panel for doctors and clinic admins',

  noBackendMode: false,

  helpers: {
    dataToUrl,
    urlToData,
  },
});
