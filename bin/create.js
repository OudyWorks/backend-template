#!/usr/bin/env node

const shell = require('shelljs'),
    colors = require('colors'),
    fs = require('fs'),
    path = require('path')

console.log('Creating app...')
Promise.resolve().then(
    () => new Promise(
        (resolve, reject) => {

            console.log('Install dev packages')

            shell.exec(
                'npm install -D babel-plugin-module-resolver @oudyworks/uikit-themes',
                {silent: true},
                (code, stdout, stderr) => {
                    if(code)
                        reject('Error while installing dev packages: '+stderr)
                    else {
                        console.log('dev packages installed'.green)
                        resolve()
                    }
                }
            )

        }
    )
).then(
    () => new Promise(
        (resolve, reject) => {

            console.log('Install @oudyworks/backend-template')

            shell.exec(
                'npm install @oudyworks/backend-template',
                {silent: true},
                (code, stdout, stderr) => {
                    if(code)
                        reject('Error while installing @oudyworks/backend-template: '+stderr)
                    else {
                        console.log('@oudyworks/backend-template installed'.green)
                        resolve()
                    }
                }
            )

        }
    )
).then(
    () => new Promise(
        (resolve, reject) => {

            console.log('Create folders')

            shell.cp(
                '-R',
                `${path.join(__dirname, 'skeleton', '*')}`,
                `${path.join(__dirname, 'skeleton', '.*')}`,
                shell.pwd().toString()
            )

        }
    )
).catch(
    error => {
        console.log('Error'.red)
        console.log(error.red)
    }
)