---
sidebar_position: 1
title: Filtering and Sorting Guide
---

## Filtering

### Supported fields
Unless otherwise specified, PragmaCharge API endpoints support filtering on both root and nested fields. 

**Filtering on root fields** can be specified as follows: `?field-name[operator]=value` (see below for supported operators). For example, on the `GET vehicles` endpoint:

```?manufacturer[eq]=Volvo```

**Filtering on nested fields** can be specified for unlimited levels of nesting by separating each nested field name with a `:`, as follows: `?field-name-1:field-name-2:...[operator]=value`. For example, on the `GET vehicles` endpoint:

```?status:state-of-charge:measured-at[lt]=2025-01-01T00:00:00Z```

---

### Supported Operators

The following operators are supported. Note that if no `[operator]` is provided, equality (`[eq]`) is the default.

| Operator | Meaning | Example |
| :--- | :--- | :--- |
| `[eq]` | Equals | `?name[eq]=Alpha Truck` |
| `[ne]` | Not equal | `?manufacturer[ne]=Volvo` |
| `[gt]` | Greater than | `?status:state-of-charge:value[gt]=50` |
| `[gte]` | Greater than or equal | `?usable-battery-capacity[gte]=400` |
| `[lt]` | Less than | `?status:state-of-charge:measured-at[lt]=2025-01-01T00:00:00Z` |
| `[lte]` | Less than or equal | `?status:state-of-charge:value[lte]=15000` |
| `[in]` | Value is in a comma-separated list | `?manufacturer[in]=Volvo,Mercedes` |
| `[not]`| Value is not in the list | `?model[not]=FM Electric,FH Electric` |
| `[like]`| Partial, case-insensitive match | `?registration[like]=123` |
| `[null]`| Field is null (`true`) or not null (`false`) | `?alias[null]=true` |

---

## Sorting

Results can be sorted by using the `sort` query parameter.
* **Multiple fields**: To sort by multiple fields, provide a comma-separated list of the fields in order of sorting precedence.
* **Sort direction**: By default, fields are sorted in **ascending** order. To sort in **descending** order, prefix the field name with a hyphen (`-`).
* **Nested fields**: Sorting supports both root and nested fields. Nested fields should be separated using a `:` in the same manner as for filtering (e.g. `status:state-of-charge:value`).

**Example Sorting Query**:
Sort by manufacturer in ascending order, then by the vehicle's state-of-charge value in descending order:
`?sort=manufacturer,-status:state-of-charge:value`

---

## **Error Handling**
If an invalid filter, sort parameter, or value is provided, the API will respond with a `400 Bad Request` status code and a JSON error object.
**Example Error Response:**
```json
{
  "statusCode": 400,
  "message": "Unsupported filter field: 'manufacturerr'",
  "error": "Bad Request"
}
```
**Common Errors:**
* **Unsupported Field:** Using a field that is not defined in the endpoint's response.
    * _Example Request_: `?manufacturerr=Volvo`
    * _Error Message_: `"Unsupported filter field: 'manufacturerr'."`
* **Unsupported Operator:** Using an operator like `[like]` on a non-string field.
    * _Example Request_: `?usable-battery-capacity[like]=400`
    * _Error Message_: `"The '[like]' operator can only be used on string fields. 'usable-battery-capacity' is a 'number' field."`
* **Invalid Value Type:** Providing a value that does not match the field's type.
    * _Example Request_: `?status:state-of-charge:value[gte]=high`
    * _Error Message_: `"Invalid value for numeric field 'status:state-of-charge:value'. Expected a number, but received 'high'."`

---

## Example Complex Query
Find all Volvo trucks with a state of charge greater than 50%, sorted by name, and return the first 5 results:
`?include=status&manufacturer=Volvo&status:state-of-charge:value[gte]=50&sort=name&limit=5`
