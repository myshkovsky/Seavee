import { useState } from 'react'
import defaultUser from './utils/defaultUser'
import Debug from './components/Debug'
import './styles/App.css'
import { Button, Card, ConfigProvider, DatePicker, Form, Input, Select, Space } from 'antd'
import { IUserBasicInfo } from './types/IUser'

function App() {
  const [user, setUser] = useState(defaultUser)
  
  const [eduForm] = Form.useForm<IUserBasicInfo>()
  const { RangePicker } = DatePicker
  
  function handleInfoChange(targetProp: string, newValue: string) {
    setUser({...user, info: { ...user.info, [targetProp]: newValue }})
  }

  function handleEduClear() {

  }

  function eduFormSubmit(values: unknown) {
    console.log(values)
  }

  //TODO: Use <ConfigProvider> to get rid of the same style for every form item
  const theme = {
    "token": {
      "colorPrimary": "#6c48c5",
      "colorInfo": "#6c48c5",
      "wireframe": false
    }
  }

  return (
    <ConfigProvider theme={theme}>
      <article className='main-wrapper'>
        <Debug user={user}/>
        <Card title="Information">
          <Form labelCol={{ span: 5 }} layout='horizontal'>
            <Form.Item name='fullname' label='Full name:'>
              <Input defaultValue={user.info.fullname} onChange={e => handleInfoChange('fullname', e.target.value)}/>
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail:"
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
              rules={[{ required: true, message: 'You must enter a phone number.' }]}
            >
              <Input defaultValue={user.info.phone} onChange={e => handleInfoChange('phone', e.target.value)}/>
            </Form.Item>
            <Form.Item name="location" label='Location:'>
              <Input defaultValue={user.info.location} onChange={e => handleInfoChange('location', e.target.value)}/>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button>
                Toggle edit mode
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="Education">
          <Form
            labelCol={{ span: 5 }}
            layout='horizontal'
            form={eduForm}
            onFinish={eduFormSubmit}
          >
            <Form.Item name="school" label='School:'>
              <Input placeholder='Harvard University'/>
            </Form.Item>
            <Form.Item name="major" label='Major:'>
              <Input placeholder='Computer Science'/>
            </Form.Item>
            <Form.Item name="degree" label='Degree:'>
              <Select>
                <Select.Option value="none">No degree</Select.Option>
                <Select.Option value="associate">Associate</Select.Option>
                <Select.Option value="bachelors">Bachelor's</Select.Option>
                <Select.Option value="masters">Master's</Select.Option>
                <Select.Option value="doctorate">Doctorate</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='range' label='Start / End'>
              <RangePicker picker='month' />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
                <Button type="default" onClick={handleEduClear}>
                  Clear
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Card>

        </Card>
      </article>
    </ConfigProvider>
  )
}

export default App