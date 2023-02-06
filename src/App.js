import SettingBar from './components/SettingsBar'
import Toolbar from './components/Toolbar'
import Canvas from './components/Canvas'
import {
  Route,
  Routes,
  createBrowserRouter,
  BrowserRouter,
  Navigate,
} from 'react-router-dom'
import './styles/app.scss'

const router = createBrowserRouter([
  {
    path: '/:id',
    element: <div className="app"></div>,
  },
  {},
])

function MainPage() {
  return (
    <>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<MainPage />}></Route>
        <Route
          path="*"
          element={
            <Navigate
              to={`/f${(+new Date()).toString(16)}`}
              replace
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
