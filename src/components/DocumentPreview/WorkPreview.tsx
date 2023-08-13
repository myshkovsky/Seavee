import '../../styles/Previews.css'
import { IUserWorkExperience } from '../../types/IUser';
import sortByStartDateDescending from "../../utils/sortByStartDateDescending";
import ListItem from './WorkPreview/ListItem';

interface IWork {
  work: IUserWorkExperience
}

function WorkPreview({ work }: IWork) {
  return (
    <ul>
      {work.filter(e => { return e.current }).sort(sortByStartDateDescending).map(e => (
        <ListItem entry={e} key={e.uuid}/>
      ))}
      {work.filter(e => { return !e.current }).sort(sortByStartDateDescending).map(e => (
        <ListItem entry={e} key={e.uuid}/>
      ))}
    </ul>
  )
}

export default WorkPreview