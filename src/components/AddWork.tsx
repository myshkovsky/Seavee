import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import { IUserWorkExperienceEntry } from "../types/IUser";
import { Rule } from "antd/es/form";
import { useContext, useEffect, useState } from "react";
import { handleDateRange } from "../utils/handleDateRange";
import {v4 as uuid} from "uuid"
import { StateContext } from "../App";
const { RangePicker } = DatePicker
const { TextArea } = Input
import dayjs from 'dayjs'

interface IProps {
  rules: Rule[],
  isVisible: boolean
}

interface IFormProps {
  title: string,
  company: string,
  description: string,
  current: boolean,
  single?: {"$d": Date},
  range?: [{"$d": Date}, {"$d": Date}]
}

function AddWork({ rules, isVisible }: IProps) {
  const [workForm] = Form.useForm()
  const [state, dispatch] = useContext(StateContext)
  const [checkbox, setCheckbox] = useState(state.oldEntry?.current || false)

  useEffect(() => {
    setCheckbox(state.oldEntry?.current ? true : false)
    if (state.oldEntry === undefined) return
    workForm.setFieldsValue({
      title: state.oldEntry?.title,
      company: state.oldEntry?.company,
      description: state.oldEntry?.description,
      current: state.oldEntry?.current
    })
    if (state.oldEntry?.current) {
      workForm.setFieldsValue({
        single: dayjs(state.oldEntry.started)
      })
    } else {
      workForm.setFieldsValue({
        range: [
          dayjs(state.oldEntry.started),
          dayjs(state.oldEntry.ended)
        ]
      })
    }
  }, [state.oldEntry, workForm])

  function handleCancel() {
    workForm.resetFields()
    dispatch({type: 'hideAddWorkModal'})
    dispatch({type: 'clearEdit'})
    setCheckbox(false)
  }

  function handleEntrySubmit() {
    workForm.submit()
    setTimeout(() => {
      setCheckbox(false)
      workForm.resetFields()
      dispatch({type: 'clearEdit'})
    }, 100)
    dispatch({type: 'hideAddWorkModal'})
  }

  function handleCheckboxChange(checked: boolean) {
    setCheckbox(checked)
  }

  function handleFormSubmit(rawValues: IFormProps) {
    if (rawValues.single == undefined && rawValues.range == undefined) return
    if (!state.editMode) {
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
    } else if (state.editMode && state.oldEntry) {
      const updatedEntry: IUserWorkExperienceEntry = {
        uuid: state.oldEntry?.uuid,
        title: rawValues.title as string,
        company: rawValues.company as string,
        current: rawValues.current,
        description: rawValues.description,
        started: new Date()
      }
      dispatch({
        type: 'updateWorkEntry',
        payload: handleDateRange(updatedEntry, rawValues) as IUserWorkExperienceEntry
      })
    } else {
      throw new Error("ERROR: Failed to fetch oldEntry value for edit. Refresh the page and try again. If the error persists, contact the maintainer.")
    }
  }

  return (
    <Modal
      open={isVisible}
      title={state.editMode ? "Edit work experience" : "Add work experience"}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleEntrySubmit}>
          {state.editMode ? "Save" : "Add"}
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