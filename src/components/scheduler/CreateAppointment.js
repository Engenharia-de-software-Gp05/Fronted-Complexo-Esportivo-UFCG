import React, { useState } from "react";
import ListDetail from "../list-detail/listDetail";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  Grow,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import AppointmentForm from "./DrawerAppointmentForm";
import SearchComponent from "./searchCustomBar";
import Layout from "./Layout";

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

const HeaderMobile = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return <SearchComponent dataList={DATABASE} onSelectItem={setSelectedItem} />;
};

const ContentMobile = () => {
  return <div></div>;
};

const CreatePage = () => {
  const [isDrawerFormOpen, setIsDrawerFormOpen] = useState(false);

  return (
    <>
      <AppointmentForm
        isDrawerOpen={isDrawerFormOpen}
        onClose={() => setIsDrawerFormOpen(false)}
      />
      <Layout
        ItemComponent={() => (
          <ListDetail
            HeaderDesktopComponent={HeaderDesktop}
            ContentDesktopComponent={ContentDesktop}
            HeaderMobileComponent={HeaderMobile}
            ContentMobileComponent={ContentMobile}
          />
        )}
      />
    </>
    // <Grid container height={"100vh"} aria-label="Container">
    //   <Grid item xs={2}>
    //     Navbar
    //   </Grid>
    //   <Grid
    //     item
    //     xs={8}
    //     height={"50%"}
    //     alignSelf={"center"}
    //     aria-label="ListDetail-ContentItem"
    //   >
    //     <ListDetail
    //       HeaderDesktopComponent={HeaderDesktop}
    //       ContentDesktopComponent={ContentDesktop}
    //       HeaderDesktop
    //     />
    //   </Grid>
    //   <Grid item xs={2}>
    //     <Fab
    //       onClick={() => setIsDrawerFormOpen(true)}
    //       color="primary"
    //       aria-label="add"
    //       sx={{
    //         position: "fixed",
    //         bottom: 16,
    //         right: 16,
    //       }}
    //     >
    //       <Add />
    //     </Fab>
    //   </Grid>
    // </Grid>
  );
};

export default CreatePage;
