import { CoreService } from "./core.service";
import { ObjectMapService } from "./object-map.service";
import { SnackerService } from "./snacker.service";
import { ThemeService } from "./theme.service";
import { GraphqlService } from "./graphql.service";

export const Services = [
  CoreService,
  ObjectMapService,
  SnackerService,
  ThemeService,
  GraphqlService
];

export * from "./core.service";
export * from "./object-map.service";
export * from "./snacker.service";
export * from "./theme.service";
export * from "./graphql.service";
