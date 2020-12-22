import Head from "next/head";

export default function OpenGraph({
  title,
  description,
  themeColor,
  image,
  largeImage
}: OgProps) {
  return (
    <Head>
      {title && (
        <>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {themeColor && <meta name="theme-color" content={themeColor} />}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
          {largeImage && (
            <meta name="twitter:card" content="summary_large_image" />
          )}
        </>
      )}
    </Head>
  );
}

interface OgProps {
  title?: string;
  description?: string;
  themeColor?: string;
  image?: string;
  largeImage?: boolean;
}
