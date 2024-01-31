/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Menu",
  name: "menu",
  path: "content/config/menu",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "object",
      label: "Main",
      name: "main",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
        defaultItem: {
          url: "/",
          name: "Beranda",
        },
      },
      fields: [
        {
          type: "string",
          label: "Nama",
          name: "name",
        },
        {
          type: "string",
          label: "Tautan",
          name: "url",
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
      },
      fields: [
        {
          type: "string",
          label: "Nama",
          name: "name",
        },
        {
          type: "string",
          label: "Tautan",
          name: "url",
        },
        {
          type: "boolean",
          label: "Blanlk",
          name: "blank",
        },
      ],
    },
  ],
};
