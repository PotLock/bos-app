// get applications
const { potId, potDetail, hrefWithParams } = props;
const { daysAgo } = VM.require("potlock.near/widget/utils") || { daysAgo: () => "" };
const {
  ONE_TGAS,
  ownerId,
  SUPPORTED_FTS: { NEAR },
} = VM.require("potlock.near/widget/constants") || {
  ONE_TGAS: 0,
  ownerId: "",
  SUPPORTED_FTS: {},
};

const PotSDK = VM.require("potlock.near/widget/SDK.pot") || {
  getApplications: () => {},
};

const { getTimePassed, _address } = VM.require(`${ownerId}/widget/Components.DonorsUtils`) || {
  _address: (address) => address,
};

const MAX_APPLICATION_MESSAGE_LENGTH = 1000;

const applications = PotSDK.getApplications(potId);

const getApplicationCount = (sortVal) => {
  if (!applications) return;
  return applications?.filter((application) => {
    if (sortVal === "All") return true;
    return application.status === sortVal;
  })?.length;
};

const APPLICATIONS_FILTERS = {
  ALL: {
    label: "All applications",
    val: "ALL",
    count: getApplicationCount("All"),
  },
  PENDING: {
    label: "Pending applications",
    val: "PENDING",

    count: getApplicationCount("Pending"),
  },
  APPROVED: {
    label: "Approved applications",
    val: "APPROVED",
    count: getApplicationCount("Approved"),
  },
  REJECTED: {
    label: "Rejected applications",
    val: "REJECTED",
    count: getApplicationCount("Rejected"),
  },
};

const APPLICATIONS_FILTERS_TAGS = {
  Pending: {
    label: "Pending",
    borderColor: "#C7C7C7",
    color: "#292929",
    background: "#F6F5F3",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM8 14C4.685 14 2 11.315 2 8C2 4.685 4.685 2 8 2C11.315 2 14 4.685 14 8C14 11.315 11.315 14 8 14Z"
          fill="#7B7B7B"
        />
        <path
          d="M4.25 9.125C4.87132 9.125 5.375 8.62132 5.375 8C5.375 7.37868 4.87132 6.875 4.25 6.875C3.62868 6.875 3.125 7.37868 3.125 8C3.125 8.62132 3.62868 9.125 4.25 9.125Z"
          fill="#7B7B7B"
        />
        <path
          d="M8 9.125C8.62132 9.125 9.125 8.62132 9.125 8C9.125 7.37868 8.62132 6.875 8 6.875C7.37868 6.875 6.875 7.37868 6.875 8C6.875 8.62132 7.37868 9.125 8 9.125Z"
          fill="#7B7B7B"
        />
        <path
          d="M11.75 9.125C12.3713 9.125 12.875 8.62132 12.875 8C12.875 7.37868 12.3713 6.875 11.75 6.875C11.1287 6.875 10.625 7.37868 10.625 8C10.625 8.62132 11.1287 9.125 11.75 9.125Z"
          fill="#7B7B7B"
        />
      </svg>
    ),
  },
  Approved: {
    label: "Approved",
    color: "#192C07",
    borderColor: "#9ADD33",
    background: "#F7FDE8",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM8 14C4.6925 14 2 11.3075 2 8C2 4.6925 4.6925 2 8 2C11.3075 2 14 4.6925 14 8C14 11.3075 11.3075 14 8 14ZM11.4425 4.685L6.5 9.6275L4.5575 7.6925L3.5 8.75L6.5 11.75L12.5 5.75L11.4425 4.685Z"
          fill="#629D13"
        />
      </svg>
    ),
  },
  Rejected: {
    label: "Rejected",
    borderColor: "#FAA7A8",
    color: "#490813",
    background: "#FEF3F2",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM2 8C2 4.685 4.685 2 8 2C9.3875 2 10.6625 2.4725 11.675 3.2675L3.2675 11.675C2.4725 10.6625 2 9.3875 2 8ZM8 14C6.6125 14 5.3375 13.5275 4.325 12.7325L12.7325 4.325C13.5275 5.3375 14 6.6125 14 8C14 11.315 11.315 14 8 14Z"
          fill="#ED464F"
        />
      </svg>
    ),
  },
};

State.init({
  isModalOpen: false,
  newStatus: "",
  projectId: "",
  reviewMessage: "",
  searchTerm: "",
  allApplications: null,
  filteredApplications: [],
  filterVal: "ALL",
});

const {
  isModalOpen,
  newStatus,
  projectId,
  reviewMessage,
  searchTerm,
  allApplications,
  filteredApplications,
  filterVal,
} = state;

if (applications && !allApplications) {
  applications.reverse();
  State.update({
    filteredApplications: applications,
    allApplications: applications,
  });
}

if (!allApplications) return <div class="spinner-border text-secondary" role="status" />;

const { owner, admins, chef } = potDetail;

const isChefOrGreater =
  context.accountId === chef || admins.includes(context.accountId) || context.accountId === owner;

const handleApproveApplication = (projectId) => {
  State.update({ isModalOpen: true, newStatus: "Approved", projectId });
};

const handleRejectApplication = (projectId) => {
  State.update({ isModalOpen: true, newStatus: "Rejected", projectId });
};

const handleCancel = () => {
  State.update({ isModalOpen: false, newStatus: "", projectId: "", reviewMessage: "" });
};

const handleSubmit = () => {
  const args = {
    project_id: projectId,
    status: newStatus,
    notes: reviewMessage,
  };
  const transactions = [
    {
      contractName: potId,
      methodName: "chef_set_application_status",
      deposit: NEAR.toIndivisible(0.01),
      args,
      gas: ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- TODO: IMPLEMENT EXTENSION WALLET HANDLING ---->
};

const searchApplications = (searchTerm) => {
  // filter applications that match the search term (message, project_id, review_notes or status)
  const filteredApplications = allApplications?.filter((application) => {
    const { message, project_id, review_notes, status } = application;
    const searchFields = [message, project_id, review_notes, status];
    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  });
  return filteredApplications;
};

const sortApplications = (key) => {
  if (key === "ALL") {
    return searchApplications(searchTerm);
  }
  const filtered = allApplications?.filter((application) => {
    return application.status === APPLICATIONS_FILTERS[key].label.split(" ")[0];
  });
  return filtered;
};

const handleSort = (key) => {
  const sorted = sortApplications(key);
  State.update({ filteredApplications: sorted, filterVal: key });
};

const ProfileImg = ({ profile }) => (
  <Widget src="mob.near/widget/ProfileImage" props={{ profile, style: {} }} />
);

const Container = styled.div`
  display: flex;
  gap: 2rem;
  .dropdown {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    .dropdown {
      display: flex;
    }
  }
`;

const Filter = styled.div`
  display: grid;
  width: 286px;
  border-radius: 6px;
  padding: 8px 0;
  border: 1px solid var(--Neutral-500, #7b7b7b);
  height: fit-content;
  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0.5rem 1rem;
    font-size: 14px;
    cursor: pointer;
    svg {
      opacity: 0;
      transition: all 300ms ease;
    }
    &.active {
      svg {
        opacity: 1;
      }
    }
    &:hover {
      svg {
        opacity: 1;
      }
    }
  }
  .count {
    color: #7b7b7b;
    margin-left: auto;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Applications = styled.div`
  border-radius: 6px;
  border: 1px solid #7b7b7b;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 711px;
  width: 100%;
`;
const SearchBar = styled.div`
  display: flex;
  position: relative;
  svg {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    font-size: 14px;
    background: #f6f5f3;
    width: 100%;
    height: 100%;
    padding: 8px 24px 8px 60px;
    border: none;
    outline: none;
  }
  @media only screen and (max-width: 768px) {
    svg {
      left: 1rem;
    }

    input {
      padding: 8px 24px 8px 54px;
    }
  }
`;

const ApplicationRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  font-size: 14px;
  position: relative;
  border-top: 1px solid #c7c7c7;
  .header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    position: relative;
    align-items: center;
  }
  .header-info {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: auto;
  }
  .profile-image {
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }
  .name {
    color: #292929;
    font-weight: 600;
  }
  .address {
    color: #7b7b7b;
    font-weight: 600;
    cursor: pointer;
    transition: all 300ms;
    position: relative;
    z-index: 2;
    &:hover {
      color: #292929;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    transition: all 300ms ease-in-out;
    max-height: 0;
    .message {
      padding-top: 1rem;
    }
    .notes {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .title {
        color: #7b7b7b;
      }
    }
    button {
      width: fit-content;
    }
  }
  .arrow {
    rotate: 180deg;
    transition: all 300ms;
  }
  .toggle-check {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 67px;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
  }
  .toggle-check:checked + .header .arrow {
    rotate: 0deg;
  }
  .toggle-check:checked + .header + .content {
    max-height: 100%;
  }
  @media only screen and (max-width: 768px) {
    padding: 1rem;
    .header-info {
      flex-wrap: wrap;
      gap: 0px;
    }
    .name {
      margin: 0 8px;
    }
    .date {
      line-height: 1;
      width: 100%;
      margin-left: 2.5rem;
    }
  }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: #7b7b7b;
  border-radius: 50%;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Status = styled.div`
  display: flex;
  padding: 6px 12px;
  gap: 8px;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin-left: auto;
  div {
    font-weight: 500;
  }
  svg {
    width: 1rem;
  }
  @media only screen and (max-width: 768px) {
    padding: 6px;
    div {
      display: none;
    }
    svg {
      width: 16px;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: white;
  padding: 24px 24px 12px 24px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-weight: 500;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px;
  border-top: 1px #f0f0f0 solid;
  background: #fafafa;
  gap: 8px;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background: #fafafa;
  padding: 12px 24px 24px 24px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  gap: 24px;
  width: 100%;
`;

const DropdownLabel = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .label {
    font-weight: 500;
  }
  .count {
    display: flex;
    width: ${({ digit }) => 24 + (digit - 1) * 6}px;
    height: ${({ digit }) => 24 + (digit - 1) * 6}px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #ebebeb;
  }
`;

return (
  <Container>
    <div className="dropdown">
      <Widget
        src={`${ownerId}/widget/Inputs.Dropdown`}
        props={{
          sortVal: (
            <DropdownLabel digit={APPLICATIONS_FILTERS[filterVal].count.toString().length}>
              <div className="label">{APPLICATIONS_FILTERS[filterVal].label}</div>
              <div className="count">{APPLICATIONS_FILTERS[filterVal].count}</div>
            </DropdownLabel>
          ),
          showCount: true,
          sortList: Object.values(APPLICATIONS_FILTERS),
          FilterMenuCustomStyle: `left:0; right:auto;`,
          handleSortChange: ({ val }) => {
            handleSort(val);
          },
        }}
      />
    </div>
    <Filter>
      {Object.keys(APPLICATIONS_FILTERS).map((key) => (
        <div
          key={key}
          className={`item ${filterVal === key ? "active" : ""}`}
          onClick={() => handleSort(key)}
        >
          <svg
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.59631 8.9057L1.46881 5.7782L0.403809 6.8357L4.59631 11.0282L13.5963 2.0282L12.5388 0.970703L4.59631 8.9057Z"
              fill="#7B7B7B"
            />
          </svg>

          <div> {APPLICATIONS_FILTERS[key].label}</div>
          <div className="count">{APPLICATIONS_FILTERS[key].count}</div>
        </div>
      ))}
    </Filter>
    <Applications>
      <SearchBar>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.81641 8.69141H9.22391L9.01391 8.48891C9.74891 7.63391 10.1914 6.52391 10.1914 5.31641C10.1914 2.62391 8.00891 0.441406 5.31641 0.441406C2.62391 0.441406 0.441406 2.62391 0.441406 5.31641C0.441406 8.00891 2.62391 10.1914 5.31641 10.1914C6.52391 10.1914 7.63391 9.74891 8.48891 9.01391L8.69141 9.22391V9.81641L12.4414 13.5589L13.5589 12.4414L9.81641 8.69141ZM5.31641 8.69141C3.44891 8.69141 1.94141 7.18391 1.94141 5.31641C1.94141 3.44891 3.44891 1.94141 5.31641 1.94141C7.18391 1.94141 8.69141 3.44891 8.69141 5.31641C8.69141 7.18391 7.18391 8.69141 5.31641 8.69141Z"
            fill="#7B7B7B"
          />
        </svg>
        <input
          type="text"
          placeholder="Search applications"
          className="search-input"
          onChange={(e) => {
            const results = searchApplications(e.target.value);
            State.update({ searchTerm: e.target.value, filteredApplications: results });
          }}
        />
      </SearchBar>
      {filteredApplications.length ? (
        filteredApplications.map(({ project_id, status, message, review_notes, submitted_at }) => {
          const { borderColor, color, icon, label, background } = APPLICATIONS_FILTERS_TAGS[status];

          const profile = Social.getr(`${project_id}/profile`);

          return (
            <ApplicationRow key={project_id}>
              <input type="checkbox" className="toggle-check" />
              <div className="header">
                <div className="header-info">
                  <ProfileImg profile={profile} />
                  {profile?.name && <div className="name">{_address(profile?.name, 10)}</div>}

                  <OverlayTrigger placement="top" overlay={<Tooltip>{project_id}</Tooltip>}>
                    <a
                      className="address"
                      href={hrefWithParams(`?tab=project&projectId=${project_id}`)}
                      target="_blank"
                    >
                      {_address(project_id, 10)}
                    </a>
                  </OverlayTrigger>

                  <Dot />
                  <div className="date">{daysAgo(submitted_at)}</div>
                </div>
                <Status
                  style={{
                    borderColor,
                    color,
                    background,
                  }}
                >
                  <div>{label}</div>
                  {icon}
                </Status>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="arrow"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 0.294922L0 6.29492L1.41 7.70492L6 3.12492L10.59 7.70492L12 6.29492L6 0.294922Z"
                    fill="#7B7B7B"
                  />
                </svg>
              </div>
              <div className="content">
                <div className="message">{message}</div>
                {review_notes && (
                  <div className="notes">
                    <div className="title">Admin notes:</div>
                    <div>{review_notes}</div>
                  </div>
                )}
                {isChefOrGreater && (
                  <>
                    {status !== "Approved" && (
                      <Widget
                        src={`${ownerId}/widget/Components.Button`}
                        props={{
                          type: "secondary",
                          text: "Approve",
                          onClick: () => handleApproveApplication(project_id),
                        }}
                      />
                    )}
                    {status !== "Rejected" && (
                      <Widget
                        src={`${ownerId}/widget/Components.Button`}
                        props={{
                          type: "primary",
                          text: "Reject",
                          onClick: () => handleRejectApplication(project_id),
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            </ApplicationRow>
          );
        })
      ) : (
        <div style={{ padding: "1rem" }}>No applications to display</div>
      )}
    </Applications>
    <Widget
      src={`${ownerId}/widget/Components.Modal`}
      props={{
        ...props,
        isModalOpen,
        onClose: () => State.update({ isModalOpen: false, newStatus: "", projectId: "" }),
        contentStyle: {
          padding: "0px",
        },
        children: (
          <>
            <ModalHeader>
              {newStatus === "Approved" ? "Approve " : newStatus === "Rejected" ? "Reject " : ""}
              application from {projectId}
            </ModalHeader>
            <ModalBody>
              <div>Leave a note *</div>
              <Widget
                src={`${ownerId}/widget/Inputs.TextArea`}
                props={{
                  noLabel: true,
                  inputRows: 5,
                  inputStyle: {
                    background: "#FAFAFA",
                  },
                  placeholder: "Type notes here",
                  value: reviewMessage,
                  onChange: (reviewMessage) => State.update({ reviewMessage }),
                  validate: () => {
                    if (reviewMessage.length > MAX_APPLICATION_MESSAGE_LENGTH) {
                      State.update({
                        reviewMessageError: `Application message must be less than ${MAX_APPLICATION_MESSAGE_LENGTH} characters`,
                      });
                      return;
                    }

                    State.update({ reviewMessageError: "" });
                  },
                  error: reviewMessageError,
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "tertiary",
                  text: "Cancel",
                  onClick: handleCancel,
                }}
              />
              <Widget
                src={`${ownerId}/widget/Components.Button`}
                props={{
                  type: "primary",
                  text: "Submit",
                  disabled: !reviewMessage || !!reviewMessageError,
                  onClick: handleSubmit,
                }}
              />
            </ModalFooter>
          </>
        ),
      }}
    />
  </Container>
);
