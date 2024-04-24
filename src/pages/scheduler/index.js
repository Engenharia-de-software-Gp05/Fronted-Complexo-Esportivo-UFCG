import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Scheduler from "../../components/scheduler/Scheduler";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useState } from "react";
import SearchBarCustom from "../../components/searchBarCustom";

const database = [
  {
    courtId: 0,
    courtName: "Quadra de Tênis",
  },
  {
    courtId: 1,
    courtName: "Quadra de Vôlei",
  },
];

const SchedulerPage = () => {
  const theme = useTheme();
  const [selectBlock, setSelectBlock] = useState(null);

  const handleBlockSelect = (value) => {
    setSelectBlock(value);
  };

  return (
    <Grid
      container
      minHeight={"100vh"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Grid item xs={12} md={6} width={"80%"}>
        <Paper sx={{ backgroundColor: theme.palette.surface.inverse_on }}>
          <Grid container direction="column" padding={4} spacing={2}>
            <Grid item>
              <Typography
                fontWeight={600}
                fontSize={{ xs: "1.5em", md: "3em" }}
                color={theme.palette.primary.main}
                padding={2}
                variant="h1"
                align="left"
              >
                Solicitar Agendamento
              </Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} md>
                <SearchBarCustom
                  database={database}
                  searchFor={"courtName"}
                  onSelectItem={handleBlockSelect}
                />
              </Grid>
              <Grid item xs={12} md>
                <Scheduler selectItem={selectBlock} />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SchedulerPage;
