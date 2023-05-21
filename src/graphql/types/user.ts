import { objectType } from "nexus";
import { User } from "nexus-prisma";

export const UserType = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.role);
  },
});
