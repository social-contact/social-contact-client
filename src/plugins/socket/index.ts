import { App } from "vue";
import { io } from "socket.io-client";

interface Install {
  connection: string;
  options: object;
}

export default {
  install: (app: App<Element>, { connection, options }: Install) => {
    const socket = io(connection, options);
    app.provide("socket", socket);
  },
};
