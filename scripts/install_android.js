const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const https = require('https')
const AdmZip = require('adm-zip')

const pathExists = p => fs.existsSync(p)

const mkDirRecursiveSync = fullPath => {
  const dirs = fullPath.split('/')
  for (let i = 1; i <= dirs.length; ++i) {
    const p = path.join('/', ...dirs.slice(0, i))
    if (!pathExists(p)) {
      fs.mkdirSync(p)
    }
  }
}

const downloadCliTools = sdkPath => {
  const toolsUrl =
    'https://dl.google.com/android/repository/commandlinetools-mac-6858069_latest.zip'

  console.log(`Downloading Android CLI Tools from '${toolsUrl}'...`)

  return new Promise((resolve, reject) => {
    https.get(toolsUrl, response => {
      const chunks = []
      let dataLength = 0

      const size = response.headers['content-length'] || 1
      const totalHashCount = 39
      const progressInterval = setInterval(() => {
        const pc = dataLength / size
        const hashCount = Math.floor(totalHashCount * pc)
        process.stdout.write(
          `\r[${'='.repeat(hashCount)}${' '.repeat(totalHashCount - hashCount)}] ${(
            100 * pc
          ).toFixed(0)}%`
        )
      }, 1000)

      response
        .on('data', chunk => {
          chunks.push(chunk)
          dataLength += chunk.length
        })
        .on('end', () => {
          clearInterval(progressInterval)
          process.stdout.write(`\r[${'='.repeat(totalHashCount)}] 100% `)
          console.log('Downloaded complete.')
          console.log(`Extracting into '${sdkPath}'...`)
          const buffer = Buffer.alloc(dataLength)

          for (var i = 0, pos = 0; i < chunks.length; ++i) {
            chunks[i].copy(buffer, pos)
            pos += chunks[i].length
          }

          const zip = new AdmZip(buffer)
          const newPath = `${sdkPath}/cmdline-tools`
          if (!pathExists(newPath)) {
            mkDirRecursiveSync(newPath)
          }
          zip.extractAllTo(newPath)
          fs.renameSync(path.join(newPath, 'cmdline-tools'), path.join(newPath, 'tools'))
          execSync(`find ${newPath} -exec chmod 755 {} \\;`)
          console.log('Extraction complete.')
          resolve()
        })
    })
  })
}

const installSdks = (sdkPath, cliToolsPath) => {
  const sdks = [
    `"build-tools;28.0.3"`,
    `"platforms;android-29"`,
    `"system-images;android-29;google_apis;x86"`,
  ]
  console.log('Installing Android SDKs:')
  console.log(sdks.join(' '))
  execSync(`${cliToolsPath}/sdkmanager --install ${sdks.join(' ')} --sdk_root=${sdkPath}`, {
    stdio: 'inherit',
  })
  // Accept all licenses
  execSync(`yes | ${cliToolsPath}/sdkmanager --licenses --sdk_root=${sdkPath}`)
  console.log('SDKs up to date.')
}

const installJava8Jdk = () => {
  console.log('Installing Java 8 JDK:')
  execSync('brew cask install homebrew/cask-versions/adoptopenjdk8', {
    stdio: 'inherit',
  })
  console.log('Java 8 JDK installed.')
}

;(async () => {
  console.log('Starting Android installation...')

  const homePath = process.env.HOME
  const androidPath = path.join(homePath, 'Library', 'Android')
  const sdkPath = path.join(androidPath, 'sdk')
  const cliToolsPath = path.join(sdkPath, 'cmdline-tools', 'tools', 'bin')
  if (!pathExists(cliToolsPath)) {
    await downloadCliTools(sdkPath)
  }
  installSdks(sdkPath, cliToolsPath)

  const java8Path = path.join('/', 'Library', 'Java', 'JavaVirtualMachines', 'adoptopenjdk-8.jdk')
  if (!pathExists(java8Path)) {
    installJava8Jdk()
  }

  console.log('Android installation complete.')
})()
