'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const underscore = require('underscore');   
const readFile = util.promisify(fs.readFile);


var intro_message = `
╭─────────────────────╮
│                                          │
│  Welcome to the ${chalk.blueBright('alchmy')} generator for     │
│  generating web apps with modular web    │
│  components. This generator  will guide  │
│  you through the creation of a web app.  │
│  The components utilize Polymer, IPFS,   │
│  Node and Express.                       │ 
│                                          │   
╰─────────────────────╯
`
const greeting=`
       (:::::)   
        |${chalk.green(' + ')}|::) ╭─────────────────────╮
   (::::|   |${chalk.yellow('+')}|  │                                          │
    |${chalk.blue('+  ')}|${chalk.green('  +')}| |  │  Welcome to the ${chalk.blueBright('alchmy')} generator for     │
    |   |   |${chalk.yellow('++')}\\ │  generating web apps with modular web    │
    |${chalk.blue(' + ')}|${chalk.green('+  ')}|${chalk.yellow('+++')}\\│  components. This generator  will guide  │
   /${chalk.blue('++++')}|   |${chalk.yellow('++++')}│  you through the creation of a web app.  │ 
  /${chalk.blue('++++')}/${chalk.green('+++++')}\\${chalk.yellow('+++')}│  The components utilize Polymer, IPFS,   │
 /${chalk.blue('++++')}/${chalk.green('+++++++')}\\${chalk.yellow('++')}│  Node and Express.                       │ 
(${chalk.blue('++++')}/${chalk.green('+++++++++')}\\-│                                          │   
(${chalk.blue('+++')}/${chalk.green('+++++++++++')}\\╰─────────────────────╯ 
 '-/${chalk.green('+++++++++++++')}\\
  (${chalk.green('+++++++++++++++')})
  (${chalk.green('+++++++++++++++')})
   '-------------'
`


module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('babel'); // This method adds support for a `--babel` flag
    }
    prompting() {
        this.log( greeting);

        const prompts = [
            {
                type: 'input',
                name: 'app_name',
                message: 'please enter the name of your app',
                default: this.config.get('app_name') || 'Magnum-Opus!',
                store: true
            },
            {
                type: 'list',
                name: 'template_name',
                message: 'please select a template',
                default: this.config.get('app_name') || 'homepage',
                store: true,
                choices: [
                    "boilerplate-html",
                    "material-generic",
                    "alchmy-homepage"
                ]
            },
            {
                type: 'checkbox',
                name: 'component_libs',
                message: 'Which Component libraries would you like to include?',
                choices: [
                    {
                        name: 'polymer-web-components',
                        value: 'polymer-web-components',
                        checked: true
                    },
                    {
                        name: 'materialize-web-components',
                        value: 'materialize-web-components',
                        checked: true
                    },
                    {
                        name: 'alchmy-web-components',
                        value: 'alchmy-web-components',
                        checked: true
                    }
                ]
            },
            {
                type: 'input',
                name: 'primary_color',
                message: 'Primary color[hex value or name]:',
                default: chalk.hex('#687856'),
                store: true
            },
            {
                type: 'input',
                name: 'secondary_color',
                message: 'Secondary color[hex value or name]:',
                default: chalk.hex('#685678'),
                store: true
            }
        ];
        return this.prompt(prompts).then(answers => {
            this.config.set( 'app_name', answers.app_name)
            this.config.set( 'template_name', answers.template_name)
            this.config.set( 'primary_color', answers.primary_color)
            this.config.set( 'secondary_color', answers.secondary_color)
            this.config.save();
        });
    }

    writing() {
        var template_name=this.config.get('template_name');
        var main_source=this.templatePath(template_name);
        var base_source=this.templatePath('base')
        var destination=this.destinationPath();

        console.log('template_path: ' + this.templatePath());
        console.log('template_name: ' + template_name);
        console.log('main_source:   ' + main_source);
        console.log('base_source:   ' + base_source);
        console.log('destination:   ' + destination);

        const pkgJson = {
            scripts: {
                "build:dev": "webpack --mode development --config config/webpack.config.dev.js",
                "build:prod": "webpack --mode production --config config/webpack.config.prod.js"
            }, 
            devDependencies: {    
                "@polymer/polymer": "^3.0.0-pre.12",
                "@babel/core": "*7.0.0-beta.40",
                "@babel/preset-env": "*7.0.0-beta.40",
                "babel-loader": "*7.1.4",
                "chai": "^4.1.2",
                "chalk": "^2.4.0",
                "fs-extra": "^5.0.0",
                "html-webpack-plugin": "^3.2.0",
                "node-sass": "^4.9.0",
                "nsp": "^2.6.3",
                "underscore": "^1.9.0",
                "util.promisify": "^1.0.0",
                "webpack": "^4.6.0",
                "webpack-cli": "^2.0.15"
            }   
            dependencies: {
                "express": "^4.16.3"
            }

        };

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

        var base_files = [
            //            "/src/css",
            //"/src/js",
            // "/src/images"
            "/config"
            //"/.gitignore",
            /*
            */
        ]

        for (var file in base_files){
            console.log("files: " + base_files[file])
            console.log(base_source + base_files[file])
            console.log(destination + base_files[file])
            this.fs.copy(
                base_source + base_files[file],
                destination + base_files[file]
             )
        }

        this.fs.copyTpl(
            path.join( main_source, '/index.html'),
            destination + '/src/html/index.html',
            {
                app_name: this.config.get('app_name')
            }
        );

    }

    install() {
        /*The components are loaded separately to allow easily building templates*/ 

        var imports_file_data;
        var components_file = path.join( main_source, 'component_list.json')

        async function readJson(components_file){
            var components = await readFile( components_file, 'utf-8');
            return components
        }
        var components = readComponents( components_file)

        imports_file_data=`
        /*
         * Components
         */
        
        `
        for (component in component_list){
            console.log("will install component")
            this.yarnInstall([ component], { 'dev': false});
            var component_pascal_cased=classify(component);
            var component_path=component.replace(/@.*^/,'')
            var import_string=`import { ${component_pascal_cased} } from '${component_path}'\n`
            console.log("will add string to import file: "+ import_string)
            imports_file_data=imports_file_data + import_string
        }
        fs.writeFile( path.join(destination, '/src/js/app.js',), function(){
        
        })

        this
            .yarnInstall
            // SkipInstall: this.options['skip-install']
            ();
    }
    end() {
        if (this.options['skip-install']) {
            this.log('dependency installation process skipped');
        } else {
            this.log('installation process completed');
        }
    }
};
