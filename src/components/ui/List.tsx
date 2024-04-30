import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

import { Delete, Menu } from "@mui/icons-material";
import { useMobileContext, useNavContext } from "../scheduler/Context.tsx";

export const ListItemIconButton = ({ onClick, children }) => {
  return (
    <ListItem>
      <IconButton onClick={() => onClick()}>{children}</IconButton>
    </ListItem>
  );
};

export const Search = ({ value, onChange }) => {
  const isMobile = useMobileContext();
  const { setIsOpen } = useNavContext();

  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: isMobile ? (
          <IconButton onClick={() => setIsOpen(true)}>
            <Menu />
          </IconButton>
        ) : (
          <></>
        ),
      }}
    />
  );
};

export const ListSearchComponent = ({
  items,
  property,
  loading,
  onSelectedItem,
  onDeleteItem,
  onDrawerOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // Armazena o item a ser excluído

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteItemClick = (item) => {
    setItemToDelete(item); // Armazena o item a ser excluído quando o botão de exclusão é clicado
    setOpen(true); // Abre o modal de confirmação de exclusão
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDeleteItem(itemToDelete); // Chama a função onDeleteItem com o item a ser excluído
      setItemToDelete(null); // Limpa o item a ser excluído
      setOpen(false); // Fecha o modal
    }
  };

  const filteredItems = items.filter((item) =>
    String(item[property]).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box display={"flex"} flexDirection={"column"} sx={{ minHeight: "80vh" }}>
      {loading && <CircularProgress />}
      <Paper>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={"Buscar..."}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: isMobile ? (
              <IconButton onClick={onDrawerOpen}>
                <Menu />
              </IconButton>
            ) : (
              <></>
            ),
          }}
        />
        <List sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          {filteredItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => onSelectedItem(item)}>
                <ListItemAvatar>
                  <Avatar>A</Avatar>
                </ListItemAvatar>
                {item[property]}
              </ListItemButton>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteItemClick(item)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Confirmar Exclusão
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Tem certeza de que deseja excluir este item?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete} // Chama a função para confirmar a exclusão
            >
              Excluir
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export const CustomList = ({
  items,
  property,
  onSelected,
  query,
  renderItem,
}) => {
  const filteredItems = items.filter((item) =>
    String(item[property]).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <List sx={{ overflowY: "auto" }}>
        {filteredItems.map((item, index) => (
          <ListItemButton
            disableRipple
            key={index}
            onClick={() => onSelected(item)}
          >
            {renderItem(item)}
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export const customList = (item) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar>A</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={item.title}
        secondary={`${item.startDate.getDate()}/${item.startDate.getMonth()} ${item.startDate.getHours()}:${item.startDate.getMinutes()} até ${item.endDate.getHours()}:${item.endDate.getMinutes()}`}
      />
      <ListItemIcon>
        <IconButton>
          <Delete />
        </IconButton>
      </ListItemIcon>
    </>
  );
};

export const ItemList = ({ items, loading, onSelectItem, onDeleteItem }) => {
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <List>
        {items.map((item, index) => (
          <ListItemButton key={index} onClick={() => onSelectItem(item)}>
            <ListItemText primary={item.title} />
            <ListItemSecondaryAction>
              <IconButton edge={"end"} onClick={() => setOpen(true)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
    </>
  );
};
