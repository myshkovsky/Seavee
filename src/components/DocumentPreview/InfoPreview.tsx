import { IUserBasicInfo } from "../../types/IUser"
import { PhoneTwoTone, MailTwoTone, HomeTwoTone } from "@ant-design/icons"
import { purple } from "@ant-design/colors"
import '../../styles/Previews.css'

interface IInfo {
  info: IUserBasicInfo
}

function InfoPreview({ info }: IInfo) {
  const iconStyle = { margin: 0, display: "inline" }
  return (
    <>
      <span className="info-box-wrapper">
        <div className="info-box-name-title">
          <h1>{info.fullname}</h1>
          <h2>{info.title}</h2>
        </div>
        <div className="info-box-contact">
          <p>{info.phone} <PhoneTwoTone style={iconStyle} twoToneColor={purple[6]}/></p>
          <p>{info.email} <MailTwoTone style={iconStyle} twoToneColor={purple[6]}/></p>
          <p>{info.location} <HomeTwoTone style={iconStyle} twoToneColor={purple[6]} /></p>
        </div>
      </span>
      <div className="info-box-description">
        {info.description}
      </div>
    </>
  )
}

export default InfoPreview