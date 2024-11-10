import React,{useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Register,Landing, Signin, Home, CreateCard, FeedBackPg} from './pages'
import SplashScreen from './Components/splashScreen'

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  return (
    <div>
    {showSplash ? (
      <SplashScreen onComplete={handleSplashComplete} />
    ):(
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
        <Route path='/sign-up' element={<Register/>}/>
        <Route path='/sign-in' element={<Signin/>}/>
        <Route path='/create' element={<CreateCard/>}/>
        <Route path='/feedback' element={<FeedBackPg/>}/>
      
        

      </Routes>
    </BrowserRouter>

    )}
  
    
  
    </div>
    
  )
}

export default App