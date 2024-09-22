import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard} from './pages/Dashboard'
import { Send } from './pages/Send'
function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
