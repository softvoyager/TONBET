'use strict';
var chalk, yeoman, yosay;

yeoman = require('yeoman-generator');

chalk = require('chalk');

yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },
  prompting: function() {
    var done, prompts;
    done = this.async();
    this.log(yosay('Welcome to the delightful' + chalk.red('DjangoAxiacore') + ' generator!'));
    prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project slug',
        "default": this.appname
      }, {
        type: 'input',
        name: 'description',
        message: 'Project description',
        "default": 'description'
      }, {
        type: 'list',
        name: 'cssFramework',
        message: 'What css framework do you want to use?',
        choices: [
          {
            name: 'Materialize',
            value: 'materialize',
            checked: true
          }, {
            name: 'Bootstrap',
            value: 'bootstrap',
            checked: false
          }
        ],
        "default": 'materialize'
      }, {
        type: 'confirm',
        name: 'useCoffeeScript',
        message: 'Would you like to use CoffeeScript?',
        "default": false
      }, {
        type: 'input',
        name: 'adminSiteName',
        message: 'Admin site name',
        "default": 'Administrador de ' + this.appname
      }, {
        type: 'input',
        name: 'dbName',
        message: 'What\'s the name of your database?',
        "default": this.appname
      }, {
        type: 'input',
        name: 'dbUser',
        message: 'What\'s the user of your database?',
        "default": 'django'
      }, {
        type: 'input',
        name: 'dbPass',
        message: 'What\'s your database password?',
        "default": 'django'
      }
    ];
    return this.prompt(prompts, (function(props) {
      this.name = props.name;
      this.description = props.description;
      this.cssFramework = props.cssFramework;
      this.useCoffeeScript = props.useCoffeeScript;
      this.dbName = props.dbName;
      this.dbUser = props.dbUser;
      this.dbPass = props.dbPass;
      this.adminSiteName = props.adminSiteName;
      return done();
    }).bind(this));
  },
  writing: {
    app: function() {
      this.template('_package.json', 'package.json', this, {
        name: this.name,
        description: this.description
      });
      this.template('_bower.json', 'bower.json', this, {
        name: this.name,
        description: this.description
      });
      this.template('gulpfile.js', 'gulpfile.js', this, {
        useCoffeeScript: this.useCoffeeScript
      });
      this.template('local_settings.py', 'app/local_settings.py', this, {
        dbName: this.dbName,
        dbUser: this.dbUser,
        dbPass: this.dbPass
      });
      return this.copy('Gemfile', 'Gemfile');
    },
    projectfiles: function() {
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintignore', '.jshintignore');
      this.copy('requirements.txt', 'requirements.txt');
      this.copy('LICENCE.md', 'LICENCE.md');
      this.copy('gitignore', '.gitignore');
      this.copy('bowerrc', '.bowerrc');
      this.copy('manage.py', 'manage.py');
      this.directory('conf', 'conf');
      this.directory('doc', 'doc');
      this.directory('app', 'app');
      this.directory('bundle', '.bundle');
      this.directory('shell-scripts', 'shell-scripts');
      this.template('settings.py', 'app/settings.py', this, {
        adminSiteName: this.adminSiteName
      });
      return this.copy('main.sample.coffee', 'app/static/coffeescript/main.coffee');
    }
  },
  install: function() {
    var that;
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
    that = this;
    this.spawnCommand('git', ['init']).on('close', function() {
      return that.spawnCommand('git', ['remote', 'add', 'origin', 'git@bitbucket.org:axiacore/' + that.repoSlug + '.git']);
    });
    this.spawnCommand('bundle', ['install']);
    return this.spawnCommand('shell-scripts/prepare_environment.sh', [this.dbName]);
  }
});
