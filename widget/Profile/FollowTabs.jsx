const { ownerId, accountId, projectId, nav } = props;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .tab-content {
    padding: 1rem 0;
  }
`;
const Nav = styled.div`
  .nav-pills {
    background: #fbfbfb;
    font-weight: 500;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-link-color: #000;
    --bs-nav-pills-link-active-color: #000;
    --bs-nav-pills-link-active-bg: #fbfbfb;
    --bs-nav-link-padding-y: 0.75rem;
    border-bottom: 1px solid #eee;
    padding-top: 3px;
  }
  .nav-link.active {
    border-bottom: 3px solid #dd3345;
  }

  .nav-item:not(:has(> .disabled)):hover {
    background: #dd334456;
    .nav-link {
      color: #dd3345;
    }
  }

  margin: 0 -12px;
`;

const profileLink = props.hrefWithParams(`?tab=profile&accountId=${accountId}`);

return (
  <Container>
    <Nav>
      <ul className="nav nav-pills nav-fill" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            href={`${profileLink}&nav=followers`}
            className={`btn nav-link ${nav === "followers" ? "active" : ""}`}
            role="tab"
          >
            Followers
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href={`${profileLink}&nav=following`}
            className={`btn nav-link ${nav === "following" ? "active" : ""}`}
            role="tab"
          >
            Following
          </a>
        </li>
      </ul>
    </Nav>
    <div className="tab-content">
      <div className="tab-pane fade in show active" role="tabpanel">
        <Widget
          src={`${ownerId}/widget/Profile.FollowersList`}
          props={{ ...props, accountId: projectId || accountId }}
        />
      </div>
    </div>
  </Container>
);
