import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInput {
  @Field()
  productId: string;
}
