import { useState } from 'react'
import Education from './components/Education'
import WorkExperience from './components/WorkExperience'
import defaultUser from './utils/defaultUser'
import './styles/App.css'
import Input from './components/Input'
import Debug from './components/Debug'

function App() {
  const [user, setUser] = useState(defaultUser)

  function handleChange(propName: string, newValue: string) {
    switch(propName) {
      case 'firstname':
        setUser({ ...user, info: { ...user.info, firstname: newValue }})
        break
      case 'lastname':
        setUser({ ...user, info: { ...user.info, lastname: newValue }})
        break
      case 'phone':
        setUser({ ...user, info: { ...user.info, phone: newValue }})
        break
      case 'location':
        setUser({ ...user, info: { ...user.info, location: newValue }})
        break
      case 'email':
        setUser({ ...user, info: { ...user.info, email: newValue }})
        break
      default:
        console.error('Invalid propName')
        break
    }
  }

  return (
    <article>
      <Debug user={user}/>
      <div className='form'>

      </div>
      <div className='basic-info'>
        <Input label="First name:" type="text" id="firstname" writable={newValue => handleChange('firstname', newValue as string)} value={user.info.firstname} />
      </div>
      <Education/>
      <WorkExperience/>
    </article>
  )
}

export default App