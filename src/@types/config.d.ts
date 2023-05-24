/// <reference types="http-proxy-middleware" />

declare module '*/config/routes.yaml' {
  const config: YamlConfig;
  export default config;

  type Routes = {
    [path: string]: Options;
  };

  export type YamlConfig = {
    routes: Routes;
  };
}
