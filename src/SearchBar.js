import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  font-size: 16px;
`;

function SearchBar({ setSearchTerm }) {
  return (
    <SearchInput
      type="text"
      placeholder="Search..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
