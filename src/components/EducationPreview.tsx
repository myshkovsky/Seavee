import { EnumDegrees, IUserEducation } from "../types/IUser";
import dateToString from "../utils/dateToString";
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
        <li key={e.uuid}>
          <span style={{ display: "flex" }}>
            <div>
              <h2 className="title ">
                {formatDegreeForDisplay(e.degree, e.major)}
              </h2>
              <h3 className="subtitle work-company">
                {dateToString(e.started)} - {e.ended ? dateToString(e.ended) : "Current"} | {e.school}
              </h3>
            </div>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default WorkPreview