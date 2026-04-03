'use client';

import React from 'react';
import {
  Link as ContentSdkLink,
  Text as ContentSdkText,
  ImageField,
  LinkField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  RichTextField,
  withDatasourceCheck,
  TextField,
  Text,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  Logo: ImageField;
  LogoDark: ImageField;
  CopyrightText: RichTextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

/** Legal links shown after CMS-driven Privacy / User Agreement (Sentara-style). */
const STATIC_LEGAL_LINKS = [
  { href: '#', label: 'Social Media Policy' },
  { href: '#', label: 'Notice of Nondiscrimination' },
  { href: '#', label: 'Compliance Office' },
] as const;

/** Language assistance labels (native scripts where typical). */
const LANGUAGE_ASSISTANCE_LINKS = [
  { href: '#', label: 'አማርኛ' },
  { href: '#', label: 'العربية' },
  { href: '#', label: 'Bassa' },
  { href: '#', label: 'বাংলা' },
  { href: '#', label: 'ខ្មែរ' },
  { href: '#', label: '中文' },
  { href: '#', label: 'فارسی' },
  { href: '#', label: 'Français' },
  { href: '#', label: 'Deutsch' },
  { href: '#', label: 'ગુજરાતી' },
  { href: '#', label: 'हिन्दी' },
  { href: '#', label: 'Hmong' },
  { href: '#', label: 'Igbo' },
  { href: '#', label: '日本語' },
  { href: '#', label: '한국어' },
  { href: '#', label: 'ລາວ' },
  { href: '#', label: 'Русский' },
  { href: '#', label: 'Español' },
  { href: '#', label: 'اردو' },
  { href: '#', label: 'Tiếng Việt' },
  { href: '#', label: 'Yorùbá' },
] as const;

const legalLinkClassName =
  'text-sm font-medium text-[#2a2826] transition-colors hover:text-[#434384] hover:underline dark:text-neutral-200 dark:hover:text-[#B4C4FC]';

function AppStoreBadge({ ariaLabel }: { ariaLabel: string }) {
  return (
    <a href="#" className="inline-block h-10 w-[120px] shrink-0" aria-label={ariaLabel}>
      <svg
        className="h-10 w-[120px]"
        viewBox="0 0 120 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="120" height="40" rx="5" fill="#000" />
        <path
          fill="#fff"
          d="M24.769 20.301c-.035-3.754 3.072-5.594 3.214-5.686-1.774-2.575-4.519-2.929-5.468-2.963-2.325-.236-4.564 1.362-5.743 1.362-1.193 0-2.992-1.34-4.935-1.304-2.52.037-4.864 1.461-6.154 3.708-2.644 4.561-.674 11.296 1.887 14.988 1.272 1.82 2.762 3.864 4.712 3.79 1.904-.075 2.614-1.213 4.908-1.213 2.28 0 2.94 1.213 4.922 1.179 2.046-.034 3.33-1.828 4.576-3.664 1.453-2.08 2.04-4.12 2.068-4.225-.045-.02-3.958-1.508-3.987-6.04zM22.036 12.058c1.012-1.208 1.699-2.854 1.51-4.527-1.464.059-3.276.99-4.33 2.182-.93 1.048-1.763 2.768-1.548 4.383 1.64.125 3.32-.82 4.368-2.038z"
        />
        <text
          x="78"
          y="16"
          fill="#fff"
          fontSize="8"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          Download on the
        </text>
        <text
          x="78"
          y="27"
          fill="#fff"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          App Store
        </text>
      </svg>
    </a>
  );
}

function GooglePlayBadge({ ariaLabel }: { ariaLabel: string }) {
  return (
    <a href="#" className="inline-block h-10 w-[135px] shrink-0" aria-label={ariaLabel}>
      <svg
        className="h-10 w-[135px]"
        viewBox="0 0 135 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="135" height="40" rx="5" fill="#000" />
        <path fill="#fff" d="M14 9v22l20-11L14 9z" />
        <text
          x="88"
          y="15"
          fill="#fff"
          fontSize="7"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          GET IT ON
        </text>
        <text
          x="88"
          y="27"
          fill="#fff"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          Google Play
        </text>
      </svg>
    </a>
  );
}

function AppBadgePair({ storePrefix }: { storePrefix: string }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <AppStoreBadge ariaLabel={`${storePrefix} — Download on the App Store`} />
      <GooglePlayBadge ariaLabel={`${storePrefix} — Get it on Google Play`} />
    </div>
  );
}

const DefaultFooter = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const navColumns = [
    {
      key: 'first_nav',
      title: <Text field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <Text field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
  ];

  const hideTopSection = props.params?.Styles?.includes(CommonStyles.HideTopSection) || undefined;
  const hideBottomSection =
    props.params?.Styles?.includes(CommonStyles.HideBottomSection) || undefined;

  const linkColumnClass =
    '[&_.link-list_.component-content>h3]:hidden [&_ul]:flex-col [&_ul]:gap-0 [&_li]:mb-2 [&_li:last-child]:mb-0 [&_a]:font-normal [&_a]:text-[#2a2826] dark:[&_a]:text-neutral-200';

  const socialWrapperClass =
    '[&_a.social-icon]:inline-flex [&_a.social-icon]:h-10 [&_a.social-icon]:w-10 [&_a.social-icon]:items-center [&_a.social-icon]:justify-center [&_a.social-icon]:rounded-full [&_a.social-icon]:bg-[#2a2826] [&_a.social-icon]:text-white [&_a.social-icon]:transition-colors [&_a.social-icon:hover]:bg-[#434384] dark:[&_a.social-icon]:bg-neutral-700 dark:[&_a.social-icon:hover]:bg-[#434384]';

  return (
    <section
      className={`font-inter relative bg-[#f5f1ed] text-[#2a2826] dark:bg-neutral-900 dark:text-neutral-200 ${props.params.styles}`}
      id={id ? id : undefined}
    >
      {!hideTopSection && (
        <div className="pt-14 pb-10">
          <div className="container">
            <div
              className={`grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 [&_a]:transition-colors ${linkColumnClass}`}
            >
              {navColumns.map(({ key, title, content }) => (
                <div key={key}>
                  <div className="mb-5 text-base font-bold tracking-wide text-[#2a2826] dark:text-neutral-100">
                    {title}
                  </div>
                  <div className="text-sm leading-relaxed">{content}</div>
                </div>
              ))}

              <div>
                <div className="mb-5 text-base font-bold tracking-wide text-[#2a2826] dark:text-neutral-100">
                  <Text field={props.fields.TitleFour} />
                </div>
                <div className={`text-sm leading-relaxed ${linkColumnClass}`}>
                  <Placeholder name={phKeyFour} rendering={props.rendering} />
                </div>

                <div className="mt-8">
                  <p className="mb-3 text-sm font-bold text-[#2a2826] dark:text-neutral-100">
                    Follow Us
                  </p>
                  <div className={`flex flex-wrap gap-2 ${socialWrapperClass}`}>
                    <Placeholder name={phKeyFive} rendering={props.rendering} />
                  </div>
                </div>

                <div className="mt-10">
                  <p className="mb-1 text-sm font-bold text-[#2a2826] dark:text-neutral-100">
                    Download Our Apps
                  </p>
                  <p className="mt-4 text-xs font-semibold tracking-wide text-[#2a2826] uppercase dark:text-neutral-300">
                    Sentara
                  </p>
                  <AppBadgePair storePrefix="Sentara" />
                  <p className="mt-5 text-xs font-semibold tracking-wide text-[#2a2826] uppercase dark:text-neutral-300">
                    Sentara Health Plans
                  </p>
                  <AppBadgePair storePrefix="Sentara Health Plans" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!hideBottomSection && (
        <div className="border-t border-[#e8e0da] dark:border-neutral-700">
          <div className="container py-8">
            <nav
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
              aria-label="Legal"
            >
              <ContentSdkLink field={props.fields.PolicyText} className={legalLinkClassName} />
              <ContentSdkLink field={props.fields.TermsText} className={legalLinkClassName} />
              {STATIC_LEGAL_LINKS.map((item) => (
                <Link key={item.label} href={item.href} className={legalLinkClassName}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-[#e8e0da] py-10 dark:border-neutral-700">
            <div className="container text-center">
              <h3 className="text-base font-bold text-[#2a2826] dark:text-neutral-100">
                Language Assistance Available
              </h3>
              <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
                {LANGUAGE_ASSISTANCE_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${legalLinkClassName} font-normal`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#e8e0da] py-6 dark:border-neutral-700">
            <p className="text-center text-sm text-[#5c5856] dark:text-neutral-400">
              <ContentSdkText field={props.fields.CopyrightText} />
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export const Default = withDatasourceCheck()<FooterProps>(DefaultFooter);
