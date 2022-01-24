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

module.exports = new CustomerService();
