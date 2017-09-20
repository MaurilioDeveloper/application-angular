export interface MyAgreement {
    idDossier: String;
    adp :String; 
    typePerson:String;
    cpfCnpj:String;
    nameClient:String;
    proposedStatus:String;
    dateCreationInit:Date;
    dateCreationEnd:Date;
    dateExpirationInit:Date;
    dateExpirationEnd:Date;
    salesman:String;
    dealership:String;
    saleTypeId:String;
    taxTc:Boolean;
}