import backgroundArt from '@assets/images/login-background.svg';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import SVG from 'react-inlinesvg';

const useStyles = makeStyles(
  (theme: Theme) => ({
    logo: {
      "& svg": {
        display: "block",
        height: 40,
        marginBottom: theme.spacing() * 2,
        paddingTop: "25%"
      }
    },
    mainPanel: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing() * 2
      },
      background: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflowY: "auto",
      justifyContent: "center",
      padding: theme.spacing() * 6,
      width: "100%"
    },
    mainPanelContent: {
      [theme.breakpoints.up("xs")]: {
        width: "100%"
      },
      [theme.breakpoints.up("sm")]: {
        width: 600
      },
      "@media (min-width: 1440px)": {
        width: 850
      },
      [theme.breakpoints.down("md")]: {
        marginTop: "10rem"
      },
      height: "100%",
      margin: "auto",
      paddingTop: "10%",
      width: "100%",
    },
    root: {
      [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "376px 1fr"
      },
      "@media (min-width: 1440px)": {
        gridTemplateColumns: "376px 1fr"
      },
      display: "grid",
      gridTemplateColumns: "1fr",
      height: "100vh",
      width: "100vw",
      overflow: "auto"
    },
    navBar: {
      [theme.breakpoints.down("md")]: {
        display: "block",
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        height: "6rem",
        overflow: "hidden",
        zIndex: 9999
      },
      display: "none",
    },
    logoArt: {
      "& svg": {
        width: "100%",
        height: "100%",
      }
    },
    sidebar: {
      [theme.breakpoints.up("lg")]: {
        backgroundColor: theme.palette.primary.main,
        display: "block",
        paddingTop: '40%'
      },
      display: "none",
    },
    sidebarArt: {
      "& svg": {
        width: "100%"
      }
    },
  }),
  {
    name: "Layout"
  }
);

const Layout: React.FC = props => {
  const { children } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.root} id="root-content">
      <div className={classes.sidebar}>
        <SVG className={classes.sidebarArt} src={backgroundArt} />
      </div>
      <div className={classes.navBar}>
        <SVG className={classes.logoArt} src={backgroundArt}/>
      </div>
      <div className={classes.mainPanel} id="content-panel">
        <div className={classes.mainPanelContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
export default Layout;
