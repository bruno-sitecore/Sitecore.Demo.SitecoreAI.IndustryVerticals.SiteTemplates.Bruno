'use client';

import React from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
  RichTextField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import BlobAccent from '../non-sitecore/BlobAccent';
import CurvedClip from '../non-sitecore/CurvedClip';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoMoreInfo: LinkField;
}

type PromoProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const PromoWrapper = ({ children, props }: { children: React.ReactNode; props: PromoProps }) => {
  const id = props.params.RenderingIdentifier;
  const hideBlobAccent = props.params.styles?.includes(CommonStyles.HideBlobAccent);
  const curvedTop = props.params.styles?.includes(CommonStyles.CurvedTop);
  const curvedBottom = props.params.styles?.includes(CommonStyles.CurvedBottom);

  return (
    <section
      className={`component promo bg-background dark:bg-background-dark relative py-12 lg:py-16 ${props?.params?.styles}`}
      id={id ? id : undefined}
      style={{ margin: '0 auto', maxWidth: '800px' }}
    >
      {curvedTop && <CurvedClip className="top-0" pos="top" />}
      {curvedBottom && <CurvedClip className="bottom-0" pos="bottom" />}
      {!hideBlobAccent && (
        <BlobAccent
          size="lg"
          className="absolute top-0 left-0 z-0 lg:left-4 lg:[.promo-reversed_&]:right-4 lg:[.promo-reversed_&]:left-auto"
        />
      )}
      <div className="relative z-10 container">
        <div className="grid items-center gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0">
          <div className="aspect-square overflow-hidden rounded-3xl">
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 text-left lg:[.promo-reversed_&]:order-first">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

const DefaultPromo = (props: PromoProps) => {
  return (
    <PromoWrapper props={props}>
      <h2 className="font-heading text-foreground dark:text-foreground-dark text-3xl font-bold tracking-tight sm:text-4xl">
        <ContentSdkText field={props.fields.PromoTitle} />
      </h2>
      <ContentSdkRichText
        className="font-body text-foreground dark:text-foreground-dark text-base leading-relaxed sm:text-lg [&_p+p]:mt-4"
        field={props.fields.PromoDescription}
      />

      <ContentSdkLink
        field={props.fields.PromoMoreInfo}
        className="font-heading focus-visible:ring-background dark:focus-visible:ring-background-dark inline-flex w-fit items-center justify-center rounded-full bg-[#3F3F9F] px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#3434a3] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {props.fields?.PromoMoreInfo?.value?.text}
      </ContentSdkLink>
    </PromoWrapper>
  );
};

const WithPlaceholderPromo = (props: PromoProps) => {
  return (
    <PromoWrapper props={props}>
      <h2 className="font-heading text-foreground dark:text-foreground-dark text-3xl font-bold tracking-tight sm:text-4xl">
        <ContentSdkText field={props.fields.PromoTitle} />
      </h2>
      <Placeholder
        name={`promo-content-${props?.params?.DynamicPlaceholderId}`}
        rendering={props.rendering}
      />
    </PromoWrapper>
  );
};

export const Default = withDatasourceCheck()<PromoProps>(DefaultPromo);
export const WithPlaceholder = withDatasourceCheck()<PromoProps>(WithPlaceholderPromo);
