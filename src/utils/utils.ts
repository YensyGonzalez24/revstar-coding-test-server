export const objectCreation = async (dbObject: any, args: any) => {
  return await dbObject.create({
    data: {
      ...args,
    },
  });
};
