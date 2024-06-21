const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('config');

const dbManager = require('../managers/dbManager');

module.exports = {
  register: async (ctx) => {
    const { username, password, email } = ctx.request.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await dbManager.connectDB();
    try {
      await connection.execute(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email],
      );
      ctx.status = 201;
      ctx.body = { message: 'User registered successfully' };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { message: 'Error registering user', error };
    } finally {
      await connection.end();
    }
  },

  login: async (ctx) => {
    const { username, password } = ctx.request.body;

    const connection = await dbManager.connectDB();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username],
      );
      const user = rows[0];

      if (!user || !await bcrypt.compare(password, user.password)) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid username or password' };
        return;
      }

      const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
      ctx.body = { message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Error logging in', error };
    } finally {
      await connection.end();
    }
  },

  updateUserEmail: async (ctx) => {
    const { email } = ctx.request.body;
    const userId = ctx.state.user.id;

    try {
      const connection = await dbManager.connectDB();
      await connection.execute('UPDATE users SET email = ? WHERE id = ?', [email, userId]);
      ctx.body = { message: 'Email updated successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to update email' };
    }
  },

  updateUserPassword: async (ctx) => {
    const { currentPassword, newPassword } = ctx.request.body;
    const userId = ctx.state.user.id;

    try {
      const connection = await dbManager.connectDB();
      const [rows] = await connection.execute('SELECT password FROM users WHERE id = ?', [userId]);
      const user = rows[0];

      if (!user || !await bcrypt.compare(currentPassword, user.password)) {
        ctx.status = 401;
        ctx.body = { message: 'Current password is incorrect' };
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await connection.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
      ctx.body = { message: 'Password updated successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Failed to update password' };
    }
  },
};
