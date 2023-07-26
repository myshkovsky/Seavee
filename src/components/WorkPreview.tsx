import { IUserWorkExperience } from "../types/IUser";
import dateToString from "../utils/dateToString";
interface IWork {
  work: IUserWorkExperience
}

function WorkPreview({ work }: IWork) {
  return (
    <ul>
      {work.map(e => (
        <li key={e.uuid}>
          <span style={{ display: "flex" }}>
            <div>
              <h2 className="title work-title">
                {e.title}
              </h2>
              <h3 className="subtitle work-company">
                {dateToString(e.started)} - {e.ended ? dateToString(e.ended) : "Current"} | {e.company}
              </h3>
            </div>
          </span>
          <div>
            {e.description}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default WorkPreview