# Employee Management System

The Employee Management System is a command-line application that allows you to manage departments, roles, and employees in a company. It provides functionalities such as viewing departments, roles, and employees, adding new departments, roles, and employees, updating employee roles, and more.

## Installation

1. Clone the repository or download the source code.

2. Install the required dependencies using npm install


3. Set up the MySQL database:

- Create a new MySQL database.
- Import the provided SQL schema file `schema.sql` to create the necessary tables.

4. Configure the database connection:

- Open the `app.js` file.
- Update the `host`, `port`, `user`, `password`, and `database` properties in the `connection` object to match your MySQL database configuration.

## Usage

To start the application, run the following command in the terminal: node app.js

The application will display a menu with different options. Use the arrow keys to navigate and press Enter to select an option.

Follow the on-screen prompts to perform various operations such as viewing departments, roles, and employees, adding new data, updating employee roles, and more.

To exit the application, select the "Exit" option from the menu.

## Contributing

Contributions to the Employee Management System are welcome. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).



