import routesAnalyzer from 'core/analyzers/routes';
import backendAnalyzer from 'core/analyzers/backend';
import type { ProjectConfig } from 'core/types/configs';

export type SupportedAnalyzers = 'routes' | 'backend';
export type Analyzer = (config: ProjectConfig) => void;

const analyzers: Record<SupportedAnalyzers, Analyzer> = {
  routes: routesAnalyzer,
  backend: backendAnalyzer,
};

export default analyzers;
