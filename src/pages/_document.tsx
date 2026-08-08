import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

export default function Document() {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head>
        <title>ARDaC: AlcHepNet Research Data Commons</title>
        <link rel="icon" href="/ff/icons/favicon.ico" />
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}
