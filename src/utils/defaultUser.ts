import { EnumDegrees, IUser } from "../types/IUser"
import {v4 as uuid} from "uuid"

const defaultUser: IUser = {
  info: {
    fullname: 'John Doe',
    title: 'Software Engineer',
    email: 'JohnDoe@gmail.com',
    phone: '+1 111-222-333',
    location: 'Poland, OH',
    description: 'I am a Software Engineer of 10 years and mainly work with back-end solutions built with C++.'
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
      description: 'Doing stuff and things with more stuff and things :)'
    }
  ]
}

export default defaultUser