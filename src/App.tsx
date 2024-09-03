import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ROUTE_CONFIG } from './routes'
import NotFound from './containers/NotFound'
import UserInfo from './components/UserInfo'

function App() {
  return (
    <BrowserRouter>
      {/* 进入服务首先需要加载用户信息 */}
      <UserInfo/>
      {/* 路由集合 */}
      <Routes>
        {/* 可以优化写成一个路由列表 */}
        {ROUTE_CONFIG.map((item) => {
          return (<Route
            key={item.key}
            path={item.path}
            element={<item.element />}
          />)
        })}
        <Route path='*' element={ <NotFound/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
