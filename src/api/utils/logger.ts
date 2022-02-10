import winston, { createLogger, format, info, transports } from 'winston'

const theme = winston.format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.align(),
    format.printf(info => {
        const { timestamp, level, message, ...extra } = info;
        return `[${timestamp}] [${level}]: ${message} ${Object.keys(extra).length ? JSON.stringify(extra, null, 2) : ''
            }`;
    }),
)

const _transports = [
    new transports.File({
        maxsize: 5120000, //5MB
        maxFiles: 100,
        filename: `${__dirname}/../../../logs/errors.log`,
        level: 'error',
        format: theme
    }),
    new transports.File({
        maxsize: 5120000, //5MB
        maxFiles: 100,
        filename: `${__dirname}/../../../logs/all.log`,
        format: theme,
        level: 'debug'
    }),
    new transports.Console({
        level: 'debug',
        format: format.combine(format.colorize({ all: true }), theme)
    })
]

const Logger = createLogger({
    transports: _transports
})

export default Logger;