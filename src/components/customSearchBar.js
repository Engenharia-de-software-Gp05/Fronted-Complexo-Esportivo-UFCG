import React, { useState } from 'react';
import { TextField, IconButton, Grid, Box, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Exemplo de dados de opção
const options = [
    { id: 1, label: 'Opção 1', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 2, label: 'Opção 2', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 3, label: 'Opção 3', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 4, label: 'Opção 4', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 5, label: 'Opção 5', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 6, label: 'Opção 6', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 7, label: 'Opção 7', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 8, label: 'Opção 8', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 9, label: 'Opção 9', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 10, label: 'Opção 10', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 11, label: 'Opção 11', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 12, label: 'Opção 12', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 13, label: 'Opção 13', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 14, label: 'Opção 14', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 15, label: 'Opção 15', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 16, label: 'Opção 16', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 17, label: 'Opção 17', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 18, label: 'Opção 18', imageUrl: 'https://via.placeholder.com/200x60' },
    { id: 19, label: 'Opção 19', imageUrl: 'https://via.placeholder.com/200x60' },
    // Adicione mais opções conforme necessário
];

const CustomSearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchInput('');
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setSearchInput('');
    };

    return (
        <Container>
            <Grid container alignItems="center">
                <Grid item>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <TextField
                        value={searchInput}
                        onChange={handleInputChange}
                        placeholder="Pesquisar..."
                        fullWidth
                    />
                </Grid>
                {searchInput && (
                    <Grid item>
                        <IconButton onClick={handleClearSearch}>
                            <ClearIcon />
                        </IconButton>
                    </Grid>
                )}
            </Grid>
            <Container style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px' }}>
                {options.map((option) => (
                    <Box
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        sx={{
                            width: '500px',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: 1,
                            border: '1px solid #ccc',
                            borderRadius: 4,
                            cursor: 'pointer',
                            marginBottom: 1,
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <img src={option.imageUrl} alt={option.label} style={{ width: 200, height: 60, marginRight: 8 }} />
                        <span>{option.label}</span>
                    </Box>
                ))}
            </Container>
            {selectedOption && (
                <div>
                    <p>Opção selecionada: {selectedOption.label}</p>
                    {/* Aqui você pode acessar as informações da opção selecionada */}
                </div>
            )}
        </Container>
    );
};

export default CustomSearchBar;
