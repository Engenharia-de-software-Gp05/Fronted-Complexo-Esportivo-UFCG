import React, { useState, useEffect } from "react";
import {
  TextField,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  InputAdornment,
} from "@mui/material";
import { Container } from "@mui/system";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CancelOutlined from "@mui/icons-material/CancelOutlined";

const SearchBarCustom = ({ database, searchFor, onSelectItem }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(database);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setIsSearchActive(true);

    const filtered = database.filter((item) =>
      item[searchFor].toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSelectedItem(null);
    setFilteredData([]);
    if(isMobileView) setIsSearchActive(false); 
  };

  const handleSelectedItem = (item) => {
    setSelectedItem(item.id);
    setQuery(item[searchFor]);
    onSelectItem(item);
    setIsSearchActive(false);
  };

  let openList = true;
  if (isMobileView) {
    openList = isSearchActive;
  }

  return (
    <Container
      sx={{
        maxWidth: 480,
        zIndex: isMobileView ? 9999 : "auto",
        position: isMobileView ? "absolute" : "initial",
      }}
    >
      <TextField
        label=""
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearch}
        onFocus={() => setIsSearchActive(true)}
        style={{ background: "#FFF8F6" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment>
              <CancelOutlined
                onClick={handleClearSearch}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
      />
      <div style={{ maxHeight: 690, overflow: "auto" }}>
        {openList && (
          <List>
            {filteredData.map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => handleSelectedItem(item)}
                selected={selectedItem === item.id}
                style={{ background: "#FFF8F6" }}
              >
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item[searchFor]}
                  secondary={item.email}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </div>
    </Container>
  );
};

export default SearchBarCustom;
