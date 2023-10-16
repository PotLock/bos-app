const ownerId = "potlock.near";

const HeroOuter = styled.div`
  padding: 136px 64px;
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Separator = styled.div`
  width: 100%;
  height: 96px;
  background-color: #f8f8f8;
`;

const SectionTitle = styled.div`
  font-size: 48px;
  font-weight: 600;
  color: #2e2e2e;
  font-family: Lora;
  width: 100%;
  text-align: center;
`;

const sampleProjects = [
  {
    name: "Space Explorer",
    description: "Navigate through the uncharted territories of outer space.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["React", "GraphQL"],
  },
  {
    name: "Weather App",
    description: "Get the latest weather updates for your location.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["Vue", "REST API"],
  },
  {
    name: "Recipe Book",
    description: "Find and save your favorite recipes.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["Angular", "Firebase"],
  },
  {
    name: "Fitness Tracker",
    description: "Monitor your fitness journey.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["Svelte", "MongoDB"],
  },
  {
    name: "Bookstore",
    description: "Discover and purchase books online.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["React", "Stripe API"],
  },
  {
    name: "Job Finder",
    description: "Connect employers and job seekers.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["Python", "Django"],
  },
  {
    name: "Social Media App",
    description: "Connect with friends and family.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["MERN Stack"],
  },
  {
    name: "E-commerce Platform",
    description: "Shop your favorite items online.",
    bannerImage:
      "https://nftstorage.link/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci",
    profileImage:
      "https://nftstorage.link/ipfs/bafkreibwq2ucyui3wmkyowtzau6txgbsp6zizy4l2s5hkymsyv6tc75j3u",
    tags: ["MERN Stack"],
  },
];

return (
  <>
    <Widget
      src={`${ownerId}/widget/Components.Header`}
      props={{
        title1: "Transforming",
        title2: "Funding for Public Goods",
        description:
          "Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra arcu eu sed consequat.",
        centered: true,
        buttonPrimary: (
          <Widget
            src={`${ownerId}/widget/Buttons.Button`}
            props={{
              type: "primary",
              text: "Explore projects",
              disabled: false,
            }}
          />
        ),
        buttonSecondary: (
          <Widget
            src={`${ownerId}/widget/Buttons.Button`}
            props={{
              type: "secondary",
              text: "Create project",
              disabled: false,
              href: `?tab=createproject`,
            }}
          />
        ),
      }}
    />
    <Separator />
    <SectionTitle>Featured projects</SectionTitle>
    <Widget
      src={`${ownerId}/widget/Project.Carousel`}
      props={{
        projects: sampleProjects,
      }}
    />
  </>
);
