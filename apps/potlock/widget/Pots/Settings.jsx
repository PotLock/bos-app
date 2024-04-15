// get settings
const { potDetail, potId, env, hrefWithParams } = props;
const [editSettings, setEditSettings] = useState(false);

const {
  ownerId,
  SUPPORTED_FTS: { NEAR },
} = VM.require("potlock.near/widget/constants") || {
  ownerId: "",
  SUPPORTED_FTS: {
    NEAR: {},
  },
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  isUserPotAdminOrGreater: () => {},
};

const { _address } = VM.require(`${ownerId}/widget/Components.DonorsUtils`) || {
  _address: (address) => address,
};

let PotFactorySDK =
  VM.require("potlock.near/widget/SDK.potfactory") ||
  (() => ({
    getContractId: () => {},
  }));

PotFactorySDK = PotFactorySDK({ env });

const potFactoryContractId = PotFactorySDK.getContractId();

const userIsAdminOrGreater = PotSDK.isUserPotAdminOrGreater(potId, context.accountId);

const formatTimestampForDateTimeLocal = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const {
  owner,
  chef,
  admins,
  pot_name,
  pot_description,
  max_projects,
  application_start_ms,
  application_end_ms,
  public_round_start_ms,
  public_round_end_ms,
  sybil_wrapper_provider,
  referral_fee_matching_pool_basis_points,
  referral_fee_public_round_basis_points,
  chef_fee_basis_points,
  min_matching_pool_donation_amount,
  registry_provider,
} = potDetail;

const fields = [
  {
    label: "Name",
    val: pot_name,
  },
  {
    label: "Custom handle",
    val: potId.split(`.${potFactoryContractId}`)[0],
  },
  {
    label: "Description",
    val: pot_description,
  },
  {
    label: "Referrer fee % (matching pool)",
    val: referral_fee_matching_pool_basis_points / 100 + "%",
  },
  {
    label: "Referrer fee % (public round)",
    val: referral_fee_public_round_basis_points / 100 + "%",
  },
  {
    label: "Application date",
    val: `${formatTimestampForDateTimeLocal(
      application_start_ms
    )} - ${formatTimestampForDateTimeLocal(application_end_ms)}`,
  },
  {
    label: "Matching round date",
    val: `${formatTimestampForDateTimeLocal(
      public_round_start_ms
    )} - ${formatTimestampForDateTimeLocal(public_round_end_ms)}`,
  },
  {
    label: "Min matching pool donation",
    val: NEAR.fromIndivisible(min_matching_pool_donation_amount),
  },
  {
    label: "Chef fee",
    val: chef_fee_basis_points / 100 + "%",
  },
  {
    label: "Assigned Chef",
    val: chef,
  },
  {
    label: "Max. approved projects",
    val: max_projects,
  },
  {
    label: "Registry Provider",
    val: registry_provider,
  },
  {
    label: "Donor Sybil Resistance",
    val: sybil_wrapper_provider ? "🤖 nada.bot human verified" : "none",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
`;

const PrviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 922px;
`;

const AdminsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  padding-top: 5px;
  transition: all 300ms;
  top: 100%;
  .list {
    background: white;
    color: #292929;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 0px 1px 0px rgba(41, 41, 41, 0.74), 0px 3px 3px 0px rgba(123, 123, 123, 0.12),
      0px 6px 6px 0px rgba(123, 123, 123, 0.12);
    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 12px 16px;
      color: #292929;
      transition: 300ms;
      .profile-image {
        width: 24px;
        height: 24px;
        box-shadow: 0px 0px 1px 0px #a6a6a6 inset;
        border: 2px solid #f8d3b0;
        border-radius: 50%;
      }
      &:hover {
        background: #292929;
        text-decoration: none;
        color: white;
      }
    }
  }
  .tip-icon {
    display: flex;
    justify-content: center;
    z-index: 1;
    svg {
      stroke: rgb(41 41 41 / 21%);
    }
  }
`;

const Admins = styled.div`
  display: flex;
  font-size: 11px;
  gap: 2rem;
  .owner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    .address {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      div {
        font-size: 14px;
        font-weight: 500;
      }
      .profile-image {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }
  }
  .admins {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    .avaters {
      display: flex;
      gap: 0.5rem;
    }
    .profile-image {
      width: 24px;
      height: 24px;
    }
    .icons-tolltip {
      position: relative;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border-radius: 50%;
      border: 2px solid #f8d3b0;
      background: #b8182d;
      &:hover {
        ${AdminsWrapper} {
          opacity: 1;
          pointer-events: all;
        }
      }
    }
  }
  .edit {
    display: flex;
    gap: 0.5rem;
    color: #dd3345;
    align-items: center;
    cursor: pointer;
    margin-left: auto;
  }
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    .edit {
      width: 100%;
    }
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 12px;
  border: 1px solid #c7c7c7;
  padding: 3rem;
  margin-top: 1.5rem;
  .row-field {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 14px;
  }
  .label {
    font-weight: 500;
    max-width: 238px;
    width: 100%;
    text-align: left;
  }
  .input {
    color: #7b7b7b;
  }
  @media only screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
    .row-field {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }
`;

const ProfileImage = ({ address }) => (
  <Widget
    src={`${ownerId}/widget/Project.ProfileImage`}
    props={{
      ...props,
      accountId: address,
      style: {},
    }}
  />
);

const AdminsTooltip = () => (
  <AdminsWrapper>
    <div className="tip-icon">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 5.24537e-07L-2.54292e-07 8L12 8L6 5.24537e-07Z" fill="white" />
      </svg>
    </div>
    <div className="list">
      {admins.slice(0, admins.length).map((admin) => (
        <a href={hrefWithParams(`?tab=profile&accountId=${admin}`)} target="_blank">
          <ProfileImage address={admin} />
          <div>{admin}</div>
        </a>
      ))}
    </div>
  </AdminsWrapper>
);

return editSettings ? (
  <Container>
    <Title>Edit Pot settings</Title>
    <Widget
      src={`${ownerId}/widget/Pots.ConfigForm`}
      props={{
        ...props,
      }}
    />
  </Container>
) : (
  <PrviewContainer>
    <Admins>
      <div className="owner">
        <div>Owner</div>
        <div className="address">
          <ProfileImage address={owner} />
          <div>{_address(owner, 15)}</div>
        </div>
      </div>
      {admins.length > 0 && (
        <div className="admins">
          <div>Admins</div>
          <div className="avaters">
            {admins.slice(0, 4).map((admin, idx) => (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id={`tooltip-${idx}`}>{admin}</Tooltip>}
                key={admin}
              >
                <a href={hrefWithParams(`?tab=profile&accountId=${admin}`)} target="_blank">
                  <ProfileImage address={admin} />
                </a>
              </OverlayTrigger>
            ))}
            {admins.length > 4 && (
              <div className="icons-tolltip">
                +{admins.length - 4}
                <AdminsTooltip />
              </div>
            )}
          </div>
        </div>
      )}
      {userIsAdminOrGreater && (
        <div className="edit" onClick={() => setEditSettings(true)}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.25 13.7501H3.0625L11.3575 5.45508L8.545 2.64258L0.25 10.9376V13.7501ZM1.75 11.5601L8.545 4.76508L9.235 5.45508L2.44 12.2501H1.75V11.5601Z"
              fill="#DD3345"
            />
            <path
              d="M11.7777 0.469375C11.4852 0.176875 11.0127 0.176875 10.7202 0.469375L9.34766 1.84187L12.1602 4.65438L13.5327 3.28187C13.8252 2.98937 13.8252 2.51688 13.5327 2.22438L11.7777 0.469375Z"
              fill="#DD3345"
            />
          </svg>
          Edit Pot
        </div>
      )}
    </Admins>
    <Detail>
      {fields.map((field) => (
        <div className="row-field" key={field.label}>
          <div className="label">{field.label}</div>
          <div className="input">{field.val}</div>
        </div>
      ))}
    </Detail>
  </PrviewContainer>
);
