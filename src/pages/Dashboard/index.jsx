import PeopleListItem from "./components/PeopleListItem"
import PropTypes from "prop-types"

function Dashboard({ people, hiredPeople }) {
  return (
    <main className="dashboard-layout">
      <section>
        <h2>People</h2>
        <ul>
          {people.map(person => (
            <PeopleListItem key={person.login.uuid} person={person} />
          ))}
        </ul>
      </section>
      <section>
        <h2>Hired People</h2>
        <ul>
          {hiredPeople.map(person => (
            <PeopleListItem key={person.login.uuid} person={person} hired/>
          ))}
        </ul>
      </section>
    </main>
  )
}

Dashboard.propTypes = {
  people: PropTypes.array.isRequired,
  hiredPeople: PropTypes.array.isRequired,
}

export default Dashboard
