## Install

```sh
$ yarn install
```

## Usage

```sh
$ yarn start # http://localhost:3000/
```

## Tests

Use jest & enzyme & @testing-library/react-hooks

Tests work correctly but with warning
Warning: You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one
@see issue https://github.com/testing-library/react-hooks-testing-library/issues/14

```
yarn test
```

I use react-app-rewired because I should patch webpack config (see config-overrides.js)

https://github.com/timarney/react-app-rewired


## Check ts

```
yarn typecheck
```
