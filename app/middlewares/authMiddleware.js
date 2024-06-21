const { verifyToken } = require('../helpers/jwtHelper');

module.exports = async (ctx, next) => {
  const token = ctx.headers.authorization?.split(' ')[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { message: 'Unauthorized' };
    return;
  }

  try {
    const decoded = verifyToken(token);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: 'Unauthorized' };
  }
};
