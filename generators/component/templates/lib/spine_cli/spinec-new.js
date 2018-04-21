'use strict'

const fs = require('fs')
const path = require('path')    
const s = require("underscore.string")
const program = require("commander")
const fileFunctions = require(path.join(__dirname,"/fileFunctions.js"))

program
    .option('-s, --styling <styling-framework>', 'add a style framework', /^(materialize|bootstrap|foundation|mui|mdb)$/i, 'mui')
    .option('-b, --base <base-polymer-web-component>', 'base polymer element')
    .option('-t, --template <html-template-path>','this will add the html template into the polymer element')
    .parse(process.argv)

var new_element= program.args;

var main_html_file=path.join(__dirname,"index.html")

function modifyFile(base_element_body,new_element_name){
    var new_class_name=s.classify(new_element_name)
    var new_element_body=base_element_body.replace(new RegExp("ELEMENT_CLASS",'g'),new_class_name)
    new_element_body=new_element_body.replace(new RegExp("ELEMENT_TAG",'g'),new_element_name)
    if (program.styling=="materialize") {
        console.log(" should now add materialize")

    }
    return new_element_body
}
function insertString( inputString, insertString, atString){
    var modifiedString = inputString.replace(new RegExp(atString,'g'),atString + "\n\t\t\t" + insertString)
    return modifiedString
}
function insertModule(new_element_file, main_html_file){
    var script_tag = "<script type=\"module\" src=\""+new_element_file+"\"></script>"
    var main_html_body = fileFunctions.readFile(main_html_file)
    main_html_body = insertString( main_html_body, script_tag, '<!--MODULES-->')
    fileFunctions.writeFile(main_html_file, main_html_body)
}
function newElement(new_element_name){
    console.log("creating new element...")
    var new_element_file=new_element_name+".js"
    if (program.base){
        base_element_file=base
        var base_element_file=path.join(__dirname,"components/base-component.js")
    } 
    var base_element_body=fileFunctions.readFile(base_element_file)    
    var new_element_body=modifyFile(base_element_body,new_element_name)
    if (program.styling) {
        console.log("adding styles...")
        console.log(program.styling)
        new_element_body = insertString(new_element_body, styling_includes[program.styling], '<!--STYLES-->') 
    }
    if (program.template) {
        console.log("adding html template")
        var template_body=fileFunctions.readFile(path.join(__dirname, program.template))
        new_element_body = insertString(new_element_body, template_body, '<!--TEMPLATE-->')
    }
    fileFunctions.writeFile(new_element_file, new_element_body)
    insertModule(new_element_file, main_html_file)

}
newElement(new_element)
