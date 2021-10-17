
import { IResolvers } from '@graphql-tools/utils';

const queryResolvers: IResolvers = {
    Query: {
        hello: (): string => 'Hola a la API de GraphQL',
        helloWithName: (_: void, args: { name: string }, context: any, info: object): string => {
            console.log(info)
            return `Hola ${args.name}`
        },
        peopleNumber: (): number => 123212
    },
};

export default queryResolvers;