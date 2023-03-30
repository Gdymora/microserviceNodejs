'use strict';
const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const RouterGenerator = require('./generators/routerGenerator');
const ControllerGenerator = require('./generators/controllerGenerator');
const RepositoryGenerator = require('./generators/repositoryGenerator');
const ServiceGenerator = require('./generators/serviceGenerator');
const MigrationGenerator = require('./generators/migrationGenerator');
const MigrationInsertGenerator = require('./generators/migrationInsertGenerator');
const MigrationUpdateGenerator = require('./generators/migrationUpdateGenerator');
const RouterComponentGenerator = require('./generators/component/routerComponentGenerator');
const ControllerComponentGenerator = require('./generators/component/controllerComponentGenerator');
const RepositoryComponentGenerator = require('./generators/component/repositoryComponentGenerator');
const ServiceComponentGenerator = require('./generators/component/serviceComponentGenerator');
/**
 * Generator file
 * example - npm run cli create (migration, controller) user
 */
const argv = yargs
  .command('create <moduleType> <moduleName>', 'Create a new module', {
    moduleType: {
      describe:
        'The type of module to create (router, controller, repository, service, migration, migration-insert, migration-update, component)',
      choices: [
        'router',
        'controller',
        'repository',
        'service',
        'migration',
        'migration-insert',
        'migration-update',
        'component',
      ],
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
  let code = [];
  let migrationNameArray = [
    'migration',
    'migration-insert',
    'migration-update',
  ];
  switch (moduleType) {
    case 'router':
      code.push(RouterGenerator.generate(moduleName));
      break;
    case 'controller':
      code.push(ControllerGenerator.generate(moduleName));
      break;
    case 'repository':
      code.push(RepositoryGenerator.generate(moduleName));
      break;
    case 'service':
      code.push(ServiceGenerator.generate(moduleName));
      break;
    case 'migration':
      code.push(MigrationGenerator.generate(moduleName));
      break;
    case 'migration-insert':
      code.push(MigrationInsertGenerator.generate(moduleName));
      break;
    case 'migration-update':
      code.push(MigrationUpdateGenerator.generate(moduleName));
    case 'component':
      code.push({
        name: 'router',
        generator: RouterComponentGenerator.generate(moduleName),
      });
      code.push({
        name: 'controller',
        generator: ControllerComponentGenerator.generate(moduleName),
      });
      code.push({
        name: 'repository',
        generator: RepositoryComponentGenerator.generate(moduleName),
      });
      code.push({
        name: 'service',
        generator: ServiceComponentGenerator.generate(moduleName),
      });
      break;
  }
  const moduleDir = 'app/components'; ///path.join(__dirname+'/app/', moduleName);

  try {
    if (!migrationNameArray.includes(moduleType)) {
      if (moduleType === 'component') {
        fs.mkdirSync(`${moduleDir}/${moduleName}s`);
      }
      fs.mkdirSync(`${moduleDir}/${moduleType}s`);

      console.log('Directory created successfully');
    }
  } catch (err) {
    console.error('Error creating directory:', err);
  }

  try {
    code.forEach((code) => {
      if (migrationNameArray.includes(moduleType)) {
        fs.writeFileSync(
          `migrations/${new Date().getTime()}_create_${moduleName}_table.js`,
          code
        );
        console.log(`Generated migrationsmodule '${moduleName}'`);
      } else {
        if (moduleType === 'component') {
          fs.writeFileSync(
            `${moduleDir}/${moduleName}s/${code.name}${
              moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
            }.js`,
            code.generator
          );
        } else {
          fs.writeFileSync(
            `${moduleDir}/${moduleType}s/${moduleName}${
              moduleName.charAt(0).toUpperCase() + moduleType.slice(1)
            }.js`,
            code
          );
        }

        console.log(`Generated ${moduleType} module '${moduleName}'`);
      }
    });
  } catch (err) {
    console.error('Error creating directory:', err);
  }
}
