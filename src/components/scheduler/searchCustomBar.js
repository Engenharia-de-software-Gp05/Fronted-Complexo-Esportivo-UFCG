import React, { useState } from "react";
import { CloseSharp, EventNote, Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import shadows from "@mui/material/styles/shadows";

const CardItem = ({ item, onSelectItem }) => {
  return (
    <Card
      onClick={() => onSelectItem(item)}
      style={{ cursor: "pointer", maxWidth: 200, marginRight: 10 }}
    >
      <CardContent>
        <EventNote />
        <Typography variant="body1" component="div">
          {item.title || item.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SearchField = ({ onChange, onClear }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <TextField
      fullWidth
      placeholder="Buscar"
      onChange={handleChange}
      InputProps={{
        startAdornment: <Search sx={{ mr: 1 }} />,
        endAdornment: <CloseSharp />,
      }}
    />
  );
};

const SearchComponent = ({ dataList, onSelectItem }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredData = dataList.filter((item) => {
    return Object.keys(item).some((key) => {
      if (typeof item[key] === "string") {
        return item[key].toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  });

  return (
    <Box display={"flex"} flexDirection={"column"} gap={0} width={"100%"}>
      <Paper elevation={1} sx={{ backgroundColor: theme.palette.surface.main }}>
        <SearchField
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />
        <List>
          {filteredData.map((item) => (
            <ListItem
              disablePadding
              key={item.id}
              onClick={() => onSelectItem(item)}
            >
              <ListItemButton disabl>
                <ListItemIcon>
                  <EventNote />
                </ListItemIcon>
                <ListItemText primary={item.title || item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export { SearchComponent, SearchField };
