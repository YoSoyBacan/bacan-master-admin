import { defineMessages, IntlShape } from 'react-intl';

export const commonMessages = defineMessages({
  availability: {
    defaultMessage: "Disponibilidad"
  },
  catalog: {
    defaultMessage: "Catálogo"
  },
  dashboard: {
    defaultMessage: "Dashboard"
  },
  description: {
    defaultMessage: "Descripción"
  },
  discounts: {
    defaultMessage: "Descuentos"
  },
  drafts: {
    defaultMessage: "Drafts"
  },
  email: {
    defaultMessage: "E-mail"
  },
  endDate: {
    defaultMessage: "Fecha Final"
  },
  endHour: {
    defaultMessage: "Hora Final"
  },
  firstName: {
    defaultMessage: "Nombre"
  },
  generalInformations: {
    defaultMessage: "Información General"
  },
  lastName: {
    defaultMessage: "Apellido"
  },
  no: {
    defaultMessage: "No"
  },
  optionalField: {
    defaultMessage: "Opcional",
    description: "field is optional"
  },
  properties: {
    defaultMessage: "Propiedades"
  },
  readOnly: {
    defaultMessage: "Saleor runs in read-only mode. Changes not saved."
  },
  requiredField: {
    defaultMessage: "Este campo es requerido."
  },
  savedChanges: {
    defaultMessage: "Cambios Guardados"
  },
  somethingWentWrong: {
    defaultMessage: "Bacán ha tenido un problema inesperado"
  },
  startDate: {
    defaultMessage: "Fecha Inicial"
  },
  startHour: {
    defaultMessage: "Hora Inicial"
  },
  summary: {
    defaultMessage: "Resumen"
  },
  uploadImage: {
    defaultMessage: "Carga Imágenes",
    description: "button"
  },
  yes: {
    defaultMessage: "Si"
  }
});

export const buttonMessages = defineMessages({
  back: {
    defaultMessage: "Atrás",
    description: "button"
  },
  cancel: {
    defaultMessage: "Cancelar",
    description: "button"
  },
  confirm: {
    defaultMessage: "Confirmar",
    description: "button"
  },
  delete: {
    defaultMessage: "Eliminar",
    description: "button"
  },
  done: {
    defaultMessage: "Hecho",
    description: "button"
  },
  edit: {
    defaultMessage: "Editar",
    description: "button"
  },
  manage: {
    defaultMessage: "Manejar",
    description: "button"
  },
  remove: {
    defaultMessage: "Eliminar",
    description: "button"
  },
  save: {
    defaultMessage: "Guardar",
    description: "button"
  },
  show: {
    defaultMessage: "Mostrar",
    description: "button"
  },
  undo: {
    defaultMessage: "Deshacer",
    description: "button"
  }
});

export const sectionNames = defineMessages({
  attributes: {
    defaultMessage: "Atributos",
    description: "attributes section name"
  },
  categories: {
    defaultMessage: "Industrias",
    description: "categories section name"
  },
  collections: {
    defaultMessage: "Colecciones",
    description: "collections section name"
  },
  configuration: {
    defaultMessage: "Configuración",
    description: "configuration section name"
  },
  customers: {
    defaultMessage: "Clientes",
    description: "customers section name"
  },
  draftOrders: {
    defaultMessage: "Órdenes Parciales",
    description: "draft orders section name"
  },
  home: {
    defaultMessage: "Inicio",
    description: "home section name"
  },
  navigation: {
    defaultMessage: "Navegación",
    description: "navigation section name"
  },
  orders: {
    defaultMessage: "Órdenes",
    description: "orders section name"
  },
  pages: {
    defaultMessage: "Páginas",
    description: "pages section name"
  },
  plugins: {
    defaultMessage: "Plugins",
    description: "plugins section name"
  },
  productTypes: {
    defaultMessage: "Tipos de Productos",
    description: "product types section name"
  },
  products: {
    defaultMessage: "Productos",
    description: "products section name"
  },
  sales: {
    defaultMessage: "Descuentos",
    description: "Sección de descuentos"
  },
  serviceAccounts: {
    defaultMessage: "Service Accounts",
    description: "service accounts section name"
  },
  shipping: {
    defaultMessage: "Shipping Methods",
    description: "shipping section name"
  },
  siteSettings: {
    defaultMessage: "Ajustes de Sitio",
    description: "site settings section name"
  },
  staff: {
    defaultMessage: "Staff",
    description: "Sección para manejar roles de acceso."
  },
  taxes: {
    defaultMessage: "Impuestos",
    description: "taxes section name"
  },
  translations: {
    defaultMessage: "Traducciones",
    description: "translations section name"
  },
  vouchers: {
    defaultMessage: "Vouchers",
    description: "vouchers section name"
  },
  webhooks: {
    defaultMessage: "Webhooks",
    description: "webhooks section name"
  }
});

export function translateBoolean(value: boolean, intl: IntlShape): string {
  return value
    ? intl.formatMessage(commonMessages.yes)
    : intl.formatMessage(commonMessages.no);
}
