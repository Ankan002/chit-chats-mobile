import { Socket, io } from "socket.io-client";
import Constants from "expo-constants";

let socket: Socket | null;

export const initializeSocket = (userId: string) => {
    socket = io(`${Constants?.manifest?.extra?.socketEndpoint}`);

    socket.emit("setup", userId);

    let connected = false;

    socket.on("connected", () => connected = true);

    return connected;
}

export const getSocket = () => socket;