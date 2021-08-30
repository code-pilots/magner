import routesAnalyzer from './routes';
import backendAnalyzer from './backend';
import type { ProjectConfig } from '../types/configs';

export type SupportedAnalyzers = 'routes' | 'backend';
export type Analyzer = (config: ProjectConfig) => void;

const analyzers: Record<SupportedAnalyzers, Analyzer> = {
  routes: routesAnalyzer,
  backend: backendAnalyzer,
};

export default analyzers;
