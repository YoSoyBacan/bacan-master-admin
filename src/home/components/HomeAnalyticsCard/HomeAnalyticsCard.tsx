import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { IconProps } from '@material-ui/core/Icon';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const styles = (theme: Theme) =>
  createStyles({
    cardContent: {
      "&:last-child": {
        padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px`
      },
      display: "grid",
      gridColumnGap: theme.spacing() * 3 + "px",
      gridTemplateColumns: "1fr 64px"
    },
    cardSpacing: {
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing()
      },
      marginBottom: theme.spacing() * 3
    },
    cardSubtitle: {
      fontSize: 12,
      height: "20px",
      lineHeight: 0.9
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 500 as 500
    },
    icon: {
      color: theme.palette.primary.contrastText,
      fontSize: 54,
      margin: ".5rem .3rem"
    },
    iconBackground: {
      backgroundColor: theme.palette.background.default,
      borderRadius: "8px",
      color: "white",
      fontSize: "54px",
      height: "100%",
      padding: "10px 5px 0px 5px",
      width: "100%"
    },
    value: {
      textAlign: "right"
    }
  });

interface HomeAnalyticsCardProps extends WithStyles<typeof styles> {
  icon: React.ReactElement<IconProps>;
  title: string;
  children?: React.ReactNode;
}

const HomeAnalyticsCard = withStyles(styles, { name: "HomeAnalyticsCard" })(
  ({ children, classes, title, icon }: HomeAnalyticsCardProps) => (
    <Card className={classes.cardSpacing}>
      <CardContent className={classes.cardContent}>
        <div>
          <Typography className={classes.cardTitle} variant="subtitle1">
            {title}
          </Typography>
          <Typography
            className={classes.cardSubtitle}
            variant="caption"
            color="textSecondary"
          >
            <FormattedMessage
              defaultMessage="Today"
              id="homeAnalyticsCardHeader"
            />
          </Typography>
          <Typography
            className={classes.value}
            color="textPrimary"
            variant="h4"
          >
            {children}
          </Typography>
        </div>
        <div className={classes.iconBackground}>{icon}</div>
      </CardContent>
    </Card>
  )
);
HomeAnalyticsCard.displayName = "HomeAnalyticsCard";
export default HomeAnalyticsCard;
