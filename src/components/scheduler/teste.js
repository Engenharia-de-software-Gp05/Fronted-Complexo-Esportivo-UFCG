import React, { useState } from "react";
import ListDetail from "../list-detail/listDetail";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  Grid,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import AppointmentForm from "./DrawerAppointmentForm";
import { SearchComponent, SearchField } from "./searchCustomBar";
import { Layout, withDrawer } from "../Layout";
import { useTheme } from "@emotion/react";

const option = {
  year: "numeric",
  month: "long" || "short" || "numeric",
  weekday: "long" || "short",
  day: "numeric",
};

const hoje = new Date();

const DATABASE = [
  {
    id: 0,
    title: "Agendamento 1",
    startDate: new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      10,
      0,
      0,
    ), // Exemplo de horário: 10:00
  },
  {
    id: 1,
    title: "Agendamento 2",
    startDate: new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      14,
      30,
      0,
    ), // Exemplo de horário: 14:30
  },
  {
    id: 2,
    title: "Agendamento 3",
    startDate: new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      16,
      0,
      0,
    ), // Exemplo de horário: 16:00
  },
];

const HeaderDesktop = () => {
  return (
    <Typography
      variant="h2"
      color={"primary"}
      fontSize={{ xs: "2em", sm: "3em", md: "4em" }}
    >
      Agendamentos
    </Typography>
  );
};

const ListDesktop = ({ onSelectItem }) => {
  return <SearchComponent dataList={DATABASE} onSelectItem={onSelectItem} />;
};

const DetailDesktop = ({ selectedItem }) => {
  return (
    <Grow in={true} mountOnEnter>
      <Card>
        <CardHeader
          action={
            <Box display={"flex"}>
              <IconButton aria-label="settings">
                <Edit />
              </IconButton>
              <IconButton aria-label="settings">
                <Delete />
              </IconButton>
            </Box>
          }
          title={selectedItem.title}
          subheader={selectedItem.startDate.toLocaleDateString("pt-br", option)}
        />
        <CardContent>
          <Typography variant="body1">Teste</Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};

const ContentDesktop = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <Grid item xs={12} md={selectedItem ? 6 : 12}>
        <ListDesktop onSelectItem={setSelectedItem} />
      </Grid>
      <Grid item xs={12} md={6}>
        {selectedItem && <DetailDesktop selectedItem={selectedItem} />}
      </Grid>
    </>
  );
};

const LayoutDesktop = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ backgroundColor: theme.palette.surface.inverse_on }}>
      <Grid container padding={2} rowGap={4} aria-label="ListDetail-Grid">
        <Grid item aria-label="ListDetail-Header">
          <HeaderDesktop />
        </Grid>
        <Grid item container spacing={4} aria-label="ListDetail-Content">
          <ContentDesktop />
        </Grid>
      </Grid>
    </Paper>
  );
};

const HeaderMobile = ({ setSearchText }) => {
  const handleClearSearch = () => {
    setSearchText("");
  };

  return <SearchField onChange={setSearchText} onClear={handleClearSearch} />;
};

const ContentMobile = ({ searchText, searchKey, data, onItemClick = null }) => {
  const filteredData = data.filter((item) =>
    item[searchKey].toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleClick = (item) => {
    onItemClick(item);
  };

  return (
    <List>
      {filteredData.map((item, index) => (
        <ListItem
          disableGutters
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <Delete />
            </IconButton>
          }
        >
          <ListItemButton key={index}>
            <ListItemAvatar>
              <Avatar>A</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item[searchKey]}
              secondary={item.startDate.toLocaleDateString("pt-br", option)}
            ></ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const DetailedData = () => {
  return <div>Detalhamento</div>;
};

const LayoutWithDrawer = withDrawer(Layout);

const LayoutMobile = ({ setIsDrawerFormOpen }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Grid
      container
      direction={"column"}
      padding={2}
      aria-label="ListDetail-Grid"
    >
      {selectedItem ? (
        <DetailedData />
      ) : (
        <>
          <Fab
            onClick={() => setIsDrawerFormOpen(true)}
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
          >
            <Add />
          </Fab>
          <Grid item>
            <HeaderMobile setSearchText={setSearchText} />
          </Grid>
          <Grid item>
            <ContentMobile
              searchText={searchText}
              searchKey={"title"}
              data={DATABASE}
              onItemClick={setSelectedItem}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

const CreatePage = () => {
  const [isDrawerFormOpen, setIsDrawerFormOpen] = useState(false);

  return (
    <>
      <AppointmentForm
        isDrawerOpen={isDrawerFormOpen}
        onClose={() => setIsDrawerFormOpen(false)}
      />
      <LayoutWithDrawer
        setIsDrawerOpen={setIsDrawerFormOpen}
        layoutDesktop={LayoutDesktop}
        layoutMobile={LayoutMobile}
      />
    </>
  );
};

export default CreatePage;
