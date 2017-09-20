export class ChangePaword{
    public oldPassword:string;
    public newPassword:string;
    public retryPassword:string;
    constructor(oldPassword:string, newPassword:string, retryPassword:string){
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.retryPassword = retryPassword;
    }
}