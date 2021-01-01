import { BussinessContactTypes } from '../constants/bussiness-contact.constants';

export interface ContactInfo {
  id: string;
  type: BussinessContactTypes;
  value: string;
  icon?: string;
  linkType?: string;
}
