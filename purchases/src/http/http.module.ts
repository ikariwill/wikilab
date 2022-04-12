import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from '../services/products/products.service';

import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from '../services/purchases/purchases.service';
import { CustomersService } from '../services/customers/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  providers: [
    //Services
    ProductsService,
    PurchasesService,

    //Resolvers
    ProductsResolver,
    PurchasesResolver,

    // Customers
    CustomersService,
    CustomersResolver,
  ],
})
export class HttpModule {}
