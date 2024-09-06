import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ROUTE_CONFIG } from './routes'
import NotFound from './containers/NotFound'
import UserInfo from './components/UserInfo'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      {/* 进入服务首先需要加载用户信息 */}
      <UserInfo>
        {/* 路由集合 */}
        <Routes>
          <Route
            path='/'
            element={ <Layout/> }
          >
            {/* 可以优化写成一个路由列表 */}
            {/* 此处作为outLet的内容回显，作用类似于插槽 */}
            {ROUTE_CONFIG.map((item) => {
              return (<Route
                key={item.key}
                path={item.path}
                element={<item.element />}
              />)
            })}
          </Route>
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </UserInfo>
    </BrowserRouter>
  )
}

export default App
