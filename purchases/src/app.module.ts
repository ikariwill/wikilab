import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { ProductsService } from './services/products/products.service';
import { PurchasesService } from './services/purchases/purchases.service';
import { CustomersService } from './services/customers/customers.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [],
  providers: [ProductsService, PurchasesService, CustomersService],
})
export class AppModule {}
