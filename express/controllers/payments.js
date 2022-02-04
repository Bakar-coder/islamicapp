const {
  generateBraintreeToken,
  processBraintreePayment,
} = require("../utils/braintree");

exports.getBraintreeToken = async (_, res) => {
  return res.json({ token: await generateBraintreeToken() });
};

exports.payWithBraintree = async (req, res) => {
  const { amount, paymentMethodNonce } = req.body;
  const { transaction } = await processBraintreePayment(
    amount,
    paymentMethodNonce
  );
  return res.json({ transaction });
};
