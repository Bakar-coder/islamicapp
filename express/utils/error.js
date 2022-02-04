exports.errorMap = (errors) => {
  const error = {};
  errors.forEach(({ field, message }) => {
    error[field] = message;
  });

  return error;
};
