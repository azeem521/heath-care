# Use the official Node.js 14 image.
FROM node:14

# Create and change to the app directory inside the container.
WORKDIR /app

# Copy the package.json and package-lock.json.
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the port the app runs on.
EXPOSE 8080

# Define environment variable for the port.
ENV PORT=8080

# Start the application.
CMD ["npm", "run", "dev"]
