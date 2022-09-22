import "dotenv/config";
import sern from "./index";
const client = new sern();

client.start();
