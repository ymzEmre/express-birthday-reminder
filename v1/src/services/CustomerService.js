const BaseService = require('./BaseService');
const BaseModel = require('../models/Customers');
class CustomerService extends BaseService {
  constructor() {
    super(BaseModel);
  }
  list(where) {
    return BaseModel.find(where || {}).populate({
      path: 'user_id',
      select: 'name',
    });
  }
  list2(where) {
    return BaseModel.find(where || {});
  }
}
// const schedule = require('node-schedule');
// var d = new Date();
// var v = new Date();
// const a = d.getMinutes() - 2;

// console.log(a);
// const schedule = require('node-schedule');

// const rule = new schedule.RecurrenceRule();
// rule.minute = 53;

// const job = schedule.scheduleJob(rule, function () {
//   console.log('The answer to life, the universe, and everything!');
// });
module.exports = new CustomerService();
