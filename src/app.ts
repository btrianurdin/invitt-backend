import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import apiRuter from "./routes/api";
import { IDBConnect } from "./interfaces/Database";
import Config from "./config";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    mongoose.connection.on("error", () => {
      console.log("database not connedted!");
    });
    mongoose.connection.on("open", () => {
      console.log("database connected!");
    });
  }

  public async listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json({limit: "50mb"}));
    this.app.use(express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000  }));
    this.app.use(cors());
    this.app.use(cookieParser());
  }

  private initializeRoutes() {
    this.app.use(
      `/${Config.apiPrefix}/`,
      apiRuter
    );
  }

  private async initializeDatabase(): Promise<void> {
    const mongoOpt: IDBConnect = {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    };

    await mongoose.connect(Config.database.url, mongoOpt);
  }
}

export default App;
