import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { routes } from './routes/menus'
import UserInfo from './components/UserInfo'
import zhCN from 'antd/locale/zh_CN';
import Layout from './components/Layout'
import Login from './containers/Login'
import { ROUTE_COMPONENT } from './routes'
import { App as AppContext, ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        {/* 进入服务首先需要加载用户信息 */}
        <AppContext>
          <UserInfo>
            {/* 路由集合 */}
            <Routes>
              <Route path='/login' element={ <Login/> } />
              <Route
                path='/'
                element={ <Layout/> }
              >
                {/* 可以优化写成一个路由列表 */}
                {/* 此处作为outLet的内容回显，作用类似于插槽 */}
                {routes.map((item) => {
                  const Component = ROUTE_COMPONENT[item.key];
                  return (<Route
                    key={item.key}
                    path={item.path}
                    element={<Component/>}
                  />)
                })}
              </Route>
            </Routes>
          </UserInfo>
        </AppContext>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
