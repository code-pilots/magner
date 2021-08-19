import type { ProjectConfig } from 'core/types/configs';

export type ProjectController = () => ProjectConfig;

export const projectController = (config: ProjectConfig): ProjectController => () => config;
