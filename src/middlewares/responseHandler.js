function responseHandler(req, res, next) {
  res.success = (message = "thành công", data = null) => {
    res.status(200).json({
      status: "success",
      code: 200,
      message: message,
      data: data,
    });
  };

  res.error = (code, message = "Có lỗi", errors = null) => {
    res.status(code).json({
      status: "error",
      code: code,
      message: message,
      errors: errors,
    });
  };

  next();
}

export default responseHandler;
