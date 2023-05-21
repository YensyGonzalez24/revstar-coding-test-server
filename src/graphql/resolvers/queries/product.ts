import { extendType, nonNull, stringArg } from "nexus";
import { Context } from "../../../context";

export const ProductQueries = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allProductsFromCompany", {
      type: "Product",
      args: {
        NIT: nonNull(stringArg()),
      },
      async resolve(_, { NIT }, ctx: Context) {
        return ctx.prisma.product.findMany({
          where: {
            companyId: {
              equals: NIT,
            },
          },
        });
      },
    });
  },
});
