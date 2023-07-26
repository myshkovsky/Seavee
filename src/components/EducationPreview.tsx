import { EnumDegrees, IUserEducation } from "../types/IUser";
import dateToString from "../utils/dateToString";
import { purple } from "@ant-design/colors"
interface IEducation {
  education: IUserEducation
}

function formatDegreeForDisplay(degree: EnumDegrees, major: string) {
  switch(degree) {
    case "No degree":
      return major
    default:
      return `${degree} in ${major}`
  }
}

function WorkPreview({ education }: IEducation) {
  return (
    <ul>
      {education.map(e => (
        <li key={e.uuid} className="list-grid">
          <div className="timespan">
            {dateToString(e.started)} - {e.ended ? dateToString(e.ended) : "Current"}
          </div>
          <div>
            <h2 className="title">
              {formatDegreeForDisplay(e.degree, e.major)}
            </h2>
            <h3 className="subtitle" style={{ color: purple[6] }}>
              {e.school}
            </h3>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default WorkPreview