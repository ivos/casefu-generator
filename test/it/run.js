const fs = require('fs')
const path = require('path')
const equal = require('deep-equal')
const chalk = require('chalk')
const Diff = require('diff')
const generator = require('../../src/index')

const encoding = 'utf8'

const match = /.*/

const replaceOnError = false
// const replaceOnError = true

let testCount = 0
let errorCount = 0
let skipCount = 0

const errors = []
const originalConsoleError = console.error
console.error = output => errors.push(output)

console.error = originalConsoleError

const listFiles = (baseDir, dir) => {
  const files = fs.readdirSync(path.join(baseDir, dir))
  let result = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(dir, file)
    const isDir = fs.statSync(path.join(baseDir, filePath)).isDirectory()
    if (isDir) {
      result = result.concat(listFiles(baseDir, filePath))
    } else {
      result.push(filePath)
    }
  }
  return result
}

const processDir = (baseDir, testedFn) => {
  const files = listFiles(baseDir, '')
  files.forEach(file => {
    if (file.endsWith('/meta.json')) {
      processTest(path.join(baseDir, path.dirname(file)), testedFn)
    }
  })
}

const processTest = (dir, testedFn) => {
  testCount++
  if (!match.test(dir)) {
    console.log(chalk.inverse(`Skipping non-matching test case ${dir}`))
    skipCount++
    return
  }
  console.log(chalk.inverse('Processing test case') + ` ${dir}`)
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), encoding))
  const setup = JSON.parse(fs.readFileSync(path.join(dir, 'setup.json'), encoding))
  fs.rmdirSync(setup.outputDir, { recursive: true })
  testedFn(meta, setup)

  const expectedDir = path.join(dir, 'expected')
  const actualDir = setup.outputDir
  const expectedFiles = listFiles(expectedDir, '').sort()
  const actualFiles = listFiles(actualDir, '').sort()

  let message
  let error = false
  expectedFiles.forEach(file => {
    if (actualFiles.includes(file)) {
      const expectedContent = fs.readFileSync(path.join(expectedDir, file), encoding)
      const actualContent = fs.readFileSync(path.join(actualDir, file), encoding)
      if (expectedContent !== actualContent) {
        if (replaceOnError) {
          message = chalk.redBright(`Assertion failed for test case ${dir}, file ${file}. Replacing template content.`)
          console.log(message)
          fs.writeFileSync(path.join(expectedDir, file), actualContent)
        } else {
          const diff = Diff.diffWords(expectedContent, actualContent)
          message = chalk.redBright(`Assertion failed for test case ${dir}, file ${file}:\n`)
          diff.forEach(function (part) {
            const color = part.added ? 'green' : part.removed ? 'red' : 'grey'
            message += chalk[color](part.value)
          })
          console.log(message)
        }
        error = true
      }
    }
  })
  if (!equal(expectedFiles, actualFiles)) {
    message = chalk.redBright(`Assertion failed for test case ${dir}, file names:\n`)
    const diff = Diff.diffWords(expectedFiles, actualFiles)
    diff.forEach(item => {
      const color = item.added ? 'green' : item.removed ? 'red' : 'grey'
      message += chalk[color](item.value)
      message += '\n'
    })
    console.log(message)
    error = true
  }
  if (error) {
    errorCount++
  }
}

const run = (testsDir, testedFn) => {
  processDir(testsDir, testedFn)

  let result = chalk.inverse(`Tests run: ${testCount}`)
  if (skipCount !== 0) {
    result += `, skipped: ${skipCount}`
  }
  if (errorCount !== 0) {
    result += ', ' + chalk.bgRedBright(`errors: ${errorCount}`)
  }
  const passCount = testCount - errorCount - skipCount
  if (passCount !== 0) {
    result += ', ' + chalk.bgGreenBright(`passed: ${passCount}`)
  }
  console.log(result)
}

const testsDir = 'test/it'
run(testsDir, generator.generate)
