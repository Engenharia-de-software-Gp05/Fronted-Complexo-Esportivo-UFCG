import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CssBaseline,
  Container,
  Button,
} from "@mui/material";
import ThreeButtons from "../../components/threeButtons";
import ToggleButton from "../../components/toggleButton";
import SearchBarCustom from "../../components/searchBarCustom";

export default function ListCourts() {
  const [selectBlock, setSelectBlock] = useState(null);
  const [isSaveSelected, setSaveSelected] = useState(false);
  const [isRemoveSelected, setRemoveSelected] = useState(false);

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
                database={database}
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
                  src="https://via.placeholder.com/554x396"
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
                  <ToggleButton />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 3,
                    mt: 3,
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: "15px",
                      width: "105px",
                      right: "40px",
                      textTransform: "none",
                      color: isSaveSelected ? "#FFF" : "inherit",
                      backgroundColor: isSaveSelected ? "#8F4C36" : "inherit",
                    }}
                    onClick={handleSave}
                  >
                    Salvar
                  </Button>

                  <Button
                    sx={{
                      borderRadius: "15px",
                      width: "105px",
                      right: "40px",
                      textTransform: "none",
                      color: isRemoveSelected ? "#FFF" : "inherit",
                      backgroundColor: isRemoveSelected ? "#8F4C36" : "inherit",
                    }}
                    onClick={handleRemove}
                  >
                    Remover
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </Container>
  );
}

const database = [
  {
    id: 1,
    name: "João1",
    email: "joao@example.com",
    phone: "123456789",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor mi sit amet ante fermentum, et posuere sem venenatis.",
  },
  {
    id: 2,
    name: "Maria",
    email: "maria@example.com",
    phone: "987654321",
    descricao:
      "Nulla facilisi. Integer ullamcorper scelerisque sem, ac varius nisi. Cras pulvinar convallis elit ut accumsan.",
  },
  {
    id: 3,
    name: "Pedro",
    email: "pedro@example.com",
    phone: "456123789",
    descricao:
      "Vestibulum vitae tortor at tellus ullamcorper accumsan. Integer et est at arcu auctor consectetur.",
  },
  {
    id: 4,
    name: "Ana",
    email: "ana@example.com",
    phone: "789456123",
    descricao:
      " Havia uma vez, em uma pequena aldeia encantada entre colinas verdejantes, uma jovem chamada Sofia. Ela era conhecida por sua curiosidade infinita e sua coragem inabalável. Um dia, enquanto explorava a floresta ao redor da aldeia, Sofia encontrou uma antiga caverna escondida entre as árvores. Curiosa, decidiu entrar. Dentro da caverna, descobriu um tesouro brilhante protegido por um dragão adormecido. Sem hesitar, Sofia decidiu enfrentar o desafio. Com coragem e astúcia, conseguiu distrair o dragão tempo suficiente para pegar o tesouro e escapar. Ao retornar à aldeia, Sofia compartilhou sua aventura e seu tesouro, inspirando todos com sua coragem. A partir desse dia, ela foi lembrada como a heroína da aldeia, ensinando a todos a importância de seguir seus sonhos e enfrentar os desafios com determinação.",
  },
  {
    id: 5,
    name: "Lucas",
    email: "lucas@example.com",
    phone: "321654987",
    descricao:
      "Praesent in est non nisl malesuada lobortis eget sed eros. Ut fringilla urna eu eros laoreet, at facilisis libero commodoPraesent in est non nisl malesuada lobortis eget sed eros. Ut fringilla urna eu eros laoreet, at facilisis libero commodo.",
  },
  {
    id: 6,
    name: "Mariana",
    email: "mariana@example.com",
    phone: "654987321",
    descricao:
      "In hac habitasse platea dictumst. Ut malesuada ex nec feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    id: 7,
    name: "Carlos",
    email: "carlos@example.com",
    phone: "987321654",
    descricao:
      "Vivamus ac dapibus arcu. Vestibulum eu feugiat magna. Integer id ligula sollicitudin, suscipit mi nec, bibendum lectus.",
  },
  {
    id: 8,
    name: "Fernanda",
    email: "fernanda@example.com",
    phone: "654321987",
    descricao:
      "Donec fermentum nec neque at condimentum. Nullam ultrices eleifend risus vel viverra. Proin vehicula tellus quis nisl gravida consequat.",
  },
  {
    id: 9,
    name: "Gabriel",
    email: "gabriel@example.com",
    phone: "987654123",
    descricao:
      "Suspendisse fermentum a libero ut laoreet. Mauris viverra elit sed dictum volutpat. Proin hendrerit mauris ac lacus volutpat, ac tempor ex aliquet.",
  },
  {
    id: 10,
    name: "Juliana",
    email: "juliana@example.com",
    phone: "321789456",
    descricao:
      "Sed in ipsum fermentum, fermentum justo sit amet, dictum dui. Etiam malesuada, dui non scelerisque auctor, ligula sem faucibus enim, ut vestibulum justo turpis at justo.",
  },
  {
    id: 11,
    name: "Rafael",
    email: "rafael@example.com",
    phone: "456789123",
    descricao:
      "Phasellus vel lacus id turpis mollis tempus. Curabitur efficitur sapien eget erat mattis tincidunt. Mauris nec purus at sapien elementum pharetra eu nec risus.",
  },
  {
    id: 12,
    name: "Amanda",
    email: "amanda@example.com",
    phone: "789123456",
    descricao:
      "Quisque in velit nec enim hendrerit suscipit. Morbi non nisi eget turpis blandit egestas. Ut id purus nec dolor fringilla accumsan.",
  },
  {
    id: 13,
    name: "Diego",
    email: "diego@example.com",
    phone: "321456789",
    descricao:
      "Fusce elementum, ligula sit amet blandit faucibus, lacus lorem convallis nunc, id venenatis velit urna a risus. Nulla eget consectetur sapien.",
  },
  {
    id: 14,
    name: "Laura",
    email: "laura@example.com",
    phone: "456789321",
    descricao:
      "Pellentesque placerat aliquet justo, et ultricies dui sollicitudin sed. Vestibulum suscipit elit in magna lacinia, nec accumsan felis hendrerit.",
  },
  {
    id: 15,
    name: "Rodrigo",
    email: "rodrigo@example.com",
    phone: "789321654",
    descricao:
      "Fusce quis convallis odio. Nulla tempor cursus sem, in bibendum urna fringilla non. Maecenas a bibendum nisi, id lacinia libero.",
  },
  {
    id: 16,
    name: "Camila",
    email: "camila@example.com",
    phone: "654123789",
    descricao: "Duis tincidunt hendrerit velit, id gravida ante",
  },
];
