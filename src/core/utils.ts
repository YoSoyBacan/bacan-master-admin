import { Base64 } from 'js-base64';

export const slugify = (text: string | number): string =>
text
  .toString()
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-") // Replace spaces with -
  .replace(/&/g, "-and-") // Replace & with 'and'
  .replace(/[^\w\-]+/g, "") // Remove all non-word chars
  .replace(/\-\-+/g, "-"); // Replace multiple - with single -


export const getDBIdFromGraphqlId = (
  graphqlId: string,
  schema?: string
): number => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)/;
  const arr = regexp.exec(rawId);
  if (schema && schema !== arr![1]) {
    throw new Error("Schema is not correct");
  }
  return parseInt(arr![2], 10);
};



export const generateProductUrl = (id: string, name: string) =>
  `/negocio/${slugify(name)}/${getDBIdFromGraphqlId(id, "Product")}/`;

export const generateCategoryUrl = (id: string, name: string) =>
  `/industria/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generateCollectionUrl = (id: string, name: string) =>
  `/coleccion/${slugify(name)}/${getDBIdFromGraphqlId(id, "Collection")}/`;

export const generatePageUrl = (slug: string) => `/pagina/${slug}/`;
