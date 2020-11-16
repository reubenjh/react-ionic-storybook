const { execSync } = require('child_process')
const fs = require('fs')
const rimraf = require('rimraf')
const pathExists = p => fs.existsSync(p)
const rootDir = 'tmp'
const passwordProtectedDirectory = 'd318f44739dced66793b1a603028133a76ae680e'
const colorCyan = '\x1b[36m%s\x1b[0m'
const tmpDir = 'tmp'
const storybookScriptDir = 'scripts/storybook'
const storybookStaticDir = 'storybook-static'
const filesToCopy = ['index.html', 'sha1.js']

const buildAndDeploy = () => {
  fs.mkdirSync(rootDir)

  if (pathExists(storybookStaticDir)) {
    fs.rename(storybookStaticDir, `${rootDir}/${passwordProtectedDirectory}`, err => {
      if (err) return console.error(err)
    })
  }

  filesToCopy.forEach(rdf => {
    if (pathExists(`${storybookScriptDir}/${rdf}`)) {
      fs.copyFileSync(`${storybookScriptDir}/${rdf}`, `${tmpDir}/${rdf}`, err => {
        if (err) return console.error(err)
      })
    }
  })

  console.log(colorCyan, '✅ Password protection complete!')

  console.log(colorCyan, 'Deploying to gh-pages branch...')

  execSync('yarn run deploy:storybook')

  console.log(
    colorCyan,
    '✅ Storybook deployed successfully! Project is running at [todo]'
  )
}

;(async () => {
  console.log(colorCyan, 'Building Storybook...')

  execSync('yarn run build-storybook --quiet -s public')

  console.log(colorCyan, '✅ Storybook build complete!')

  console.log(colorCyan, '🔑 Password protecting Storybook...')

  if (pathExists(rootDir)) {
    rimraf(rootDir, err => {
      if (err) return console.error(err)
      buildAndDeploy()
    })
  } else {
    buildAndDeploy()
  }
})()
