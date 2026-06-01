import { BrowserRouter, Route, Routes } from "react-router-dom"
import Game from "./pages/Game"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Messaging from "./pages/Messaging"
import Friends from "./pages/Friends"
import History from "./pages/History"
import MyAccount from "./pages/MyAccount"
import MyProfile from "./pages/MyProfile"


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

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Messaging />
            </ProtectedRoute>
          }>
        </Route>

        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }>
        </Route>

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }>
        </Route>

        <Route
          path="/my-account"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
