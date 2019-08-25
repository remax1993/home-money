import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseApi} from "../../../shared/core/base-api";
import {BillModel} from "../models/bill.model";

@Injectable()
export class BillService extends BaseApi{
    constructor(
        public http: HttpClient
    ){
        super(http);
    }

    getBill(){
        //return this.http.get('http://localhost:3000/bill');
        return this.get('bill');
    }

    getCurrency(base: number = 298){
        //return this.http.get('http://data.fixer.io/api/latest?access_key=fad9faceeec26c0c5d43f94215f2fec3');
        return this.http.get(`http://www.nbrb.by/api/exrates/rates?periodicity=0`);

    }

    updateBill(bill: BillModel){
        return this.put('bill', bill);
    }
}


