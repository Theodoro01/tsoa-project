import express, { json, urlencoded, Response as ExResponse, Request as ExRequest } from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { ErrorHandling } from "./errors_handling/errors_handling";

export const app = express();

app.use(
  urlencoded({
    extended: true,
  })
  );

app.use(json());
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});

RegisterRoutes(app);

ErrorHandling(app)