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
  console.log('Building Web app...')

  const webBuildPath = path.join(__dirname, '..', 'build')

  if (pathExists(webBuildPath)) {
    deleteDirRecursiveSync(webBuildPath)
  }

  execSync('react-scripts build')

  console.log('Web build finished.')
})()
