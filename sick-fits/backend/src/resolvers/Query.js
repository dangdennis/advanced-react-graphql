const { forwardTo } = require("prisma-binding");

const Query = {
  // You can forward the query directly to Prisma if no middleware action is required
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db")
  // async items(parent, args, ctx, info) {
  //     const items = await ctx.db.query.items();

  //     return items;
  // }
};

module.exports = Query;
