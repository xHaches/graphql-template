import { Application } from "express";
import { Server, createServer } from 'http';
import express from 'express';
import compression from 'compression';
import { gql } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server-express';


class GraphQLServer {
    // Propiedades
    private app!: Application;
    private httpServer!: Server;
    private readonly DEFAULT_PORT = 3000;
    private schema!: GraphQLSchema;

    constructor(schema: GraphQLSchema) {
        if (!schema) {
            throw new Error('Necesitamos un schema de GraphQL para trabajar con APIs GraphQL');
        }
        this.schema = schema;
        this.init();
    }

    private init() {
        this.configExpress();
        this.configApolloServerExpress();
        this.routes();
    }

    private configExpress() {
        this.app = express();
        this.app.use(compression());
        this.httpServer = createServer(this.app);
    }

    private async configApolloServerExpress() {

        const apolloServer = new ApolloServer({
            schema: this.schema,
            introspection: true
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({ app: this.app, cors: true })
    }

    private routes() {
        this.app.get('/hello', (_, res) => {
            res.send('hola');
        });

        this.app.get('/', (_, res) => {
            res.redirect('/graphql');
        });
    }


    listen(callback: (port: number) => void): void {
        this.httpServer.listen(+this.DEFAULT_PORT, () => callback(+this.DEFAULT_PORT))
    }
}

export default GraphQLServer;