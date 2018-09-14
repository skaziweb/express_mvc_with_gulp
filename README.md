# Small Node.js Express.js MVC application (Model View Controller) with Gulp

## Requirement / Необходимые компоненты
##### 1. [Node.JS](https://nodejs.org/en/)
##### 2. [Git](https://git-scm.com)

## Installation / Установка
```sh
$ git clone https://github.com/skaziweb/express_mvc.git ProjectFolderName
$ cd .\ProjectFolderName\
$ npm install
```
## Start / Запуск
```sh
$ gulp
```
## Application folder structure / Cтруктура папок приложения
    assets/             #app assets
        assets/css      #app compiled style
        assets/fonts    #app fonts
        assets/img      #app image
        assets/lib      #app frontend library
        assets/sass     #app sass style
    config/             #app config folder
        config/default  #app config file
    controllers/        #app controllers
    models/             #app models
    routes/             #app routes
    views/              #app views
    app.js              #app entry point
    db.js               #database config file
    gulpfile            #Gulp config file
    LICENSE             #license file
    package.json        #package manifest file
    README              #this file

##### MySQL is installed as the default database driver / В проекте используеться база данных MySQL

## License 
##### [MIT license](https://opensource.org/licenses/MIT)