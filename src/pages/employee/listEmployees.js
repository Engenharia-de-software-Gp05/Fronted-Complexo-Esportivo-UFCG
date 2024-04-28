import React, { useState } from "react";
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

  const handleSelectUser = (value) => {
    setSelectedUser(value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleDeleteUser = () => {
    //requisicao
    setSelectedUser(null);
    setOpenDialog(false);
  }

  return (
    <Container component="section" sx={{ width: 1100, height: 956, mt: 5 }}>
      <CssBaseline>
        <Typography variant="h3" sx={{ margin: 3 }}>
          Lista de Funcionários
        </Typography>
        <Grid container spacing={2} style={{ maxHeight: 880, height: 750 }}>
          <Grid item xs={6} style={{ height: 750 }}>
            <div>
              <SearchBarCustom
                database={database}
                searchFor={"name"}
                onSelectItem={handleSelectUser}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ bgcolor: "#FFF8F6", placeItems: "center", borderRadius: 5 }}
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
                  }}
                >
                  <h3 style={{ fontStyle: "normal", fontSize: 32 }}>
                    Detalhes do usuário
                  </h3>
                  <text>
                    <PersonOutlineIcon />
                    {selectedUser ? selectedUser.name : "Nome"}
                  </text>
                  <text>
                    <TextSnippetIcon />
                    {selectedUser ? selectedUser.id : "Matrícula"}
                  </text>
                  <text>
                    <EmailOutlinedIcon />
                    {selectedUser ? selectedUser.email : "E-mail"}
                  </text>
                  <text>
                    <SmartphoneOutlinedIcon />
                    {selectedUser ? selectedUser.phone : "Telfone"}
                  </text>
                </div>
                  <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button 
                      type="submit"
                      variant="contained"
                      sx={{ borderRadius: 20, width: 212, height: 40, textTransform: 'none', margin: 5 }}
                      onClick={handleOpenDialog}
                    >Deletar Funcionário</Button>
                  </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </CssBaseline>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir este Funcionário?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>Cancelar</Button>
          <Button onClick={handleDeleteUser} color='primary'>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

const database = [
  {
    id: 318467219,
    name: "João",
    email: "joao@example.com",
    status: "ativo",
    phone: "123456789",
  },
  {
    id: 586932471,
    name: "Maria",
    email: "maria@example.com",
    status: "ativo",
    phone: "987654321",
  },
  {
    id: 741928365,
    name: "Pedro",
    email: "pedro@example.com",
    status: "ativo",
    phone: "456123789",
  },
  {
    id: 246819573,
    name: "Ana",
    email: "ana@example.com",
    status: "ativo",
    phone: "789456123",
  },
  {
    id: 975381246,
    name: "Lucas",
    email: "lucas@example.com",
    status: "ativo",
    phone: "321654987",
  },
  {
    id: 124689357,
    name: "Mariana",
    email: "mariana@example.com",
    status: "ativo",
    phone: "654987321",
  },
  {
    id: 837591462,
    name: "Carlos",
    email: "carlos@example.com",
    status: "ativo",
    phone: "987321654",
  },
  {
    id: 693857124,
    name: "Fernanda",
    email: "fernanda@example.com",
    status: "ativo",
    phone: "654321987",
  },
  {
    id: 481237965,
    name: "Gabriel",
    email: "gabriel@example.com",
    status: "ativo",
    phone: "987654123",
  },
  {
    id: 795614832,
    name: "Juliana",
    email: "juliana@example.com",
    status: "ativo",
    phone: "321789456",
  },
  {
    id: 365981247,
    name: "Rafael",
    email: "rafael@example.com",
    status: "ativo",
    phone: "456789123",
  },
  {
    id: 428175936,
    name: "Amanda",
    email: "amanda@example.com",
    status: "ativo",
    phone: "789123456",
  },
  {
    id: 591637824,
    name: "Diego",
    email: "diego@example.com",
    status: "ativo",
    phone: "321456789",
  },
  {
    id: 173592648,
    name: "Laura",
    email: "laura@example.com",
    status: "ativo",
    phone: "456789321",
  },
  {
    id: 639284175,
    name: "Rodrigo",
    email: "rodrigo@example.com",
    status: "ativo",
    phone: "789321654",
  },
  {
    id: 856917423,
    name: "Camila",
    email: "camila@example.com",
    status: "ativo",
    phone: "654123789",
  },
];
