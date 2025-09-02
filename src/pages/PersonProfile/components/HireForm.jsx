import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

function HireForm({ person, hiredPeople, setHiredPeople }) {
  const [wage, setWage] = useState(0)
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const wageValue = Number(wage)
    if (!wage || isNaN(wageValue) || wageValue <= 0) {
      alert("Wage is required and must be greater than 0")
      return
    }
    if (hiredPeople.some(p => p.login.uuid === person.login.uuid)) {
      alert("This person is already hired")
      return
    }
    setHiredPeople([
      ...hiredPeople,
      { ...person, wage: wageValue }
    ])
    navigate("/")
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="wage">Wage Offer</label>
      <input
        type="number"
        id="wage"
        name="wage"
        onChange={e => setWage(e.target.value)}
        value={wage}
        required
      />
      <button type="submit">Hire</button>
    </form>
  )
}

HireForm.propTypes = {
  person: PropTypes.object.isRequired,
  hiredPeople: PropTypes.array.isRequired,
  setHiredPeople: PropTypes.func.isRequired,
}

export default HireForm
