/*
 * Copyright (C) 2018 Yonni Chen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

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