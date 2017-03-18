<h1 align="center">
  hapi-generoutify example
  <br>
</h1>

Before testing you need `hapi` web-server and `co` library.

```shell
$ npm install
```

### Available routes

- `localhost:3001/hello`

Usually route with handler as function, which reply 'hello world'

- `localhost:3001/await/{seconds}`

Wait `{seconds}` seconds before reply using generator function.

- `localhost:3001/await/`

if seconds isn't passed, `throw new Error` from handler, `errorHandler` method catch this error.