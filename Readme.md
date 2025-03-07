# TONBET

Base template for django projects at [AxiaCore](http://axiacore.com), includes Gulp build with Compass and Live Reload. Also browser dependencies using Bower.

[Project Page](http://axiacore.github.io/generator-django-axiacore/)

[View on NPM](https://www.npmjs.com/package/generator-django-axiacore)

![materialize](https://raw.githubusercontent.com/AxiaCore/generator-django-axiacore/master/images/demo.png)

### Quick start

```bash

# Create a new folder for your project
$ mkdir my-awesome-project && cd my-awesome-project

# Install yeoman and django-generator
$ sudo npm install -g yo TONBET

# Use the generator
$ yo TONBET

# Fire up your new enviroment
$ workon my-awesome-project_app

# Make your migrations
$ ./manage.py migrate

# Run!!!
$ ./manage.py runserver 0.0.0.0:8000
```

### Adding Bootstrap or Materialize 

You can setup the project to use [Materialize](http://materializecss.com/) or [Bootstrap](getbootstrap.com).

### Subgenerators

```bash
$ yo TONBET
```

### Contributing

We love contributions, so, don't hesitate in creating an issue or sending us a pull request.

### Development

is written in [CoffeeScript](http://coffeescript.org), and we use [Gulp](http://gulpjs.com/) to compile it. 
To set the generator up just clone the repository and run:

```bash
# Install dependencies.
$ npm install 

# Run tasks.
$ gulp

# Hack...
```

### Development

Main project file is written in [CoffeeScript](coffeescript.org) so we use Gulp for building it.
It's located in `app/index.coffee`.

```bash
# Run gulp, which will watch for changes in `.coffee` files.
$ gulp
```

### Technologies

* Bower
* Gulp
* Sass
* Compass

### Dependencies

* Node
* Npm
* Python
* Ruby
