import BaseClient from "./client.js";
import config from "./config.js";

const token = config.token;
const client = new BaseClient(token);

client.start();