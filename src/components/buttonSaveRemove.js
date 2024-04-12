import React from 'react';
import { Box, Button } from '@mui/material';

const ButtonSaveRemove = ({ isSaveSelected, isRemoveSelected, handleSave, handleRemove }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 10 }}>
      <Button 
        sx={{ 
          borderRadius: '15px', 
          width: '105px', 
          right: '40px',
          textTransform: 'none',
          color: isSaveSelected ? 'theme.palette.primary.main' : 'inherit',
          backgroundColor: isSaveSelected ? 'theme.palette.primary.light' : 'inherit' 
        }} 
        onClick={handleSave}
      >
        Salvar
      </Button>

      <Button 
        sx={{ 
          borderRadius: '15px', 
          width: '105px', 
          right: '40px',
          textTransform: 'none',
          color: isRemoveSelected ? 'theme.palette.error.main' : 'inherit',
          backgroundColor: isRemoveSelected ? 'theme.palette.error.light' : 'inherit'
        }} 
        onClick={handleRemove}
      >
        Remover
      </Button>
    </Box>
  );
};

export default ButtonSaveRemove;
