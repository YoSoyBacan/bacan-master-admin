import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import CardTitle from '@saleor/components/CardTitle';
import Skeleton from '@saleor/components/Skeleton';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      marginBottom: 2 * theme.spacing()
    },
    highlightedImageContainer: {
      borderColor: theme.palette.primary.main
    },
    image: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%"
    },
    imageContainer: {
      background: "#ffffff",
      border: "2px solid #eaeaea",
      borderRadius: theme.spacing(),
      cursor: "pointer",
      height: 48,
      overflow: "hidden",
      padding: theme.spacing() / 2,
      position: "relative"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing() * 2 + "px",
      gridRowGap: theme.spacing() + "px",
      gridTemplateColumns: "repeat(4, 1fr)"
    },
    toolbar: { marginTop: -theme.spacing() / 2 }
  });

interface ProductImageNavigationProps extends WithStyles<typeof styles> {
  disabled: boolean;
  images?: Array<{
    id: string;
    url: string;
  }>;
  highlighted?: string;
  onRowClick: (id: string) => () => void;
}

const ProductImageNavigation = withStyles(styles, {
  name: "ProductImageNavigation"
})(
  ({
    classes,
    highlighted,
    images,
    onRowClick
  }: ProductImageNavigationProps) => {
    const intl = useIntl();

    return (
      <Card className={classes.card}>
        <CardTitle
          title={intl.formatMessage({
            defaultMessage: "All Photos",
            description: "section header"
          })}
        />
        <CardContent>
          {images === undefined ? (
            <Skeleton />
          ) : (
            <div className={classes.root}>
              {images.map(image => (
                <div
                  className={classNames({
                    [classes.imageContainer]: true,
                    [classes.highlightedImageContainer]:
                      image.id === highlighted
                  })}
                  onClick={onRowClick(image.id)}
                  key={image.id}
                >
                  <img className={classes.image} src={image.url} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
ProductImageNavigation.displayName = "ProductImageNavigation";
export default ProductImageNavigation;
