import type { ProjectConfig } from 'lib/types/configs/project';

export type ProjectController = () => ProjectConfig;

export const projectController = (config: ProjectConfig): ProjectController => () => config;
