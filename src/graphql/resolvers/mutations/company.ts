import { extendType, nonNull, stringArg } from "nexus";
import { objectCreation } from "../../../utils/utils";
import { Context } from "../../../context";

export const CompanyMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createCompany", {
      type: "Company",
      args: {
        NIT: nonNull(stringArg()),
        name: nonNull(stringArg()),
        address: nonNull(stringArg()),
        telephone: nonNull(stringArg()),
      },
      async resolve(_, args, ctx: Context) {
        return await objectCreation(ctx.prisma.company, args);
      },
    });

    t.field("updateCompany", {
      type: "Company",
      args: {
        NIT: nonNull(stringArg()),
        name: nonNull(stringArg()),
        address: nonNull(stringArg()),
        telephone: nonNull(stringArg()),
      },
      async resolve(_, { NIT, name, address, telephone }, ctx: Context) {
        return await ctx.prisma.company.update({
          where: { NIT },
          data: {
            name,
            address,
            telephone,
          },
        });
      },
    });

    t.field("deleteCompany", {
      type: "Boolean",
      args: {
        NIT: nonNull(stringArg()),
      },
      async resolve(_, { NIT }, ctx: Context) {
        const deletedCompany = await ctx.prisma.company.delete({
          where: { NIT },
        });

        if (deletedCompany) {
          return true;
        }

        return false;
      },
    });
  },
});
