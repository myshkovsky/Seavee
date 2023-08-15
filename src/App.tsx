import './styles/App.css'
import { createContext, useReducer } from 'react'
import { Button, ConfigProvider, Layout, Tooltip} from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faGraduationCap, faPencil, faUser } from '@fortawesome/free-solid-svg-icons'
import DocumentPreview from './components/DocumentPreview'
import EditInfo from './components/EditInfo'
import AddWork from './components/AddWork'
import AddEducation from './components/AddEducation'
import { reducer } from './utils/reducer'
import defaultUser from './utils/defaultUser'

export const StateContext = createContext(Array(2))

function App() {
  const [state, dispatch] = useReducer(reducer, {
    editMode: false,
    oldEntry: undefined,
    showInfoModal: false,
    showWorkModal: false,
    showEduModal: false,
    user: defaultUser
  })

  const theme = {
    "token": {
      "colorPrimary": "#722ed1", // ant.design purple-6
      "colorInfo": "#722ed1", // ant.design purple-6
      "wireframe": false
    }
  }

  const rules = [
    { required: true, message: "This field must be filled." }
  ]

  return (
    <StateContext.Provider value={[state, dispatch]}>
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
            {/* Add a logo on the left side & add Github link on the right */}
            <Tooltip placement="bottom" title="Information">
              <Button type="primary" shape="circle" size='large' onClick={() => dispatch({type: 'showInfoModal'})}>
                <FontAwesomeIcon icon={faUser} />
              </Button>
            </Tooltip>
            &nbsp;
            <Tooltip placement="bottom" title="Work experience">
              <Button type="primary" shape="circle" size='large' onClick={() => dispatch({type: 'showWorkModal'})}>
                <FontAwesomeIcon icon={faBriefcase} />
              </Button>
            </Tooltip>
            &nbsp;
            <Tooltip placement="bottom" title="Education">
              <Button type="primary" shape="circle" size='large' onClick={() => dispatch({type: 'showEduModal'})}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </Button>
            </Tooltip>
            &nbsp;
            {/* The edit mode should be a switch, not a button */}
            <Tooltip placement="bottom" title="Toggle edit mode">
              <Button type="primary" shape="circle" size='large' onClick={() => dispatch({type: 'toggleEditMode', payload: !state.editMode})}>
                <FontAwesomeIcon icon={faPencil} />
              </Button>
            </Tooltip>
          </Header>
          <Content>
            <EditInfo
              info={state.user.info}
              rules={rules}
              isVisible={state.showInfoModal}
            />
            <AddWork
              rules={rules}
              isVisible={state.showWorkModal}
            />
            <AddEducation
              rules={rules}
              isVisible={state.showEduModal}
            />
            <DocumentPreview user={state.user} />
          </Content>
        </ConfigProvider>
      </Layout>
    </StateContext.Provider>
  )
}

export default App