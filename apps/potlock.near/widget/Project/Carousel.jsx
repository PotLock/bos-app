State.init({
  focusedIndex: 0,
});

const move = (direction) => {
  const newIndex = state.focusedIndex + direction;
  // Ensure newIndex is within bounds
  if (newIndex >= 0 && newIndex < props.projects.length - 2) {
    State.update({ focusedIndex: newIndex });
  }
};

const getFocusedIndex = () => {
  return state.focusedIndex;
};

const cardWidth = 411;

const Carousel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 32px;
`;

const Cards = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ translateX }) => translateX}px);
`;

const Card = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: ${cardWidth}px;
  border-radius: 6px;
  transform: ${({ isFocused }) => (isFocused ? "scale(1.2)" : "scale(0.8)")};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0.5)};
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  background-color: white;
  margin-right: ${({ isLast }) =>
    isLast ? "0" : "38px"}; // Add gap only if it is not the last card
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 168;
  margin-bottom: 30px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  //   border-radius: 6px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid white;
  position: absolute;
  bottom: -20px;
  left: 60px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 16px;
`;

const ProjectName = styled.h2`
  font-size: 16px;
  font-weight: 600;
  font-family: mona-sans;
  color: #2e2e2e;
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  box-shadow: 0px -0.699999988079071px 0px rgba(123, 123, 123, 0.36) inset;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(123, 123, 123, 0.36);
`;

const Arrows = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled.button`
  /* styling for arrows */
`;

/*

Calculating the Positioning:
1 centered card: 411px (fixed width)
2 full side cards: 2 * 411px
2 half cards: 2 * (411px/2)
Calculated widths:
[1 centered card] + [2 side cards] + [2 half cards]
[411] + [2 * 411] + [2 * (411/2)]
[411] + [822] + [411]
= 1644px

*/

const totalVisibleWidth = 1644;
const offset = (totalVisibleWidth - cardWidth) / 2; // Calculating offset
const cardMargin = 38; // if using a 38px margin between cards
const cardWithMargin = cardWidth + cardMargin;
// const translateX = -state.focusedIndex * cardWidth + offset; // Adding the offset

const calculateTranslateX = () => {
  // If focused on the first card
  if (state.focusedIndex === 0) {
    return (totalVisibleWidth - cardWithMargin) / 2;
  }
  // If focused on the last card
  else if (state.focusedIndex === props.projects.length - 1) {
    return -((props.projects.length - 1) * cardWithMargin - offset);
  }
  // Any other card in the list
  else {
    return -state.focusedIndex * cardWithMargin + offset;
  }
};

const translateX = calculateTranslateX();

return (
  <>
    <Carousel>
      <Cards translateX={translateX}>
        {props.projects.map((project, index) => (
          <Card
            key={index}
            isFocused={index === state.focusedIndex}
            isVisible={Math.abs(index - state.focusedIndex) <= 1.5}
            isLast={index === props.projects.length - 1}
          >
            <Banner>
              <BannerImage src={project.bannerImage} alt="banner" />
              <ProfileImage src={project.profileImage} alt="profile" />
            </Banner>
            <Info>
              <ProjectName>{project.name}</ProjectName>
              <ProjectDescription>{project.description}</ProjectDescription>
              <Tags>
                {project.tags.map((tag, tagIndex) => (
                  <Tag key={tagIndex}>{tag}</Tag>
                ))}
              </Tags>
            </Info>
          </Card>
        ))}
      </Cards>
    </Carousel>
    <Arrows>
      <Arrow onClick={() => move(-1)} disabled={state.focusedIndex === 0}>
        ←
      </Arrow>
      <Arrow onClick={() => move(1)} disabled={state.focusedIndex === props.projects.length - 1}>
        →
      </Arrow>
    </Arrows>
  </>
);
