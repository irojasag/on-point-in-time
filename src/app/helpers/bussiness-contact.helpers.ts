import { BussinessContactTypes } from '../constants/bussiness-contact.constants';

export const getIconClassFromType = (type: string): string => {
  switch (type.toLocaleLowerCase()) {
    case BussinessContactTypes.PHONE:
      return 'fas fa-phone-square';
    case BussinessContactTypes.EMAIL:
      return 'fas fa-envelope-square';
    case BussinessContactTypes.LINK:
      return 'fas fa-external-link-square-alt';
    case BussinessContactTypes.TWITTER:
      return 'fab fa-twitter-square';
    case BussinessContactTypes.INSTAGRAM:
      return 'fab fa-instagram-square';
    case BussinessContactTypes.FACEBOOK:
      return 'fab fa-facebook-square';
    case BussinessContactTypes.LINKEDIN:
      return 'fab fa-facebook-square';
    case BussinessContactTypes.WHATSAPP:
      return 'fab fa-whatsapp-square';
    default:
      return 'fas fa-user';
  }
};

export const getLinkTypeFromType = (type: string): string => {
  switch (type.toLocaleLowerCase()) {
    case BussinessContactTypes.PHONE:
      return 'tel:';
    case BussinessContactTypes.EMAIL:
      return 'mailto:';
    case BussinessContactTypes.INSTAGRAM:
      return 'https://www.instagram.com/';
    case BussinessContactTypes.FACEBOOK:
      return 'https://www.facebook.com/';
    case BussinessContactTypes.TWITTER:
      return 'https://twitter.com/';
    case BussinessContactTypes.LINKEDIN:
      return 'https://www.linkedin.com/in/';
    case BussinessContactTypes.WHATSAPP:
      return 'https://wa.me/';
    default:
      return '';
  }
};
