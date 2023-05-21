import { objectType } from "nexus";
import { Company } from "nexus-prisma";

export const CompanyType = objectType({
  name: Company.$name,
  definition(t) {
    t.field(Company.NIT);
    t.field(Company.name);
    t.field(Company.address);
    t.field(Company.telephone);
    t.field(Company.products);
  },
});
