import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

function PeopleListItem({ person, hired }) {
  const navigate = useNavigate?.();

  return (
    <li>
      <h3 style={{ display: "flex", alignItems: "center", gap: "0.6em", fontWeight: 500 }}>
        <img
          src={person.picture.thumbnail}
          alt={`${person.name.first} ${person.name.last}`}
          className="thumbnail"
        />
        <Link to={`/view/${person.login.uuid}`}>
          {person.name.first} {person.name.last}
        </Link>
        {hired && (
          <button
            style={{ marginLeft: "auto", padding: "6px 12px", fontSize: "0.9rem", marginRight: "12px" }}
            onClick={() => navigate(`/view/${person.login.uuid}?edit=1`)}
            type="button"
          >
            Edit
          </button>
        )}
      </h3>
      {person.wage && <p>Wage: £{person.wage}</p>}
    </li>
  )
}

PeopleListItem.propTypes = {
  person: PropTypes.object.isRequired,
  hired: PropTypes.bool,
}

export default PeopleListItem
