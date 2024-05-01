import React, { useEffect, useState } from "react";
import {
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
} from "@mui/material";
import SearchBarCustom from "../../components/searchBarCustom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function ListEmployees() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/rota");
      if(response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching employees: ", error)
    }
  }  

  const handleSelectUser = (value) => {
    setSelectedUser(value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`/rota/${selectedUser.id}`, { method: "DELETE"});
      if(response.ok) {
        fetchEmployees();
        setSelectedUser(null);
      } else {
        console.error("Failed to delete emplyee: ", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting employee: ", error);
    }
    setOpenDialog(false);
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
          Lista de Funcionários
        </Typography>
        <Grid container spacing={2} style={{ maxHeight: 880 }}>
          <Grid
            item
            xs={12}
            md={6}
            style={{ maxHeight: 750, position: "relative" }}
            order={{ xs: 0, md: 1 }}
            sx={{ p: 8 }}
          >
            <div>
              <SearchBarCustom
                fullwidth
                database={employees}
                searchFor={"name"}
                onSelectItem={handleSelectUser}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              bgcolor: "#FFF8F6",
              placeItems: "center",
              borderRadius: 5,
              border: "1px solid #ccc",
              bgcolor: "common.white",
            }}
            order={{ xs: 0, md: 1 }}
          >
            <div
              className="rigth-section"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div>
                <div
                  className="user-details"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "space-evenly",
                    height: 400,
                    width: "100%",
                  }}
                >
                  <Typography variant="h5">Detalhes do Usuário</Typography>
                  <text>
                    <PersonOutlineIcon />
                    {selectedUser ? selectedUser.name : "Nome"}
                  </text>
                  <text>
                    <EmailOutlinedIcon />
                    {selectedUser ? selectedUser.email : "E-mail"}
                  </text>
                  <text>
                    <SmartphoneOutlinedIcon />
                    {selectedUser ? selectedUser.phone : "Telefone"}
                  </text>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: 20,
                      width: 212,
                      height: 40,
                      textTransform: "none",
                      margin: 5,
                    }}
                    onClick={handleOpenDialog}
                  >
                    Deletar Funcionário
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </CssBaseline>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este Funcionário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}