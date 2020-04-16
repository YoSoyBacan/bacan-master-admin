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
        marginBottom: theme.spacing.unit * 2,
        paddingTop: "25%"
      }
    },
    mainPanel: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing.unit * 2
      },
      background: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflowY: "scroll",
      justifyContent: "center",
      padding: theme.spacing.unit * 6,
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
      overflow: "hidden",
      width: "100vw"
    },
    sidebar: {
      [theme.breakpoints.up("lg")]: {
        backgroundColor: theme.palette.primary.main,
        display: "block",
        paddingTop: '20%'
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
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <SVG className={classes.sidebarArt} src={backgroundArt} />
      </div>
      <div className={classes.mainPanel}>
        <div className={classes.mainPanelContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.displayName = "Layout";
export default Layout;
