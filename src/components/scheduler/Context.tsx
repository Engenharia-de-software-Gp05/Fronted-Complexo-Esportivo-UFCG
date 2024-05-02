import React, { createContext, useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const MobileContext = createContext(false);

export const MobileProvider = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
  );
};

export const useMobileContext = () => {
  const isMobile = useContext(MobileContext);
  if (typeof isMobile === "undefined") {
    alert("useMobileContext must be used within a MobileProvider");
  }
  return isMobile;
};

const SelectedContext = createContext(null);

export const SelectedProvider = ({ selectedItem, children }) => {
  return (
    <SelectedContext.Provider value={selectedItem}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelectedContext = () => {
  const selectedItem = useContext(SelectedContext);
  if (typeof selectedItem === "undefined") {
    alert(
      "useSelectedContext must be used within a SelectedProvider"
    );
  }
  return selectedItem;
};

const NavContext = createContext({
  isOpen: false,
  setIsOpen: (status: boolean) => {},
});

export const NavProvider = ({ children, isOpen, setIsOpen }) => {
  return (
    <NavContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  const { isOpen, setIsOpen } = useContext(NavContext);
  if (typeof isOpen === "undefined" || typeof setIsOpen === "undefined") {
    alert("useNavContext must be used within a NavProvider");
  }
  return { isOpen, setIsOpen };
};
