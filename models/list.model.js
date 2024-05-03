import mongoose from "mongoose";

const coinSchema = mongoose.Schema({
    name : String,
    id: String,
    current_price: Number,
  }
);

const Coin = mongoose.model('coinList2', coinSchema);

export default Coin;