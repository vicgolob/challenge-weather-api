# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available APIs
### Locations API 
Returns a list of available cities to consume the Current API by passing the city code (i.e. ARG_COR)
#### Request Example
```curl
curl --location --request GET 'localhost:3000/locations'
```
#### Response example
```javascript
{
  "ARG_COR": {
      "description": "Ciudad de Córdoba, Córdoba",
      "lat": -31.416668,
      "long": -64.183334
  },
  "ARG_BUE": {
      "description": "Ciudad de Buenos Aires, Buenos Aires",
      "lat": -34.603683,
      "long": -58.381557
  },
  "ARG_ROS": {
      "description": "Ciudad de Rosario, Rosario",
      "lat": -32.95924,
      "long": -60.68348
  }
}
```

### Current API 
Returns if the current temperature of given city is greater than, less than, or equal than a certain temperature
> Note: temperature is in Metric Unit

#### Request Example
The next example shows weather stats for Cordoba City (ARG_COR)
```curl
curl --location --request GET 'localhost:3000/current?location=ARG_COR&tempReference=22&comparison=lt'
```
In the above request we are asking if city's temperature is less than reference temperature

There are a couple of requiered params:
- location: the city code
- tempReference: the temperature reference we want to compare the actual city's temperature against
- comparison: one of the following [gt| lt| eq] where "gt" stands for greater than, "lt" is less than and "eq" is equal than.
#### Response example
```javascript
true
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
