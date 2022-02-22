import { IPastelDict, ITheme, pastelDict } from "../constants";

export const setTheme = (id: string, theme: ITheme): string => {
  const {
    navBarStyle,
    modalHeaderStyle,
    modalBodyStyle,
    bodyStyle,
    buttonStyle,
    tableHeaderStyle
  } = theme;

  const navbar = document.querySelector("body nav.navbar");
  navbar?.setAttribute("style", navBarStyle);

  const navBarLink = document.querySelectorAll("a.navbar-brand, a.nav-item");
  navBarLink.forEach(link => {
    if (theme.navBarLinkStyle)
      link.setAttribute("style", theme.navBarLinkStyle);
  });

  const modalHeaders = document.querySelectorAll(
    ".modal-content .modal-header"
  );
  modalHeaders.forEach(header => {
    header.setAttribute("style", modalHeaderStyle);
  });

  const modalBodies = document.querySelectorAll(".modal-content .modal-body");
  modalBodies.forEach(body => {
    body.setAttribute("style", modalBodyStyle);
  });

  const body = document.querySelector("body");
  body?.setAttribute("style", bodyStyle);

  const toolbarButtons = document.querySelectorAll("button.btn");
  toolbarButtons.forEach(btn => {
    btn.setAttribute("style", buttonStyle);
  });

  const tableHeader = document.querySelectorAll("#scoreBoard thead th");
  tableHeader.forEach(th => {
    th.setAttribute("style", tableHeaderStyle);
  });

  return id;
};

export const changeGameTheme = (id: keyof IPastelDict): ITheme => {
  const theme = pastelDict[id];
  setTheme(id, theme);

  return theme;
};
