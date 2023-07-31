import { IUser } from "../types/IUser"
import WorkPreview from "./DocumentPreview/WorkPreview"
import EducationPreview from "./DocumentPreview/EducationPreview"
import InfoPreview from "./DocumentPreview/InfoPreview"

interface IProps {
  user: IUser
}

function DocumentPreview({ user }: IProps) {
  return (
    <section>
      <div className="display">
        <InfoPreview info={user.info} />
        <hr style={{ margin: '0 1rem' }} />
        <WorkPreview work={user.work}/>
        <hr style={{ color: '#e8e8e8', margin: '0 1rem' }} />
        <EducationPreview education={user.education} />
      </div>
    </section>
  )
}

export default DocumentPreview