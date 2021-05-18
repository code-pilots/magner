import type { ProjectConfig } from 'settings/types/configs';

const projectConfig: ProjectConfig = {
  name: 'Alfamed',
  short_name: 'alfamed',
  description: 'Admin panel for doctors and clinic admins',

  API_URL: import.meta.env.VITE_APP_API_URL as string,
  LOCAL_STORAGE_KEY: 'universal-admin-panel',
};

export default projectConfig;
