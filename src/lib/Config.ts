import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {

    port: (() => {
        const port = parseInt(process.env.PORT ?? '3333', 10);
        return (port >= 0) ? port : 3333;
    })()
};
