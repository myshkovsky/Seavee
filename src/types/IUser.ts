export enum EnumDegrees {
  none = "No degree",
  associate = "Associate",
  bachelors = "Bachelor's",
  masters = "Master's",
  doctorate = "Doctorate"
}

export type TEnumDegrees = "none"|"associate"|"bachelors"|"masters"|"doctorate"


export interface IUserEducationEntry {
  school: string,
  major: string,
  degree: EnumDegrees,
  started?: Date,
  ended?: Date
}

interface IUserWorkExperienceEntry {
  title: string,
  company: string,
  started: Date,
  ended?: Date
}

export interface IUserBasicInfo {
  fullname?: string,
  title?: string,
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

