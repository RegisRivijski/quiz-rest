
# English IT Vocabulary - Backend

This is the backend part of the English IT Vocabulary application. The backend is built using Koa.js, with MySQL for the database and JWT for authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the backend project, follow these steps:

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```sh
    cd backend
    ```

3. **Install dependencies:**

    ```sh
    npm install
    ```

4. **Set up the database:**

    - Create a MySQL database and user.
    - Update the `config/defaults.js` file with your database credentials.

5. **Run the database migrations:**

    ```sh
    npm run migrate
    ```

## Usage

1. **Run the development server:**

    ```sh
    npm start
    ```

   The server will be available at `http://localhost:3000`.

## Project Structure

- **config**: Configuration files
    - **defaults.js**: Default configuration
- **App**: Contains the main application code
    - **controllers**: Route handlers
    - **managers**: Business logic
    - **routes**: Route definitions
    - **helpers**: Utility functions
    - **middlewares**: Custom middlewares
- **index.js**: Entry point of the application
- **migrations**: Database migration files

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
