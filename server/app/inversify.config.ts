/*
 * Copyright (C) 2018 Yonni Chen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Container } from "inversify";
import Types from "./types";
import "reflect-metadata";
import { Server } from './server';
import { ISuggestionService, SuggestionService } from "./services/suggestion.service";
import { IRoutes, ApiRoutes } from "./routes";

const container: Container = new Container();

container.bind<Server>(Types.Server).to(Server);
container.bind<IRoutes>(Types.Routes).to(ApiRoutes);
container.bind<ISuggestionService>(Types.SuggestionService).to(SuggestionService);

export { container };
