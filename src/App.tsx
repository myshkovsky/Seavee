import { useState } from 'react'
import defaultUser from './utils/defaultUser'
import Debug from './components/Debug'
import './styles/App.css'
import { Button, Card, ConfigProvider, DatePicker, Form, Input, Select, Space } from 'antd'
import { EnumDegrees, TEnumDegrees } from './types/IUser'

function App() {
  const [infoDisable, setInfoDisable] = useState(false)
  const [user, setUser] = useState(defaultUser)
  const [infoForm] = Form.useForm()
  const [eduForm] = Form.useForm()
  const { RangePicker } = DatePicker
  
  function toggleInfoEdit() {
    setInfoDisable(!infoDisable)
  }

  function handleInfoChange(targetProp: string, newValue: string) {
    setUser({...user, info: { ...user.info, [targetProp]: newValue }})
  }

  function handleEduClear() {
    eduForm.resetFields()
  }

  function handleInfoClear() {
    infoForm.resetFields()
  }

  function handleEduSubmit(rawValues: {school: string, major: string, degree: TEnumDegrees, range: [{"$d": Date}?, {"$d": Date}?]}) {
    const degreeKey: TEnumDegrees = rawValues?.degree
    const newEntry = {
      school: rawValues.school as string,
      major: rawValues.major as string,
      degree: EnumDegrees[degreeKey],
      started: (rawValues.range[0] != undefined ? rawValues.range[0]["$d"] : undefined),
      ended: (rawValues.range[1] != undefined ? rawValues.range[1]["$d"] : undefined)
    }
    setUser({...user, education: [...user.education, newEntry]})
    handleEduClear()
  }

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
          <Form form={infoForm} labelCol={{ span: 5 }} layout='horizontal' disabled={infoDisable}>
            <Form.Item name='fullname' label='Full name:' initialValue={user.info.fullname}>
              <Input onChange={e => handleInfoChange('fullname', e.target.value)}/>
            </Form.Item>
            <Form.Item name='title' label='Title:' initialValue={user.info.title}>
              <Input onChange={e => handleInfoChange('title', e.target.value)}/>
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail:"
              initialValue={user.info.email}
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
              <Input onChange={e => handleInfoChange('email', e.target.value)}/>
            </Form.Item>
            <Form.Item
              name="phone"
              label='Phone:'
              initialValue={user.info.phone}
              rules={[{ required: true, message: 'You must enter a phone number.' }]}
            >
              <Input defaultValue={user.info.phone} onChange={e => handleInfoChange('phone', e.target.value)}/>
            </Form.Item>
            <Form.Item name="location" label='Location:' initialValue={user.info.location}>
              <Input onChange={e => handleInfoChange('location', e.target.value)}/>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Space>
                <Button type='primary' disabled={false} onClick={toggleInfoEdit}>
                  Edit
                </Button>
                <Button disabled={false} onClick={handleInfoClear}>
                  Clear
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Card title="Education">
          <Form
            labelCol={{ span: 5 }}
            layout='horizontal'
            form={eduForm}
            onFinish={handleEduSubmit}
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