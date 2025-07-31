---
title: Including Nested Fields
sidebar_label: Including Nested Fields
---

# Including Nested Fields

To reduce the number of API calls, many of our endpoints support embedding related resources directly into the response using the `include` query parameter. This allows you to fetch a primary resource and its related data in a single request.

## How It Works

The `include` parameter accepts a comma-separated list of relation names that you want to embed in the response. The available relations are specific to each endpoint.

### Example: Get a Vehicle and its Latest Status

When fetching a single vehicle, the response does not include its real-time status by default. To include it, you can add `include=status` to the query string.

**Request without `include`:**

```bash
curl -X GET '[https://cloud.pragmacharge.com/api/v2/vehicles/](https://cloud.pragmacharge.com/api/v2/vehicles/){vehicleId}' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

**Response without `include`:**

```json
{
  "id": "bfa9af74-18af-4f41-8242-704ecc15f9ba",
  "vin": "1N4AZ0CP3DC400001",
  "name": "Truck A",
  // ... no 'status' object
}
```

**Request with `include`:**

```bash
curl -X GET '[https://cloud.pragmacharge.com/api/v2/vehicles/](https://cloud.pragmacharge.com/api/v2/vehicles/){vehicleId}?include=status' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

**Response with `include`:**

```json
{
  "id": "bfa9af74-18af-4f41-8242-704ecc15f9ba",
  "vin": "1N4AZ0CP3DC400001",
  "name": "Truck A",
  // ...
  "status": { // The nested status object is now included
    "vehicleId": "bfa9af74-18af-4f41-8242-704ecc15f9ba",
    "stateOfCharge": {
      "value": 85
      // ...
    }
  }
}
```

Please refer to the "Query Parameters" section of each specific endpoint in the API Reference to see which relations are supported for the include parameter.