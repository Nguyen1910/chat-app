exports.pagination = async (
  model,
  where = { find: {}, sort: {}, populate: {} },
  pagination = { page: 1, limit: 20 }
) => {
  const limit = +pagination.limit;
  const total = await model.countDocuments(where.find);
  const pageTotal = Math.ceil(total / limit);
  const page = +pagination.page >= pageTotal ? pageTotal : pagination.page;

  const records = await model
    .find(where.find)
    .sort(where.sort)
    .populate(...where.populate)
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data: records,
    pagination: {
      ...pagination,
      page,
      nextPage: pageTotal === page ? false : true,
      total,
    },
  };
};
