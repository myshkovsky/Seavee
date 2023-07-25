import { Space } from "antd"
import { IUser } from "../types/IUser"
import dateToString from "../utils/dateToString"

interface IProps {
  user: IUser
}

function DocumentPreview({ user }: IProps) {
  return (
    <Space className="display">
      <div>
        <span className="info">
          <div>
            <h1 className="info-name">
              {user.info.fullname}
            </h1>
            <h2 className="info-title">
              {user.info.title}
            </h2>
          </div>
          <div>
            <p className="info-phone">
              {user.info.phone}
            </p>
            <p className="info-email">
              {user.info.email}
            </p>
            <p className="info-location">
              {user.info.location}
            </p>
          </div>
          <div className="info-description">
            {user.info.description}
          </div>
        </span>
        <hr />
        <ul>
          {user.work.map(e => (
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
        <hr />
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </Space>
  )
}

export default DocumentPreview