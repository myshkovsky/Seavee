import { IUser } from "../types/IUser";

function Debug(props: { user: IUser }) {
  return (
    <>
      <div style={{ maxWidth: 400, overflow: 'scroll' }}>
        {JSON.stringify(props.user)}
      </div>
    </>
  )
}

export default Debug