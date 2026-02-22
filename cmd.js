#!/usr/bin/env node

const fs = require('fs')
const assert = require('assert')
const path = require('path')
const argv = require('yargs-parser')
const cliPkg = require('./package')
const generate = require('./generate')

const logInstructions = pkgName => {
  console.warn('saved package.json')
  console.log(`${pkgName} generated successfully`)
  console.warn(`run 'npm run start:prod' to build and run the application`)
  console.warn(`run 'npm run build' to build the application`)
  console.warn(`run 'npm start' to start the application`)
  console.warn(`run 'npm run debug' to start the application in debug mode`)
  console.warn(`run 'npm run test' to run tests`)
  console.warn(`run 'npm run lint' to perform code analyse`)
}

const jsTemplate = {
  dir            : 'app',
  main           : './dist/index.js',
  description    : 'Tropa App',
  scripts        : {
    build       : 'npx babel ./src --out-dir dist',
    start       : 'MODE=production node ./dist/index.js',
    debug       : 'nodemon --exec babel-node ./src/index.js',
    lint        : 'eslint ./src --ext .js --fix',
    test        : 'mocha test',
  },
  dependencies   : {
    tropa      : cliPkg.devDependencies.tropa,
    "cors"     : cliPkg.devDependencies.cors,
    "pino-http": cliPkg.devDependencies["pino-http"],
  },
  devDependencies: {
    "@babel/cli"                       : cliPkg.devDependencies["@babel/cli"],
    "@babel/core"                      : cliPkg.devDependencies["@babel/core"],
    "@babel/eslint-parser"             : cliPkg.devDependencies["@babel/eslint-parser"],
    "@babel/node"                      : cliPkg.devDependencies["@babel/node"],
    "@babel/plugin-proposal-decorators": cliPkg.devDependencies["@babel/plugin-proposal-decorators"],
    "@babel/plugin-transform-runtime"  : cliPkg.devDependencies["@babel/plugin-transform-runtime"],
    "@babel/preset-env"                : cliPkg.devDependencies["@babel/preset-env"],
    "@babel/register"                  : cliPkg.devDependencies["@babel/register"],
    "babel-plugin-parameter-decorator" : cliPkg.devDependencies["babel-plugin-parameter-decorator"],
    "eslint"                           : cliPkg.devDependencies.eslint,
    "nodemon"                          : cliPkg.devDependencies.nodemon,
    "mocha"                            : cliPkg.devDependencies.mocha,
    "pino-pretty"                      : cliPkg.devDependencies["pino-pretty"],
  },
  logInstructions
}

const tsTemplate = {
  dir            : 'app-ts',
  main           : './dist/index.js',
  description    : "Tropa App",
  scripts        : {
    build       : 'tsc',
    start       : 'MODE=production node ./dist/index.js',
    debug       : 'nodemon ./src/index.ts',
    lint        : 'eslint ./src --ext .ts --fix',
    test        : 'mocha test',
  },
  dependencies   : {
    tropa      : cliPkg.devDependencies.tropa,
    "cors"     : cliPkg.devDependencies.cors,
    "pino-http": cliPkg.devDependencies["pino-http"],
  },
  devDependencies: {
    nodemon                           : cliPkg.devDependencies.nodemon,
    'ts-node'                         : cliPkg.devDependencies["ts-node"],
    "pino-pretty"                     : cliPkg.devDependencies["pino-pretty"],
    '@types/node'                     : cliPkg.devDependencies["@types/node"],
    '@types/mocha'                    : cliPkg.devDependencies["@types/mocha"],
    '@typescript-eslint/parser'       : cliPkg.devDependencies["@typescript-eslint/parser"],
    "@typescript-eslint/eslint-plugin": cliPkg.devDependencies["@typescript-eslint/eslint-plugin"],
  },
  logInstructions
}

const isCurrentDir = dir => dir === '.' || dir === './'

const packageJsonByLang = {
  js: jsTemplate,
  ts: tsTemplate,
}

const run = async args => {
  const opts = argv(args)
  const dir = opts._[0]
  const lang = opts.lang || 'ts'

  assert(dir, 'directory is not set')
  assert(packageJsonByLang[lang], `lang '${lang}' is not allowed`)

  if (fs.existsSync(dir) && !isCurrentDir(dir)) {
    throw new Error('directory ' + dir + ' already exists')
  }

  if (fs.existsSync(path.join(dir, 'package.json'))) {
    throw new Error('a package.json file already exists in target directory')
  }

  return generate(dir, packageJsonByLang[lang])
}

run(process.argv.slice(2)).catch(e => {
  console.error(e.message)

  process.exit(1)
})
