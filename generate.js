const generify = require("generify");
const path = require("path");
const {execSync} = require("child_process");
const {readFile, writeFile} = require("fs");

module.exports = (targetDirectory, template) => {
    return new Promise((resolve, reject) => {
        generify(path.join(__dirname, template.dir), targetDirectory, {}, function (file) {
            console.log(`generated ${file}`)
        }, function (err) {
            if (err) {
                return reject(err)
            }

            process.chdir(targetDirectory)
            execSync('npm init -y')

            console.log(`reading package.json in ${targetDirectory}`)
            readFile('package.json', (err, data) => {
                if (err) {
                    return reject(err)
                }

                let pkg
                try {
                    pkg = JSON.parse(data)
                } catch (err) {
                    return reject(err)
                }

                pkg.name = template.dir
                pkg.main = template.main
                pkg.description = template.description
                pkg.scripts = Object.assign(pkg.scripts || {}, template.scripts)

                delete pkg.scripts.test

                pkg.dependencies = Object.assign(pkg.dependencies || {}, template.dependencies)
                pkg.devDependencies = Object.assign(pkg.devDependencies || {}, template.devDependencies)

                console.log('edited package.json, saving')
                writeFile('package.json', JSON.stringify(pkg, null, 2), (err) => {
                    if (err) {
                        return reject(err)
                    }

                    template.logInstructions(pkg)
                    resolve()
                })
            })
        })
    })
}
