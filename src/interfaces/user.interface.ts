import IAlternateInfoEmbed from "./alternateInfoEmbed.user.interface";

export default interface IUser {
  _id?: string;
  __v?: number;
  fullName: string;
  email: string;
  phone: string;
  birthdate: string;
  hiringdate?: string;
  address: string;
  alternateInfo?: IAlternateInfoEmbed;
}
