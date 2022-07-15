let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let expenseSchema = new Schema(
  {
    expname: { type: String, required: true },
    category: { type: [String], required: true },
    amount: { type: Number, required:  true },
    date: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  }, { timestamps: true }
);

module.exports = mongoose.model('expense', expenseSchema);
