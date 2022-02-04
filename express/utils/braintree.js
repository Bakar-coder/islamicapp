const { BraintreeGateway, Environment } = require( "braintree");
const {
  __prod__,
  BRAINTREE_MERCHANT_ID,
  BRAINTREE_PUBLIC_KEY,
  BRAINTREE_PRIVATE_KEY,
} = require( "../_constants.js");

const paymentGateway = new BraintreeGateway({
  environment: __prod__ ? Environment.Production : Environment.Sandbox,
  merchantId: BRAINTREE_MERCHANT_ID,
  publicKey: BRAINTREE_PUBLIC_KEY,
  privateKey: BRAINTREE_PRIVATE_KEY,
});

exports.generateBraintreeToken = async () => {
  try {
    const { errors, clientToken } = await paymentGateway.clientToken.generate(
      {}
    );
    return { errors, clientToken };
  } catch (error) {
    return error.message;
  }
};

exports.processBraintreePayment = async (amount, paymentMethodNonce) => {
  try {
    const { errors, transaction } = await paymentGateway.transaction.sale({
      amount,
      paymentMethodNonce,
      options: { submitForSettlement: true },
    });
    return { errors, transaction };
  } catch (error) {
    return error.message;
  }
};
