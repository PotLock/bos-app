const ownerId = "potlock.near";
// const apiUrl = "https://api-op3o.onrender.com";

// State.init({
//   exists: false,
//   project: false,
//   balance: 0,
//   profileIsFetched: false,
// });

// if (!state.profileIsFetched) {
//   if (!context.accountId) {
//     State.update({
//       profileIsFetched: true,
//     });
//   } else {
//     Near.asyncView(
//       ownerId,
//       "check_is_project",
//       { account_id: context.accountId },
//       "final",
//       false
//     ).then((profileExists) => {
//       if (profileExists) {
//         Near.asyncView(
//           ownerId,
//           "get_project",
//           { account_id: context.accountId },
//           "final",
//           false
//         ).then((project) => {
//           State.update({
//             balance: project.credit_balance,
//             project: true,
//             exists: true,
//             profileIsFetched: true,
//           });
//         });
//       } else {
//         Near.asyncView(
//           ownerId,
//           "check_is_vendor",
//           { account_id: context.accountId },
//           "final",
//           false
//         ).then((contributorExists) => {
//           if (contributorExists) {
//             asyncFetch(
//               `${apiUrl}/data/credits/vendors/${context.accountId}/balance`
//             ).then(({ body, ok }) => {
//               State.update({
//                 balance: ok ? body : 0,
//                 project: false,
//                 exists: true,
//                 profileIsFetched: true,
//               });
//             });
//           } else {
//             State.update({
//               exists: false,
//               profileIsFetched: true,
//             });
//           }
//         });
//       }
//     });
//   }
// }

// const Actions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: flex-start;
//   gap: 1rem;
// `;

// const GreyButton = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   align-self: stretch;
// `;

// const GreyContent = styled.div`
//   display: flex;
//   padding: 0.4375rem 1rem 0.4375rem 1rem;
//   align-items: center;
//   width: 100%;
//   gap: 0.5rem;
//   align-self: stretch;
//   border-radius: 3.125rem;
//   border: 1px solid var(--ui-elements-light, #eceef0);
//   background: var(--background-light, #fafafa);
//   color: var(--ui-elements-black, #000);
//   text-align: center;
//   font-family: Inter;
//   font-size: 0.875rem;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 142%; /* 1.2425rem */
//   letter-spacing: 0.00875rem;

//   & > span {
//     color: var(--ui-elements-black, #000);
//     leading-trim: both;
//     text-edge: cap;
//     font-family: "Mona Sans";
//     font-size: 0.875rem;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 142%; /* 1.2425rem */
//     letter-spacing: 0.00875rem;
//   }

//   & > b {
//     color: var(--ui-elements-black, #000);
//     leading-trim: both;
//     text-edge: cap;
//     font-family: "Mona Sans";
//     font-size: 0.875rem;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 142%;
//     letter-spacing: 0.00875rem;
//   }

//   & > svg {
//     transform: translateY(-1px);
//   }

//   & > a {
//     color: var(--ui-elements-black, #000);
//     text-decoration: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;

//     &:hover,
//     &:focus,
//     &:active {
//       text-decoration: none;
//       color: var(--ui-elements-black, #000);
//     }
//   }
// `;

const Nav = styled.div`
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  display: flex;
  padding: 0 64px 0 64px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 110px;
  background: #ffffff;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    display: none;
  }

  & > a {
    width: 10rem;
  }
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NavIcon = styled.div`
  text-align: center;
  color: #2e2e2e;
  font-size: 23.95px;
  font-weight: 700;
  line-height: 23.95px;
  word-wrap: break-word;
  margin-right: 48px;
`;

const NavTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NavTab = styled.a`
  :not(:last-child) {
    margin-right: 32px;
  }
  cursor: pointer;
  color: #7b7b7b;
  fontsize: 14;
  fontfamily: Mona-Sans;
  fontweight: 500;
  lineheight: 16;
  wordwrap: break-word;
`;

// const profileIcon = (
//   <Widget
//     src={`${ownerId}/widget/Project.Icon`}
//     props={{ accountId: context.accountId, size: "1.5em" }}
//   />
// );

const tabOptions = [
  { text: "Projects", link: "projects", disabled: false },
  { text: "Pot", link: "pot", disabled: true },
  { text: "Feed", link: "feed", disabled: true },
];

return (
  <Nav>
    <NavLeft>
      <NavIcon>🫕 Potlock</NavIcon>
      <NavTabs>
        {tabOptions.map((tab) => {
          if (tab.disabled) return null;
          return (
            <a href={`?tab=${tab.link}`}>
              <NavTab>{tab.text}</NavTab>
            </a>
          );
        })}
      </NavTabs>
    </NavLeft>
  </Nav>
);
