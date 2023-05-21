import { extendType, nonNull, stringArg } from "nexus";
import { Context } from "../../../context";

export const CompanyQueries = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allCompanies", {
      type: "Company",
      async resolve(_, args, ctx: Context) {
        return ctx.prisma.company.findMany();
      },
    });

    t.field("getCompany", {
      type: "Company",
      args: {
        NIT: nonNull(stringArg()),
      },
      async resolve(_, { NIT }, ctx: Context) {
        return ctx.prisma.company.findUnique({
          where: { NIT },
        });
      },
    });
  },
});
