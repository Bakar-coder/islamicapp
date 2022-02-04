exports.getErrorField = (error) =>
  error.details[0].message.split(" ")[0].split("").slice(1, -1).join("");
