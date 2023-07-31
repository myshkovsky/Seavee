import { useReducer } from 'react'
import defaultUser from './utils/defaultUser'
import './styles/App.css'
import { Button, ConfigProvider, Layout} from 'antd'
import { IUser } from './types/IUser'
import DocumentPreview from './components/DocumentPreview'
import { Content, Header } from 'antd/es/layout/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons'
import EditInfo from './components/EditInfo'
import { reducer as Reducer } from './utils/reducer'
import AddWork from './components/AddWork'
import AddEducation from './components/AddEducation'
const reducer = (state: unknown, action: {type: string, payload?: unknown}) => Reducer(state, action)

function App() {
  const [state, dispatch] = useReducer(reducer, {
    showInfoModal: false,
    showAddWorkModal: false,
    showAddEduModal: false,
    user: defaultUser as IUser
  })

  const theme = {
    "token": {
      "colorPrimary": "#722ed1", // ant.design purple-6
      "colorInfo": "#722ed1", // ant.design purple-6
      "wireframe": false
    }
  }

  const ruleMustFill = [
    { required: true, message: "This field must be filled." }
  ]

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
          <Button type="primary" shape="circle" size='large' onClick={() => dispatch({type: 'showInfoModal'})}>
            <FontAwesomeIcon icon={faUser} />
          </Button>
          &nbsp;
          <Button type="primary" shape="circle" size='large' onClick={() => dispatch({type: 'showAddWorkModal'})}>
            <FontAwesomeIcon icon={faBriefcase} />
          </Button>
          &nbsp;
          <Button type="primary" shape="circle" size='large' onClick={() => dispatch({type: 'showAddEduModal'})}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </Button>
        </Header>
        <Content style={{ height: '90vh' }}>
          <EditInfo
            info={state.user.info}
            rules={ruleMustFill}
            isVisible={state.showInfoModal}
            dispatch={dispatch}
          />
          <AddWork
            rules={ruleMustFill}
            isVisible={state.showAddWorkModal}
            dispatch={dispatch}
          />
          <AddEducation
            rules={ruleMustFill}
            isVisible={state.showAddEduModal}
            dispatch={dispatch}
          />
          <DocumentPreview user={state.user} />
        </Content>
      </ConfigProvider>
    </Layout>
  )
}

export default App