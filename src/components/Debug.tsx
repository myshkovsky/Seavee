import { IUser } from "../types/IUser";

function Debug(props: { user: IUser }) {
  return (
    <>
      <p>
        {JSON.stringify(props.user)}
      </p>
    </>
  )
}

export default Debug