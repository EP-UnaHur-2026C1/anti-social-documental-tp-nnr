const redisClient = require('../config/redis');

const checkCache = async (req, res, next) => {
    try{
        const{id} = req.params;
        const cachedPost = await redisClient.get(`post:${id}`);
        console.log(`DEBUG: Buscando llave post:${id} en Redis... Resultado:`, cachedPost);
        if (cachedPost) {
            console.log("⚡ Cache Hit! Sirviendo desde Redis");
            return res.status(200).json(JSON.parse(cachedPost));
        }
        console.log("🐌 Cache Miss! Buscando en MongoDB");
        next();
    } catch (error) {
        console.error("Error en middleware de lectura REDIS:", error);
        next();
    }
};

const deleteCache = async (req, res, next) => {
    try {
        const {id} = req.params;
        await redisClient.del(`post:${id}`);
        next();
    } catch(error) {
        console.error("Error al borrar caché en Redis:", error);
        next();
    }
};

module.exports = {checkCache, deleteCache};