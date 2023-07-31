import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import { IUserWorkExperienceEntry } from "../types/IUser";
import { Rule } from "antd/es/form";
import { Dispatch, useState } from "react";
import { handleDateRange } from "../utils/handleDateRange";
import {v4 as uuid} from "uuid"
const { RangePicker } = DatePicker
const { TextArea } = Input

interface IProps {
  rules: Rule[],
  isVisible: boolean,
  dispatch: Dispatch<{type: string, payload?: unknown}>
}

interface IFormProps {
  title: string,
  company: string,
  description: string,
  current: boolean,
  single?: {"$d": Date},
  range?: [{"$d": Date}, {"$d": Date}]
}

function AddWork({rules, isVisible, dispatch}: IProps) {
  const [workForm] = Form.useForm()
  const [checkbox, setCheckbox] = useState(false)

  function handleCancel() {
    dispatch({type: 'hideAddWorkModal'})
  }

  function handleAddEntry() {
    workForm.submit()
    setTimeout(() => {
      setCheckbox(false)
      workForm.resetFields()
    }, 100)
    dispatch({type: 'hideAddWorkModal'})
  }

  function handleCheckboxChange(checked: boolean) {
    setCheckbox(checked)
  }

  function handleFormSubmit(rawValues: IFormProps) {
    console.log('hfs', rawValues)
    if (rawValues.single == undefined && rawValues.range == undefined) return
    const newEntry: IUserWorkExperienceEntry = {
      uuid: uuid(),
      title: rawValues.title as string,
      company: rawValues.company as string,
      current: rawValues.current,
      description: rawValues.description,
      started: new Date()
    }
    dispatch({
      type: 'addWorkEntry',
      payload: handleDateRange(newEntry, rawValues) as IUserWorkExperienceEntry
    })
  }

  return (
    <Modal
      open={isVisible}
      title="Add work experience"
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleAddEntry}>
          Add
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>
      ]}
    >
      <Form
        labelCol={{ span: 5 }}
        layout='horizontal'
        form={workForm}
        onFinish={handleFormSubmit}
      >
        <Form.Item name="title" label='Title:' rules={rules}>
          <Input placeholder='Software Engineer'/>
        </Form.Item>
        <Form.Item name="company" label='Company:' rules={rules}>
          <Input placeholder='John Doe Softworks'/>
        </Form.Item>
        <Form.Item name='current' label='Current?:' valuePropName='checked'>
          <Checkbox defaultChecked={false} checked={checkbox} onChange={e => handleCheckboxChange(e.target.checked)}/>
        </Form.Item>
        { checkbox ?
          <Form.Item name='single' label='Start:' rules={rules}>
            <DatePicker picker='month' />
          </Form.Item>
          :
          <Form.Item name='range' label='Start/End:' rules={rules}>
            <RangePicker picker='month' />
          </Form.Item>
        }
        <Form.Item name="description" label="Description:">
          <TextArea placeholder="- Managing a CI/CD pipeline&#13;- Optimizing 'Hello World' for blazingly fast performance"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddWork