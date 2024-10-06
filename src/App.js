import { Outlet } from "react-router-dom"

export default function App(){
  return(
    <>
    <header>User Management System</header>
    <Outlet />
    </>
  )
}