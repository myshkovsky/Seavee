import { useState } from 'react'
import defaultUser from './utils/defaultUser'
// import Debug from './components/Debug'
import './styles/App.css'
import { Button, Card, Checkbox, ConfigProvider, DatePicker, Form, Input, Select, Space } from 'antd'
import { EnumDegrees, IUserEducationEntry, IUserWorkExperienceEntry, TEnumDegrees } from './types/IUser'
import {v4 as uuid} from "uuid"
import DocumentPreview from './components/DocumentPreview'

function App() {
  const [infoDisable, setInfoDisable] = useState(false)
  const [eduFormChecked, setEduFormChecked] = useState(false)
  const [workFormChecked, setWorkFormChecked] = useState(false)
  const [user, setUser] = useState(defaultUser)
  const [infoForm] = Form.useForm()
  const [workForm] = Form.useForm()
  const [eduForm] = Form.useForm()
  const { RangePicker } = DatePicker
  const { TextArea } = Input
  
  function toggleInfoEdit() {
    setInfoDisable(!infoDisable)
  }

  function handleInfoChange(targetProp: string, newValue: string) {
    setUser({...user, info: { ...user.info, [targetProp]: newValue }})
  }

  function handleInfoClear() {
    setUser({...user, info: {fullname: '', title: '', email: '', phone: '', location: '', description: ''}})
    /* The setUser above is too slow to keep up with resetFields, and I can't use `await setUsers`,
    so a setTimeout will have to do. Hopefully 10ms is enough. */
    setTimeout(() => {
      infoForm.resetFields()
    }, 10);
  }

  function handleEduClear() {
    eduForm.resetFields()
    setEduFormChecked(false)
  }

  function handleWorkClear() {
    workForm.resetFields()
    setWorkFormChecked(false)
  }

  // eslint-disable-next-line
  // @ts-ignore
  function handleDateRange(entry, rawValues) {
    const newEntry = entry
    if (Array.isArray(rawValues.range)) {
      newEntry.started = rawValues.range[0]["$d"]
      newEntry.ended = rawValues.range[1]["$d"]
      newEntry.current = false
    } else {
      newEntry.started = rawValues.single?.$d as Date
      newEntry.current = true
    }
    return newEntry
  }

  function handleEduSubmit(rawValues: {school: string, major: string, current: boolean, degree: TEnumDegrees, single?: {"$d": Date}, range?: [{"$d": Date}, {"$d": Date}]}) {
    if (rawValues.single == undefined && rawValues.range == undefined) return
    const degreeKey: TEnumDegrees = rawValues?.degree
    const newEntry: IUserEducationEntry = {
      uuid: uuid(),
      school: rawValues.school as string,
      major: rawValues.major as string,
      degree: EnumDegrees[degreeKey],
      current: rawValues.current,
      started: new Date()
    }
    setUser({...user, education: [...user.education, handleDateRange(newEntry, rawValues)]})
    handleEduClear()
  }

  function handleWorkSubmit(rawValues: {title: string, company: string, description: string, current: boolean, single?: {"$d": Date}, range?: [{"$d": Date}, {"$d": Date}]}) {
    if (rawValues.single == undefined && rawValues.range == undefined) return
    const newEntry: IUserWorkExperienceEntry = {
      uuid: uuid(),
      title: rawValues.title as string,
      company: rawValues.company as string,
      current: rawValues.current,
      description: rawValues.description,
      started: new Date()
    }
    if (Array.isArray(rawValues.range)) {
      newEntry.started = rawValues.range[0]["$d"]
      newEntry.ended = rawValues.range[1]["$d"]
      newEntry.current = false
    } else {
      newEntry.started = rawValues.single?.$d as Date
      newEntry.current = true
    }
    setUser({...user, work: [...user.work, handleDateRange(newEntry, rawValues)]})
  }

  function handleEduCheckboxChange(chk: boolean) {
    setEduFormChecked(chk)
  }

  function handleWorkCheckboxChange(chk: boolean) {
    setWorkFormChecked(chk)
  }

  const theme = {
    "token": {
      "colorPrimary": "#722ed1", // ant.design purple-6
      "colorInfo": "#722ed1", // ant.design purple-6
      "wireframe": false
    }
  }

  const ruleMustFill = [{required: true, message: "This field must be filled."}]

  return (
    <ConfigProvider theme={theme}>
      <section className='main-wrapper'>
        <section className='editor'>
          {/* <Debug user={user}/> */}
          <Card title="Information">
            <Form form={infoForm} labelCol={{ span: 5 }} layout='horizontal' disabled={infoDisable}>
              <Form.Item name='fullname' label='Full name:' initialValue={user.info.fullname} rules={ruleMustFill}>
                <Input onChange={e => handleInfoChange('fullname', e.target.value)}/>
              </Form.Item>
              <Form.Item name='title' label='Title:' initialValue={user.info.title}>
                <Input onChange={e => handleInfoChange('title', e.target.value)}/>
              </Form.Item>
              <Form.Item name="email" label="E-mail:" initialValue={user.info.email}
                rules={[
                  { type: 'email', message: 'This is not a valid e-mail address.' },
                  { required: true, message: 'You must enter a valid e-mail address.' }
                ]}
              >
                <Input onChange={e => handleInfoChange('email', e.target.value)}/>
              </Form.Item>
              <Form.Item name="phone" label='Phone:' initialValue={user.info.phone} rules={ruleMustFill}>
                <Input onChange={e => handleInfoChange('phone', e.target.value)}/>
              </Form.Item>
              <Form.Item name="location" label='Location:' initialValue={user.info.location}>
                <Input onChange={e => handleInfoChange('location', e.target.value)}/>
              </Form.Item>
              <Form.Item name="description" label="Description:" initialValue={user.info.description}>
                <TextArea onChange={e => handleInfoChange('description', e.target.value)}/>
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Space>
                  <Button type='primary' disabled={false} onClick={toggleInfoEdit}>
                    {infoDisable ? 'Edit' : 'Save'}
                  </Button>
                  <Button disabled={false} onClick={handleInfoClear}>
                    Clear
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
          <Card title="Work Experience">
            <Form
              labelCol={{ span: 5 }}
              layout='horizontal'
              form={workForm}
              onFinish={handleWorkSubmit}
            >
              <Form.Item name="title" label='Title:' rules={ruleMustFill}>
                <Input placeholder='Software Engineer'/>
              </Form.Item>
              <Form.Item name="company" label='Company:' rules={ruleMustFill}>
                <Input placeholder='John Doe Softworks'/>
              </Form.Item>
              <Form.Item name='current' label='Current?:' valuePropName='checked'>
                <Checkbox defaultChecked={false} checked={workFormChecked} onChange={e => handleWorkCheckboxChange(e.target.checked)}/>
              </Form.Item>
              { workFormChecked ?
                <Form.Item name='single' label='Start:' rules={ruleMustFill}>
                  <DatePicker picker='month' />
                </Form.Item>
                :
                <Form.Item name='range' label='Start/End:' rules={ruleMustFill}>
                  <RangePicker picker='month' />
                </Form.Item>
              }
              <Form.Item name="description" label="Description:">
                <TextArea placeholder="- Managing a CI/CD pipeline&#13;- Optimizing 'Hello World' for blazingly fast performance"/>
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                  <Button type="default" onClick={handleWorkClear}>
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
              <Form.Item name="school" label='School:' rules={ruleMustFill}>
                <Input placeholder='Harvard University'/>
              </Form.Item>
              <Form.Item name="major" label='Major:' rules={ruleMustFill}>
                <Input placeholder='Computer Science'/>
              </Form.Item>
              <Form.Item name="degree" label='Degree:' rules={ruleMustFill}>
                <Select>
                  <Select.Option value="none">No degree</Select.Option>
                  <Select.Option value="associate">Associate</Select.Option>
                  <Select.Option value="bachelors">Bachelor's</Select.Option>
                  <Select.Option value="masters">Master's</Select.Option>
                  <Select.Option value="doctorate">Doctorate</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name='current' label='Current?:' valuePropName='checked'>
                <Checkbox defaultChecked={false} checked={eduFormChecked} onChange={e => handleEduCheckboxChange(e.target.checked)}/>
              </Form.Item>
              { eduFormChecked ?
                <Form.Item name='single' label='Start:' rules={ruleMustFill}>
                  <DatePicker picker='month' />
                </Form.Item>
                :
                <Form.Item name='range' label='Start/End:' rules={ruleMustFill}>
                  <RangePicker picker='month' />
                </Form.Item>
              }
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
        </section>
        <DocumentPreview user={user} />
      </section>
    </ConfigProvider>
  )
}

export default App