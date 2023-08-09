import { EnumDegrees, IUser } from "../types/IUser"
import {v4 as uuid} from "uuid"

const defaultUser: IUser = {
  info: {
    fullname: 'John Doe',
    title: 'Software Engineer',
    email: 'JohnDoe@gmail.com',
    phone: '+1 111-222-333',
    location: 'Poland, OH',
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium sapiente molestias quam unde illo vitae id impedit necessitatibus quae? Asperiores praesentium ex modi eligendi mollitia quod doloribus dolor omnis."
  },
  education: [
    {
      uuid: uuid(),
      school: "Harvard University",
      major: "Computer Science",
      degree: EnumDegrees.doctorate,
      current: false,
      started: new Date("9 Jun 2005"),
      ended: new Date()
    },
    {
      uuid: uuid(),
      school: "Harvard University",
      major: "Law",
      degree: EnumDegrees.associate,
      current: false,
      started: new Date("12 Jan 1999"),
      ended: new Date()
    },
    {
      uuid: uuid(),
      school: "Harvard University",
      major: "Psychology",
      degree: EnumDegrees.masters,
      current: true,
      started: new Date("3 Jan 1997")
    }
  ],
  work: [
    {
      uuid: uuid(),
      title: 'Software Engineer',
      company: 'John Doe Softworks',
      current: true,
      started: new Date("18 Mar 2007"),
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium sapiente molestias quam unde illo vitae id impedit necessitatibus quae? Asperiores praesentium ex modi eligendi mollitia quod doloribus dolor omnis."
    },
    {
      uuid: uuid(),
      title: 'Software Engineer',
      company: 'Google',
      current: true,
      started: new Date("23 Dec 2009"),
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium sapiente molestias quam unde illo vitae id impedit necessitatibus quae? Asperiores praesentium ex modi eligendi mollitia quod doloribus dolor omnis."
    },
    {
      uuid: uuid(),
      title: 'Software Engineer',
      company: 'Ohio Softworks',
      current: false,
      started: new Date("13 Apr 2005"),
      ended: new Date(),
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium sapiente molestias quam unde illo vitae id impedit necessitatibus quae? Asperiores praesentium ex modi eligendi mollitia quod doloribus dolor omnis."
    },
    {
      uuid: uuid(),
      title: 'Software Engineer',
      company: 'Facebook',
      current: false,
      started: new Date("5 Aug 2001"),
      ended: new Date(),
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium sapiente molestias quam unde illo vitae id impedit necessitatibus quae? Asperiores praesentium ex modi eligendi mollitia quod doloribus dolor omnis."
    }
  ]
}

export default defaultUser