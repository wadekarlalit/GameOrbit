import { BrowserRouter, Route, Routes } from "react-router-dom"
import Game from "./pages/Game"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {

  return (
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          {/* <Route path="/" element={<Login />}></Route> */}
          <Route path="/" element={<Dashboard />} />

          {/* Protected route */}
          <Route 
          path="/dashboard" 
          element={ 
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
          </Route>

          <Route 
            path="/game/tic-tac-toe" 
            element={
              <ProtectedRoute>
                  <Game />
              </ProtectedRoute>
            }>
          </Route>
          

          
        </Routes>
      </BrowserRouter>
  )
}

export default App
