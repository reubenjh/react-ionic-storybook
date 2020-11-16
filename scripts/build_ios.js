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

const createCapacitorConfig = () => {
  const capacitorConfigDevPath = path.join(__dirname, '..', 'capacitor.config.production.json')
  // Create capacitor config file
  const capConfig = JSON.parse(String(fs.readFileSync(capacitorConfigDevPath)))
  const capacitorConfigPath = path.join(__dirname, '..', 'capacitor.config.json')
  fs.writeFileSync(capacitorConfigPath, JSON.stringify(capConfig))
}

;(async () => {
  const webBuildPath = path.join(__dirname, '..', 'build')
  const iosBuildPath = path.join(__dirname, '..', 'ios')

  if (!pathExists(webBuildPath)) {
    execSync(`node ${path.join(__dirname, 'build:web.js')}`, {
      stdio: 'inherit',
    })
  }

  console.log('Building iOS app...')

  // Remove android dir
  if (pathExists(iosBuildPath)) {
    deleteDirRecursiveSync(iosBuildPath)
  }

  createCapacitorConfig()

  // Ionic build
  execSync('ionic cap add ios')

  console.log('iOS build finished.')
})()
