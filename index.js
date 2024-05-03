import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './utils/config.js';
import app from './app.js';
import fetch from 'node-fetch';
import Coin from "./models/list.model.js";



const getCoins = async () => {
    try {
        const mylist = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
        const response = await mylist.json();
        for (let i = 0; i < response.length; i++) {
            const coin = new Coin({
                name: response[i]['name'],
                id: response[i]['id'],
                current_price:response[i]['current_price']
            });
            await coin.save();
        }
        console.log("Coins saved successfully");
    } catch (error) {
        console.error("Error fetching or saving coins:", error);
    }
};


getCoins();

const interval = 3600000; //in ms
setInterval(getCoins, interval);

let server;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to database");
        server = app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
            getCoins(); // Call the function to fetch and save coins once the server is started
        });
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});

export default app;
