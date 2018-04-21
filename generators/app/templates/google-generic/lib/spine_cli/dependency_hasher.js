#!/home/raymond/.nvm/versions/node/v9.5.0/bin/node
import { DirectedGraph } from 'graphology'

const fs = require('fs')
const path = require('path')
const fileFunctions = require(path.join(__dirname,"/fileFunctions.js"))

function findImportLines(lines){
    //    console.log('finding import lines')
    var import_lines=[]
    for ( var i = 0; i < lines.length; i++ ){
        var line=lines[i]
        if ( line.indexOf('import') > -1) {
            import_lines.push(line)
        }else if ( line==''){
            break
        }                   
    }
    return import_lines
}
function getPaths(strs, filepath){
    var paths=[]
    for (var j=0; j<strs.length; j++){
        var str=strs[j]
        //        console.log('str: '+str+'filepath: '+filepath)
        var start = str.indexOf("'") + 1
        var end = str.indexOf("'", start)
        var dep_path = str.substring(start, end)
        var file_dir = filepath.substring(0, filepath.lastIndexOf('/')+1)
        paths.push(file_dir + dep_path)
    }
    return paths
}    
function simplifyPaths(paths){
    var simple_paths = []
    for ( var j = 0; j<paths.length; j++){
        //        console.log('printing j:'+paths[j])
        paths[j]=paths[j].replace('/./','/')
        if (paths[j].indexOf('/../') > -1){
            var slash=paths[j].indexOf('/../')
            var slash2=paths[j].substring(0,slash-1).lastIndexOf('/')
            paths[j]=paths[j].substring(0,slash2)+paths[j].substring(slash+3)
        }
        simple_paths.push(paths[j])
    }
    return simple_paths
}
function shortenPath(long_path){
    var short_path=long_path.replace('../node_modules/@polymer/polymer','')
    return short_path
}
function getChildren(filepath,cb){
    var data= fs.readFile(filepath, {encoding: 'utf-8'} ,function(err, data){ 
        if (err){
            console.log(err)
        } else {
            var lines=data.split('\n')
            lines = findImportLines(lines)
            if( lines === ''){
                console.log("leaf found")
                return
            }
            //console.log(lines)
            var dep_paths = getPaths(lines, filepath)
                dep_paths = simplifyPaths(dep_paths)
                for (var p=0; p<dep_paths.length; p++){
                    //                    console.log("c:    " + shortenPath(dep_paths[p]))
                }
                    cb(filepath, dep_paths)
        }
    })

}
    /*
function addEdges(filepath, child){
    //console.log("e: " + shortenPath(filepath) + " <- " + shortenPath(child))
}*/
function createChildren(filepath, children){
    //console.log(children.length)
    console.log("" + shortenPath(filepath))
    for (var m=0; m<children.length; m++){
        //        console.log('adding new child to graph' + children[m])
        if (dependency_heirarchy.hasNode(children[m]) === false){
            addToGraph(children[m]) 
        }
        if (dependency_heirarchy.hasEdge(filepath, children[m]) === false) {
            if (m+1==children.length){
                console.log('   \u2514 ' + shortenPath(children[m]))
            } else { 
                console.log('   \u251C ' + shortenPath(children[m]))
            }
            //addEdges(filepath, children[m])
            dependency_heirarchy.addEdge(filepath, children[m])
        }
    }
    if ( children.length === 0 ){
        //        console.log('leaf node: ' + filepath)
    }
}
function addToGraph(filepath, cb){
    var file=dependency_heirarchy.addNode(filepath)
    //        console.log("n: " + shortenPath(file))
    getChildren(filepath,function(filepath, children){
        createChildren(filepath, children)
        if (cb){
            cb(file)
        }
    })
}

var dependency_heirarchy = new DirectedGraph();
var test_file="../node_modules/@polymer/polymer/polymer-element.js"
addToGraph(test_file,function cb(file){
})
setTimeout(function(){
    for (var i = 0; i < dependency_heirarchy.nodes().length; i++){
        var node=dependency_heirarchy.nodes()[i]
        console.log(node)
        console.log(dependency_heirarchy.outDegree(node))
    }
},1000)


    /*
function fogUpload(file){
    ipfs add -w file(data, err){
        var link="https://ipfs.io/ipfs/" + data.hash + data.filename
        return link
    }
    console.log("leaf found! "+file)
    return "#some hash based on "+file
}

    */
    /*
function pushToFog(parent_path, dependency_level=0){
}
            //            console.log(lines)
            //            var dependency_lines = data.replace("import") //{ x as y } from '/some/path'"+ regex, data)         //array of dependencies
            //            console.log(dependency_lines)
            //            var dependencies=dependency_lines.(get just the path)
                /* for each dep in dependencies
                pushToFog(dep)
                ipfs_link=fogUpload(dep)
                console.log("replacing <"+dep+"> with <" + link  + "> in file <" + file ">")
    //  replace(dep, link, file) // replace <dep> with <link> in file <file>
var test_file=""
//test_file="../node_modules/@polymer/polymer/./lib/mixins/../utils/./resolve-url.js"
test_file="../node_modules/@polymer/polymer/polymer-element.js"
pushToFog(test_file)
      */
