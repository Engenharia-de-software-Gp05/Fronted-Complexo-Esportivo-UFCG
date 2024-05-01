import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CssBaseline,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ToggleButton
} from "@mui/material";
import ThreeButtons from "../../components/threeButtons";
import SearchBarCustom from "../../components/searchBarCustom";

export default function ListCourts() {
  const [selectBlock, setSelectBlock] = useState(null);
  const [isSaveSelected, setSaveSelected] = useState(false);
  const [isRemoveSelected, setRemoveSelected] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [courts, setCourts] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await fetch("/rota");
      if(response.ok) {
        const data = await response.json();
        setCourts(data);
      } else {
        console.error("Faield to fecth courts: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching courts: ", error)
    }
  }

  const handleBlockSelect = (value) => {
    setSelectBlock(value);
    setIsAvailable(value.isAvailable)
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/rota/${selectBlock.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: selectBlock.name,
          description: selectBlock.descricao,
          availability: selectBlock.availability,
          image: selectBlock.image,  
        }),
      });

      if(response.ok) {
        fetchCourts();
      } else {
        console.error("Failed to update court: ", response.statusText);
      }
    } catch (error) {
      console.error("Error update court: ", error)
    }
    setSaveSelected(true);
    setRemoveSelected(false);
  };

  const handleRemove = async () => {
    try {
      const response = await fetch(`/rota/${selectBlock.id}`, { method: "DELETE"});
      if(response.ok) {
        fetchCourts();
        setCourts(null);
      } else {
        console.error("Failed to delete court: ", response.statusText );
      }
    } catch (error) {
      console.error("Error deleting court: ", error);
    }
    setOpenDialog(false);
  };

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <Container
      name="principal"
      component="section"
      item
      xs={12}
      sm={6}
      style={{ maxWidth: 1000, maxHeight: 956, marginTop: 20 }}
    >
      <CssBaseline>
        <Typography variant="h4" sx={{ margin: 3 }}>
          Lista de Quadras
        </Typography>
        <Grid
          name="gridPrincipa"
          container
          spacing={2}
          style={{ maxHeight: 880 }}
        >
          <Grid name="gridSearch" item xs={12} sm={6} sx={{ p: 8 }}>
            <div>
              <SearchBarCustom
                database={courts}
                searchFor={"name"}
                onSelectItem={handleBlockSelect}
              />
            </div>
          </Grid>
          <Grid
            name="gridDescription"
            item
            sm={6}
            xs={12}
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "common.white",
              borderRadius: 5,
              border: "1px solid #ccc",
            }}
          >
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{ height: "100%" }}
            >
              <Grid item sx={{ height: "45%", width: "97%" }}>
                <img
                  // src={selectBlock.image}
                  alt="Imagem"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
              <Grid item sx={{ height: "55%" }}>
                {
                  <Box
                    sx={{ width: "97%", height: 120, overflow: "auto", mb: 3 }}
                  >
                    <Typography>
                      {selectBlock ? selectBlock.name : "Nome"}
                    </Typography>
                    <Typography>
                      {selectBlock ? selectBlock.descricao : "Descrição"}
                    </Typography>
                  </Box>
                }
                <Typography variant="subtitle2">
                  Período de Agendamento
                </Typography>
                <Typography>Um usuário pode marcar a cada:</Typography>
                <Box sx={{ width: 305, height: "100%" }}>
                  <ThreeButtons sx={{ width: "100%" }} />
                </Box>
                <Box>
                  <ToggleButton 
                    isAvailable={isAvailable}
                    onClick={handleToggleAvailability}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "97%",
                      height: "auto",
                      overflow: "auto",
                      mb: 2,
                    }}
                  >
                    <Typography variant="subtitle1" mb={6}>
                      {selectBlock ? selectBlock.name : "Nome"}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", mb: 2 }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        mb={1}
                        color="primary"
                      >
                        Período de Agendamento
                      </Typography>
                      <Typography variant="body1" mb={1}>
                        Um usuário pode marcar a cada:
                      </Typography>
                      <Box sx={{ width: 305, height: "100%" }}>
                        {" "}
                        <ThreeButtons />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 3,
                      mt: -3,
                    }}
                    onClick={handleOpenDialog}
                  >
                    <Button
                      sx={{
                        borderRadius: "15px",
                        width: "105px",
                        right: "40px",
                        textTransform: "none",
                        color: isRemoveSelected ? "#FFF" : "inherit",
                        backgroundColor: isRemoveSelected
                          ? "#8F4C36"
                          : "inherit",
                      }}
                      onClick={handleRemove}
                    >
                      Remover
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir esta quadra?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRemove} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}