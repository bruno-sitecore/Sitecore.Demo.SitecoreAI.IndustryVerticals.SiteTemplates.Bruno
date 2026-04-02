import { ComponentProps } from '@/lib/component-props';
import {
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

interface Fields {
  LogoLight: ImageField;
  LogoDark: ImageField;
  PhoneLink: LinkField;
  MailLink: LinkField;
}

interface HeaderProps extends ComponentProps {
  fields: Fields;
}

export const DefaultHeaderExtended = (props: HeaderProps) => {
  const id = props.params.RenderingIdentifier;

  return (
    <section
      className={`font-inter relative border-b-2 border-[#F5F0EE] bg-white py-8 text-[#333131] dark:border-neutral-700 dark:bg-[#0c1220] dark:text-neutral-100 ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div className="container flex items-center gap-2 lg:gap-4">
        <div className="mr-auto max-w-50">
          <Link href={'/'}>
            <ContentSdkImage
              field={props.fields.LogoLight}
              width={345}
              height={45}
              className="dark:hidden"
              priority
            />
            <ContentSdkImage
              field={props.fields.LogoDark}
              width={345}
              height={45}
              className="hidden dark:block"
              priority
            />
          </Link>
        </div>
        <div className="order-last lg:order-0 lg:mr-4 xl:mr-8">
          <Placeholder
            name={`header-extended-nav-${props?.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="mx-2 lg:mx-0">
          <Placeholder
            name={`header-extended-theme-switcher-${props?.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
        <div className="flex items-center gap-2">
          <ContentSdkLink
            field={props.fields.MailLink}
            className="flex h-6 w-6 items-center justify-center text-[#333131] transition-colors hover:text-[#3B3BA8] dark:text-neutral-200 dark:hover:text-[#B4C4FC]"
          >
            <FontAwesomeIcon icon={faEnvelope} width={16} height={16} />
          </ContentSdkLink>
          <ContentSdkLink
            field={props.fields.PhoneLink}
            className="flex h-6 w-6 items-center justify-center text-[#333131] transition-colors hover:text-[#3B3BA8] dark:text-neutral-200 dark:hover:text-[#B4C4FC]"
          >
            <FontAwesomeIcon icon={faPhone} width={14} height={14} />
          </ContentSdkLink>
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<HeaderProps>(DefaultHeaderExtended);
