const cookieController = {};

/**
 * setSSIDCookie - store the user id in a cookie
 */

// Inside of cookieController.setSSIDCookie, create a cookie named 'ssid'
// with a value that is equal to the id of the user
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.userId, {
    httpOnly: true,
  });
  return next();
};

module.exports = cookieController;
