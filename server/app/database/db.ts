import * as mongoose from 'mongoose';

export interface ICity extends mongoose.Document{}
let citySchema = new mongoose.Schema({
    name: { type: String, text: true },
    latitude: Number,
    longitude: Number
});

export let cities = mongoose.model<ICity>("City", citySchema);
(<any>mongoose.Promise) = global.Promise;
mongoose.connect("mongodb://test:test123!@ds117878.mlab.com:17878/challenge-coveo").catch((err) => {console.log(err)})