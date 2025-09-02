import { useParams, useSearchParams } from "react-router-dom"
import HireForm from './components/HireForm'
import PropTypes from "prop-types"
import { useState } from "react"

import { useNavigate } from "react-router-dom"

function PersonProfile({ people, hiredPeople, setHiredPeople }) {
  const { personId } = useParams()
  const person = people.find(p => p.login.uuid === personId)
  const [searchParams] = useSearchParams()
  const editMode = searchParams.get("edit") === "1"
  const [newWage, setNewWage] = useState(person?.wage || 0)
  const hiredPerson = hiredPeople.find(p => p.login.uuid === personId)
  const navigate = useNavigate()

  if (!person) {
    return <div>Loading...</div>
  }

    function handleEditSubmit(e) {
    e.preventDefault()
    const wageValue = Number(newWage)
    if (!newWage || isNaN(wageValue) || wageValue <= 0) {
      alert("Wage is required and must be greater than 0")
      return
    }
    setHiredPeople(hiredPeople.map(p =>
      p.login.uuid === personId ? { ...p, wage: wageValue } : p
    ))
    navigate("/")
  }

  return (
    <article className="profile-card">
      <div className="profile-header">
        <img
          src={person.picture.large}
          alt={`${person.name.first} ${person.name.last}`}
          className="profile-img"
        />
        <h2>
          {person.name.first} {person.name.last}
        </h2>
      </div>
      <p><strong>Country:</strong> {person.location.country}</p>
      <p><strong>Email:</strong> {person.email}</p>
      <p><strong>Phone:</strong> {person.phone}</p>
      <p><strong>Age:</strong> {person.dob.age}</p>
      {editMode && hiredPerson ? (
        <form onSubmit={handleEditSubmit}>
          <label htmlFor="wage">Edit Wage</label>
          <input
            type="number"
            id="wage"
            name="wage"
            value={newWage}
            min="1"
            onChange={e => setNewWage(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <HireForm
          person={person}
          hiredPeople={hiredPeople}
          setHiredPeople={setHiredPeople}
        />
      )}
    </article>
  )
}

PersonProfile.propTypes = {
  people: PropTypes.array.isRequired,
  hiredPeople: PropTypes.array.isRequired,
  setHiredPeople: PropTypes.func.isRequired,
}

export default PersonProfile
