import { compileTemplate } from '@vue/compiler-sfc';
import { readFileSync } from 'fs';
import { optimize, extendDefaultPlugins } from 'svgo';

async function compileSvg (source, id) {
  let { code } = compileTemplate({ id, source, transformAssetUrls: false });
  code = code.replace('export function render', 'function render');
  code += '\nexport default { render };';
  return code;
}

async function optimizeSvg (content, path) {
  const { data } = await optimize(content, {
    path,
    plugins: extendDefaultPlugins([
      {
        name: 'removeViewBox',
        active: false,
      },
    ]),
  });
  return data;
}

export async function transform (path) {
  const code = readFileSync(path);
  const svg = await optimizeSvg(code, path);
  return compileSvg(svg, path);
}

const transformSvg = () => {
  const svgRegex = /\.svg$/;
  
  return {
    name: 'vue-svg',
    // eslint-disable-next-line consistent-return
    async transform (source, id) {
      const result = id.match(svgRegex);
      if (result) return transform(id);
    },
  };
};

export default transformSvg;
