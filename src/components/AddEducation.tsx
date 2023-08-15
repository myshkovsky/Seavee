import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import { Rule } from "antd/es/form";
import { useContext, useEffect, useState } from "react";
import { EnumDegrees, EnumDegreesMirror, IUserEducationEntry, TEnumDegrees, TEnumDegreesMirror } from "../types/IUser";
import { handleDateRange } from "../utils/handleDateRange";
import { v4 as uuid } from "uuid"
import { StateContext } from "../App";
const { RangePicker } = DatePicker
import dayjs from 'dayjs'

interface IProps {
  rules: Rule[],
  isVisible: boolean,
}

interface IFormProps {
  school: string,
  major: string,
  current: boolean,
  degree: TEnumDegrees,
  single?: {"$d": Date},
  range?: [{"$d": Date}, {"$d": Date}]
}

function AddEducation({rules, isVisible}: IProps) {
  const [eduForm] = Form.useForm()
  const [state, dispatch] = useContext(StateContext)
  const [checkbox, setCheckbox] = useState(state.oldEntry?.current || false)

  useEffect(() => {
    setCheckbox(state.oldEntry?.current ? true : false)
    const degreeKey: TEnumDegreesMirror = state.oldEntry?.degree
    if (state.oldEntry === undefined) return
    eduForm.setFieldsValue({
      school: state.oldEntry?.school,
      major: state.oldEntry?.major,
      degree: EnumDegreesMirror[degreeKey],
      current: state.oldEntry?.current,
    })
    if (state.oldEntry?.current) {
      eduForm.setFieldsValue({
        single: dayjs(state.oldEntry.started)
      })
    } else {
      eduForm.setFieldsValue({
        range: [
          dayjs(state.oldEntry.started),
          dayjs(state.oldEntry.ended)
        ]
      })
    }
  }, [state.oldEntry, eduForm])

  function handleCancel() {
    eduForm.resetFields()
    dispatch({type: 'hideAddEduModal'})
    dispatch({type: 'clearEdit'})
    setCheckbox(false)
  }

  function handleEntrySubmit() {
    eduForm.submit()
    setTimeout(() => {
      setCheckbox(false)
      eduForm.resetFields()
      dispatch({type: 'clearEdit'})
    }, 100)
    dispatch({type: 'hideAddEduModal'})
  }

  function handleCheckboxChange(checked: boolean) {
    setCheckbox(checked)
  }

  function handleFormSubmit(rawValues: IFormProps) {
    if (rawValues.single == undefined && rawValues.range == undefined) return
    const degreeKey: TEnumDegrees = rawValues?.degree
    if (!state.editMode) {
      const newEntry: IUserEducationEntry = {
        uuid: uuid(),
        school: rawValues.school as string,
        major: rawValues.major as string,
        degree: EnumDegrees[degreeKey],
        current: rawValues.current,
        started: new Date()
      }
      dispatch({
        type: 'addEduEntry',
        payload: handleDateRange(newEntry, rawValues) as IUserEducationEntry
      })
    } else if (state.editMode && state.oldEntry) {
      const updatedEntry: IUserEducationEntry = {
        uuid: state.oldEntry?.uuid,
        school: rawValues.school as string,
        major: rawValues.major as string,
        degree: EnumDegrees[degreeKey],
        current: rawValues.current,
        started: new Date()
      }
      dispatch({
        type: 'updateEduEntry',
        payload: handleDateRange(updatedEntry, rawValues) as IUserEducationEntry
      })
    } else {
      throw new Error("ERROR: Failed to fetch oldEntry value for edit. Refresh the page and try again. If the error persists, contact the maintainer.")
    }
  }
  
  return (
    <Modal
      open={isVisible}
      title={state.editMode ? "Edit education" : "Add education"}
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
        form={eduForm}
        onFinish={handleFormSubmit}
      >
        <Form.Item name="school" label='School:' rules={rules}>
          <Input placeholder='Harvard University'/>
        </Form.Item>
        <Form.Item name="major" label='Major:' rules={rules}>
          <Input placeholder='Computer Science'/>
        </Form.Item>
        <Form.Item name="degree" label='Degree:' rules={rules}>
          <Select>
            <Select.Option value="none">No degree</Select.Option>
            <Select.Option value="associate">Associate</Select.Option>
            <Select.Option value="bachelors">Bachelor's</Select.Option>
            <Select.Option value="masters">Master's</Select.Option>
            <Select.Option value="doctorate">Doctorate</Select.Option>
          </Select>
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
      </Form>
    </Modal>
  )
}

export default AddEducation