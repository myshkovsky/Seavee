import { EnumDegrees, IUser } from "../types/IUser";

const defaultUser: IUser = {
  info: {
    fullname: 'John Doe'
  },
  education: [
    {
      school: "Harvard University",
      major: "Computer Science",
      degree: EnumDegrees.doctorate,
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
}

export default defaultUser