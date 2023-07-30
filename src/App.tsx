import { useState } from 'react'
import defaultUser from './utils/defaultUser'
// import Debug from './components/Debug'
import './styles/App.css'
import { Button, Checkbox, ConfigProvider, DatePicker, Form, Input, Layout, Modal, Select } from 'antd'
import { EnumDegrees, IUserBasicInfo, IUserEducationEntry, IUserWorkExperienceEntry, TEnumDegrees } from './types/IUser'
import {v4 as uuid} from "uuid"
import DocumentPreview from './components/DocumentPreview'
import { Content, Header } from 'antd/es/layout/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [eduFormChecked, setEduFormChecked] = useState(false)
  const [workFormChecked, setWorkFormChecked] = useState(false)
  const [user, setUser] = useState(defaultUser)
  const [infoForm] = Form.useForm()
  const [workForm] = Form.useForm()
  const [eduForm] = Form.useForm()
  const { RangePicker } = DatePicker
  const { TextArea } = Input

  function handleInfoClear() {
    infoForm.setFields([
      { name: ['fullname'], value: '' },
      { name: ['title'], value: '' },
      { name: ['email'], value: '' },
      { name: ['phone'], value: '' },
      { name: ['location'], value: '' },
      { name: ['description'], value: '' },
    ])
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

  function handleInfoSubmit(values: IUserBasicInfo) {
    setUser({...user, info: { ...user.info, ...values }})
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

  // info modal section
  const [openEditInfoModal, setOpenEditInfoModal] = useState(false);

  function showInfoModal() {
    setOpenEditInfoModal(true);
  }

  function handleInfoModalSave() {
    infoForm.submit()
    setOpenEditInfoModal(false)
  }

  function handleInfoModalCancel() {
    setOpenEditInfoModal(false)
    infoForm.resetFields()
  }

  // work modal section
  const [openAddWorkExperience, setOpenAddWorkExperience] = useState(false)

  function showAddWorkExperienceModal() {
    setOpenAddWorkExperience(true)
  }

  function handleAddWorkExperienceCancel() {
    setOpenAddWorkExperience(false)
    handleWorkClear()
  }

  function handleAddWorkExperience() {
    workForm.submit()
    setTimeout(() => {
      handleAddWorkExperienceCancel()
    }, 100);
  }

  // education modal section
  const [openAddEducation, setOpenAddEducation] = useState(false)

  function showAddEducationModal() {
    setOpenAddEducation(true)
  }

  function handleAddEducationCancel() {
    setOpenAddEducation(false)
    handleEduClear()
  }

  function handleAddEducation() {
    eduForm.submit()
    setTimeout(() => {
      handleAddEducationCancel()
    }, 100);
  }

  return (
    <Layout hasSider={false}>
      <ConfigProvider theme={theme}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            gap: 10,
            textAlign: 'center',
            background: "#191919"
          }}
        >
          <Button type="primary" shape="circle" size='large' onClick={showInfoModal}>
            <FontAwesomeIcon icon={faUser} />
          </Button>
          &nbsp;
          <Button type="primary" shape="circle" size='large' onClick={showAddWorkExperienceModal}>
            <FontAwesomeIcon icon={faBriefcase} />
          </Button>
          &nbsp;
          <Button type="primary" shape="circle" size='large' onClick={showAddEducationModal}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </Button>
        </Header>
        <Content style={{ height: '90vh' }}>
          {/* Edit info */}
          <Modal
            open={openEditInfoModal}
            title="Edit information"
            onCancel={handleInfoModalCancel}
            footer={[
              <Button key="submit" type="primary" onClick={handleInfoModalSave}>
                Save
              </Button>,
              <Button onClick={handleInfoClear}>
                Clear
              </Button>
            ]}
          >
            <Form form={infoForm} labelCol={{ span: 5 }} layout='horizontal' onFinish={handleInfoSubmit}>
              <Form.Item name='fullname' label='Full name:' initialValue={user.info.fullname} rules={ruleMustFill}>
                <Input placeholder='John Doe'/>
              </Form.Item>
              <Form.Item name='title' label='Title:' initialValue={user.info.title}>
                <Input placeholder='Software Engineer'/>
              </Form.Item>
              <Form.Item name="email" label="E-mail:" initialValue={user.info.email}
                rules={[
                  { type: 'email', message: 'This is not a valid e-mail address.' },
                  { required: true, message: 'You must enter a valid e-mail address.' }
                ]}
              >
                <Input placeholder='JohnDoe@jdsoftworks.com'/>
              </Form.Item>
              <Form.Item name="phone" label='Phone:' initialValue={user.info.phone} rules={ruleMustFill}>
                <Input placeholder='+1 234-456-7890'/>
              </Form.Item>
              <Form.Item name="location" label='Location:' initialValue={user.info.location}>
                <Input placeholder='Warsaw, Ohio, USA'/>
              </Form.Item>
              <Form.Item name="description" label="Description:" initialValue={user.info.description}>
                <TextArea placeholder='Briefly describe who you are and what you do.'/>
              </Form.Item>
            </Form>
          </Modal>
          {/* Add work experience */}
          <Modal
            open={openAddWorkExperience}
            title="Add work experience"
            onCancel={handleAddWorkExperienceCancel}
            footer={[
              <Button key="submit" type="primary" onClick={handleAddWorkExperience}>
                Add
              </Button>,
              <Button onClick={handleAddWorkExperienceCancel}>
                Cancel
              </Button>
            ]}
          >
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
            </Form>
          </Modal>
          {/* Add education */}
          <Modal
            open={openAddEducation}
            title="Add work experience"
            onCancel={handleAddEducationCancel}
            footer={[
              <Button key="submit" type="primary" onClick={handleAddEducation}>
                Add
              </Button>,
              <Button onClick={handleAddEducationCancel}>
                Cancel
              </Button>
            ]}
          >
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
            </Form>
          </Modal>
          <DocumentPreview user={user} />
        </Content>
      </ConfigProvider>
    </Layout>
  )
}

export default App