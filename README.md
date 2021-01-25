# kb
Eve Online Killboard written using JS


### Run in DEV environment (webpack-dev-server)
```sh
$ npm start
```
it should automatically opens `http://localhost:3000`

#### Build Production bundle
```sh
$ npm run build
```
bundle with static files will be placed in `./dist` folder

#### Serve Production bundle in Docker (backend should be started also in Docker)
```sh
$ docker-compose up --build web
```
or
```sh
$ npm run docker
```
then open `http://localhost:3001`


#### Analyze Production bundle

Visualize size of webpack output files with an interactive zoomable treemap.
```sh
$ npm run analyze
```
