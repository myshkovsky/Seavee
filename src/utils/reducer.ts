import { IAction } from "../types/IAction"
import { IUserEducationEntry, IUserWorkExperienceEntry } from "../types/IUser"
import { blankUser } from "./blankUser"

// eslint-disable-next-line
export function reducer(state: any, action: IAction) {
  switch(action.type) {
    case 'toggleEditMode':
      return {
        ...state,
        editMode: action.payload
      }
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
    case 'showWorkModal':
      return {
        ...state,
        showWorkModal: true
      }
    case 'hideAddWorkModal':
      return {
        ...state,
        showWorkModal: false,
        isEdit: false
      }
    case 'showEduModal':
      return {
        ...state,
        showEduModal: true
      }
    case 'hideAddEduModal':
      return {
        ...state,
        showEduModal: false,
        isEdit: false
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
    case 'updateWorkEntry': {
      return {
        ...state,
        user: {
          ...state.user,
          work: [
            ...state.user.work.filter((v: IUserWorkExperienceEntry) => {
              const p = action.payload as IUserEducationEntry
              return v.uuid != p.uuid
            }),
            action.payload
          ]
        },
        isEdit: false
      }
    }
    case 'removeWorkEntry': {
      return {
        ...state,
        user: {
          ...state.user,
          work: [
            ...state.user.work.filter((v: IUserWorkExperienceEntry) => v.uuid != action.payload)
          ]
        }
      }
    }
    case 'editWorkEntry': {
      return {
        ...state,
        oldEntry: action.payload,
        editMode: true,
        showWorkModal: true
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
    case 'updateEduEntry': {
      return {
        ...state,
        user: {
          ...state.user,
          education: [
            ...state.user.education.filter((v: IUserEducationEntry) => {
              const p = action.payload as IUserEducationEntry
              return v.uuid != p.uuid
            }),
            action.payload
          ]
        }
      }
    }
    case 'removeEduEntry': {
      return {
        ...state,
        user: {
          ...state.user,
          education: [
            ...state.user.education.filter((v: IUserEducationEntry) => v.uuid != action.payload)
          ]
        }
      }
    }
    case 'editEduEntry': {
      return {
        ...state,
        oldEntry: action.payload,
        editMode: true,
        showEduModal: true
      }
    }
    case 'clearEdit': {
      return {
        ...state,
        oldEntry: undefined
      }
    }
    case 'clearUser': {
      return {
        ...state,
        editMode: false,
        oldEntry: undefined,
        user: blankUser
      }
    }
    default:
      console.error('ERROR: Invalid or missing reducer case.', action)
  }
}