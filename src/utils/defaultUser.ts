import { IUser } from "../types/IUser";

const defaultUser: IUser = {
  info: {
    firstname: 'John',
    lastname: 'Doe',
    
  },
  education: [
    {
      school: "Harvard University",
      major: "Computer Science",
      degree: "PhD",
      started: new Date(),
    }
  ],
  work: [
    {
      title: 'Software Engineer',
      company: 'John Doe Softworks',
      started: new Date(),
    }
  ]
} as IUser

export default defaultUser