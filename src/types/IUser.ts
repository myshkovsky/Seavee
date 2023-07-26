export enum EnumDegrees {
  none = "No degree",
  associate = "Associate",
  bachelors = "Bachelor's",
  masters = "Master's",
  doctorate = "Doctorate"
}

export type TEnumDegrees = "none"|"associate"|"bachelors"|"masters"|"doctorate"


export interface IUserEducationEntry {
  uuid: string,
  school: string,
  major: string,
  degree: EnumDegrees,
  current: boolean,
  started: Date,
  ended?: Date
}

export interface IUserWorkExperienceEntry {
  uuid: string,
  title: string,
  company: string,
  current: boolean,
  started: Date,
  ended?: Date,
  description?: string
}

export interface IUserBasicInfo {
  fullname?: string,
  title?: string,
  email?: string,
  phone?: string,
  location?: string
  description?: string,
}

export interface IUserEducation extends Array<IUserEducationEntry>{}

export interface IUserWorkExperience extends Array<IUserWorkExperienceEntry>{}

export interface IUser {
  info: IUserBasicInfo,
  education: IUserEducation,
  work: IUserWorkExperience
}

