import { config, collection, singleton, fields } from "@keystatic/core";
import React from "react";

export default config({
  ui: {
    brand: {
      name: "Awd Artikel",
      mark: () =>
        React.createElement("img", {
          src: "/images/site/favicon.png",
          alt: "Awd Artikel",
          height: 24,
          style: { height: "24px", width: "auto", borderRadius: "4px" },
        }),
    },
    navigation: {
      "Konten Utama": ["posts"],
      "Halaman & Beranda": ["homePage", "pages"],
      "Pengaturan & Sistem": [
        "siteConfig",
        "menuConfig",
        "socialConfig",
        "themeConfig",
        "userProfiles",
      ],
    },
  },
  storage:
    process.env.NODE_ENV === "development" ||
    process.env.KEYSTATIC_STORAGE_KIND === "local"
      ? { kind: "local" }
      : {
          kind: "github",
          repo:
            process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER &&
            process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG
              ? `${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`
              : "putuwahyu29/awd-artikel",
        },
  collections: {
    posts: collection({
      label: "Posts / Artikel",
      slugField: "title",
      path: "content/posts/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Judul" } }),
        date: fields.datetime({
          label: "Tanggal Terbit",
          description: "Pilih tanggal dan waktu terbit artikel",
        }),
        image: fields.image({
          label: "Gambar Utama",
          directory: "public/images/banner",
          publicPath: "/images/banner/",
          description: "Upload gambar banner artikel",
        }),
        categories: fields.array(fields.text({ label: "Kategori" }), {
          label: "Kategori",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({
          label: "Artikel Unggulan",
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
        }),
        content: fields.mdx({
          label: "Konten",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
        }),
      },
    }),
    pages: collection({
      label: "Halaman Statis",
      slugField: "title",
      path: "content/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Judul Halaman" } }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        layout: fields.text({ label: "Layout Template (Opsional)" }),
        content: fields.mdx({
          label: "Konten Halaman",
          options: {
            image: {
              directory: "public/images/pages",
              publicPath: "/images/pages/",
            },
          },
        }),
      },
    }),
  },
  singletons: {
    siteConfig: singleton({
      label: "Pengaturan Situs (Site Config)",
      path: "content/config/index",
      format: { data: "json" },
      schema: {
        site: fields.object({
          title: fields.text({ label: "Judul Situs" }),
          base_url: fields.text({ label: "Base URL" }),
          favicon: fields.image({
            label: "Favicon",
            directory: "public/images",
            publicPath: "/images/",
          }),
          logo: fields.image({
            label: "Logo",
            directory: "public/images",
            publicPath: "/images/",
          }),
          logo_white: fields.image({
            label: "Logo Mode Gelap (White Logo)",
            directory: "public/images",
            publicPath: "/images/",
          }),
          logo_width: fields.text({ label: "Logo Width" }),
          logo_height: fields.text({ label: "Logo Height" }),
          logo_text: fields.text({ label: "Logo Text" }),
        }),
        settings: fields.object({
          theme_switcher: fields.checkbox({
            label: "Enable Theme Switcher",
            defaultValue: true,
          }),
          default_theme: fields.text({ label: "Default Theme" }),
          pagination: fields.number({ label: "Pagination Limit" }),
          InnerPaginationOptions: fields.object({
            enableTop: fields.checkbox({ label: "Enable Top Pagination" }),
            enableBottom: fields.checkbox({ label: "Enable Bottom Pagination" }),
          }),
          summary_length: fields.number({ label: "Summary Length" }),
          blog_folder: fields.text({ label: "Blog Folder" }),
        }),
        params: fields.object({
          tag_manager_id: fields.text({ label: "Tag Manager ID" }),
          footer_content: fields.text({
            label: "Footer Content",
            multiline: true,
          }),
          copyright: fields.text({ label: "Copyright Text" }),
        }),
        metadata: fields.object({
          meta_author: fields.text({ label: "Meta Author" }),
          meta_image: fields.image({
            label: "Meta Image (OG Image)",
            directory: "public/images",
            publicPath: "/images/",
          }),
          meta_description: fields.text({
            label: "Meta Description",
            multiline: true,
          }),
        }),
        widgets: fields.object({
          about: fields.object({
            enable: fields.checkbox({ label: "Tampilkan Widget Profil Penulis" }),
            title: fields.text({ label: "Judul Widget" }),
            name: fields.text({ label: "Nama Penulis" }),
            role: fields.text({ label: "Peran / Profesi" }),
            avatar: fields.text({ label: "Path Foto Profil" }),
            bio: fields.text({ label: "Biografi Penulis", multiline: true }),
          }),
          featured_posts: fields.object({
            enable: fields.checkbox({ label: "Enable Featured Posts Widget" }),
            title: fields.text({ label: "Judul Widget" }),
            showPost: fields.number({ label: "Jumlah Post" }),
          }),
          categories: fields.object({
            enable: fields.checkbox({ label: "Enable Categories Widget" }),
            title: fields.text({ label: "Judul Widget" }),
          }),
          newsletter: fields.object({
            enable: fields.checkbox({ label: "Enable Newsletter Widget" }),
            title: fields.text({ label: "Judul Widget" }),
            content: fields.text({
              label: "Konten Newsletter",
              multiline: true,
            }),
            privacy_policy_page: fields.text({ label: "Privacy Policy Link" }),
            mailchimp_url: fields.text({ label: "Mailchimp Form Action URL" }),
          }),
        }),
        disqus: fields.object({
          enable: fields.checkbox({ label: "Enable Disqus" }),
          shortname: fields.text({ label: "Disqus Shortname" }),
          settings: fields.object({}),
        }),
      },
    }),
    menuConfig: singleton({
      label: "Menu Navigasi",
      path: "content/config/menu/index",
      format: { data: "json" },
      schema: {
        main: fields.array(
          fields.object({
            name: fields.text({ label: "Nama Menu" }),
            url: fields.text({ label: "URL Target" }),
          }),
          {
            label: "Menu Utama (Header)",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
        footer: fields.array(
          fields.object({
            name: fields.text({ label: "Nama Menu" }),
            url: fields.text({ label: "URL Target" }),
            blank: fields.checkbox({ label: "Buka di Tab Baru (_blank)" }),
          }),
          {
            label: "Menu Footer",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
    socialConfig: singleton({
      label: "Media Sosial",
      path: "content/config/social/index",
      format: { data: "json" },
      schema: {
        facebook: fields.text({ label: "Facebook URL" }),
        stackoverflow: fields.text({ label: "StackOverflow URL" }),
        twitter: fields.text({ label: "Twitter URL" }),
        instagram: fields.text({ label: "Instagram URL" }),
        youtube: fields.text({ label: "YouTube URL" }),
        linkedin: fields.text({ label: "LinkedIn URL" }),
        github: fields.text({ label: "GitHub URL" }),
        gitlab: fields.text({ label: "GitLab URL" }),
        discord: fields.text({ label: "Discord URL" }),
        slack: fields.text({ label: "Slack URL" }),
        medium: fields.text({ label: "Medium URL" }),
        codepen: fields.text({ label: "CodePen URL" }),
        bitbucket: fields.text({ label: "Bitbucket URL" }),
        dribbble: fields.text({ label: "Dribbble URL" }),
        behance: fields.text({ label: "Behance URL" }),
        pinterest: fields.text({ label: "Pinterest URL" }),
        soundcloud: fields.text({ label: "SoundCloud URL" }),
        tumblr: fields.text({ label: "Tumblr URL" }),
        reddit: fields.text({ label: "Reddit URL" }),
        vk: fields.text({ label: "VK URL" }),
        whatsapp: fields.text({ label: "WhatsApp URL" }),
        snapchat: fields.text({ label: "Snapchat URL" }),
        vimeo: fields.text({ label: "Vimeo URL" }),
        tiktok: fields.text({ label: "TikTok URL" }),
        foursquare: fields.text({ label: "Foursquare URL" }),
        rss: fields.text({ label: "RSS Feed URL" }),
        email: fields.text({ label: "Email" }),
        phone: fields.text({ label: "Telepon" }),
        address: fields.text({ label: "Alamat" }),
        skype: fields.text({ label: "Skype" }),
        website: fields.text({ label: "Website" }),
      },
    }),
    themeConfig: singleton({
      label: "Pengaturan Tema & Font",
      path: "content/config/theme/index",
      format: { data: "json" },
      schema: {
        colors: fields.object({
          default: fields.object({
            theme_color: fields.object({
              primary: fields.text({ label: "Primary Color" }),
              body: fields.text({ label: "Body Background" }),
              border: fields.text({ label: "Border Color" }),
              theme_light: fields.text({ label: "Theme Light" }),
              theme_dark: fields.text({ label: "Theme Dark" }),
            }),
            text_color: fields.object({
              default: fields.text({ label: "Text Default" }),
              dark: fields.text({ label: "Text Dark" }),
              light: fields.text({ label: "Text Light" }),
            }),
          }),
          darkmode: fields.object({
            theme_color: fields.object({
              primary: fields.text({ label: "Primary Color" }),
              body: fields.text({ label: "Body Background" }),
              border: fields.text({ label: "Border Color" }),
              theme_light: fields.text({ label: "Theme Light" }),
              theme_dark: fields.text({ label: "Theme Dark" }),
            }),
            text_color: fields.object({
              default: fields.text({ label: "Text Default" }),
              dark: fields.text({ label: "Text Dark" }),
              light: fields.text({ label: "Text Light" }),
            }),
          }),
        }),
        fonts: fields.object({
          font_family: fields.object({
            primary: fields.text({ label: "Primary Font" }),
            primary_type: fields.text({ label: "Primary Font Type" }),
            secondary: fields.text({ label: "Secondary Font" }),
            secondary_type: fields.text({ label: "Secondary Font Type" }),
          }),
          font_size: fields.object({
            base: fields.text({ label: "Base Font Size" }),
            scale: fields.text({ label: "Font Scale" }),
          }),
        }),
      },
    }),
    homePage: singleton({
      label: "Halaman Utama (Beranda)",
      path: "content/_index",
      format: { data: "yaml" },
      schema: {
        banner: fields.object({
          title: fields.text({ label: "Judul Banner" }),
          title_small: fields.text({ label: "Sub-judul Banner" }),
          content: fields.text({ label: "Konten Banner", multiline: true }),
          image_enable: fields.checkbox({ label: "Tampilkan Gambar" }),
          image: fields.image({
            label: "Gambar Banner",
            directory: "public/images",
            publicPath: "/images/",
          }),
          button: fields.object({
            enable: fields.checkbox({ label: "Tampilkan Tombol" }),
            label: fields.text({ label: "Label Tombol" }),
            link: fields.text({ label: "Link Tombol" }),
            rel: fields.text({ label: "Rel Attribute" }),
          }),
        }),
        featured_posts: fields.object({
          enable: fields.checkbox({ label: "Tampilkan Artikel Unggulan" }),
          title: fields.text({ label: "Judul Section" }),
        }),
        promotion: fields.object({
          enable: fields.checkbox({ label: "Tampilkan Promosi" }),
          image: fields.image({
            label: "Gambar Promosi",
            directory: "public/images",
            publicPath: "/images/",
          }),
          link: fields.text({ label: "Link Promosi" }),
        }),
        recent_posts: fields.object({
          title: fields.text({ label: "Judul Section" }),
          enable: fields.checkbox({ label: "Tampilkan Artikel Terkini" }),
        }),
      },
    }),
    userProfiles: singleton({
      label: "Profil Penulis / Pengguna",
      path: "content/users/index",
      format: { data: "json" },
      schema: {
        users: fields.array(
          fields.object({
            name: fields.text({ label: "Nama Lengkap" }),
            email: fields.text({ label: "Email" }),
            username: fields.text({ label: "Username" }),
          }),
          {
            label: "Daftar Pengguna",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
  },
});
