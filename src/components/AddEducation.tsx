import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import { Rule } from "antd/es/form";
import { Dispatch, useState } from "react";
import { EnumDegrees, IUserEducationEntry, TEnumDegrees } from "../types/IUser";
import { handleDateRange } from "../utils/handleDateRange";
import { v4 as uuid } from "uuid"
const { RangePicker } = DatePicker

interface IProps {
  rules: Rule[],
  isVisible: boolean,
  dispatch: Dispatch<{type: string, payload?: unknown}>
}

interface IFormProps {
  school: string,
  major: string,
  current: boolean,
  degree: TEnumDegrees,
  single?: {"$d": Date},
  range?: [{"$d": Date}, {"$d": Date}]
}

function AddEducation({rules, isVisible, dispatch}: IProps) {
  const [eduForm] = Form.useForm()
  const [checkbox, setCheckbox] = useState(false)

  function handleCancel() {
    dispatch({type: 'hideAddEduModal'})
  }

  function handleAddEntry() {
    eduForm.submit()
    setTimeout(() => {
      setCheckbox(false)
      eduForm.resetFields()
    }, 100)
    dispatch({type: 'hideAddEduModal'})
  }

  function handleCheckboxChange(checked: boolean) {
    setCheckbox(checked)
  }

  function handleFormSubmit(rawValues: IFormProps) {
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
    dispatch({
      type: 'addEduEntry',
      payload: handleDateRange(newEntry, rawValues) as IUserEducationEntry
    })
  }
  
  return (
    <Modal
      open={isVisible}
      title="Add education"
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleAddEntry}>
          Add
        </Button>,
        <Button onClick={handleCancel}>
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