---
sidebar_position: 1
title: Filtering and Sorting Guide
---

### Advanced Filtering Logic
This endpoint supports advanced filtering on root and relational fields.
**Syntax:**
Filters can be applied using two formats:
1.  **Standard Fields**: `?field-name[operator]=value`
2.  **Relational Fields**: `?relation:field-name[operator]=value`
If no `[operator]` is provided, equality (`[eq]`) is assumed.
---
### **Supported Operators**
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
### **Available Filter Fields**
#### Top-Level Fields
These fields can be queried directly.
* `name` (string)
* `registration` (string)
* `vin` (string)
* `manufacturer` (string)
* `model` (string)
* `usable-battery-capacity` (number)
#### Relational Fields
These fields must be prefixed with the relation name.
* **`status:`**
    * `state-of-charge:value` (number)
    * `state-of-charge:measuredAt` (date)
    * `charging-status:value` (string)
    * `location:latitude` (number)
    * *(...and other status sub-fields)*
---
### **Sorting**
Sort the results using the `sort` query parameter.
* **Multiple Fields**: Provide a comma-separated list of fields to sort by in order of precedence.
* **Sort Direction**: By default, fields are sorted in **ascending** order. To sort in **descending** order, prefix the field name with a hyphen (`-`).
* **Field Types**: Sorting supports root and relational fields (e.g., `name`, `manufacturer`, `status:state-of-charge:value`).
**Example Sorting Query:**
Sort by manufacturer in ascending order, then by the vehicle's creation date in descending order:
`?sort=manufacturer,-status:state-of-charge:value`
---
### **Error Handling**
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
* **Unsupported Field:** Using a field that is not defined in the 'Available Filter Fields' section.
    * _Example Request_: `?manufacturerr=Volvo`
    * _Error Message_: `"Unsupported filter field: 'manufacturerr'."`
* **Unsupported Operator:** Using an operator like `[like]` on a non-string field.
    * _Example Request_: `?usable-battery-capacity[like]=400`
    * _Error Message_: `"The '[like]' operator can only be used on string fields. 'usable-battery-capacity' is a 'number' field."`
* **Invalid Value Type:** Providing a value that does not match the field's type.
    * _Example Request_: `?status:state-of-charge:value[gte]=high`
    * _Error Message_: `"Invalid value for numeric field 'status:state-of-charge:value'. Expected a number, but received 'high'."`
---
### **Example Complex Query**
Find all Volvo trucks with a state of charge greater than 50%, sorted by name, and return the first 5 results:
`?include=status&manufacturer=Volvo&status:state-of-charge:value[gte]=50&sort=name&limit=5`
