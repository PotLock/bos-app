const Attribution = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 1rem;
  width: 100%;
  div {
    font-size: 11px;
    color: #7b7b7b;
  }
  svg {
    width: 20px;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 86px;
  }
`;

return (
  <Attribution>
    <div>
      USD prices powered by{" "}
      <a href="https://www.coingecko.com/" target="_blank">
        CoinGecko{" "}
      </a>
    </div>
  </Attribution>
);
