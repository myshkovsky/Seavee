import { IUserEducation } from "../../types/IUser";
import sortByStartDateDescending from "../../utils/sortByStartDateDescending";
import '../../styles/Previews.css'
import ListItem from "./EducationPreview/ListItem";

interface IEducation {
  education: IUserEducation
}

function EducationPreview({ education }: IEducation) {
  return (
    <ul>
      {education.filter(e => { return e.current }).sort(sortByStartDateDescending).map(e => (
        <ListItem entry={e} key={e.uuid}/>
      ))}
      {education.filter(e => { return !e.current }).sort(sortByStartDateDescending).map(e => (
        <ListItem entry={e} key={e.uuid}/>
      ))}
    </ul>
  )
}

export default EducationPreview