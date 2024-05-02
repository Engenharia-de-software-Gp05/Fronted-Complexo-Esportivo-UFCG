import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SelectedProvider, useMobileContext } from "./Context.tsx";
import { CustomList, Search, customList } from "../ui/List.tsx";
import { ArrowBack, Close } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import placeholderImg from "../../gifs/placeholder.png";

const BASE_API = "http://localhost:4000";

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
  const [formData, setFormData] = useState({
    startDateTime: null,
    endDateTime: null,
    location: null,
  });
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [selectedTime, setSelectedTime] = useState("");
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const url = `${window.REACT_APP_API_URL}/court/all`;
        
        const response = await fetch(url,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
        );
        const data = await response.json();
        setLocations(data);
        console.log(data)
        const url2 = `${window.REACT_APP_API_URL}/reservation/detailed/by/authenticatedUser/`;
        
        const response2 = await fetch(url2,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
        );
        const data2 = await response2.json();
        console.log(data2)
        setTimes(data2);

      } catch (error) {
        console.error("Erro ao obter os locais:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Se o campo modificado for a data de início, calcule a data de término adicionando duas horas
    if (name === "startDateTime") {
      const startDateTime = new Date(value);
      const endDateTime = new Date(startDateTime);

      if (selectedTime) {
        const hours = selectedTime.split(":")[0];
        console.log(hours);
        startDateTime.setHours(parseInt(hours));
        endDateTime.setHours(startDateTime.getHours() + 2);
      }

      setFormData({
        ...formData,
        [name]: value,
        endDateTime: endDateTime.toISOString().slice(0, -8),
      }); // Converte para o formato 'YYYY-MM-DDTHH:mm'
    } else if (name === "startTime") {
      setSelectedTime(value); // Armazena o horário selecionado
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Calcula a data de término adicionando duas horas à data de início
      const startDateTime = new Date(formData.startDateTime);
      startDateTime.setHours(parseInt(selectedTime.split(":")[0]));
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(startDateTime.getHours() + 2);

      // Atualiza os valores no formData
      const updatedFormData = {
        ...formData,
        startDateTime: startDateTime.toISOString().slice(0, -8),
        endDateTime: endDateTime.toISOString().slice(0, -8),
      };

      console.log(updatedFormData);

      onSubmit(updatedFormData); // Envia o formulário com as datas atualizadas
      setFormData({
        // Limpa os campos do formulário
        startDateTime: null,
        endDateTime: null,
        location: null,
      });
      onClose(); // Fecha o drawer
    }
  };

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

  const getMaxDate = () => {
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return lastDayOfMonth.toISOString().slice(0, -8); // Converte para o formato 'YYYY-MM-DDTHH:mm'
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <IconButton
        onClick={() => console.log("Teste")}
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        <Close />
      </IconButton>
      <Box p={2} width={isMobile ? "100%" : "500"}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Solicitar Agendamento
          </Typography>
          <FormControl fullWidth margin="normal" required>
            <Typography variant="subtitle1">Local</Typography>
            <Select
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Selecione o Local
              </MenuItem>
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.id + 1}>
                  {location.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="subtitle1">Data de Início</Typography>
          <TextField
            name="startDateTime"
            type="date"
            value={formData.startDateTime || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{
              min: new Date().toISOString().slice(0, -8),
              max: getMaxDate(),
            }}
            required
          />
          <Select
            name="startTime"
            value={selectedTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="" disabled>
              Selecione o Horário
            </MenuItem>
            {/* Exemplo de opções de horário */}
            <MenuItem value="09:00">09:00</MenuItem>
            <MenuItem value="10:00">10:00</MenuItem>
            {/* Adicione mais opções conforme necessário */}
          </Select>
          <Button variant="contained" type="submit">
            Solicitar
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};
