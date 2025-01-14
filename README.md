# Family API

This is a simple API to manage family members, allowing you to perform CRUD operations (Create, Read, Update, Delete) for family members using Node.js and HTTP module.

## Table of Contents
1. [About](#about)
2. [API Endpoints](#api-endpoints)
3. [Setup and Installation](#setup-and-installation)
4. [Usage](#usage)
5. [License](#license)

## About
This API provides the following functionalities:
- **Get all family members**
- **Get a family member by ID**
- **Add a new family member**
- **Update an existing family member**
- **Delete a family member**

The API uses the HTTP module to handle requests.

## API Endpoints

### `GET /family`
Returns a list of all family members.

#### Response Example:
```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "id": 0,
      "name": "Ayah",
      "age": 45,
      "gender": "male"
    },
    {
      "id": 1,
      "name": "Ibu",
      "age": 37,
      "gender": "female"
    },
    // More family members
  ]
}
