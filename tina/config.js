import { UsernamePasswordAuthJSProvider, TinaUserCollection } from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
// Your hosting provider likely exposes this as an environment variable
const branch = process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";
export default defineConfig({
    contentApiUrlOverride: "/api/tina/gql",
    authProvider: isLocal ? new LocalAuthProvider() : new 
    // Your hosting provider likely exposes this as an environment variable
    UsernamePasswordAuthJSProvider(),
    branch,
    // Get this from tina.io
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    token: process.env.TINA_TOKEN,
    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        loadCustomStore: async () => {
            const pack = await import("next-tinacms-cloudinary");
            return pack.TinaCloudCloudinaryMediaStore;
        },
    },
    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
    schema: {
        collections: [
            TinaUserCollection,
            {
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
            }
        ]
    }
});
