import type { ProjectConfig } from 'lib/types/configs/project';
import routesAnalyzer from './routes';
import backendAnalyzer from './backend';

export type SupportedAnalyzers = 'routes' | 'backend';
export type Analyzer = (config: ProjectConfig) => void;

const analyzers: Record<SupportedAnalyzers, Analyzer> = {
  routes: routesAnalyzer,
  backend: backendAnalyzer,
};

export default analyzers;
