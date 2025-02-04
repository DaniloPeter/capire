namespace my.testapp;

using { ServerSideRendering } from 'ui5-cap-serverside-rendering-plugin';

entity Employees@(ServerSideRenderingType:'view'):ServerSideRendering {
  key ID : Integer;
  LastName : String;
  FirstName : String;
  Title : String;
  TitleOfCourtesy : String;
  BirthDate : Date;
  HireDate : Date;
  Address : String;
  City : String;
  Region : String;
  PostalCode : String;
  Country : String;
  HomePhone : String;
  Extension : String;
  Notes : String;
  ReportsTo : Integer;
}