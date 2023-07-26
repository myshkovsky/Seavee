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
      started: new Date(),
      ended: new Date()
    }
  ],
  work: [
    {
      uuid: uuid(),
      title: 'Software Engineer',
      company: 'John Doe Softworks',
      current: true,
      started: new Date(),
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium sapiente molestias quam unde illo vitae id impedit necessitatibus quae? Asperiores praesentium ex modi eligendi mollitia quod doloribus dolor omnis."
    }
  ]
}

export default defaultUser