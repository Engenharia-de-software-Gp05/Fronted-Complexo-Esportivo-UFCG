import React, { useEffect, useState } from "react";
import {
  Drawer,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add, Schedule } from "@mui/icons-material";
import { ListSearchComponent } from "../../components/ui/List.tsx";
import {
  converterStringParaData,
  serialize,
} from "../../components/utils/dateOptions.tsx";
import { Form, ItemDetails } from "../../components/scheduler/Content.tsx";

const BASE_API = window.REACT_APP_API_URL;

export const SchedulerPage = () => {
  const [items, setItems] = useState([]);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedItem, setSelectedItem] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const addItem = async (newItem) => {
    try {
      const response = await fetch(BASE_API + "/reservation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      await fetchItems(); // Recarregar os itens após a adição de um novo item
    } catch (error) {
      console.error("Erro ao adicionar o item:", error);
    }
  };

  // Função para excluir um item da lista de itens
  const deleteItem = async (item) => {
    try {
      const response = await fetch(BASE_API + "/items/" + item.id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      await fetchItems(); // Recarregar os itens após a exclusão de um item
      setSelectedItem(null);
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(BASE_API + "/reservation/all/detailed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (data) {
      const serializedData: any = serialize(data, (item: any) => ({
        id: item.id,
        user: item.userName,
        title: `Agendamento ${item.id} - ${item.courtName}`,
        startDate: new Date(converterStringParaData(item.startDateTime)), // Convertendo startDate para Date
        endDate: new Date(converterStringParaData(item.endDateTime)), // Convertendo endDate para Date
        location: item.courtName,
        locationImgSrc: undefined, //item.courtImageUrl[0], //TODO Mapear
      }));
      setItems(serializedData);
    }
  }, [data]);

  return (
    <Grid container height={"100vh"} alignItems={"center"}>
      {/* NavBar */}
      <Grid item md={1}>
        {isMobile ? (
          <SwipeableDrawer
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onOpen={() => setIsDrawerOpen(true)}
          >
            <List>
              <ListItem>
                <IconButton onClick={() => setIsFormOpen(true)}>
                  <Schedule />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton>
                  <Schedule />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton>
                  <Schedule />
                </IconButton>
              </ListItem>
            </List>
          </SwipeableDrawer>
        ) : (
          <Drawer variant="permanent">
            <List>
              <ListItem>
                <IconButton onClick={() => setIsFormOpen(true)}>
                  <Schedule />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton>
                  <Schedule />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton>
                  <Schedule />
                </IconButton>
              </ListItem>
            </List>
          </Drawer>
        )}
      </Grid>
      {/* Lista de itens */}
      {/* Detalhes de itens */}
      <Grid
        item
        container
        xs={10}
        columnSpacing={4}
        rowGap={6}
        padding={2}
        sx={{
          backgroundColor: theme.palette.surface.inverse_on,
          boxShadow: 3,
          borderRadius: 2,
        }}
        // minHeight={"90vh"}
      >
        <Grid item xs={12}>
          <Typography
            variant="h2"
            lineHeight={1}
            fontWeight={600}
            textAlign={"left"}
            color={theme.palette.primary.main}
            fontSize={{ xs: "1em", sm: "2em", md: "4em" }}
          >
            Meus Agendamentos
          </Typography>
        </Grid>
        <Grid item xs={selectedItem ? 6 : 12}>
          <ListSearchComponent
            items={items}
            property={"title"}
            loading={loading}
            onSelectedItem={(item) => setSelectedItem(item)}
            onDeleteItem={(item) => deleteItem(item)}
            onDrawerOpen={() => setIsDrawerOpen(true)}
          />
        </Grid>
        {selectedItem && (
          <Grid item xs={6}>
            <ItemDetails
              item={selectedItem}
              onDelete={() => deleteItem(selectedItem)}
              setSelectedItem={setSelectedItem}
            />
          </Grid>
        )}
      </Grid>

      {/* Forms */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: "20px", right: "20px" }}
          onClick={() => setIsFormOpen(true)}
        >
          <Add />
        </Fab>
      )}
      <Form
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(newItem) => {
          addItem(newItem);
          setIsFormOpen(false);
        }}
      />
    </Grid>
  );
};
