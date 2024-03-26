import * as React from 'react';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Typography } from '@mui/material';
import "./style.css"


const data = [
    "vito",
    "Paola",
    "Samuel",
    "marcos",
    "roberto",
    "ronaldo",
    "kaka",
    "gabigol",
    "everton ribeiro",
    "cebolinha"
  ];

const SearchBar = ({setSearchQuery}) => (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Nome do aluno"
        variant="outlined"
        placeholder="Procure pelo nome do aluno"
        size="small"
      />
    </form>
);
const filterData = (query, data) => {
if (!query) {
    return data;
} else {
    return data.filter((d) => d.toLowerCase().includes(query));
}
};

export default function ListarAlunos() {
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, data);
  
    return (
      <main>
        <div></div>
        <div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div style={{ padding: 3 }} className='container'>
            {dataFiltered.map((d) => (
              <div className="item" key={d.id}>
                  <div className='name'><PersonOutlineIcon/>               
                      <Typography className='name-typography'>{d}</Typography>
                  </div>
                  <div>
                      <Typography variant="subtitle1" gutterBottom>
                          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                          blanditiis tenetur
                      </Typography>

                  </div>
                  
              </div>
            ))}
          </div>
        </div>
      </main>
      
    );
  }
  const BlockModal = ({ open, onClose, onBlockConfirm }) => {
    return (
      <Modal open={open} onClose={onClose}>
        <Box className="modal-box">
          <div><BlockOutlinedIcon></BlockOutlinedIcon></div>
          <div><Typography variant='h5'>Deseja bloquear esse usuário?</Typography></div>
          <div><Typography variant='subtitle2' style={{ color: '#53433F' }}>Após o bloqueio, o usuário será incapaz de solicitar agendamentos.</Typography></div>
          <div className='buttons'>
            <Button variant="contained" onClick={onClose}>Cancelar</Button>
            <Button variant='outlined' onClick={() => {onBlockConfirm(); onClose();}}>Bloquear</Button>
          </div>
        </Box>
      </Modal>
    );
  };
  
  const UnblockModal = ({ open, onClose, onUnblockConfirm }) => {
    return (
      <Modal open={open} onClose={onClose}>
        <Box className="modal-box">
        <div><BlockOutlinedIcon></BlockOutlinedIcon></div>
        <div><Typography variant='h5'>Deseja desbloquear esse usuário?</Typography></div>
        <div><Typography variant='subtitle2' style={{ color: '#53433F' }}>Após o desbloqueio, o usuário poderá solicitar agendamentos novamente.</Typography></div>
        <div className='buttons'>
          <Button variant="contained" onClick={onClose}>Cancelar</Button>
          <Button variant='outlined' onClick={() => {onUnblockConfirm(); onClose();}}>Desbloquear</Button>
        </div>
        </Box>
      </Modal>
    );
  };