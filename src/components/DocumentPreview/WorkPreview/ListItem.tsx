import { IUserWorkExperienceEntry } from "../../../types/IUser";
import dateToString from "../../../utils/dateToString";
import { purple } from '@ant-design/colors'

interface IEntry {
  entry: IUserWorkExperienceEntry
}

function ListItem({ entry }: IEntry) {
  return (
    <li key={entry.uuid} className="list-grid">
      <div className="timespan">
        {dateToString(entry.started)} - {entry.ended ? dateToString(entry.ended) : "Current"}
      </div>
      <div>
        <h2 className="title">
          {entry.title}
        </h2>
        <h3 className="subtitle" style={{ color: purple[6] }}>
          {entry.company}
        </h3>
      </div>
      <div className="description">
        {entry.description}
      </div>
    </li>
  )
}

export default ListItem