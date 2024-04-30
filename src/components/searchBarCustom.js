import React, { useState } from 'react';
import { TextField, List, ListItemButton, ListItemText, ListItemIcon, InputAdornment } from '@mui/material';
import { Container } from '@mui/system';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';

const SearchBarCustom = ({ database, searchFor, onSelectItem }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(database);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    const filtered = database.filter((item) =>
      item[searchFor].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleClearSearch = () => {
    setQuery('');
    setSelectedItem(null);
  }

  const handleSelectedItem = (item) => {
    setSelectedItem(item.id);
    setQuery(item[searchFor]);
    onSelectItem(item);
  };

  return (

      <div style={{ width: 480 }}>
        <TextField
          label=""
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleSearch}
          style={{ background: "#FFF8F6" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlined/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                <CancelOutlined onClick={handleClearSearch} style={{ cursor: 'pointer' }}/>
              </InputAdornment>
            )
          }}
        />
        <div style={{ maxHeight: 650, overflow: 'auto' }}>
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
                <ListItemText primary={item[searchFor]} secondary={item.email} />
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>

  );
};

export default SearchBarCustom;
