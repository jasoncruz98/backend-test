import logger from 'pino';
import dayjs from 'dayjs'

//TODO: pipe logs through prettifier instead of prettifying logs directly
//TODO: toggle pino-pretty with env variable, to be used only in development
//TODO: save logs to file

const log = logger({
    transport: {
        target: 'pino-pretty',
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})

export default log