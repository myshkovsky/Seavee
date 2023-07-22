import { useState } from 'react'
import defaultUser from './utils/defaultUser'
import Debug from './components/Debug'
import './styles/App.css'
import { Button, Card, DatePicker, Form, Input, Select } from 'antd'

function App() {
  const [user, setUser] = useState(defaultUser)
  const [eduForm] = Form.useForm()

  function handleInfoChange(targetProp: string, newValue: string) {
    setUser({...user, info: { ...user.info, [targetProp]: newValue }})
  }

  function eduFormSubmit(values: unknown) {
    console.log(values)
  }

  //TODO: Use <ConfigProvider> to get rid of the same style for every form item

  return (
    <article>
      <Debug user={user}/>
      <Card title="Information" style={{ maxWidth: 400, textAlign: 'center', border: '1px solid #858585', marginBottom: '1em' }}>
        <Form
          labelCol={{ span: 5 }}
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
            label='Phone:'
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
      <Card title="Education" style={{ maxWidth: 400, textAlign: 'center', border: '1px solid #858585' }}>
        <Form
          labelCol={{ span: 5 }}
          layout='horizontal'
          form={eduForm}
          onFinish={eduFormSubmit}
          style={{ textAlign: 'center' }}
        >
          <Form.Item
            name="school"
            label='School:'
            style={{ marginBottom: "1em" }}
          >
            <Input placeholder='Harvard University'/>
          </Form.Item>
          <Form.Item
            name="major"
            label='Major:'
            style={{ marginBottom: "1em" }}
          >
            <Input placeholder='Computer Science'/>
          </Form.Item>
          <Form.Item
            name="degree"
            label='Degree:'
            style={{ marginBottom: "1em" }}
          >
            <Select style={{ textAlign: 'left', marginBottom: "1em" }}>
              <Select.Option value="associate">Associate</Select.Option>
              <Select.Option value="bachelors">Bachelor's</Select.Option>
              <Select.Option value="masters">Master's</Select.Option>
              <Select.Option value="doctorate">Doctorate</Select.Option>
            </Select>
          </Form.Item>
          <div style={{ textAlign: 'left' }}>
            <Form.Item
              name="start"
              label='Start:'
              style={{ marginBottom: "1em" }}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="end"
              label='End:'
              style={{ marginBottom: "1em" }}
            >
              <DatePicker />
            </Form.Item>
          </div>
          <Button type="primary" htmlType="submit" style={{ marginBottom: 0 }}>
            Submit
          </Button>
        </Form>
      </Card>
    </article>
  )
}

export default App