import { IUserEducationEntry } from "../../../types/IUser"
import dateToString from "../../../utils/dateToString"
import formatDegreeForDisplay from "../../../utils/formatDegreeForDisplay"
import { purple } from '@ant-design/colors'

interface IEntry {
  entry: IUserEducationEntry
}

function ListItem({ entry }: IEntry) {
  return (
    <li key={entry.uuid} className="list-grid">
      <div className="timespan">
        {dateToString(entry.started)} - {entry.ended ? dateToString(entry.ended) : "Current"}
      </div>
      <div>
        <h2 className="title">
          {formatDegreeForDisplay(entry.degree, entry.major)}
        </h2>
        <h3 className="subtitle" style={{ color: purple[6] }}>
          {entry.school}
        </h3>
      </div>
    </li>
  )
}

export default ListItem