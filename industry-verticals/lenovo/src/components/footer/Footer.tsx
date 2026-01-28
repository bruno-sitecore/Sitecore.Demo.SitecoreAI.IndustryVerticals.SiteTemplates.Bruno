import React, { JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  LinkField,
  RichTextField
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  PolicyText: LinkField;
  CookiesText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const Footer = (props: FooterProps): JSX.Element => {
  // styles
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={sxaStyles} style={{ width: "100%", height: 60, textAlign: "center", backgroundColor: "rgb(34, 42, 52)", padding: 16 }}>
      <p style={{ color: "#FFF" }}>Privacy Policy &nbsp;&nbsp;&nbsp; Terms of Use &nbsp;&nbsp;&nbsp; Cancellation Policy &nbsp;&nbsp;&nbsp; Lenovo Group. All rights reserved</p>
    </div>
  );
};

export const Default = Footer;
