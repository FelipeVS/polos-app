This application (mostly) follows the [John Papa's style guide](https://github.com/johnpapa/angular-styleguide).

## Getting started

- install nodejs, npm, gulp, bower, cordova, ionic & sass (if not already done)
- `git clone git@github.com:loicknuchel/ionic-starter.git` : clone this repo
- `cd ionic-starter` : go to folder
- `bower install` : install app dependencies
- `npm install` : install build dependencies
- `ionic setup sass` : use sass
- `ionic serve` : start the app on your browser


To run the app on your android device :

- `ionic platform add android` : add android platform to the project
- `ionic resources` : generate icon & splash-screen for project platforms
- `ionic run android` : run your app !

## Used versions

- Node v4.2.2 (`node -v`)
- Cordova 5.4.0 (`cordova -version`)
- Bower 1.7.0 (`bower -v`)
- Angular 1.4.3 (see bower.json)
- Ionic 1.2.4 (see bower.json)

## Infos

### Browser development

- Chrome cordova : https://chrome.google.com/webstore/detail/cordova-mocks/iigcccneenmnplhhfhaeahiofeeeifpn (https://github.com/pbernasconi/chrome-cordova)

### Android debug

- android remote debug : https://developer.chrome.com/devtools/docs/remote-debugging
- activate developer mode on android
