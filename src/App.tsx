import { Link, Route, Routes } from 'react-router-dom'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*.tsx', { eager: true })

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default,
  }
})

export function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            )
          })}
          <li><a href="/htmx2">Htmx2</a></li>
          <li><a href="/htmx3">Htmx3</a></li>
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />}></Route>
        })}
      </Routes>
    </>
  )
}
