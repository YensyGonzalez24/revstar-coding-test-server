import { extendType, nonNull, stringArg } from "nexus";
import { objectCreation } from "../../../utils/utils";
import { Context } from "../../../context";

export const ProductMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createProduct", {
      type: "Product",
      args: {
        name: nonNull(stringArg()),
        price: nonNull(stringArg()),
        companyId: nonNull(stringArg()),
      },
      async resolve(_, { name, price, companyId }, ctx: Context) {
        return await ctx.prisma.product.create({
          data: {
            name,
            price,
            company: {
              connect: {
                NIT: companyId,
              },
            },
          },
          include: {
            company: true,
          },
        });
      },
    });

    t.field("deleteProduct", {
      type: "Boolean",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx: Context) {
        const deletedProduct = await ctx.prisma.product.delete({
          where: { id },
        });

        if (deletedProduct) {
          return true;
        }

        return false;
      },
    });
  },
});
