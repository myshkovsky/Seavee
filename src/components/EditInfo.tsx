import { Button, Form, Input, Modal } from "antd";
import { Rule } from "antd/es/form";
import { IUserBasicInfo } from "../types/IUser";
import { Dispatch } from "react";
const { TextArea } = Input

interface IProps {
  info: IUserBasicInfo,
  rules: Rule[],
  isVisible: boolean,
  dispatch: Dispatch<{type: string, payload?: unknown}>
}

function EditInfo({info, rules, isVisible, dispatch}: IProps) {
  const [infoForm] = Form.useForm()
  
  function handleFormClear() {
    infoForm.setFields([
      { name: ['fullname'], value: '' },
      { name: ['title'], value: '' },
      { name: ['email'], value: '' },
      { name: ['phone'], value: '' },
      { name: ['location'], value: '' },
      { name: ['description'], value: '' },
    ])
  }

  function handleModalSave() {
    infoForm.submit()
    dispatch({type: 'hideInfoModal'})
  }

  function hideModal() {
    dispatch({type: 'hideInfoModal'})
    infoForm.resetFields()
  }

  function handleFormSubmit(values: IUserBasicInfo) {
    dispatch({type: 'updateUser', payload: values})
  }

  
  return (
    <Modal
      open={isVisible}
      title="Edit information"
      onCancel={hideModal}
      footer={[
        <Button key="submit" type="primary" onClick={handleModalSave}>
          Save
        </Button>,
        <Button key="clear" onClick={handleFormClear}>
          Clear
        </Button>
      ]}
    >
      <Form form={infoForm} labelCol={{ span: 5 }} layout='horizontal' onFinish={handleFormSubmit}>
        <Form.Item name='fullname' label='Full name:' initialValue={info.fullname} rules={rules}>
          <Input placeholder='John Doe'/>
        </Form.Item>
        <Form.Item name='title' label='Title:' initialValue={info.title}>
          <Input placeholder='Software Engineer'/>
        </Form.Item>
        <Form.Item name="email" label="E-mail:" initialValue={info.email}
          rules={[
            { type: 'email', message: 'This is not a valid e-mail address.' },
            { required: true, message: 'You must enter a valid e-mail address.' }
          ]}
        >
          <Input placeholder='JohnDoe@jdsoftworks.com'/>
        </Form.Item>
        <Form.Item name="phone" label='Phone:' initialValue={info.phone} rules={rules}>
          <Input placeholder='+1 234-456-7890'/>
        </Form.Item>
        <Form.Item name="location" label='Location:' initialValue={info.location}>
          <Input placeholder='Warsaw, Ohio, USA'/>
        </Form.Item>
        <Form.Item name="description" label="Description:" initialValue={info.description}>
          <TextArea placeholder='Briefly describe who you are and what you do.'/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditInfo