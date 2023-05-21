import { objectType } from "nexus";
import { Product } from "nexus-prisma";

export const ProductType = objectType({
  name: Product.$name,
  definition(t) {
    t.field(Product.id);
    t.field(Product.name);
    t.field(Product.price);
    t.field(Product.companyId);
    t.field(Product.company);
  },
});
