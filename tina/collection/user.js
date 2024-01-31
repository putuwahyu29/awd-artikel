/**
 * @type {import('tinacms').Collection}
 */
import { TinaUserCollection } from "tinacms-authjs/dist/tinacms";

export default {
  ...TinaUserCollection,
  fields: [
    {
      ...TinaUserCollection.fields[0],
      fields: [
        {
          type: "string",
          label: "Username",
          name: "username",
          uid: true,
          required: true,
        },
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Email",
          name: "email",
        },
      ],
    },
  ],
};
