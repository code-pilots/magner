module.exports = {
  installCommand: () => 'pnpm i',
  buildCommand: () => 'pnpm build',
  monorepo: {
    mainVersionFile: 'magner/package.json',
    packagesToBump: ['magner'],
    packagesToPublish: ['magner'],
    updateDependencies: false,
  },
};