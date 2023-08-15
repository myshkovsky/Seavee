import { IUserBasicInfo, IUserEducationEntry, IUserWorkExperienceEntry } from "./IUser";

export interface IAction {
  type: string,
  payload?: IUserBasicInfo|IUserWorkExperienceEntry|IUserEducationEntry|string|boolean
}