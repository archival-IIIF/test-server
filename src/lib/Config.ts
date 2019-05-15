if (process.env.NODE_ENV !== 'production')
    require('dotenv').load();

module.exports = {

    port: (() => {
        const port = parseInt(process.env.IIIF_SERVER_PORT);
        return (port >= 0) ? port : 3333;
    })()
};
