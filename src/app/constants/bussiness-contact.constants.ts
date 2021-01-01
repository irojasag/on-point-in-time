export enum BussinessContactTypes {
  PHONE = 'phone',
  EMAIL = 'email',
  LINK = 'link',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  WHATSAPP = 'whatsapp',
  LINKEDIN = 'linkedin',
  OTHER = 'other',
}

export const BussinessContactTypeOptions = [
  {
    value: BussinessContactTypes.PHONE,
    displayName: 'Teléfono',
  },
  {
    value: BussinessContactTypes.EMAIL,
    displayName: 'Correo Eletrónico',
  },
  {
    value: BussinessContactTypes.LINK,
    displayName: 'Enlace',
  },
  {
    value: BussinessContactTypes.FACEBOOK,
    displayName: 'Facebook',
  },
  {
    value: BussinessContactTypes.INSTAGRAM,
    displayName: 'Instagram',
  },
  {
    value: BussinessContactTypes.TWITTER,
    displayName: 'Twitter',
  },
  {
    value: BussinessContactTypes.LINKEDIN,
    displayName: 'LinkedIn',
  },
  {
    value: BussinessContactTypes.WHATSAPP,
    displayName: 'Whatsapp',
  },
  {
    value: BussinessContactTypes.OTHER,
    displayName: 'Otro',
  },
];
