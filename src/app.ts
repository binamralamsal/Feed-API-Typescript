import express, { Application } from "express";
import { connect, set } from "mongoose";

import Routes from "./interfaces/routes.interface";
import errorMiddleware from "./middlewares/error.middleware";

class App {
  public app: Application;
  public env: string;
  public port: string | number;
  private readonly mongodbUri: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = process.env.NODE_ENV || "development";
    this.port = process.env.PORT || 4000;
    this.mongodbUri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1/learn-node";

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public async listen() {
    await this.connectToMongodb();

    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  private async connectToMongodb() {
    try {
      if (this.env !== "production") {
        set("debug", true);
      }

      await connect(this.mongodbUri);
    } catch (error) {
      process.exit(0);
    }
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
