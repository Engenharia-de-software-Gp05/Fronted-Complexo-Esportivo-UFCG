import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import "./style-students.css";

const student = {
  name: "vito",
  id: 1211111111,
  status: "bloqueado",
  email: "vito@gmail.com",
  phone: "(83) 99999999",
};
const student1 = {
  name: "paola",
  id: 1211111112,
  status: "ativo",
  email: "paola@gmail.com",
  phone: "(83) 88888888",
};
const student2 = {
  name: "samuel",
  id: 1211111113,
  status: "ativo",
  email: "samuel@gmail.com",
  phone: "(83) 77777777",
};

const data = [student, student1, student2];

export default function ListStudents() {
  const [selectedUser, setSelectedUser] = useState(data[0]);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [unblockModalOpen, setUnblockModalOpen] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBlockConfirm = () => {
    const updatedUser = { ...selectedUser, status: "bloqueado" };
    setSelectedUser(updatedUser);
    setBlockModalOpen(false);
  };

  const handleUnblockConfirm = () => {
    const updatedUser = { ...selectedUser, status: "ativo" };
    setSelectedUser(updatedUser);
    setUnblockModalOpen(false);
  };

  return (
    <div className="list-student-container">
      <main className="list-student-main">
        <h1>Lista de Usuários</h1>

        <div>
          <LeftSide
            onSelectUser={handleUserClick}
            selectedUser={selectedUser}
          />
          <RightSide
            selectedUser={selectedUser}
            onBlockConfirm={() => setBlockModalOpen(true)}
            onUnblockConfirm={() => setUnblockModalOpen(true)}
          />
          <BlockModal
            open={blockModalOpen}
            onClose={() => setBlockModalOpen(false)}
            onBlockConfirm={handleBlockConfirm}
          />
          <UnblockModal
            open={unblockModalOpen}
            onClose={() => setUnblockModalOpen(false)}
            onUnblockConfirm={handleUnblockConfirm}
          />
        </div>
      </main>
    </div>
  );
}

function LeftSide({ onSelectUser, selectedUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);

  return (
    <div className="list-student-left-section">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="list-student-users">
        {dataFiltered.map((d) => (
          <div
            className={`list-student-user ${selectedUser.id === d.id ? "list-student-selected-user" : ""}`}
            key={d.id}
            onClick={() => onSelectUser(d)}
          >
            <div className="list-student-icon-name">
              <PersonOutlineIcon />
            </div>
            <div className="list-student-name">
              <Typography variant="h8">
                <strong>{d.name}</strong>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                victor vinicius freire de araujo
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RightSide({ selectedUser, onBlockConfirm, onUnblockConfirm }) {
  return (
    <div className="list-student-right-section">
      <div>
        <div className="list-student-user-details">
          <h3>Detalhes do usuário</h3>
          <text>
            <PersonOutlineIcon />
            {selectedUser.name}
          </text>
          <text>
            <TextSnippetIcon />
            {selectedUser.id}
          </text>
          <text>
            <EmailOutlinedIcon />
            {selectedUser.email}
          </text>
          <text>
            <SmartphoneOutlinedIcon />
            {selectedUser.phone}
          </text>
        </div>
      </div>
      <div>
        {selectedUser.status === "bloqueado" ? (
          <>
            <Button variant="contained" onClick={onUnblockConfirm}>
              Desbloquear usuário
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={onBlockConfirm}>
              Bloquear usuário
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      className="list-student-search-bar"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      variant="outlined"
      placeholder="Procure pelo nome do aluno"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <CancelOutlinedIcon />
          </InputAdornment>
        ),
      }}
    />
  </form>
);

const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase()),
    );
  }
};

const BlockModal = ({ open, onClose, onBlockConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="list-student-modal-box">
        <div>
          <BlockOutlinedIcon />
        </div>
        <div>
          <Typography variant="h5">Deseja bloquear esse usuário?</Typography>
        </div>
        <div>
          <Typography variant="subtitle2" style={{ color: "#53433F" }}>
            Após o bloqueio, o usuário será incapaz de solicitar agendamentos.
          </Typography>
        </div>
        <div className="list-student-buttons">
          <Button variant="contained" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="outlined" onClick={onBlockConfirm}>
            Bloquear
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

const UnblockModal = ({ open, onClose, onUnblockConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="list-student-modal-box">
        <div>
          <BlockOutlinedIcon />
        </div>
        <div>
          <Typography variant="h5">Deseja desbloquear esse usuário?</Typography>
        </div>
        <div>
          <Typography variant="subtitle2" style={{ color: "#53433F" }}>
            Após o desbloqueio, o usuário poderá solicitar agendamentos
            novamente.
          </Typography>
        </div>
        <div className="list-student-buttons">
          <Button variant="contained" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="outlined" onClick={onUnblockConfirm}>
            Desbloquear
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
