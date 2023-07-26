import { Space } from "antd"
import { IUser } from "../types/IUser"
import WorkPreview from "./WorkPreview"
import EducationPreview from "./EducationPreview"
import InfoPreview from "./InfoPreview"

interface IProps {
  user: IUser
}

function DocumentPreview({ user }: IProps) {
  return (
    <Space className="display">
      <div>
        <InfoPreview info={user.info} />
        <hr />
        <WorkPreview work={user.work}/>
        <hr />
        <EducationPreview education={user.education} />
      </div>
    </Space>
  )
}

export default DocumentPreview