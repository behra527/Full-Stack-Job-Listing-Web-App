import React from "react";
import { Search } from "lucide-react";

function FilterBar({ filters, setFilters }) {
  //handle input
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  //handle checkbox multi-selection (consistent key naming)
  const handleCheckboxChange = (name, value) => {
    // ensure the key matches your backend filter name (lowercase)
    const key = name.toLowerCase();
    let current = filters[key] ? filters[key].split(",") : [];

    if (current.includes(value)) {
      current = current.filter((v) => v !== value);
    } else {
      current.push(value);
    }

    setFilters({ ...filters, [key]: current.join(",") });
  };

  //reset all filters
  const handleReset = () => {
    setFilters({
      keyword: "",
      country: "",
      tag: "",
      sort: "posting_date_desc",
    });
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      {/* Header */}
      

      <hr className="mb-4" />

      {/* Keyword */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Keyword
        </label>
        <input
          type="text"
          name="keyword"
          placeholder="Search by title or company..."
          value={filters.keyword}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Country */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Country
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["USA", "UK", "India", "Canada", "Germany"].map((c) => (
            <label
              key={c}
              className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600"
            >
              <input
                type="checkbox"
                checked={filters.country?.split(",").includes(c) || false}
                onChange={() => handleCheckboxChange("country", c)}
                className="accent-blue-500"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Tags
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["Remote", "Hybrid", "On-site", "Graduate", "Senior"].map((t) => (
            <label
              key={t}
              className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600"
            >
              <input
                type="checkbox"
                checked={filters.tag?.split(",").includes(t) || false}
                onChange={() => handleCheckboxChange("tag", t)}
                className="accent-blue-500"
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Sort By
        </label>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="posting_date_desc">Newest First</option>
          <option value="posting_date_asc">Oldest First</option>
          <option value="company_asc">Company A–Z</option>
          <option value="company_desc">Company Z–A</option>
          <option value="title_asc">Title A–Z</option>
          <option value="title_desc">Title Z–A</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm transition"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterBar;
