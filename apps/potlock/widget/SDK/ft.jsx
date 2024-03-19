return {
  asyncGetFtMetadata: (ftId) => {
    return Near.asyncView(ftId, "ft_metadata", {});
  },
};
