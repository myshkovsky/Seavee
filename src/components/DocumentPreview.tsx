import { Space } from "antd"
import { IUser } from "../types/IUser"
import WorkPreview from "./WorkPreview"
import EducationPreview from "./EducationPreview"

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
        <WorkPreview work={user.work}/>
        <hr />
        <EducationPreview education={user.education} />
      </div>
    </Space>
  )
}

export default DocumentPreview