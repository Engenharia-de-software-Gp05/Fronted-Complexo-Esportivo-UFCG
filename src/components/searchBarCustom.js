import React, { useState } from 'react';
import { TextField, List, ListItemButton, ListItemText, ListItemIcon, InputAdornment } from '@mui/material';
import { Container } from '@mui/system';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';

const database1 = [
  { id: 1, name: 'João', email: 'joao@example.com', phone: '123456789' },
  { id: 2, name: 'Maria', email: 'maria@example.com', phone: '987654321' },
  { id: 3, name: 'Pedro', email: 'pedro@example.com', phone: '456123789' },
  { id: 4, name: 'Ana', email: 'ana@example.com', phone: '789456123' },
  { id: 5, name: 'Lucas', email: 'lucas@example.com', phone: '321654987' },
  { id: 6, name: 'Mariana', email: 'mariana@example.com', phone: '654987321' },
  { id: 7, name: 'Carlos', email: 'carlos@example.com', phone: '987321654' },
  { id: 8, name: 'Fernanda', email: 'fernanda@example.com', phone: '654321987' },
  { id: 9, name: 'Gabriel', email: 'gabriel@example.com', phone: '987654123' },
  { id: 10, name: 'Juliana', email: 'juliana@example.com', phone: '321789456' },
  { id: 11, name: 'Rafael', email: 'rafael@example.com', phone: '456789123' },
  { id: 12, name: 'Amanda', email: 'amanda@example.com', phone: '789123456' },
  { id: 13, name: 'Diego', email: 'diego@example.com', phone: '321456789' },
  { id: 14, name: 'Laura', email: 'laura@example.com', phone: '456789321' },
  { id: 15, name: 'Rodrigo', email: 'rodrigo@example.com', phone: '789321654' },
  { id: 16, name: 'Camila', email: 'camila@example.com', phone: '654123789' },
  { id: 17, name: 'Eduardo', email: 'eduardo@example.com', phone: '321789654' },
  { id: 18, name: 'Isabela', email: 'isabela@example.com', phone: '789654321' },
  { id: 19, name: 'Bruno', email: 'bruno@example.com', phone: '654321789' },
  { id: 20, name: 'Fernando', email: 'fernando@example.com', phone: '987321456' },
];

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
          style={{ marginBottom: '14px'}}
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
        <div style={{ maxHeight: 690, overflow: 'auto' }}>
          <List>
            {filteredData.map((item) => (
              <ListItemButton  
                key={item.id} 
                onClick={() => handleSelectedItem(item)}
                selected={selectedItem === item.id}
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
