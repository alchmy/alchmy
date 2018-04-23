'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const defaultGreeting=`
       (:::::)   
        |${chalk.green(' + ')}|::) 
   (::::|   |${chalk.yellow('+')}|  
    |${chalk.blue('+  ')}|${chalk.green('  +')}| |  
    |   |   |${chalk.yellow('++')}\\ 
    |${chalk.blue(' + ')}|${chalk.green('+  ')}|${chalk.yellow('+++')}\\
   /${chalk.blue('++++')}|   |${chalk.yellow('++++')}
  /${chalk.blue('++++')}/${chalk.green('+++++')}\\${chalk.yellow('+++')}
 /${chalk.blue('++++')}/${chalk.green('+++++++')}\\${chalk.yellow('++')}
(${chalk.blue('++++')}/${chalk.green('+++++++++')}\\-
(${chalk.blue('+++')}/${chalk.green('+++++++++++')}\\
 '-/${chalk.green('+++++++++++++')}\\
  /${chalk.green('+++++++++++++++')}\\
 (${chalk.green('+++++++++++++++++')})
 (${chalk.green('+++++++++++++++++')})
  '---------------'
`



module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('babel'); // This method adds support for a `--babel` flag
    }
    prompting() {
        this.log(
            yosay(
                `Welcome to the ${chalk.blueBright('alchmy')} generator for generating web apps with modular web components. This generator will guide you through the creation of a web app. The components utilize Polymer, IPFS, Node and Express.`
            )
        );

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
                    "material-generic",
                    "browser-homepage"
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
            }
        ];

        return this.prompt(prompts).then(answers => {
            this.config.set('app_name', answers.app_name)
            this.config.set('template_name', answers.template_name)
            this.config.save();
        });
    }

    writing() {
        var source=this.templatePath(this.config.get('template_name')) 
        var destination=this.destinationPath()

        var files = [
            "/src/css",
            "/src/js",
            "/config",
            "/package.json",
            "/.gitignore",
            /*
            */
            "/src/images"
        ]
        for (var file in files){
            console.log("files: " + files[file])
            console.log(source + files[file])
            console.log(destination + files[file])
            this.fs.copy(
                source + files[file],
                destination + files[file]
             )
        }
        this.fs.copyTpl(
            source + '/src/html/index.html',
            destination + '/src/html/index.html',
            {
                app_name: this.config.get('app_name')
            }
        );
    }

    install() {
        this
            .yarnInstall
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
