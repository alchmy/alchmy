'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the ${chalk.blueBright(
          'PINE'
        )} generator for generating web apps with PINE components! This generator will guide you through the creation of a web app using PINE web components. PINE is an acronym for Polymer, IPFS, Node and Express.`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'component_name',
        message: 'enter the component name',
        default: this.config.get('component_name') || 'materialize-panel',
        store: true
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.config.set('component_name', answers.component_name);
      this.config.save();
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('./package.json'),
      this.destinationPath('./package.json')
    );
    /*
    This.fs.copy(this.templatePath('./.gitignore'), this.destinationPath('./.gitignore'));
    this.fs.copy(
        this.templatePath('./src/html'), 
        this.destinationPath('./src/html')
    )
    */
    this.fs.copy(this.templatePath('./src/css'), this.destinationPath('./src/css'));
    this.fs.copy(this.templatePath('./src/js'), this.destinationPath('./src/js'));
    this.fs.copy(this.templatePath('./src/images'), this.destinationPath('./src/images'));
    this.fs.copyTpl(
      this.templatePath('./src/html/index.html'),
      this.destinationPath('./src/html/index.html'),
      {
        app_name: this.config.get('app_name')
      }
    );
  }

  install() {
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
