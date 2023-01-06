import { io } from "socket.io-client";

const socket = io("http://22cz6b.natappfree.cc", {
  options: {
    autoConnect: false, //关闭自动连接
  },
});

export default socket;
