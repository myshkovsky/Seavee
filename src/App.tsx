import './styles/App.css'
import { createContext, useReducer } from 'react'
import { Button, ConfigProvider, Layout, Popconfirm, Tooltip} from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faGraduationCap, faPencil, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
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

  function clearUser() {
    dispatch({type: 'clearUser'})
  }

  return (
    <StateContext.Provider value={[state, dispatch]}>
      <Layout hasSider={false} style={{ minHeight: "100vh" }}>
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
            <span className='seavee-logo'>
              🌊 Seavee
            </span>
            <span className='seavee-credits'>
              <Tooltip placement='bottomLeft' title="View source on GitHub">
                <a href='https://github.com/myshkovsky/seavee' target='_blank' rel='noreferrer noopener'>
                  <svg className='github-svg' xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                </a>
              </Tooltip>
            </span>
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
            <Tooltip placement="bottom" title="Toggle edit mode">
              <Button shape="circle" size='large' onClick={() => dispatch({type: 'toggleEditMode', payload: !state.editMode})}>
                <FontAwesomeIcon icon={faPencil} />
              </Button>
            </Tooltip>
            &nbsp;
            <Tooltip>
              <Popconfirm
                title={"Clear the document?"}
                onConfirm={clearUser}
                okText={"Yes"}
                cancelText={"No"}
              >
                <Button danger shape="circle" size='large'>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Popconfirm>
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