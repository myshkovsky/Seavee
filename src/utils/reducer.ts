// eslint-disable-next-line
//@ts-ignore
export function reducer(state, action: {type: string, payload?: unknown}) {
  switch(action.type) {
    case 'showInfoModal':
      return {
        ...state,
        showInfoModal: true
      }
    case 'hideInfoModal':
      return {
        ...state,
        showInfoModal: false
      }
    case 'showAddWorkModal':
      return {
        ...state,
        showAddWorkModal: true
      }
    case 'hideAddWorkModal':
      return {
        ...state,
        showAddWorkModal: false
      }
    case 'showAddEduModal':
      return {
        ...state,
        showAddEduModal: true
      }
    case 'hideAddEduModal':
      return {
        ...state,
        showAddEduModal: false
      }
    case 'updateUser':
      return {
        ...state,
        user: {
          ...state.user,
          info: action.payload
        }
      }
    case 'addWorkEntry':
      return {
        ...state,
        user: {
          ...state.user,
          work: [
            ...state.user.work,
            action.payload
          ]
        }
      }
    case 'addEduEntry':
      return {
        ...state,
        user: {
          ...state.user,
          education: [
            ...state.user.education,
            action.payload
          ]
        }
      }
    default:
      console.error('ERROR: Invalid or missing reducer case.', action)
  }
}