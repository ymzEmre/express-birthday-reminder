const httpStatus = require('http-status');
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper');
const uuid = require('uuid');
const eventEmitter = require('../scripts/events/eventEmitter');
const UserService = require('../services/UserService');
const CustomerService = require('../services/CustomerService');
class User {
  create(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }
  login(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.findOne(req.body)
      .then((user) => {
        if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: 'There is no such user' });
        user = {
          ...user.toObject(),
          tokens: {
            access_token: generateAccessToken(user),
            refresh_token: generateRefreshToken(user),
          },
        };
        delete user.password;
        res.status(httpStatus.OK).send(user);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
  index(req, res) {
    UserService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
  customerList(req, res) {
    CustomerService.list({ user_id: req.user?._id })
      .then((projects) => {
        res.status(httpStatus.OK).send(projects);
      })
      .catch(() =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: 'An unexpected error occurred while fetching users',
        })
      );
  }

  resetPassword(req, res) {
    const new_password = uuid.v4()?.split('-')[0] || `usr-${new Date().getTime()}`;
    UserService.updateWhere({ email: req.body.email }, { password: passwordToHash(new_password) })
      .then((updatedUser) => {
        if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error: 'There is no such user' });

        eventEmitter.emit('send_email', {
          to: updatedUser.email,
          subject: 'Password Reset',
          html: `Your password reset process has been completed upon your request. <br /> Don't forget to change your password after logging in! <br /> Your New Password : <b>${new_password}</b>`,
        });

        res.status(httpStatus.OK).send({
          message: 'Your new password has been sent to your registered e-mail address',
        });
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'There was a problem resetting the password' }));
  }
  update(req, res) {
    UserService.update(req.user?._id, req.body)
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the update process' }));
  }
  changePassword(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.update(req.user?._id, req.body)
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'A problem occurred during the update process' }));
  }
  deleteUser(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'ID Information Missing',
      });
    }
    UserService.delete(req.params?.id)
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

module.exports = new User();
