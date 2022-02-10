import morgan, { StreamOptions } from "morgan";
import Logger from "../utils/logger";

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
    // Use the http severity
    write: (message) => Logger.http(message.substring(0,message.lastIndexOf('\n'))),
};

// Build the morgan middleware
const _morgan = morgan(
    // Define message format string (this is the default one).
    ":method :url :status :res[content-length] - :response-time ms",
    { stream }
);

export default _morgan;