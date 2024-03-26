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

## Running tests

This project uses [playwright](https://playwright.dev/) for end-to-end testing. To run the tests:

```cmd
npm run test
```

You may automatically record video with your tests by setting

```
use: {
  video: "on"
}
```

in the [playwright.config.js](./playwright.config.js). After running tests, you will find the output as a `.webm` in `./test-results`. Then, [convert to MP4](https://video.online-convert.com/convert/webm-to-mp4) and share.
