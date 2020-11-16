const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const pathExists = p => fs.existsSync(p)

const deleteDirRecursiveSync = function (p) {
  if (pathExists(p)) {
    fs.readdirSync(p).forEach(file => {
      const curPath = path.join(p, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirRecursiveSync(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(p)
  }
}

;(async () => {
  console.log('Cleaning...')

  const webBuildPath = path.join(__dirname, '..', 'build')
  const androidBuildPath = path.join(__dirname, '..', 'android')
  const iosBuildPath = path.join(__dirname, '..', 'ios')
  const gradlePath = path.join(__dirname, '..', '.gradle')
  const capacitorConfigPath = path.join(__dirname, '..', 'capacitor.config.json')

  if (pathExists(webBuildPath)) {
    deleteDirRecursiveSync(webBuildPath)
  }
  if (pathExists(androidBuildPath)) {
    deleteDirRecursiveSync(androidBuildPath)
  }
  if (pathExists(iosBuildPath)) {
    deleteDirRecursiveSync(iosBuildPath)
  }
  if (pathExists(gradlePath)) {
    deleteDirRecursiveSync(gradlePath)
  }
  if (pathExists(capacitorConfigPath)) {
    fs.rmSync(capacitorConfigPath)
  }

  console.log('Clean finished.')
})()
