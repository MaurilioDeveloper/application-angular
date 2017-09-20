export class Notice{
    public id:string;
    public title:string;
    public dtInsert:string;
    public notice:string;
    constructor(id,title,dtInsert,notice){
        this.id = id;
        this.title = title;
        this.dtInsert = dtInsert;
        this.notice = notice;
    }
}