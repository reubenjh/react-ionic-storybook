const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const installCocoaPods = () => {
  console.log('Installing CocoaPods:')
  execSync('brew install cocoapods', {
    stdio: 'inherit',
  })
  console.log('CocoaPods installed.')
}

const installXCodeCommandLineTools = () => {
  execSync('xcode-select --install')
}

const switchToCurrentVersionOfXcode = () => {
  try {
    // issue: https://forum.ionicframework.com/t/ionic-package-xcode-select-error-tool-xcodebuild-requires-xcode-but-active-developer-directory-library-developer-commandlinetools-is-a-command-line-tools-instance/108975
    execSync('sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer')
  } catch (err) {
    console.log("You may need to open Xcode first if you've never opened it before.")
  }
}

;(async () => {
  console.log('Starting iOS installation...')

  // TODO: error if XCode isn't installed

  // Command returns 0 if tools are installed
  if (String(execSync('xcode-select -p 1>/dev/null;echo $?'))[0] !== '0') {
    installXCodeCommandLineTools()
    switchToCurrentVersionOfXcode()
  }

  installCocoaPods()

  console.log('iOS installation complete.')
})()
