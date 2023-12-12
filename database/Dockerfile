# Use an official MySQL image as a parent image
FROM mysql:latest

# Set the root password and create the 'foodOrders' database
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=foodOrders

# Copy the init.sql script to the /docker-entrypoint-initdb.d/ directory
COPY init.sql /docker-entrypoint-initdb.d/
