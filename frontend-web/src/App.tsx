import { RouterProvider } from 'react-router-dom'
import './App.css'
import RootRouter from './routers'
import { observer } from 'mobx-react-lite'
import PageDialogControllersView from './common-ui/PageDialogControllersView'

const App= observer(()=> {
  return (
    <div className='App'>
      <RouterProvider router={RootRouter} future={{v7_startTransition:true}}/>
      <PageDialogControllersView/>
    </div>
  )
})

export default App
