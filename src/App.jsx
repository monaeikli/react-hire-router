import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PersonProfile from './pages/PersonProfile'

export default function App() {
  const url = "https://randomuser.me/api/?results=50";

const [people, setPeople] = useState([])
const [hiredPeople, setHiredPeople] = useState([])

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPeople(data.results)
  }
  fetchData()
}, [])


  return (
    <>
      <header>
        <h1>Hire Your Team</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              people={people}
              hiredPeople={hiredPeople}
              setHiredPeople={setHiredPeople}
            />
          }
        />
        <Route
          path="/view/:personId"
          element={
            <PersonProfile
              people={people}
              hiredPeople={hiredPeople}
              setHiredPeople={setHiredPeople}
            />
          }
        />
      </Routes>
    </>
  )
}
