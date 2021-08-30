import type { Analyzer } from './index';

const routesAnalyzer: Analyzer = (config) => {
  console.log('here', config);
  console.log('Routes analyzer completed successfully!');
};
export default routesAnalyzer;
