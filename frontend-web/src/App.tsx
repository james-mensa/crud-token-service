import { RouterProvider } from 'react-router-dom'
import './App.css'
import RootRouter from './routers'
import { observer } from 'mobx-react-lite'
const App= observer(()=> {
  return (
    <div className='App'>
      <RouterProvider router={RootRouter} future={{v7_startTransition:true}}/>
    </div>
  )
})

export default App
