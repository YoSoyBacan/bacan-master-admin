import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import CardTitle from '@saleor/components/CardTitle';
import ImageTile from '@saleor/components/ImageTile';
import ImageUpload from '@saleor/components/ImageUpload';
import { commonMessages } from '@saleor/intl';
import { ReorderAction } from '@saleor/types';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { ProductDetails_product_images } from '../../types/ProductDetails';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      marginTop: theme.spacing() * 2,
      [theme.breakpoints.down("sm")]: {
        marginTop: 0
      }
    },
    fileField: {
      display: "none"
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)"
    },
    image: {
      height: "100%",
      objectFit: "contain",
      userSelect: "none",
      width: "100%"
    },
    imageContainer: {
      "&:hover, &.dragged": {
        "& $imageOverlay": {
          display: "block"
        }
      },
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      height: 140,
      margin: "auto",
      overflow: "hidden",
      padding: theme.spacing() * 2,
      position: "relative",
      width: 140
    },
    imageGridContainer: {
      position: "relative"
    },
    imageOverlay: {
      background: "rgba(0, 0, 0, 0.6)",
      cursor: "move",
      display: "none",
      height: 140,
      left: 0,
      padding: theme.spacing() * 2,
      position: "absolute",
      top: 0,
      width: 140
    },
    imageOverlayToolbar: {
      alignContent: "flex-end",
      display: "flex",
      position: "relative",
      right: -theme.spacing() * 3,
      top: -theme.spacing() * 2
    },
    imageUpload: {
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      width: "100%"
    },
    imageUploadActive: {
      zIndex: 1
    },
    imageUploadIcon: {
      display: "none"
    },
    imageUploadIconActive: {
      display: "block"
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing() * 2 + "px",
      gridRowGap: theme.spacing() * 2 + "px",
      gridTemplateColumns: "repeat(4, 1fr)",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(3, 1fr)"
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(2, 1fr)"
      }
    },
    rootDragActive: {
      opacity: 0.2
    }
  });

interface ProductImagesProps extends WithStyles<typeof styles> {
  placeholderImage?: string;
  images: ProductDetails_product_images[];
  loading?: boolean;
  title?: string;
  onImageDelete: (id: string) => () => void;
  onImageEdit: (id: string) => () => void;
  onImageReorder?: ReorderAction;
  onImageUpload(file: File);
}

interface SortableImageProps {
  image: {
    id: string;
    alt?: string;
    url: string;
  };
  onImageEdit: (id: string) => void;
  onImageDelete: () => void;
}

const SortableImage = SortableElement<SortableImageProps>(
  ({ image, onImageEdit, onImageDelete }) => (
    <ImageTile
      image={image}
      onImageEdit={onImageEdit ? () => onImageEdit(image.id) : undefined}
      onImageDelete={onImageDelete}
    />
  )
);

interface ImageListContainerProps {
  className: string;
  items: any;
  onImageDelete: (id: string) => () => void;
  onImageEdit: (id: string) => () => void;
}

const ImageListContainer = SortableContainer<ImageListContainerProps>(
  withStyles(styles, { name: "ImageListContainer" })(
    ({
      classes,
      items,
      onImageDelete,
      onImageEdit,
      ...props
    }: ImageListContainerProps & WithStyles<typeof styles>) => {
      return (
        <div {...props}>
          {items.map((image, index) => (
            <SortableImage
              key={`item-${index}`}
              index={index}
              image={image}
              onImageEdit={onImageEdit ? onImageEdit(image.id) : null}
              onImageDelete={onImageDelete(image.id)}
            />
          ))}
        </div>
      );
    }
  )
);

const ProductImages = withStyles(styles, { name: "ProductImages" })(
  ({
    classes,
    images,
    placeholderImage,
    loading,
    onImageEdit,
    onImageDelete,
    onImageReorder,
    onImageUpload,
    title
  }: ProductImagesProps) => {
    const intl = useIntl();
    const upload = React.useRef(null);
    const renderTitle = !!title ? title : "Imágenes";
    return (
      <Card className={classes.card}>
        <CardTitle
          title={renderTitle}
          toolbar={
            <>
              <Button
                onClick={() => upload.current.click()}
                disabled={loading}
                variant="text"
                color="primary"
                data-tc="button-upload-image"
              >
                {intl.formatMessage(commonMessages.uploadImage)}
              </Button>
              <input
                className={classes.fileField}
                id="fileUpload"
                onChange={event => onImageUpload(event.target.files[0])}
                type="file"
                ref={upload}
              />
            </>
          }
        />
        <div className={classes.imageGridContainer}>
          {images === undefined ? (
            <CardContent>
              <div className={classes.root}>
                <div className={classes.imageContainer}>
                  <img className={classes.image} src={placeholderImage} />
                </div>
              </div>
            </CardContent>
          ) : images.length > 0 ? (
            <>
              <ImageUpload
                className={classes.imageUpload}
                isActiveClassName={classes.imageUploadActive}
                disableClick={true}
                iconContainerClassName={classes.imageUploadIcon}
                iconContainerActiveClassName={classes.imageUploadIconActive}
                onImageUpload={onImageUpload}
              >
                {({ isDragActive }) => (
                  <CardContent>
                    <ImageListContainer
                      distance={20}
                      helperClass="dragged"
                      axis="xy"
                      items={images}
                      onSortEnd={onImageReorder}
                      className={classNames({
                        [classes.root]: true,
                        [classes.rootDragActive]: isDragActive
                      })}
                      onImageDelete={onImageDelete}
                      onImageEdit={onImageEdit}
                    />
                  </CardContent>
                )}
              </ImageUpload>
            </>
          ) : (
            <ImageUpload onImageUpload={onImageUpload} />
          )}
        </div>
      </Card>
    );
  }
);
ProductImages.displayName = "ProductImages";
export default ProductImages;
