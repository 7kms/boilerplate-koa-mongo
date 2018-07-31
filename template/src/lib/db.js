
import config from '../config';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const mongodbPool = {};

export default async (opt={}) => {
    let options = {...config.mongo,opt};
    let key = `${options.host}_${options.port}_${options.db}`;
    if (mongodbPool[key]) {
        let db = mongodbPool[key].db;
        mongodbPool[key].number++;
        return db;
    }
    let url = `mongodb://${options.host}:${options.port}/${options.db}`;
    let db = await MongoClient.connect(url, {
        "poolSize": 200,
        "reconnectTries": 86400,
        "reconnectInterval": 1000,
    });
    mongodbPool[key] = {
        db: db,
        number: 1
    };
    return db;
};