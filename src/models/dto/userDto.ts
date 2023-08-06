//External
import { IsNotEmpty, IsString, IsEmail, Length, IsDate } from "class-validator";
//Vars-const
const MIN_VALUE_NICKNAME: number = 4;
const MAX_VALUE_NICKNAME: number = 50;
const MIN_VALUE_FIRST_LAST_NAME: number = 4;
const MAX_VALUE_FIRST_LAST_NAME: number = 70;
const MIN_VALUE_EMAIL: number = 4;
const MAX_VALUE_EMAIL: number = 100;
const MIN_VALUE_IDENT_TYPE: number = 2;
const MAX_VALUE_IDENT_TYPE: number = 20;
const MIN_VALUE_IDENT_NUMBER: number = 2;
const MAX_VALUE_IDENT_NUMBER: number = 50;
const MIN_VALUE_COUNTRY_ID: number = 1;
const MAX_VALUE_COUNTRY_ID: number = 10;

/**
 * @description model class for users
 * @property {string} nickname string type.
 * @property {string} first_name string type.
 * @property {string} last_name string type.
 * @property {string} email string type.
 * @property {string} identification_type string type.
 * @property {string} identification_number string type.
 * @property {string} country_id string type.
 * @property {Date} creation_date Date type.
 * @property {Date} update_date Date type.
 */
export default class UserDto {
  @IsNotEmpty({ message: "The nickname cannot be empty" })
  @IsString({ message: "The nickname must be of type string" })
  @Length(MIN_VALUE_NICKNAME, MAX_VALUE_NICKNAME, {
    message: `The value of the nickname must be between ${MIN_VALUE_NICKNAME} and ${MAX_VALUE_NICKNAME} characters`,
  })
  nickname: string;

  @IsNotEmpty({ message: "The first_name cannot be empty" })
  @IsString({ message: "The first_name must be of type string" })
  @IsEmail()
  @Length(MIN_VALUE_FIRST_LAST_NAME, MAX_VALUE_FIRST_LAST_NAME, {
    message: `The value of the first_name must be between ${MIN_VALUE_FIRST_LAST_NAME} and ${MAX_VALUE_FIRST_LAST_NAME} characters`,
  })
  first_name: string;

  @IsNotEmpty({ message: "The last_name cannot be empty" })
  @IsString({ message: "The last_name must be of type string" })
  @Length(MIN_VALUE_FIRST_LAST_NAME, MAX_VALUE_FIRST_LAST_NAME, {
    message: `The value of the last_name must be between ${MIN_VALUE_FIRST_LAST_NAME} and ${MAX_VALUE_FIRST_LAST_NAME} characters`,
  })
  last_name: string;

  @IsNotEmpty({ message: "The email cannot be empty" })
  @IsEmail()
  @IsString({ message: "The email must be of type string" })
  @Length(MIN_VALUE_EMAIL, MAX_VALUE_EMAIL, {
    message: `The value of the email must be between ${MIN_VALUE_EMAIL} and ${MAX_VALUE_EMAIL} characters`,
  })
  email: string;

  @IsNotEmpty({ message: "The identification_type cannot be empty" })
  @IsString({ message: "The identification_type must be of type string" })
  @Length(MIN_VALUE_IDENT_TYPE, MAX_VALUE_IDENT_TYPE, {
    message: `The value of the identification_type must be between ${MIN_VALUE_IDENT_TYPE} and ${MAX_VALUE_IDENT_TYPE} characters`,
  })
  identification_type: string;

  @IsNotEmpty({ message: "The identification_number cannot be empty" })
  @IsString({ message: "The identification_number must be of type string" })
  @Length(MIN_VALUE_IDENT_NUMBER, MAX_VALUE_IDENT_NUMBER, {
    message: `The value of the identification_number must be between ${MIN_VALUE_IDENT_NUMBER} and ${MAX_VALUE_IDENT_NUMBER} characters`,
  })
  identification_number: string;

  @IsNotEmpty({ message: "The country_id cannot be empty" })
  @IsString({ message: "The country_id must be of type string" })
  @Length(MIN_VALUE_COUNTRY_ID, MAX_VALUE_COUNTRY_ID, {
    message: `The value of the country_id must be between ${MIN_VALUE_COUNTRY_ID} and ${MAX_VALUE_COUNTRY_ID} characters`,
  })
  country_id: string;

  @IsNotEmpty({ message: "The creation_date cannot be empty" })
  @IsDate({ message: "The creation_date must be of type Date" })
  creation_date: Date;

  @IsNotEmpty({ message: "The update_date cannot be empty" })
  @IsDate({ message: "The update_date must be of type Date" })
  update_date: Date;

  constructor(
    nickname: string,
    first_name: string,
    last_name: string,
    email: string,
    identification_type: string,
    identification_number: string,
    country_id: string,
    creation_date: Date,
    update_date: Date
  ) {
    this.nickname = nickname;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.identification_type = identification_type;
    this.identification_number = identification_number;
    this.country_id = country_id;
    this.creation_date = creation_date;
    this.update_date = update_date;
  }
}
