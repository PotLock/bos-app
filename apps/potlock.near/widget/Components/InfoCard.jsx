const InfoCard = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  padding: 24px;
  border-radius: 6px;
  border: 1px solid rgba(219, 82, 27, 0.36);
  //   background: yellow;
  background: #fef6ee;
  box-shadow: 0px -2px 0px rgba(219, 82, 27, 0.36) inset;
  gap: 8px;
  min-width: 260px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const InfoTextPrimary = styled.div`
  color: #2e2e2e;
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  // word-wrap: break-word;
  text-align: flex-end;
  font-family: "Lora";
  ${loraCss}
`;

const InfoTextSecondary = styled.div`
  color: #ea6a25;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

return (
  <InfoCard>
    <InfoTextPrimary>{props.infoTextPrimary}</InfoTextPrimary>
    <InfoTextSecondary>{props.infoTextSecondary}</InfoTextSecondary>
  </InfoCard>
);
