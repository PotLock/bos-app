# potlock

## before you begin

These packages utilize `pnpm` for monorepo capabilities.

```cmd
npm install -g pnpm
```

Then, we need to init the git submodules:

```cmd
pnpm run init
```

and install dependencies:

```cmd
pnpm install
```

**Note:** In order to run everything on M1 processors, the following steps are also needed:

- Make sure Xcode Command Line Tools are installed: `xcode-select --install`;
- Make sure you have a supported Python version (works with 3.11, but not with 3.12);
- Make sure you are using Node version 18.

Reference: [node-gyp on macOS](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-macos)

## get started

To modify the widgets in the /apps directory,

```cmd
pnpm run dev
```

![bos-workspace](./assets/bos-workspace.png)

This will serve the widgets in ./apps to a basic gateway. To view your local widgets, use one of the below methods:

- use the default bos-workspace gateway with default VM, http://localhost:8080
- set flags on existing gateways like [near.org](https://near.org/flags) or [everything.dev](https://everything.dev/flags)
