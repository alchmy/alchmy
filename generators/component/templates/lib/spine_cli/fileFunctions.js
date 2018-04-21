'use strict'

const fs = require('fs')
const path = require('path')

module.exports.writeFile = function (file_name, file_body){
    fs.writeFile(file_name, file_body, function(err) {
        if(err) {
            return console.log(err)
        }
    })
}

module.exports.readFile = function (file){
    var fileBody = fs.readFileSync(file, {encoding: 'utf-8'})
    return fileBody
}

module.exports.readJsonFile = function (file){
    var fileBody = fs.readFileSync(file, {encoding: 'utf-8'})
    var arrayOfObjects = JSON.parse(fileBody)
    return arrayOfObjects
}




