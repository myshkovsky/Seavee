import { IUserWorkExperience } from "../types/IUser";
import dateToString from "../utils/dateToString";
import { purple } from '@ant-design/colors'
import '../styles/Previews.css'

interface IWork {
  work: IUserWorkExperience
}

function WorkPreview({ work }: IWork) {
  return (
    <ul>
      {work.map(e => (
        <li key={e.uuid} className="list-grid">
          <div className="timespan">
            {dateToString(e.started)} - {e.ended ? dateToString(e.ended) : "Current"}
          </div>
          <div>
            <h2 className="title">
              {e.title}
            </h2>
            <h3 className="subtitle" style={{ color: purple[6] }}>
              {e.company}
            </h3>
          </div>
          <div className="description">
            {e.description}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default WorkPreview