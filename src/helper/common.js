const response = (res, result, code, message, pagination) => {
  const resultPrint = {};
  resultPrint.status = "Success";
  resultPrint.statusCode = code;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.pagination = pagination || {};
  res.status(code).json(resultPrint);
};

const failed = (res, code, message) => {
  const resultPrint = {};
  resultPrint.status = "Error";
  resultPrint.statusCode = code;
  resultPrint.message = message || null;
  res.status(code).json(resultPrint);
};

module.exports = { response, failed };
