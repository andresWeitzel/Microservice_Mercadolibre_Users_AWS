//External
import {
    IsNotEmpty,
    IsString,
    IsEmail,
    Length,
    IsDate
  } from 'class-validator';
//Vars-const
const MIN_VALUE_NICKNAME = 4;
const MAX_VALUE_NICKNAME = 50;
const MIN_VALUE_FIRST_LAST_NAME = 4;
const MAX_VALUE_FIRST_LAST_NAME = 70;
const MIN_VALUE_EMAIL = 4;
const MAX_VALUE_EMAIL = 100;
const MIN_VALUE_IDENT_TYPE = 2;
const MAX_VALUE_IDENT_TYPE = 20;
const MIN_VALUE_IDENT_NUMBER = 2;
const MAX_VALUE_IDENT_NUMBER = 50;
const MIN_VALUE_COUNTRY_ID = 1;
const MAX_VALUE_COUNTRY_ID = 10;



class User{
    @IsNotEmpty({message: 'The nickname cannot be empty'})
    @IsString({message: 'The nickname must be of type string'})
    @Length(MIN_VALUE_NICKNAME, MAX_VALUE_NICKNAME, {message: `The value of the nickname must be between ${MIN_VALUE_NICKNAME} and ${MAX_VALUE_NICKNAME} characters`})
    nickname;

    @IsNotEmpty({message: 'The first_name cannot be empty'})
    @IsString({message: 'The first_name must be of type string'})
    @IsEmail()
    @Length(MIN_VALUE_FIRST_LAST_NAME, MAX_VALUE_FIRST_LAST_NAME, {message: `The value of the first_name must be between ${MIN_VALUE_FIRST_LAST_NAME} and ${MAX_VALUE_FIRST_LAST_NAME} characters`})
    first_name;

    @IsNotEmpty({message: 'The last_name cannot be empty'})
    @IsString({message: 'The last_name must be of type string'})
    @Length(MIN_VALUE_FIRST_LAST_NAME, MAX_VALUE_FIRST_LAST_NAME, {message: `The value of the last_name must be between ${MIN_VALUE_FIRST_LAST_NAME} and ${MAX_VALUE_FIRST_LAST_NAME} characters`})
    last_name;

    @IsNotEmpty({message: 'The email cannot be empty'})
    @IsEmail()
    @IsString({message: 'The email must be of type string'})
    @Length(MIN_VALUE_EMAIL, MAX_VALUE_EMAIL, {message: `The value of the email must be between ${MIN_VALUE_EMAIL} and ${MAX_VALUE_EMAIL} characters`})
    email;

    @IsNotEmpty({message: 'The identification_type cannot be empty'})
    @IsString({message: 'The identification_type must be of type string'})
    @Length(MIN_VALUE_IDENT_TYPE, MAX_VALUE_IDENT_TYPE, {message: `The value of the identification_type must be between ${MIN_VALUE_IDENT_TYPE} and ${MAX_VALUE_IDENT_TYPE} characters`})
    identification_type;

    
    @IsNotEmpty({message: 'The identification_number cannot be empty'})
    @IsString({message: 'The identification_number must be of type string'})
    @Length(MIN_VALUE_IDENT_NUMBER, MAX_VALUE_IDENT_NUMBER, {message: `The value of the identification_number must be between ${MIN_VALUE_IDENT_NUMBER} and ${MAX_VALUE_IDENT_NUMBER} characters`})
    identification_number;

    @IsNotEmpty({message: 'The country_id cannot be empty'})
    @IsString({message: 'The country_id must be of type string'})
    @Length(MIN_VALUE_COUNTRY_ID, MAX_VALUE_COUNTRY_ID, {message: `The value of the country_id must be between ${MIN_VALUE_COUNTRY_ID} and ${MAX_VALUE_COUNTRY_ID} characters`})
    country_id;

    @IsNotEmpty({message: 'The creation_date cannot be empty'})
    @IsDate({message: 'The creation_date must be of type Date'})
    creation_date;

    @IsNotEmpty({message: 'The update_date cannot be empty'})
    @IsDate({message: 'The update_date must be of type Date'})
    update_date;
}

module.exports = {
User
};