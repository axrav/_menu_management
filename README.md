## Installation

### Using Docker and Docker Compose

1. Clone the repository:

    ```bash
    git clone https://github.com/axrav/_menu_management
    cd _menu_management
    ```

2. Update environment variables:

    - Copy `sample.env` to `.env`:

        ```bash
        cp sample.env .env
        ```

    - Open `.env` and update the values according to your configuration.

3. Ensure Docker and Docker Compose are installed.

4. Run the following command to start the application:

    ```bash
    docker-compose up
    ```

### Localhost Installation 

1. Clone the repository:

    ```bash
    git clone https://github.com/axrav/_menu_management
    cd _menu_management
    ```

2. Install dependencies:


    ```bash
    npm install
    ```
##### You need Nodejs and Npm Installed to run this
3. Configure environment variables:

    - Copy `sample.env` to `.env`:

        ```bash
        cp sample.env .env
        ```

    - Open `.env` and update the values according to your configuration.

4. Run the following command to start the application in production mode:

    ```bash
    npm start
    ```
