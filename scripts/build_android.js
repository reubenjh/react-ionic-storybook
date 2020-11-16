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
  const androidBuildPath = path.join(__dirname, '..', 'android')
  const gradleWrapperPath = path.join(
    androidBuildPath,
    'gradle',
    'wrapper',
    'gradle-wrapper.properties'
  )

  if (!pathExists(webBuildPath)) {
    execSync(`node ${path.join(__dirname, 'build:web.js')}`, {
      stdio: 'inherit',
    })
  }

  console.log('Building Android app...')

  // Remove android dir
  if (pathExists(androidBuildPath)) {
    deleteDirRecursiveSync(androidBuildPath)
  }

  createCapacitorConfig()

  // Ionic build
  execSync('ionic cap add android')

  // Replace broken gradle version reference
  if (pathExists(gradleWrapperPath)) {
    const fileStr = fs.readFileSync(gradleWrapperPath).toString('utf-8')
    fs.writeFileSync(
      gradleWrapperPath,
      fileStr.replace('gradle-5.6.4-all.zip', 'gradle-6.7-all.zip')
    )
  }

  console.log('Android build finished.')
})()
