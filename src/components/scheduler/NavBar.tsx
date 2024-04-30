import { Drawer, List, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import { useMobileContext, useNavContext } from "./Context.tsx";
import { ListItemIconButton } from "../ui/List.tsx";
import { Add, Person, Schedule } from "@mui/icons-material";

export const NavBar = ({ isOpen, setIsOpen }) => {
  const isMobile = useMobileContext();

  const handleItemClick = () => {
    console.log("Botão Cliacado!");
  };

  return isMobile ? (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <List>
        <ListItemIconButton onClick={handleItemClick}>
          <Add />
        </ListItemIconButton>
        <ListItemIconButton onClick={handleItemClick}>
          <Schedule />
        </ListItemIconButton>
        <ListItemIconButton onClick={handleItemClick}>
          <Person />
        </ListItemIconButton>
      </List>
    </SwipeableDrawer>
  ) : (
    <Drawer anchor="left" variant={"permanent"}>
      <List>
        <ListItemIconButton onClick={handleItemClick}>
          <Add />
        </ListItemIconButton>
        <ListItemIconButton onClick={handleItemClick}>
          <Schedule />
        </ListItemIconButton>
        <ListItemIconButton onClick={handleItemClick}>
          <Person />
        </ListItemIconButton>
      </List>
    </Drawer>
  );
};
