import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { useContext } from "react";
import { StateContext } from "../../App";
import { IUserEducationEntry, IUserWorkExperienceEntry } from "../../types/IUser";

interface IProps {
  entry: IUserWorkExperienceEntry|IUserEducationEntry,
  type: 'Edu'|'Work'
}

function EditModeButtons({ entry, type }: IProps) {
  const [state, dispatch] = useContext(StateContext)

  function deleteEntry() {
    dispatch({
      type: `remove${type}Entry`,
      payload: entry.uuid
    })
  }

  function editEntry() {
    dispatch({
      type: `edit${type}Entry`,
      payload: entry
    })
  }

  return (
    <span className="btn-group-title" style={{visibility: state.editMode ? 'visible' : 'collapse'}}>
      <Button onClick={editEntry} shape="circle">
        <FontAwesomeIcon icon={faPencil} />
      </Button>
      &nbsp;
      <Button onClick={deleteEntry} danger shape="circle">
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </span>
  )
}

export default EditModeButtons


