import { extendType, nonNull, stringArg } from "nexus";
import { objectCreation } from "../../../utils/utils";

export const UserMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        return await objectCreation(ctx.prisma.user, args);
      },
    });
  },
});
