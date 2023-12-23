// get projects
const { ownerId, potId } = props;

const projects = Near.view(potId, "get_approved_applications", {});
console.log("projects: ", projects);

if (!projects) return "Loading...";

return (
  <Widget
    src={`${ownerId}/widget/Components.ListSection`}
    props={{
      items: projects,
      renderItem: (project) => {
        console.log("project: ", project);
        return (
          <Widget
            src={`${ownerId}/widget/Project.Card`}
            props={{
              ...props,
              potId,
              projectId: project.project_id,
              // button: (
              //   <Widget
              //     src={`${ownerId}/widget/Components.Button`}
              //     props={{
              //       type: "primary",
              //       text: "Donate",
              //       onClick: handleDonate,
              //     }}
              //   />
              // ),
              // TODO: add prop indicating that button should read "Donate" and providing onClick method
            }}
          />
        );
      },
    }}
  />
);
