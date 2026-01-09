
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"


function App() {


  return (
    // <>
    <BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}/>
   <Route path='/account' element={<Login/>}/>
</Routes>
</BrowserRouter>

    // </>
  )
}

export default App
