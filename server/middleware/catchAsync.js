const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return res.error(500, err.message, err.stack);
    });
  };
};
module.exports = catchAsync;
