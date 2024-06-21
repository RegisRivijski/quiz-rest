const app = require('./app');

const PORT = process.env.QUIZ_REST_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
