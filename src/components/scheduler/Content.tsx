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
import localeDate from "../utils/dateOptions.tsx";

const BASE_API = "https://jogajunto-api.ddns.net";

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
    courtId: null,
  });
  const [courtId, setCourtId] = useState([]);
  const [errors, setErrors] = useState({});
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [selectedTime, setSelectedTime] = useState(); // Selecionar horário
  const [times, setTimes] = useState([]); // horários
  const [timesJson, setTimesJson] = useState(); // json horários

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const url = "https://jogajunto-api.ddns.net/court/all";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setCourtId(data);
      } catch (error) {
        console.error("Erro ao obter os locais:", error);
      }
    };

    fetchLocations();
  }, []);

  const fetchHorarios = async () => {
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
      return responseData;
    } catch (error) {
      console.log("Mensagem de erro:", error);
    }
  };

  function findAvailableSlots(appointments) {
    let availables = [8, 10, 12, 14, 16, 18, 20];
    let horario = 20;

    console.log(timesJson);

    for (let i = 5; i >= 0; i--) {
      horario -= 2;

      for (let j = 0; j < appointments.length; j++) {
        const appointment = appointments[j];
        appointment.startDateTime = new Date(appointment.startDateTime);

        if (appointment.startDateTime.getHours() == horario) {
          availables.splice(i, 1);
        }
      }
    }

    // Formatando cada valor de hora para HH:mm
    const formattedAvailables = availables.map((hour) => {
      const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
      return formattedHour;
    });

    setTimes(formattedAvailables);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Se o campo modificado for a data de início, calcule a data de término adicionando duas horas
    if (name === "startDateTime") {
      const startDateTime = new Date(value);

      if (selectedTime) {
        const hours = selectedTime.split(":")[0];
        startDateTime.setHours(parseInt(hours));
      }

      const response = fetchHorarios();

      findAvailableSlots(response);
      console.log("Times:", times);

      setFormData({
        ...formData,
        [name]: value,
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
      const hours = parseInt(selectedTime.split(":")[0]);
      const startDate = new Date(
        new Date(formData.startDateTime).setHours(hours)
      );

      // Atualiza os valores no formData
      const updatedFormData = {
        ...formData,
        startDateTime: startDate.toISOString().slice(0, 19).replace("T", " "),
      };

      onSubmit(updatedFormData); // Envia o formulário com as datas atualizadas
      setFormData({
        // Limpa os campos do formulário
        startDateTime: null,
        courtId: null,
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
      <Box p={2} width={isMobile ? "100%" : "500"}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Solicitar Agendamento
          </Typography>
          <FormControl fullWidth margin="normal" required>
            <Typography variant="subtitle1">Local</Typography>
            <Select
              name="courtId"
              value={formData.courtId || ""}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Selecione o Local
              </MenuItem>
              {courtId.map((courtId) => (
                <MenuItem key={courtId.id} value={courtId.id}>
                  {courtId.name}
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
            {times.map((horarios, index) => (
              <MenuItem key={index} value={horarios}>
                {horarios}
              </MenuItem>
            ))}
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
