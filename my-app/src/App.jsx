

import './App.css'
import Footer from './components/Footer'
import Manager from './components/manager'
import Navbar from './components/navbar'

function App() {
  
  return (
         <div>
          <Navbar/>
          <div className='min-h-[87vh]'>
         <Manager/>
         </div>
         <Footer/>
    </div>
  )
}

export default App
