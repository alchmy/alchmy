/**
 * Download a prebuilt web component from a prebuilt component
 * repository hosted on IPFS. The development version of this 
 * repository is the github 
 * https://github.com/musicsmithnz/polymer_web_components
 */

const fs = require('fs')
const path = require('path')  
const s = require("underscore.string")
const program = require("commander")
const fileFunctions = require(path.join(__dirname,"/fileFunctions.js"))
const https = require('https');
const yaml = require("js-yaml")
const main_html_file="./index.html"

/**
 * Commands
 */
program
  .option('-l, --local','serve from local repository')
  .option('-g, --github','serve from github repository')
  .option('-a, --app','install template')
  .parse(process.argv)

var component_name= program.args;

/**
 * Returns a list of resources that the user can add to their 
 * app/webpage. Current options are polymer_web_components, 
 * templates, stylings
 */
function getResourceList(resource){
  var rel_path = "../../resources/" + resource + ".yaml"
  var resource_path = path.join(__dirname, rel_path)
  var file_data = fs.readFileSync(resource_path, 'utf8')
  try {
      var resource_list = yaml.safeLoad(file_data)
  } catch (e) {
    console.log(e);
  }
  return resource_list
}

/**
 * Writes a file to disk, accepts a file name and
 * a file body in a string to write
 */
function writeFile(file_name, file_body){
  fs.writeFile(file_name, file_body,"utf-8", function(err) {
    if(err) {
      return console.log(err)
    }
    console.log("writeFile function nearly complete...")
    return
  }) 
}

/**
 * Inserts a string B into a string A one line
 * above string C
 */
function insertString( inputString, insertString, atString){
  console.log("atString: " + atString)
  var insertString = insertString + "\n      " + atString
  var inputString = inputString.toString()
  var modifiedString = inputString.replace(new RegExp(atString,'g'), insertString )
  return modifiedString
}

/**
 * Inserts an script module tag into the main html file
 */
function insertModuleReference(new_component_source, main_html_file){
  var script_tag = "<script type=\"module\" src=\""+new_component_source+"\"></script>"
  var main_html_body = fs.readFile(main_html_file, function(err, data){
    var main_html_body_modified = insertString( data, script_tag, '<!--/MODULES-->')
    writeFile(main_html_file, main_html_body_modified)
    console.log("modified")
  })
}

/**
 * Downloads a file from a <url> into a certain <path>
 */
function downloadFile(url, path, cb){
  var file = fs.createWriteStream(path);
  var request = https.get(url, function(response) {
    response.pipe(file)
    if (typeof cb === 'function') {
      cb()
    }
  })
}

/**
 * Takes a component name as argument, searches for that
 * component in the repository, adds that component to 
 * the main index.html file.
 */
function addElement(component_name){
  console.log("searching for new component...")
  var components_list=getResourceList('polymer_web_components')
  var component_filename=component_name+".js"
  var component_url=""
  for ( var i=0; i< components_list.length; i++){
      //console.log(components_list[i].name)
    if (components_list[i].name === component_filename) {
      console.log("found component: ",components_list[i].name)
      if(program.ipfs){  
        console.log("inserting ipfs reference")
        component_url=components[i].ipfs
      } else {
        console.log("inserting local reference")
        component_url=path.join("","./node_modules/polymer_web_components/components/"+component_filename)
          //        downloadFile(components_list[i].ipfs, component_url)
      } 
      fs.stat(main_html_file,function(err, stats){
        if(err == null){
          console.log("index found, inserting reference now")
          insertModuleReference(component_url, main_html_file)
          console.log("should have inserted")
           } else {
          console.log("index not found, downloading index now")
          console.log(getResourceList('app_templates').github_home.ipfs)
          console.log('list should be below')
          downloadFile(getResourceList('app_templates').github_home.ipfs, main_html_file, function() {
            console.log("index downloaded")
            console.log("component file: "+component_filename)
            console.log("main_html_file: "+main_html_file)
            insertModuleReference(component_url, main_html_file)
          })
        }
      })
      break
    }
  }
}
addElement(component_name)
