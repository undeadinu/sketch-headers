#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const rimraf = require('rimraf')
const chalk = require('chalk')
const {exec} = require('child-process-promise')
const {argv} = require('yargs')
const parseHeader = require('./parse-header')

const TEMP_DIR = '.raw-headers'
const HEADERS = path.resolve('./' + TEMP_DIR)
const CLASSDUMP_PATH = path.join(__dirname, './class-dump')

function generate (_argv) {
  const SKETCH_PATH = (_argv.sketchPath || '').trim() || '/Applications/Sketch.app'
  let SKETCH_BIN_PATH = SKETCH_PATH + '/Contents/MacOS/Sketch'
  if (!fs.existsSync(SKETCH_BIN_PATH)) {
    SKETCH_BIN_PATH = SKETCH_PATH + '/Contents/MacOS/Sketch Beta'
  }


  const DOCS = path.resolve((_argv.sketchOutput || '').trim() || './headers/sketch')
  const MACOS_DOCS = path.resolve((_argv.macosOutput || '').trim() || './headers/macos')

  const MACOS_SDK = '/System/Library/Frameworks'

  const now = Date.now()

  console.log(
    `${chalk.dim('[1/4]')} 🗑  Removing old headers...`
  )

  try {
    rimraf.sync(HEADERS)
  } catch (err) {}

  try {
    rimraf.sync(DOCS)
  } catch (err) {}
  try {
    rimraf.sync(MACOS_DOCS)
  } catch (err) {}

  console.log(
    `${chalk.dim('[2/4]')} 💎  Generating the Sketch headers...`
  )

  function parseHeaders(input, output) {
    const files = fs.readdirSync(input);
    const classes = {}
    files.forEach(file => {
      let data = fs.readFileSync(
        path.join(input, file),
        'utf8'
      );
      if (data) {
        data = parseHeader(data)
        if (!data.className) {
          console.log(
            `${chalk.yellow('Warning')} Something weird with ${input}/${file}, do something about it!`
          )
          return
        }

        if (classes[data.className]) { // merge
          data.imports.forEach(i => classes[data.className].imports.add(i))
          Array.from(data.classes).forEach(c => classes[data.className].classes.add(c))
          if (!classes[data.className].extends) {
            classes[data.className].extends = data.extends
          }
          Array.from(data.interfaces).forEach(i => classes[data.className].interfaces.add(i))
          Object.keys(data.methods).forEach(k => {
            classes[data.className].methods[k] = data.methods[k]
          })
          Object.keys(data.properties).forEach(k => {
            classes[data.className].properties[k] = data.properties[k]
          })
        } else {
          classes[data.className] = data
        }
      }
    });
    fs.ensureDirSync(output)
    Object.keys(classes).forEach(c => {
      // convert Set to arrays
      classes[c].imports = Array.from(classes[c].imports)
      classes[c].classes = Array.from(classes[c].classes)
      classes[c].interfaces = Array.from(classes[c].interfaces)
      fs.writeFileSync(
        `${output}/${encodeURIComponent(c)}.json`,
        JSON.stringify(classes[c], null, 2),
        'utf8'
      );
    })
    fs.writeFileSync(
      `${output}/index.json`,
      JSON.stringify(Object.keys(classes), null, 2),
      'utf8'
    );
  }

  return exec(`${CLASSDUMP_PATH} -H "${SKETCH_BIN_PATH}" -o "${HEADERS}/sketch"`)
    .then(() => {
      console.log(
        `${chalk.dim('[3/4]')} 🍏  Generating the macOS headers...`
      )

      return exec(`${CLASSDUMP_PATH} -H "${MACOS_SDK}/AppKit.framework" -o "${HEADERS}/macos" && ${CLASSDUMP_PATH} -H "${MACOS_SDK}/Foundation.framework" -o "${HEADERS}/macos"`)
    })
    .then(() => {
      console.log(
        `${chalk.dim('[4/4]')} 🗂  Generating the parsed documentation...`
      )
      parseHeaders(`${HEADERS}/sketch`, DOCS)
      parseHeaders(`${HEADERS}/macos`, MACOS_DOCS)
    })
    .then(() => {
      try {
        rimraf.sync(HEADERS)
      } catch (err) {}
      console.log(
        `${chalk.green('Done')} ${chalk.dim(`in ${Date.now() - now}ms!`)}`
      )
    })
    .catch(err => {
      console.log(
        `${chalk.red('Error while trying to generate headers')}`
      )
      console.log(err)
    })
}

if (require.main === module) {
  generate(require('yargs').argv)
} else {
  module.exports = generate
}

