const httpStatus = require('http-status');
const CustomerService = require('../services/CustomerService');
const ApiError = require('../errors/ApiError');
const schedule = require('node-schedule');

class Customer {
  index(req, res) {
    CustomerService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
  create(req, res) {
    req.body.user_id = req.user;
    CustomerService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }
  update(req, res, next) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'ID Information Missing',
      });
    }
    CustomerService.update(req.params?.id, req.body)
      .then((updatedProject) => {
        if (!updatedProject) return next(new ApiError('There is no such record', 404));
        res.status(httpStatus.OK).send(updatedProject);
      })
      .catch((e) => next(new ApiError(e?.message)));
  }
  deleteProject(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'ID Information Missing',
      });
    }
    CustomerService.delete(req.params?.id)
      .then((deletedItem) => {
        if (!deletedItem) {
          return res.status(httpStatus.NOT_FOUND).send({
            message: 'There is no such record',
          });
        }
        res.status(httpStatus.OK).send({
          message: 'Record Deleted',
        });
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'There was a problem deleting' }));
  }
}

module.exports = new Customer();
