import { EnumDegrees } from "../types/IUser"

function formatDegreeForDisplay(degree: EnumDegrees, major: string) {
  switch(degree) {
    case "No degree":
      return major
    default:
      return `${degree} in ${major}`
  }
}

export default formatDegreeForDisplay