# Sharebite Coding Challenge
## _Backend Challenge_

## Task: Create API for Menu Builder

In this task, you will create APIs for Menu Builder Application. The frontend, which calls these APIs and fetches results in JSON format.

### Challenge
A Standard Menu on the platform consists of the following three entities:
1. Section
2. Item
3. Modifiers

**Section**

1. A section is a grouping of one or more Items:
    - The section must have an id, name, and description.
    - Examples of sections on the platform are “Lunch Specials”, “Daily Specials”, “Salads”, etc.

**Item**
1. An Item is what you order in a menu
    - An Item has must have an id, name, description, and price.
    - An item must belong to a section.
    - An Item can be part of only one section.
    - An example of an Item is “Cheese Pizza”, “Chicken Sandwich”, etc.

**Modifiers**
1. Modifiers are sides, toppings, sauces or other options for an Item
    - Modifiers have an id and description.
    - A Modifier can belong to many items.
    - An example of a modifier is “Sauce on the side”, “No spice”, etc.

---
### Database Design
Three entities names "section", "item",and "modifier".

Relationship Between Tables:
- Section 1:M Items
- Items N:M Modifier

### About the Stack
- Programming Language: JavaScript.
- Web Framework: ExpressJs
- Database: MySQL
- ORM: Sequelize

### Project Folder Structure
```
/
|-- config          # Contains the config files for setting MySQL DB.
|-- controllers     # Express controllers that responds to requests.
|-- models          # Database models
|-- routes          # Manages routes to controller
`-- index.js        # Entry point for application

```
#### Running Server
**To run the express server locally:**
```
cd /
npm start
```
### API Reference Guide

##### Status Code
- 200 - Success Code
- 404 - Not Found
- 500 - Internal Server Error
- Errors are returned in json format
```
{
    'success': False,
    'error': error_message
}
```

#### API Endpoints
All the endpoints will be routed through `/api`.

Sample endpoint: `http://localhost:4000/api/sections`
##### GET /sections
- Returns a list of sections.
- Returns the following object
```
{
  "success": true,
  "sections": [
    {
      "id": 1,
      "name": "Lunch Specials",
      "description": "Contains items for lunch specials",
      "items": []
    },
    {
      "id": 2,
      "name": "Dinner Specials",
      "description": "Contains items for dinner specials",
      "items": []
    }
  ],
  "total_sections": 2
}
```
##### GET /sections/{section_id}
- Returns a section with requested section_id passed as params
- Returns the following object
```
{
  "success": true,
  "sections": {
    "id": 1,
    "name": "Lunch Specials",
    "description": "Contains items for lunch specials",
    "items": []
  }
}
```
##### POST /sections
- Post a new section to section table.
- Request Body: {name:string, description:string}
- Returns the following object
```
{
  "success": true,
  "message": "Section added successfully"
}
```
##### PUT /sections/{section_id}
- Takes section_id as params and update the particular id with details from request body.
- Request Body: {name:string, description:string}
- Returns the following object
```
{
  "success": true,
  "message": "Section was updated successfully"
}
```
##### DELETE /sections/{section_id}
- Takes section_id and delete the particular entry from table
- Returns a successful message
```
{
  "success": true,
  "message": "Section was updated deleted"
}
```
##### GET /items
- Returns a list of items.
- Returns the following object
```
{
  "items": [
    {
      "id": 1,
      "name": "Sandwich Lunch",
      "description": "Veg Sandwich with beverage",
      "price": 10,
      "sectionId": 1,
      "modifiers": []
    },
    {
      "id": 2,
      "name": "Soup Lunch",
      "description": "Veg Soup",
      "price": 5,
      "sectionId": 1,
      "modifiers": []
    },
    {
      "id": 3,
      "name": "Half Sandwich and Half Soup",
      "description": "Best of both world",
      "price": 12,
      "sectionId": 1,
      "modifiers": []
    }
  ],
  "total_items": 3
}
```
##### GET /items/{item_id}
- Returns a item with requested item_id passed as params
- Returns the following object
```
{
  "success": true,
  "item": {
    "id": 1,
    "name": "Sandwich Lunch",
    "description": "Veg Sandwich with beverage",
    "price": 10,
    "sectionId": 1,
    "modifiers": []
  }
}
```
##### POST /sections/{section_id}/items
- Post a new item to section_id passed in params.
- Request Body: {name:string, description:string, price:integer}
- Returns the following object
```
{
  "success": true,
  "message": "Item added successfully"
}
```
##### PUT /item/{item_id}
- Takes item_id as params and update the particular id with details from request body.
- Request Body: {name:string, description:string,price:integer}
- Returns the following object
```
{
  "success": true,
  "message": "Item was updated successfully"
}
```
##### DELETE /item/:item_id
- Takes item_id and delete the particular entry from table
- Returns a successful message
```
{
  "success": true,
  "message": "Item was deleted successfully"
}
```
#### Modifier ENDPOINT
- GET /modifiers
- GET /modifiers/{modifier_id}
- POST /modifiers
- PUT /modifiers/{modifier_id}
- DELETE /modifiers/{modifier_id}

#### Mapping ENDPOINT for Items and Modifier
##### POST /items/{item_id}/modifiers/{modifier_id}
- Takes item_id, modifier_id from params and performs an N:M mapping in item_modifier table.
- Returns a successful message
```
{
  "success": true,
  "message": "Added modifier_id:5 to item_id:1"
}
```

#### Menu ENDPOINT
##### GET /menu
- Returns a list of sections which has many items. Items can have many modifiers.
- Returns a sample output
```
{
  "sections": [
    {
      "id": 1,
      "name": "Lunch Specials",
      "items": [
        {
          "id": 1,
          "name": "Sandwich Lunch",
          "price": 10,
          "description": "Veg Sandwich with beverage",
          "modifiers": [
            {
              "id": 4,
              "title": "Extra Veggies"
            },
            {
              "id": 5,
              "title": "No Lettuce"
            }
          ]
        },
        {
          "id": 2,
          "name": "Soup Lunch",
          "price": 5,
          "description": "Veg Soup",
          "modifiers": [
            {
              "id": 1,
              "title": "Extra Spicy"
            },
            {
              "id": 2,
              "title": "Regular Spicy"
            },
            {
              "id": 3,
              "title": "No Spicy"
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Dinner Specials",
      "items": [
        {
          "id": 5,
          "name": "Butter Chicken",
          "price": 20,
          "description": "delicious",
          "modifiers": [
            {
              "id": 1,
              "title": "Extra Spicy"
            },
            {
              "id": 3,
              "title": "No Spicy"
            }
          ]
        }
      ]
    }
  ],
  "total_sections": 2
}
```
### Author
- Avichel Verma developed the following application for assessment purposes for Sharebite.