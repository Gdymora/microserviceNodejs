'use strict';
const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const RouterGenerator = require('./generators/routerGenerator');
const ControllerGenerator = require('./generators/controllerGenerator');
const RepositoryGenerator = require('./generators/repositoryGenerator');
const ServiceGenerator = require('./generators/serviceGenerator');

const argv = yargs
  .command('create <moduleType> <moduleName>', 'Create a new module', {
    moduleType: {
      describe:
        'The type of module to create (router, controller, repository, service)',
      choices: ['router', 'controller', 'repository', 'service'],
      demandOption: true,
    },
    moduleName: {
      describe: 'The name of the new module',
      demandOption: true,
      type: 'string',
    },
  })
  .help()
  .alias('help', 'h').argv;

if (argv._[0] === 'create') {
  const moduleType = argv.moduleType;
  const moduleName = argv.moduleName;
  let code = '';

  switch (moduleType) {
    case 'router':
      code = RouterGenerator.generate(moduleName);
      break;
    case 'controller':
      code = ControllerGenerator.generate(moduleName);
      break;
    case 'repository':
      code = RepositoryGenerator.generate(moduleName);
      break;
    case 'service':
      code = ServiceGenerator.generate(moduleName);
      break;
  }
  const moduleDir = path.join(__dirname, moduleName);

  try {
    fs.mkdirSync(`${moduleType}s`);
    console.log('Directory created successfully');
  } catch (err) {
    console.error('Error creating directory:', err);
  }
  //fs.mkdirSync(`${moduleType}s/${moduleName}$`);
  try {
    fs.writeFileSync(
      `${moduleType}s/${moduleName}${
        moduleType.charAt(0).toUpperCase() + moduleType.slice(1)
      }.js`,
      code
    );
    console.log(`Generated ${moduleType} module '${moduleName}'`);
  } catch (err) {
    console.error('Error creating directory:', err);
  }
}