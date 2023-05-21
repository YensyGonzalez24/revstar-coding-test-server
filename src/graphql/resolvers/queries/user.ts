import { extendType, nonNull, stringArg } from "nexus";
import { Context } from "../../../context";

export const UserQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("getUserRole", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_, { email }, ctx: Context) {
        const user = await ctx.prisma.user.findFirst({
          where: {
            email: {
              equals: email,
            },
          },
        });

        return user;
      },
    });
  },
});
