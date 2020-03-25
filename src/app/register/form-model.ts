
export class FormModel {
    company: string;
    country: string;
    industry: string;
    email: string;
    contact: string;
    constructor(c: string, cn: string, ind: string, email: string, con: string) {
        this.company = c ;
        this.country = cn;
        this.industry = ind;
        this.email = email;
        this.contact = con;
    }

}
