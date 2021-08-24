import { compileTemplate } from '@vue/compiler-sfc';
import { readFileSync } from 'fs';
// @ts-ignore
import { optimize, extendDefaultPlugins } from 'svgo';

async function compileSvg (source: string, id: string) {
  // @ts-ignore
  let { code } = compileTemplate({ id, source, transformAssetUrls: false });
  code = code.replace('export function render', 'function render');
  code += '\nexport default { render };';
  return code;
}

async function optimizeSvg (content: Buffer, path: string) {
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

export async function transform (path: string) {
  const code = readFileSync(path);
  const svg = await optimizeSvg(code, path);
  return compileSvg(svg, path);
}

export const transformSvg = () => {
  const svgRegex = /\.svg$/;

  return {
    name: 'vue-svg',
    // eslint-disable-next-line consistent-return
    async transform (source: string, id: string) {
      const result = id.match(svgRegex);
      if (result) return transform(id);
    },
  };
};
