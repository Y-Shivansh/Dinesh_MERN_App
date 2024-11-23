import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Search({ setLists }) {
  const [filter, setFilter] = useState("");
  const [originalLists, setOriginalLists] = useState([]); // Store the original list

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/listings/FoodSearched-Listings", { withCredentials: true });
        setOriginalLists(response.data.list); // Save the full list in originalLists
        setLists(response.data.list); // Set the full list initially
      } catch (err) {
        
      }
    };
    fetchLists();
  }, [setLists]);

  useEffect(() => {
    const searchedLists = async () => {
      if (filter) {
        try {
          const response = await axios.get(`http://localhost:3000/api/listings/FoodSearched-Listings/${filter}`, { withCredentials: true });
          const filteredLists = response.data.list;
          setLists(filteredLists);
        } catch (err) {
          
        }
      } else {
        // If the filter is empty, reset to original list
        setLists(originalLists);
      }
    };
    searchedLists();
  }, [filter, originalLists, setLists]); // Run this every time the filter or originalLists changes

  return (
    <div className="w-11/12 sm:w-4/5 bg-white ">
      <div className="relative flex items-center focus:border-slate-600 hover:border-slate-300 shadow-sm focus:shadow border border-slate-200 rounded-md pl-2 py-1">
        <svg color="rgb(115 115 115)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-4 mr-2">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
        </svg>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && filter === "") {
              setLists(originalLists); // Reset the list when backspace is pressed and filter is empty
            }
          }}
          className="w-full bg-transparent border-l placeholder:text-slate-400 text-slate-700 text-sm pl-2 pr-28 py-2 transition duration-300 ease focus:outline-none"
          placeholder="Search for Foods Categories..."
          value={filter} // Bind filter to input value
        />
      </div>
    </div>
  );
}
