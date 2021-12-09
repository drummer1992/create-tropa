const generify = require("generify");
const path = require("path");
const childProcess = require("child_process");
const fs = require("fs");

const onProjectGenerated = (dir, template) => {
  process.chdir(dir)

  childProcess.execSync('npm init -y')

  console.log(`reading package.json in ${dir}`)

  const pkgJson = fs.readFileSync('package.json', 'utf8')
  const pkg = JSON.parse(pkgJson)

  pkg.name = template.dir
  pkg.main = template.main
  pkg.description = template.description
  pkg.scripts = Object.assign(pkg.scripts || {}, template.scripts)
  pkg.dependencies = Object.assign(pkg.dependencies || {}, template.dependencies)
  pkg.devDependencies = Object.assign(pkg.devDependencies || {}, template.devDependencies)

  console.log('edited package.json, saving')

  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))

  childProcess.execSync('npm install', {stdio: 'inherit'})

  template.logInstructions()
}

module.exports = (dir, template) => new Promise((resolve, reject) => {
  generify(path.join(__dirname, template.dir), dir, {}, file => console.log(`generated ${file}`), err => {
    if (err) reject(err)

    try {
      onProjectGenerated(dir, template)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
})
