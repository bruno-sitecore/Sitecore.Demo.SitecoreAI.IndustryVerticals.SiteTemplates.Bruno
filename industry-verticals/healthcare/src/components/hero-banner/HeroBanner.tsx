'use client';

import React from 'react';
import { useI18n } from 'next-localization';
import { ChevronRight } from 'lucide-react';
import {
  ImageField,
  NextImage as ContentSdkImage,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import { cn } from '@/shadcn/lib/utils';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Image: ImageField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

/** Wave SVG between the photo strip and the periwinkle content area; fill via currentColor. */
function HeroWaveDivider({ className }: { className?: string }) {
  return (
    <svg
      className={cn('block h-12 w-full md:h-16', className)}
      viewBox="0 0 1440 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d="M0 42C240 18 480 58 720 38C960 18 1200 52 1440 32V80H0V42Z" fill="currentColor" />
    </svg>
  );
}

type NavRowProps = {
  href: string;
  label: string;
  variant: 'pill' | 'link';
  pillTone?: 'lavender' | 'mint';
  linkClassName?: string;
};

function NavRow({ href, label, variant, pillTone, linkClassName }: NavRowProps) {
  const pillStyles =
    pillTone === 'lavender' ? 'bg-[#ede8f7] text-[#1e3a5f]' : 'bg-[#dff5eb] text-[#0f5f5a]';

  return (
    <li>
      <a
        href={href}
        className={cn(
          'group flex w-full items-center justify-between gap-2 py-2.5 text-left text-sm font-medium transition-opacity hover:opacity-80',
          variant === 'pill' && 'rounded-full px-4 py-2.5',
          variant === 'pill' && pillStyles,
          variant === 'link' && linkClassName
        )}
      >
        <span>{label}</span>
        <ChevronRight
          className="size-4 shrink-0 opacity-60 group-hover:opacity-100"
          strokeWidth={2}
          aria-hidden
        />
      </a>
    </li>
  );
}

export const DefaultHeroBanner = (props: HeroBannerProps) => {
  const id = props.params.RenderingIdentifier;
  const { t } = useI18n();

  const title = t('hero_banner_title') || 'Complete Care, Simplified';
  const subtitle =
    t('hero_banner_subtitle') || 'Everything you need for your health journey, all in one place.';

  return (
    <section
      className={cn('relative pb-14 md:pb-16', props?.params?.styles)}
      id={id || undefined}
      style={{ backgroundColor: '#B4C4FC', margin: '2rem auto', borderRadius: '16px' }}
      aria-labelledby={id ? `${id}-heading` : 'hero-banner-heading'}
    >
      <div className="relative min-h-[240px] w-full overflow-hidden sm:min-h-[280px] md:min-h-[320px] lg:min-h-[380px]">
        <ContentSdkImage
          field={props.fields.Image}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 text-[#e4e7f5]"
          style={{ color: '#B4C4FC' }}
        >
          <HeroWaveDivider />
        </div>
      </div>

      <div className="relative z-10 container px-4">
        <header className="mx-auto max-w-3xl px-2 pb-10 text-center md:pb-12">
          <h1
            id={id ? `${id}-heading` : 'hero-banner-heading'}
            className="font-serif text-3xl font-normal tracking-tight text-[#2c2c2c] sm:text-4xl md:text-[2.75rem] md:leading-tight"
          >
            {title}
          </h1>
          <p className="font-body mt-4 text-base text-[#3d3d3d] sm:text-lg">{subtitle}</p>
        </header>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          <nav
            className="rounded-2xl bg-white p-6"
            aria-label={t('hero_nav_care_label') || 'Manage or access care'}
          >
            <h2 className="font-inter text-base font-bold text-[#2c2c2c]">
              {t('hero_nav_care_title') || 'Manage or Access Care'}
            </h2>
            <hr className="my-4 border-t border-[#e8e8e8]" />
            <ul className="space-y-1">
              <NavRow
                href="#"
                label={t('hero_nav_mychart') || 'Sign in to MyChart'}
                variant="pill"
                pillTone="lavender"
              />
              <NavRow
                href="#"
                label={t('hero_nav_find_doctor') || 'Find a Doctor or Provider'}
                variant="link"
                linkClassName="text-[#1e3a5f]"
              />
              <NavRow
                href="#"
                label={t('hero_nav_find_location') || 'Find a Location'}
                variant="link"
                linkClassName="text-[#1e3a5f]"
              />
              <NavRow
                href="#"
                label={t('hero_nav_pay_bill') || 'Pay Your Medical Bill'}
                variant="link"
                linkClassName="text-[#1e3a5f]"
              />
            </ul>
          </nav>

          <nav
            className="rounded-2xl bg-white p-6"
            aria-label={t('hero_nav_plan_label') || 'Manage your health plan'}
          >
            <h2 className="font-inter text-base font-bold text-[#2c2c2c]">
              {t('hero_nav_plan_title') || 'Manage Your Health Plan'}
            </h2>
            <hr className="my-4 border-t border-[#e8e8e8]" />
            <ul className="space-y-1">
              <NavRow
                href="#"
                label={t('hero_nav_member_portal') || 'Sign in to Member Portal'}
                variant="pill"
                pillTone="mint"
              />
              <NavRow
                href="#"
                label={t('hero_nav_in_network') || 'Find an In-Network Provider'}
                variant="link"
                linkClassName="text-[#0f5f5a]"
              />
              <NavRow
                href="#"
                label={t('hero_nav_claims') || 'View Claims'}
                variant="link"
                linkClassName="text-[#0f5f5a]"
              />
              <NavRow
                href="#"
                label={t('hero_nav_id_card') || 'View Your ID Card'}
                variant="link"
                linkClassName="text-[#0f5f5a]"
              />
            </ul>
          </nav>

          <nav
            className="rounded-2xl bg-white p-6"
            aria-label={t('hero_nav_explore_label') || 'Explore our plans'}
          >
            <h2 className="font-inter text-base font-bold text-[#2c2c2c]">
              {t('hero_nav_explore_title') || 'Explore Our Plans'}
            </h2>
            <hr className="my-4 border-t border-[#e8e8e8]" />
            <ul className="space-y-1">
              <NavRow
                href="#"
                label={t('hero_nav_plans_individual') || 'Individual & Family Plans'}
                variant="link"
                linkClassName="text-[#0f5f5a]"
              />
              <NavRow
                href="#"
                label={t('hero_nav_plans_employer') || 'Employer Plans'}
                variant="link"
                linkClassName="text-[#0f5f5a]"
              />
              <NavRow
                href="#"
                label={t('hero_nav_plans_medicare') || 'Medicare Plans'}
                variant="link"
                linkClassName="text-[#0f5f5a]"
              />
              <NavRow
                href="#"
                label={t('hero_nav_plans_medicaid') || 'Medicaid Plans'}
                variant="link"
                linkClassName="text-[#0f5f5a]"
              />
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<HeroBannerProps>(DefaultHeroBanner);
