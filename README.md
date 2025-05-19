# Project Template

**Project Template** is a template used to create internal TurboRepo Nextjs monorepos.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Running the App](#running-the-app)
3. [Folder Structure](#folder-structure)
4. [Additional](#additional-notes)

---

## Project Overview

This repository houses various modules and components related to the development of tools. Follow the instructions below to get started with the development environment and explore the project.

---

## Getting Started

### Prerequisites

Before getting started, ensure you have the following installed:

* **Node.js (>=23)**: Required to run the app.
* **Yarn (v1.22.19)**: For managing dependencies and running commands.
* **Docker / Docker Compose**: For managing containers

### Installation

1. Clone the repository:
   ```bash
   git clone ....
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

   This will set up the necessary dependencies for the app, including workspaces for efficient task management.

3. Create .env files in apps:

   Follow .env.example in both apps to add necessary env variables for running the app

---

### Running the App

Once the setup is complete, you can begin using the **Template**. Here are some key commands available to help you manage your workflows:

1. **Start the application:**

   To start the application and necessary services (such as Docker containers or databases), run:

   ```bash
   yarn start
   ```

2. **Stop the application:**

   To stop the services and cleanup, use:

   ```bash
   yarn stop
   ```

3. **Development Mode:**

   To start the app in development mode, initializing the database as needed, run:

   ```bash
   yarn dev
   ```

   This command starts the database in the `dbOnly` mode and then runs the app in development mode via TurboRepo (`turbo run dev`).

4. **Migrate Database:**

   To migrate your database (for example, from a remote MongoDB to your local database), use:

   ```bash
   yarn migrate-db
   ```

   This command will handle the migration process, transferring data from the remote database to your local MongoDB instance.

---


## Folder Structure

Here’s a quick overview of the folder structure for the **Template**:

* **`apps/`**: Contains your application code.
* **`bin/`**: Contains command-line scripts (e.g., migration scripts, start/stop scripts).
* **`packages/`**: Holds shared utilities, libraries, and services.
* **`node_modules/`**: Installed dependencies via Yarn.

---

### Additional Notes

* **TurboRepo** is used for running tasks efficiently across the monorepo, allowing you to run linting, testing, and type-checking tasks across multiple packages.
* **Docker & Docker Compose** are used for local development environments, including services like databases.
* You can easily extend the commands and scripts to include additional features or automation as needed.

---

