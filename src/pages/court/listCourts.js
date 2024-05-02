import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  CssBaseline,
  Container,
  Button,
} from "@mui/material";
import ThreeButtons from "../../components/threeButtons";
import SearchBarCustom from "../../components/searchBarCustom";

export default function ListCourts() {
  const [selectBlock, setSelectBlock] = useState(null);
  const [isSaveSelected, setSaveSelected] = useState(false);
  const [isRemoveSelected, setRemoveSelected] = useState(false);
  const [allCourts, setAllCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedCourtPath, setSelectedCourtPath] = useState("https://via.placeholder.com/554x396");

  const handleBlockSelect = (value) => {
    setSelectBlock(value);
  };

  const handleSave = () => {
    setSaveSelected(true);
    setRemoveSelected(false);
  };

  const handleRemove = () => {
    setSaveSelected(false);
    setRemoveSelected(true);
  };

  const listAllCourts = async () => {
    const url = window.REACT_APP_API_URL + `/court/all`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return response.json();
  };

  const listCourtById = async ({ courtId }) => {
    const url = window.REACT_APP_API_URL + `/court/by/id?id=${courtId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const responseData = await response.json();
    console.log(responseData) 
    const imagesUrl = responseData.imagesUrl;
    setSelectedCourtPath(imagesUrl[0]);
    return responseData
  };

  useEffect(() => {
    listAllCourts().then((data) => {
      setAllCourts(data);
    });
  }, []);

  useEffect(() => {
    if (!selectBlock) {
      return;
    }

    listCourtById({ courtId: selectBlock.id }).then((data) => {
      setSelectedCourt(data);
    });
  }, [selectBlock]);

  return (
    <Container component="section" sx={{ width: 1050, height: 910, mt: 1 }}>
      <CssBaseline>
        <Typography variant="h3" sx={{ margin: 3 }}>
          Lista de Quadras
        </Typography>
        <Grid container spacing={2} style={{ maxHeight: 880 }}>
          <Grid item xs={6}>
            <div>
              <SearchBarCustom
                database={allCourts}
                searchFor={"name"}
                onSelectItem={handleBlockSelect}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ width: "100%", height: "20%", bgcolor: "common.white" }}
          >
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{ height: "100%" }}
            >
              <Grid item sx={{ height: "45%", width: "97%" }}>
                <img
                  src=""
                  alt="Imagem"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
              <Grid item sx={{ height: "55%" }}>
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
                        <ThreeButtons
                          reserveDays={
                            selectedCourt?.minimumIntervalBetweenReservation
                          }
                        />
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
    </Container>
  );
}
