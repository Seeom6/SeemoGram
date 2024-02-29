import { Outlet } from 'react-router-dom'
import { BottomBar, LeftSideBar, SearchBar, TopBar } from '../components'



const RootLayout = () => {
  return (
    <div className='w-full md:flex '>
    <TopBar/>
    <LeftSideBar />

    <section className='flex flex-col flex-1 overflow-y-scroll h-screen hide-scrollbar'>
      <SearchBar/>
      <Outlet/>
    </section>
    <BottomBar/>
    </div>
  )
}

export default RootLayout