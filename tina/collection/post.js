/**
 * @type {import('tinacms').Collection}
 */
export default {
  name: "post",
  label: "Posts",
  path: "content/posts",
  format: "md",
  ui: {
    filename: {
      // if disabled, the editor can not edit the filename
      readonly: true,
      // Example of using a custom slugify function
      slugify: (values) => {
        // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
        return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      label: "Tanggal Terbit",
      name: "date",
      required: true,
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
    {
      type: "image",
      name: "image",
      label: "Gambar Utama",
      required: true,
    },
    {
      type: "string",
      name: "categories",
      label: "Kategori",
      list: true,
      required: true,
    },
    {
      type: "boolean",
      name: "featured",
      label: "Artikel Unggulan",
    },
    {
      type: "boolean",
      name: "draft",
      label: "Draft",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      required: true,
    },
  ],
};
