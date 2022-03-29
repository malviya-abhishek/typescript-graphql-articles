import path from 'path'
import * as dotenv from "dotenv";
dotenv.config( { path: path.join( __dirname, '.env')  } );


import express from "express";
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors'



import db from './models';
import schema from './schemas';

const PORT = process.env.PORT || "4000";

const app = express();


const main = async () => {
    try{
        const connection = await db.sequelize.sync();   
        // MIDDLEWARE
        app.use(cors());
        app.use("/graphql", graphqlHTTP({
            schema: schema,
            graphiql : true
          }));
        app.listen(PORT, ()=>{ console.log("http://localhost:4000/graphql");});
    }
    catch(error){
        console.log(error);
    }
}

main();