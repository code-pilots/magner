import { createServer } from 'vite';
import path from 'path';
import type { ProjectConfig } from '../../lib';
import analyzers from './analyzers';

const analyze = async () => {
  const server = await createServer({
    root: path.join(__dirname, '..'),
    server: {
      port: 8080,
    },
  });

  try {
    require.extensions['.css'] = () => undefined;
    require.extensions['.vue'] = () => undefined;
    require.extensions['.cjs.ts'] = () => ({});

    const module = await import(path.join(__dirname, '..', 'playground', 'configs', 'index.ts'));
    const config: ProjectConfig = await module.default();
    if (config && config.analyze && analyzers[config.analyze]) {
      analyzers[config.analyze](config);
    }
  } catch (err) {
    console.error(err);
    await server.close();
  }

  await server.close();
};

export default analyze;
