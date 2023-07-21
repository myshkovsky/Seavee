import { useState } from 'react'
import defaultUser from './utils/defaultUser'
import Debug from './components/Debug'
import './styles/App.css'
import { Card, Form, Input } from 'antd'

function App() {
  const [user, setUser] = useState(defaultUser)

  function handleInfoChange(targetProp: string, newValue: string) {
    setUser({...user, info: { ...user.info, [targetProp]: newValue }})
  }

  return (
    <article>
      <Debug user={user}/>
      <Card title="Information" style={{ maxWidth: 400, textAlign: 'center', border: '1px solid #858585' }}>
        <Form
          labelCol={{ span: 8 }}
          layout='horizontal'
        >
          <Form.Item
            name='fullname'
            label='Full name:'
            style={{ marginBottom: "1em" }}
          >
            <Input defaultValue={user.info.fullname} onChange={e => handleInfoChange('fullname', e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail:"
            style={{ marginBottom: "1em" }}
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid e-mail address.'
              },
              {
                required: true,
                message: 'You must enter a valid e-mail address.'
              }
            ]}
          >
            <Input defaultValue={user.info.email} onChange={e => handleInfoChange('email', e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="phone"
            label='Phone number:'
            style={{ marginBottom: "1em" }}
            rules={[{ required: true, message: 'You must enter a phone number.' }]}
          >
            <Input defaultValue={user.info.phone} onChange={e => handleInfoChange('phone', e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="location"
            label='Location:'
            style={{ marginBottom: 0 }}
          >
            <Input defaultValue={user.info.location} onChange={e => handleInfoChange('location', e.target.value)}/>
          </Form.Item>
        </Form>
      </Card>
    </article>
  )
}

export default App