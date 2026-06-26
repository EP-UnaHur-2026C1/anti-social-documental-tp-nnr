const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
    connectTimeout: 10000,
});

redisClient.on("error", (err)=>console.error("Error en cliente Redis:", err));
redisClient.on("connect", ()=>console.log("Conectado a Redis OK"));

redisClient.connect();

module.exports = redisClient;