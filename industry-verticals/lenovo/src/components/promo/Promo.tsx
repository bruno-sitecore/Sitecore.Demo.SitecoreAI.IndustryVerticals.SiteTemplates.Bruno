import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { LayoutStyles, PromoFlags } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isReversed = props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? 'order-last'
    : '';
  const hideShadow = props?.params?.styles?.includes(PromoFlags.HidePromoShadows);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  // Visual tokens inspired by Lenovo Marketplace partner tiles
  const cardBase =
    'group relative overflow-hidden border border-black/10 bg-white transition-all';
  const hoverFx = hideShadow
    ? 'hover:-translate-y-0'
    : 'shadow-sm hover:shadow-md hover:-translate-y-0.5';
  const gridBase = 'grid grid-cols-1 sm:grid-cols-[200px,1fr]'; // fixed logo rail
  const orderLeft = isReversed ? 'sm:order-2' : 'sm:order-1';
  const orderRight = isReversed ? 'sm:order-1' : 'sm:order-2';

  return (
    <section className={`${props.params.styles || ''} py-6 lg:py-8`} id={id ? id : undefined}>
      <div className="container">
        <article
          className={`${cardBase} ${hoverFx} focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary/60`}
          aria-label="Partner list item"
          style={{ maxWidth: 348 }}
        >
          {/* Top: Logo rail */}
          <div
            className={`${orderLeft} relative isolate bg-white flex items-center justify-center`}>
            <div className="relative w-full" style={ {height: 160} }>
              <ContentSdkImage
                field={props.fields.PromoImageOne}
                className="absolute inset-0 h-full w-full object-contain"
                // Smaller, since logo should not be cropped
                width={320}
                height={240}
                // Include alt from field; falls back to title for a11y during editing
                // (Sitecore field typically carries alt; if empty in EE, object-contain keeps layout)
              />
            </div>

          </div>

          {/* Bottom: Content panel */}
          <div className={`${orderRight} flex flex-col gap-3 p-6 sm:p-8`}>
            {(props.fields.PromoSubTitle?.value || isPageEditing) && (
              <div className="text-xs font-semibold tracking-wide uppercase text-primary/80">
                <Text field={props.fields.PromoSubTitle} />
              </div>
            )}

            <div className="space-y-3">
              <Text
                field={props.fields.PromoTitle}
                tag="h3"
                className="text-lg font-semibold text-gray-900"
              />

              <div className="prose prose-sm max-w-none text-gray-700">
                <ContentSdkRichText field={props.fields.PromoDescription} />
              </div>
            </div>

            {/* Optional badges/chips area — uncomment if you map categories/tags
            <ul className="mt-1 flex flex-wrap gap-2">
              <li className="rounded-full border border-black/10 bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
                Security
              </li>
              <li className="rounded-full border border-black/10 bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
                Productivity
              </li>
            </ul>
            */}

            {(props.fields.PromoMoreInfo?.value?.href || isPageEditing) && (
              <div className="mt-2">
                <Link
                  field={props.fields.PromoMoreInfo}
                  className="inline-flex items-center gap-2 rounded-md border bg-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/60"
                />
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};