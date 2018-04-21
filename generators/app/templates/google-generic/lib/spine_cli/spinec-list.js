/**
 * This subcommand can list all the resources the user needs in 
 * order to find components, styling frameworks, or starter apps
 */
const program = require("commander")
const path = require('path')
const fileFunctions = require(path.join(__dirname,"/fileFunctions.js"))
const fs = require('fs')
var yaml = require("js-yaml")

program
    .command('list','will list from online repositories')
    .option('-c, --component [search_term]', 'list components matching search term')
    .option('-s, --styling [search_term]', 'list components matching search term')
    .parse(process.argv);

try {
    var components_list = yaml.safeLoad(fs.readFileSync(path.join(__dirname,'../../resources/polymer_web_components.yaml'), 'utf8'));
} catch (e) {
          console.log(e);
}

if (program.styling){
    console.log("mui\n"+"bootstrap\n"+ "material design")
}
else {
    //var data=fileFunctions.readFile(path.join(__dirname,"../config/polymer_web_components.json"))
    //var data=JSON.parse(data)
    var data=components_list
    var dataLen = data.length;
    var comp=[]
    var str=""
    if (program.component && program.component != true){
        console.log(program.component)
        for (var i = 0; i < dataLen; i++) {
            if (data[i].name.indexOf(program.component) > -1){
                comp.push(data[i].name)
            }
        }
    } else {
        console.log('finding all components')
        for (var i = 0; i < dataLen; i++) {
            comp.push(data[i].name)
        }
    }
    
    for (var i = 0; i < comp.length; i++){
        str=comp[i]
        console.log(str)
    }
} 
