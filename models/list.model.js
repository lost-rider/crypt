import mongoose from "mongoose";

const coinSchema = mongoose.Schema({
    name : String,
    id: String,
  }
);

const Coin = mongoose.model('coinList', coinSchema);

export default Coin;