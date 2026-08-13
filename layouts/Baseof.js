import config from "@config/index.json";
import { plainify } from "@lib/utils/textConverter";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import ScrollToTop from "@layouts/components/ScrollToTop";
import Head from "next/head";
import { useRouter } from "next/router";

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const router = useRouter();

  const pageDescription = plainify(description ? description : meta_description);
  const pageImage = image ? (image.startsWith("http") ? image : `${base_url}${image}`) : `${base_url}${meta_image}`;
  const pageUrl = `${base_url}${router.asPath === "/" ? "" : router.asPath}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": title ? "BlogPosting" : "WebSite",
    "headline": title ? plainify(title) : config.site.title,
    "description": pageDescription,
    "image": pageImage,
    "url": pageUrl,
    "author": {
      "@type": "Person",
      "name": meta_author,
      "url": "https://awd.my.id"
    },
    "publisher": {
      "@type": "Organization",
      "name": config.site.title,
      "logo": {
        "@type": "ImageObject",
        "url": `${base_url}${config.site.logo}`
      }
    }
  };

  return (
    <>
      <Head>
        {/* title */}
        <title>
          {plainify(
            meta_title
              ? meta_title
              : title
              ? title + " | Awd Artikel"
              : config.site.title
          )}
        </title>

        {/* canonical url */}
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* meta-description */}
        <meta name="description" content={pageDescription} />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />

        {/* og-title */}
        <meta
          property="og:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* og-description */}
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content={title ? "article" : "website"} />
        <meta property="og:url" content={pageUrl} />

        {/* twitter-title */}
        <meta
          name="twitter:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* twitter-description */}
        <meta name="twitter:description" content={pageDescription} />

        {/* og-image */}
        <meta property="og:image" content={pageImage} />

        {/* twitter-image */}
        <meta name="twitter:image" content={pageImage} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header />
      {/* main site */}
      <main className="overflow-x-hidden pt-20">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Base;

