const { execSync, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const pathExists = p => fs.existsSync(p)

const deviceExists = (toolsPath, deviceName) => {
  const cmd = execSync(`${toolsPath}/avdmanager list avd`)
  return String(cmd).includes(`Name: ${deviceName}`)
}

const openEmulator = (sdkRootPath, deviceName) => {
  spawn(`${sdkRootPath}/emulator/emulator`, [`-avd`, `${deviceName}`])
  return new Promise(resolve => {
    // Give emulator chance to start
    setTimeout(() => {
      resolve()
    }, 4000)
  })
}

const createAvd = (toolsPath, deviceName) => {
  const args = [
    `create`,
    `avd`,
    `-n`,
    deviceName,
    '--device',
    'pixel',
    `--package`,
    `"system-images;android-29;google_apis;x86"`,
    `--tag`,
    `google_apis`,
    `--abi`,
    `x86`,
  ]
  execSync(`echo no | ${toolsPath}/avdmanager ${args.join(' ')}`, { stdio: 'inherit' })

  const homePath = process.env.HOME
  const avdConfigPath = path.join(homePath, '.android', 'avd', `${deviceName}.avd`, 'config.ini')

  // Enable keyboard input
  if (pathExists(avdConfigPath)) {
    const fileStr = fs.readFileSync(avdConfigPath).toString('utf-8')
    fs.writeFileSync(avdConfigPath, fileStr.replace('hw.keyboard=no', 'hw.keyboard=yes'))
  }
}

const installAppOnAvd = androidBuildPath => {
  execSync(`cd ${androidBuildPath} && ./gradlew installDebug && cd ${__dirname}`, {
    stdio: 'inherit',
  })
}

const runDevServer = () => {
  execSync(`ionic capacitor run android --livereload --host=127.0.0.1 --port=3001 --no-open`, {
    stdio: 'inherit',
  })
}

const createCapacitorConfig = () => {
  const capacitorConfigDevPath = path.join(__dirname, '..', 'capacitor.config.development.json')
  // Create capacitor config file
  const capConfig = JSON.parse(String(fs.readFileSync(capacitorConfigDevPath)))
  capConfig['server'] = {
    hostname: 'localhost',
    url: 'http://10.0.2.2:3001', // emulator accesses host's localhost on 10.0.2.2
    cleartext: true,
  }
  const capacitorConfigPath = path.join(__dirname, '..', 'capacitor.config.json')
  fs.writeFileSync(capacitorConfigPath, JSON.stringify(capConfig))
}

;(async () => {
  const homePath = process.env.HOME
  const sdkPath = path.join(homePath, 'Library', 'Android', 'sdk')
  const toolsPath = path.join(sdkPath, 'cmdline-tools', 'tools', 'bin')
  const androidBuildPath = path.join(__dirname, '..', 'android')

  if (!pathExists(androidBuildPath)) {
    execSync(`node ${path.join(__dirname, 'build:android.js')}`, {
      stdio: 'inherit',
    })
  }

  console.log('Starting Android dev server...')

  if (!pathExists(toolsPath)) {
    console.error(`ERROR: Cannot find Android CLI tools at '${cliToolsPath}'.`)
    return
  }

  createCapacitorConfig()

  const deviceName = 'dev-phone-android'
  if (!deviceExists(toolsPath, deviceName)) {
    createAvd(toolsPath, deviceName)
  }

  await openEmulator(path.join(sdkPath), deviceName)
  installAppOnAvd(androidBuildPath)
  runDevServer()
})()
