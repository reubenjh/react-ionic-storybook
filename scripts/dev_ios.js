const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const pathExists = p => fs.existsSync(p)

const runDevServer = () => {
  execSync(`ionic capacitor run ios --livereload --host=localhost --port=3002 --no-open`, {
    stdio: 'inherit',
  })
}

const getDeviceFromSimCtlJson = (deviceName, runtimeId) => {
  const list = JSON.parse(String(execSync(`xcrun simctl list -j`)))
  return list.devices[runtimeId]?.find(d => d.name === deviceName)
}

const createCapacitorConfig = () => {
  const capacitorConfigDevPath = path.join(__dirname, '..', 'capacitor.config.development.json')
  // Create capacitor config file
  const capConfig = JSON.parse(String(fs.readFileSync(capacitorConfigDevPath)))
  capConfig['server'] = {
    hostname: 'localhost',
    url: 'http://localhost:3002',
    cleartext: true,
  }
  const capacitorConfigPath = path.join(__dirname, '..', 'capacitor.config.json')
  fs.writeFileSync(capacitorConfigPath, JSON.stringify(capConfig))
}

;(async () => {
  const iosBuildPath = path.join(__dirname, '..', 'ios')

  if (!pathExists(iosBuildPath)) {
    execSync(`node ${path.join(__dirname, 'build:ios.js')}`, {
      stdio: 'inherit',
    })
  }

  createCapacitorConfig()

  const deviceTypeId = `com.apple.CoreSimulator.SimDeviceType.iPhone-11`
  const runtimeId = `com.apple.CoreSimulator.SimRuntime.iOS-14-1`
  const deviceName = 'dev-phone-ios'

  const device = getDeviceFromSimCtlJson(deviceName, runtimeId)

  // Create device if none exists
  if (!device) {
    execSync(`xcrun simctl create ${deviceName} ${deviceTypeId} ${runtimeId}`)
    console.log(
      `Please open Xcode with 'ionic cap open ios' and install app on device '${deviceName}'`
    )
    return
  }

  console.log('Starting iOS dev server...')

  // Boot device
  if (device.state !== 'Booted') {
    execSync(`xcrun simctl boot ${device.udid}`)
  }

  // open simulator to view device
  execSync(`open -a Simulator.app`)

  runDevServer()
})()
