import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import * as process from 'process';

const templateDir = path.join(__dirname, '../..', 'create-entity', 'feature-templates');
const templates = [
  {
    from: path.join(templateDir, 'en.ejs'),
    to: 'en.ts',
  },
  {
    from: path.join(templateDir, 'types.ejs'),
    to: 'types.ts',
  },
  {
    from: path.join(templateDir, 'requests.ejs'),
    to: 'requests.ts',
  },
  {
    from: path.join(templateDir, 'card-page.ejs'),
    to: 'card-page.ts',
  },
  {
    from: path.join(templateDir, 'table-page.ejs'),
    to: 'table-page.ts',
  },
  {
    from: path.join(templateDir, 'table.ejs'),
    to: 'table.ts',
  },
  {
    from: path.join(templateDir, 'filters.ejs'),
    to: 'filters.ts',
  },
  {
    from: path.join(templateDir, 'style.ejs'),
    to: 'style.css',
  },
  {
    from: path.join(templateDir, 'readme.ejs'),
    to: 'readme.md',
  },
];

const createEntity = async (name: string, dest: string) => {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  const lastChar = name.charAt(name.length - 1) || '';
  const pluralized = lastChar === 'x' || lastChar === 's' ? `${name}es` : `${name}s`;

  const target = path.join(process.cwd(), dest);
  if (fs.existsSync(target) && fs.readdirSync(target)) {
    console.error(`Specified directory "${dest}" must be empty!`);
    process.exit(0);
  }

  fs.mkdirSync(target, { recursive: true });

  templates.forEach((template) => {
    const file = fs.readFileSync(template.from, { encoding: 'utf-8' });
    const to = path.join(target, template.to);
    const compiled = (ejs.compile(file))({
      name,
      pluralized,
      capitalized,
    });
    fs.writeFileSync(to, compiled);
  });

  console.info(`Feature ${capitalized} is successfully added!`);
};

export default createEntity;
