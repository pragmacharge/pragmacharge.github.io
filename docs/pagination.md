---
title: Pagination
sidebar_label: Pagination
---

# Paginating API Results

To manage the number of results returned in a single API call, our list endpoints use offset-based pagination. This is controlled by two query parameters: `limit` and `offset`.

### `limit`
The `limit` parameter specifies the maximum number of items to return in a single response.

-   **Default**: `10`
-   **Maximum**: `1000`

### `offset`
The `offset` parameter specifies the number of items to skip before starting to collect the result set.

-   **Default**: `0`

## How It Works

To get the first page of results, you can either omit the parameters (to use the defaults) or be explicit. To get the second page, you would set the `offset` to the `limit` value of the first request.

### Example: Fetching Vehicles in Pages

**Requesting the first 10 vehicles:**
The `offset` is `0` (or omitted).

```bash
curl -X GET '[https://cloud.pragmacharge.com/api/v2/vehicles?limit=10&offset=0](https://cloud.pragmacharge.com/api/v2/vehicles?limit=10&offset=0)' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

**Requesting the next 10 vehicles (Page 2)**
The `offset` is `10`.

```bash
curl -X GET '[https://cloud.pragmacharge.com/api/v2/vehicles?limit=10&offset=10](https://cloud.pragmacharge.com/api/v2/vehicles?limit=10&offset=10)' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

By incrementing the offset by the limit for each subsequent request, you can page through the entire collection of resources