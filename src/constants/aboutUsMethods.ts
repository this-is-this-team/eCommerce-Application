interface IAboutUsMethods {
  title: string;
  description: string;
}

const aboutUsMethods: IAboutUsMethods[] = [
  {
    title: 'Correct team formation and distribution of roles',
    description:
      'This is the initial stage of project team development, where all involved participants get to know each other. The leader of the project establishes favorable relationships and interactions within the work group. The team studies the main goals and objectives, begins to develop common norms and agree on values, as well as the distribution of roles in the team.',
  },
  {
    title: 'Apply project management methodologies',
    description:
      'Methodologies help to record the completion time of different types of tasks and correct weak points in time. We used Kanban and Scrum methodologies.',
  },
  {
    title: 'Set up team communication',
    description:
      'Decide on a fixed daily time, "sunday retrospectives" - meetings where they discuss the past week and decide what processes can be improved, chat and a Discord channel - necessary things that we have implemented for convenient communication in the team!',
  },
  {
    title: 'Provide team members with regular feedback and task reviews',
    description:
      'Feedback from each team member helps our team understand how we are doing the job - what we are already doing well and what skills need to be improved. Also, a code-review before merging is a way to look at the code from a different perspective and identify errors that might have been missed, suggest or recommend good practices, and it also improves the reviewer’s ability to see other people’s code.',
  },
];

export default aboutUsMethods;
