function Filters({
  location,
  setLocation,
  type,
  setType
}) {
  return (
    <div className="filters">

      <select
        value={location}
        onChange={(e) =>
          setLocation(
            e.target.value
          )
        }
      >
        <option value="">
          All Locations
        </option>

        <option value="Delhi">
          Delhi
        </option>

        <option value="Noida">
          Noida
        </option>

        <option value="Ghaziabad">
          Ghaziabad
        </option>

      </select>

      <select
        value={type}
        onChange={(e) =>
          setType(
            e.target.value
          )
        }
      >
        <option value="">
          All Types
        </option>

        <option value="Internship">
          Internship
        </option>

        <option value="Full Time">
          Full Time
        </option>

      </select>

    </div>
  );
}

export default Filters;