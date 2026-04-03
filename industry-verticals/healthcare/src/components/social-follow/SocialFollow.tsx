import React from 'react';
import { LinkField, Link as ContentSdkLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Fields {
  FacebookLink: LinkField;
  InstagramLink: LinkField;
  TwitterLink: LinkField;
  LinkedinLink?: LinkField;
  YoutubeLink?: LinkField;
}

type SocialFollowProps = ComponentProps & {
  fields: Fields;
  params: { [key: string]: string };
};

function hasLinkTarget(field?: LinkField): boolean {
  const href = field?.value?.href;
  return typeof href === 'string' && href.length > 0;
}

export const Default = (props: SocialFollowProps) => {
  const id = props.params.RenderingIdentifier;

  const socialLinks = [
    { icon: faFacebook, field: props.fields.FacebookLink, key: 'facebook' },
    { icon: faXTwitter, field: props.fields.TwitterLink, key: 'twitter' },
    { icon: faInstagram, field: props.fields.InstagramLink, key: 'instagram' },
    { icon: faLinkedin, field: props.fields.LinkedinLink, key: 'linkedin' },
    { icon: faYoutube, field: props.fields.YoutubeLink, key: 'youtube' },
  ].filter((link) => hasLinkTarget(link.field));

  return (
    <div className="flex flex-wrap gap-2" id={id ? id : undefined}>
      {socialLinks.map((link) => (
        <ContentSdkLink field={link.field!} className="social-icon" key={link.key}>
          <FontAwesomeIcon icon={link.icon} className="h-4 w-4" />
        </ContentSdkLink>
      ))}
    </div>
  );
};
