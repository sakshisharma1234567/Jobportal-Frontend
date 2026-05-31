import { FaSearch } from "react-icons/fa";

function SearchBar({
  search,
  setSearch
}) {
  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="Search Jobs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-input"
      />

      <FaSearch className="search-icon" />

    </div>
  );
}

export default SearchBar;