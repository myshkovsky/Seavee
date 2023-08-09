import { IUserEducationEntry, IUserWorkExperienceEntry } from "../types/IUser";

function sortByStartDateDescending(
  a: IUserEducationEntry|IUserWorkExperienceEntry,
  b: IUserEducationEntry|IUserWorkExperienceEntry
) {
  console.log('test', a.started.getTime(), b.started.getTime())
  if (a.started.getTime() < b.started.getTime()) {
    return 1;
  }
  if (a.started.getTime() > b.started.getTime()) {
    return -1;
  }
  return 0;
}

export default sortByStartDateDescending