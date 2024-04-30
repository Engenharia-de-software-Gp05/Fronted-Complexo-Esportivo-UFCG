import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SelectedProvider, useMobileContext } from "./Context.tsx";
import { CustomList, Search, customList } from "../ui/List.tsx";
import { ArrowBack, Close } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import placeholderImg from "../../gifs/placeholder.png";

export const Content = ({ items, property }) => {
  const isMobile = useMobileContext();
  const [text, setText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <SelectedProvider selectedItem={selectedItem}>
      <Grid
        container
        direction={isMobile ? "column" : "row"}
        justifyContent={"center"}
        padding={2}
      >
        <Grid
          item
          xs={12}
          style={{
            position: isMobile ? "sticky" : "static",
            top: 10,
            zIndex: 1,
          }}
        >
          {isMobile ? (
            <Paper>
              <Search value={text} onChange={setText} />
            </Paper>
          ) : (
            <Typography>Desktop</Typography>
          )}
        </Grid>
        <Grid item>
          {/* List */}
          <CustomList
            query={text}
            items={items}
            property={property}
            onSelected={setSelectedItem}
            renderItem={(item) => customList(item)}
          />
          {/* <Detail /> */}
        </Grid>
      </Grid>
    </SelectedProvider>
  );
};

/**
 * Componente para exibir detalhes de um item.
 *
 * @param {Object} props As propriedades do componente.
 * @param {Object} props.item O item a ser exibido.
 * @param {Function} props.onDelete Função para excluir o item.
 *
 * @returns {JSX.Element} O componente de detalhes do item.
 */
export const ItemDetails = ({ item, onDelete, setSelectedItem }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const formatDate = (date) => {
    const options = { day: "numeric", month: "numeric" };
    return new Date(date).toLocaleDateString("pt-BR", options);
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Card sx={{ minHeight: "75.5vh" }}>
        <CardMedia
          component="img"
          height="450"
          image={item.locationImgSrc || placeholderImg}
          alt="Local"
        />
        <CardContent>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h5"
              fontSize={"2em"}
            >{`Detalhes do Agendamento ${item.id}`}</Typography>
            <Box display={"flex"} gap={2} alignItems={"flex-end"}>
              <Avatar>{item.user[0]}</Avatar>
              <Typography variant="subtitle1" fontSize={"1.5em"}>
                {item.user}
              </Typography>
            </Box>
            <Typography
              fontWeight={500}
              fontSize={"1.5em"}
              variant="body1"
            >{`${formatDate(item.startDate)} - ${formatTime(item.startDate)} até ${formatTime(item.endDate)}`}</Typography>
            <Typography variant="body1" fontSize={"1.5em"}>
              {item.location}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ height: "300" }}>
          <Box display={"flex"} justifyContent={"flex-end"} alignItems={""}>
            <IconButton onClick={() => setSelectedItem(null)}>
              <ArrowBack />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Cancelar Agendamento
            </Button>
          </Box>
        </CardActions>
      </Card>
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
            Tem certeza de que deseja excluir este agendamento?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onDelete(item);
                setOpen(false);
              }}
            >
              Excluir
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

/**
 * Componente para exibir um formulário em um drawer.
 *
 * @param {Object} props As propriedades do componente.
 * @param {boolean} props.open O estado de abertura do drawer.
 * @param {Function} props.onClose Função para fechar o drawer.
 * @param {Function} props.onSubmit Função para lidar com o envio do formulário.
 *
 * @returns {JSX.Element} O componente do formulário.
 */
export const Form = ({ open, onClose, onSubmit }) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    userName: null,
    startDate: null,
    endDate: null,
    location: null,
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  // Estado para armazenar os erros de validação do formulário
  const [errors, setErrors] = useState({});

  // Função para lidar com a alteração dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Passou aqui!");
      onSubmit(formData);
      setFormData({
        userName: null,
        startDate: null,
        endDate: null,
        location: null,
      });
      onClose();
    }
  };

  // Função para validar o formulário
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] =
          `${key.charAt(0).toUpperCase() + key.slice(1)} é obrigatório`;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={2} width={isMobile ? "100%" : "500"}>
        <Button
          onClick={onClose}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <Close />
        </Button>
        <form onSubmit={handleSubmit}>
          {/* Campos do formulário */}
          <TextField
            name="startDate"
            label="Data de Início"
            type="datetime-local"
            value={formData.startDate || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            // error={!!errors.startDate}
            // helperText={errors.startDate}
            required
          />
          <TextField
            name="endDate"
            label="Data de Término"
            type="datetime-local"
            value={formData.endDate || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            // error={!!errors.endDate}
            // helperText={errors.endDate}
            required
          />
          {/* Botão de envio do formulário */}
          <Button variant="contained" type="submit">
            Adicionar Item
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};
