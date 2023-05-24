/// <reference types="http-proxy-middleware" />

declare type YamlConfig = {
  routes: Routes;
};

type Routes = {
  [path: string]: Options;
};
