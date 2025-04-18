import { Application } from "express";
import { appRouter, extensionRouter } from "../routes";
import cors from "cors";

/**
 * Initializes application routes by mounting the router middleware under the "/v1" prefix.
 * @param {Application} app - The Express application instance to initialize routes on.
 * @returns {Application} - The configured Express application instance with mounted routes.
 */
export const mountAppRoute = (app: Application): Application => {
  console.log("Mounted app route successfully!");
  // app.use(
  //   cors({
  //     origin: [
  //       "http://localhost:3000",
  //       "https://coolify.top",
  //       "https://www..coolify.top",
  //       "http://coolify.top",
  //       "http://www.coolify.top",
  //     ],
  //     methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
  //     allowedHeaders: [
  //       "Origin",
  //       "X-Requested-With",
  //       "Content-Type",
  //       "Accept",
  //       "x-client-key",
  //       "x-client-token",
  //       "x-client-secret",
  //       "Authorization",
  //       "Accept",
  //     ],
  //   })
  // );
  // appRouter.use(
  //   cors({
  //     origin: [
  //       "http://localhost:3000",
  //       "https://coolify.top",
  //       "https://www..coolify.top",
  //       "http://coolify.top",
  //       "http://www.coolify.top",
  //     ],
  //     methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
  //     allowedHeaders: [
  //       "Origin",
  //       "X-Requested-With",
  //       "Content-Type",
  //       "Accept",
  //       "x-client-key",
  //       "x-client-token",
  //       "x-client-secret",
  //       "Authorization",
  //       "Accept",
  //     ],
  //   })
  // );
  return app.use(
    "/v1",
    cors({
      origin: [
        "http://localhost:3000",
        "https://coolify.top",
        "https://www..coolify.top",
        "http://coolify.top",
        "http://www.coolify.top",
        "https://coolify.0xajinkya.in",
        "https://www.coolify.0xajinkya.in"
      ],
      methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "x-client-key",
        "x-client-token",
        "x-client-secret",
        "Authorization",
        "Accept",
      ],
    }),
    appRouter
  ); // Mounts router middleware under the "/v1" prefix
};

export const mountExtensionRoutes = (app: Application): Application => {
  console.log("Mounted extension route successfully!");
  return app.use(
    "/ext",
    cors(),
    extensionRouter
  );
};
