import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { useEffect } from "react";

function SortBy({ options, defaultSort }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    if (!sortBy) {
      searchParams.set("sortBy", defaultSort);
      setSearchParams(searchParams);
    }
  }, [sortBy, defaultSort, searchParams, setSearchParams]);

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      onChange={handleChange}
      value={sortBy}
      options={options}
      type="white"
    />
  );
}

export default SortBy;
