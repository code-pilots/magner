module.exports = {
  installCommand: () => 'pnpm i',
  buildCommand: () => 'pnpm build:packages',
  monorepo: {
    mainVersionFile: 'magner/package.json',
    packagesToBump: ['magner'],
    packagesToPublish: ['magner'],
    updateDependencies: true,
  },
};