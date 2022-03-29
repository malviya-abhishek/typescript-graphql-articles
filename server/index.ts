import path from 'path'
import * as dotenv from "dotenv";
dotenv.config( { path: path.join( __dirname, '.env')  } );


import express from "express";
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors'



import db from './models';
import schema from './schemas';
// import validateJWT from './middleware/auth.middleware';

const PORT = process.env.PORT || "4000";

const app = express();


const INIT = async () => {
    try{
        const connection = await db.sequelize.sync();
        
        // MIDDLEWARE
        app.use(cors());
        // app.use(validateJWT);

        app.use("/graphql", graphqlHTTP({
            schema: schema,
            graphiql : true
          }));

        app.listen(PORT, ()=>{ console.log("Server started at port", PORT);});
    }
    catch(error){
        console.log(error);
    }
}

INIT();