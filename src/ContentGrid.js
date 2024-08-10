import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 16px;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
`;

function ContentGrid() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, items]);

  const fetchData = async (pageNum) => {
    try {
      const response = await axios.get(
        `https://test.create.diagnal.com/data/page${pageNum}.json`
      );
      const newItems = response.data.page["content-items"].content;
      setItems((prevItems) => [...prevItems, ...newItems]);
      setFilteredItems((prevItems) => [...prevItems, ...newItems]);
      if (newItems.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setHasMore(false);
    }
  };

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      <InfiniteScroll
        dataLength={filteredItems.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Grid>
          {filteredItems.map((item, index) => (
            <div key={index}>
              <Thumbnail
                src={`https://test.create.diagnal.com/images/${item["poster-image"]}`}
                alt={item.name}
              />
              <Title>{item.name}</Title>
            </div>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
}

export default ContentGrid;
