interface IUserEducationEntry {
  school: string,
  major: string,
  degree: string,
  started: Date,
  ended?: Date
}

interface IUserWorkExperienceEntry {
  title: string,
  company: string,
  started: Date,
  ended?: Date
}

export interface IUserBasicInfo {
  firstname?: string,
  lastname?: string,
  email?: string,
  phone?: string,
  location?: string
}

export interface IUserEducation extends Array<IUserEducationEntry>{}

export interface IUserWorkExperience extends Array<IUserWorkExperienceEntry>{}

export interface IUser {
  info: IUserBasicInfo,
  education: IUserEducation,
  work: IUserWorkExperience
}

