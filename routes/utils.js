function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action",
      });
    }
  
    next();
  }
  
  function isActiveUser(user) {
    if (user.id === req.user.id) {
      return true;
    }
  }
  
  module.exports = {
    requireUser,
    isActiveUser,
  };
  