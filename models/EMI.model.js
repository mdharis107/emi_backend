const mongoose = require("mongoose");

const emiSchema = mongoose.Schema({
  loan_amount: { type: Number },
  annual_int: { type: number },
  tenure: { type: number },
});

const EMIModel = mongoose.model("emi", emiSchema);

module.exports = { EMIModel };
