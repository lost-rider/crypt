import fetch from 'node-fetch';
import Coin from "../models/list.model";

const getCoins = async () => {

    const mylist = await fetch("");
    const response = await mylist.json();
    for(let i=0;i< response.length;i++){
        const coin = new Coin({
            name:response[i]['name'],
            id:response[i]['id'],

        });
        coin.save();

    }
    return response;

}