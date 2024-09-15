import { Case } from "./case";
import { Donation } from "./Donation";

export class User {
    id!: string;  
    firstName!: string;
    lastName!: string;
    username!: string;
    email!: string;
    country!: string;
    zipCode!: string;
    passwordHash!: string; 
    cases?: Case[] = []; 
    donations?: Donation[] = [];  
    authStatus!: string; 
}
