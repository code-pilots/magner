import type { ProjectConfig } from '../types/configs';

export type ProjectController = () => ProjectConfig;

export const projectController = (config: ProjectConfig): ProjectController => () => config;
