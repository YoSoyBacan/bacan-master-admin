import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardTitle from '@saleor/components/CardTitle';
import { DateTime } from '@saleor/components/Date';
import { Hr } from '@saleor/components/Hr';
import Skeleton from '@saleor/components/Skeleton';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { maybe } from '../../../misc';
import { CustomerDetails_user } from '../../types/CustomerDetails';

const styles = (theme: Theme) =>
  createStyles({
    label: {
      marginBottom: theme.spacing()
    },
    value: {
      fontSize: 24
    }
  });

export interface CustomerStatsProps extends WithStyles<typeof styles> {
  customer: CustomerDetails_user;
}

const CustomerStats = withStyles(styles, { name: "CustomerStats" })(
  ({ classes, customer }: CustomerStatsProps) => {
    const intl = useIntl();

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({
            defaultMessage: "Customer History",
            description: "section header",
             
          })}
        />
        <CardContent>
          <Typography className={classes.label} variant="caption">
            <FormattedMessage defaultMessage="Last login"
               />
          </Typography>
          {maybe(
            () => (
              <Typography variant="h6" className={classes.value}>
                {customer.lastLogin === null ? (
                  "-"
                ) : (
                  <DateTime date={customer.lastLogin} />
                )}
              </Typography>
            ),
            <Skeleton />
          )}
        </CardContent>
        <Hr />
        <CardContent>
          <Typography className={classes.label} variant="caption">
            <FormattedMessage defaultMessage="Last order"
               />
          </Typography>
          {maybe(
            () => (
              <Typography variant="h6" className={classes.value}>
                {customer.lastPlacedOrder.edges.length === 0 ? (
                  "-"
                ) : (
                  <DateTime
                    date={customer.lastPlacedOrder.edges[0].node.created}
                  />
                )}
              </Typography>
            ),
            <Skeleton />
          )}
        </CardContent>
      </Card>
    );
  }
);
CustomerStats.displayName = "CustomerStats";
export default CustomerStats;
