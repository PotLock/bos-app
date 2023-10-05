# bos-app
PotLock BOS App

## Steps to run

1. [Install bos-cli](https://github.com/bos-cli-rs/bos-cli-rs#install)
2. [Install bos-loader](https://github.com/near/bos-loader#installation)

Note:
This uses [bos-workspace](https://github.com/sekaiking/bos-workspace/tree/main/src)

To run,
```
npm run dev
```

This will serve widgets from

```
http://127.0.0.1:4040/
```


Then, either go to [everything.dev/flags](https://everything.dev/flags) or [near.org](https://near.org/flags)
and save the above address as the flag. 

Now this gateway will render local widgets.

To verify, see:

https://everything.dev/changeme.near/widget/Home



To understand the workflow,
change the "changeme.near" account in your bos.config.json. This will be the account that you will deploy from. It will deploy from the /build directory.

Configure this account private and public key in your repository in order to utilize the .github/workflows/release.yml

JSX files created in apps/potluck/widget will render locally

