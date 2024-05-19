return {
  ownerId: "potlock.near",
  PROJECT_STATUSES: ["Pending", "Approved", "Rejected", "Graylisted", "Blacklisted"],
  DONATION_CONTRACT_ID: "donate.potlock.near",
  NADABOT_HUMAN_METHOD: "is_human",
  NADABOT_CONTRACT_ID: "v1.nadabot.near",
  IPFS_BASE_URL: "https://ipfs.near.social/ipfs/",
  ONE_TGAS: Big(1_000_000_000_000),
  MAX_DONATION_MESSAGE_LENGTH: 100,
  NADA_BOT_URL: "https://app.nada.bot",
  SUPPORTED_FTS: {
    NEAR: {
      iconUrl:
        "https://nftstorage.link/ipfs/bafkreidnqlap4cp5o334lzbhgbabwr6yzkj6albia62l6ipjsasokjm6mi",
      toIndivisible: (amount) => new Big(amount).mul(new Big(10).pow(24)),
      fromIndivisible: (amount, decimals) =>
        Big(amount)
          .div(Big(10).pow(24))
          .toFixed(decimals || 2),
    },
    USD: {
      iconUrl: "$",
      toIndivisible: (amount) => new Big(amount).mul(new Big(10).pow(24)),
      fromIndivisible: (amount, decimals) =>
        Big(amount)
          .div(Big(10).pow(24))
          .toFixed(decimals || 2),
    },
  },
  ToDo: styled.div`
    position: relative;

    &::before {
      content: "TODO: ";
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(-110%, 0);
      background-color: yellow;
    }
  `,
};
