# create-tropa

`create-tropa` is a generator of [tropa](https://github.com/drummer1992/tropa) applications

# Quick Start

### Init App
```sh
npm init tropa hello-world
```
The `npm init` command will create `tropa` project at the `./hello-world` directory.

It is possible to generate TypeScript app too, just add `--lang=ts`

```sh
npm init tropa hello-world -- --lang=ts
```

### Open project directory

```sh
cd ./hello-world    
```

### Build and Start app
```sh
npm run start:prod
```

### Debug app
```sh
npm run debug
```

### Compile app
```sh
npm run build
```

### Start compiled app
```sh
npm run start
```

### Run tests
```sh
npm run test
```

### Perform code analyse
```sh
npm run lint
```
