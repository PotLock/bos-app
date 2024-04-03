# PotLock BOS App

This repository holds the front-end widgets for [PotLock](https://app.potlock.org/). This project is configured as a [bos-workspace](https://github.com/nearbuilders/bos-workspace).

## Getting started

1. Install packages

```cmd
npm install
```

2. Start dev environment

```cmd
npm run dev
```

This will start a gateway at http://127.0.0.1:8080 which will render your local widgets. The entry point for this app is [potlock.near/widget/Index](http://127.0.0.1:8080/potlock.near/widget/Index).

## Testing framework

This project uses [playwright](https://playwright.dev/) for end-to-end testing. These tests are located in the [playwright-tests](./playwright-tests) folder. please read the [README](./playwright-tests/README.md) to learn more about running and writing tests.
