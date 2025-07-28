---
title: Generating M2M Tokens
sidebar_label: M2M Authentication
---

# M2M Authentication

## Overview

To interact with protected API endpoints, your application must authenticate using a short-lived M2M (machine-to-machine) access token. This guide explains how to securely request and manage these tokens.

## Obtaining a `client_id` and `client_secret`

M2M access tokens are obtained by presenting your long-lived `client_id` and `client_secret` to the authentication endpoint. To obtain your `client_id` and `client_secret`, please contact PragmaCharge.

## The Client Credentials Flow

We use the standard OAuth 2.0 Client Credentials grant flow. The process is as follows:

1.  Your application makes a `POST` request to the `/v2/auth/token` endpoint.
2.  The body of the request contains your `client_id` and `client_secret`.
3.  The server validates your credentials and returns a JSON object containing an `access_token` and its `expires_in` duration (in seconds).
4.  Your application should cache this `access_token` and use it in the `Authorization` header for all subsequent API requests.
5.  When the token expires, your application should repeat this process to get a new one.

## Requesting a Token

Here’s how to request an access token using `curl`. In a real application, you would use an HTTP client library for your programming language.

### Endpoint

**`POST /v2/auth/token`**

### Request Body

The request must have a `Content-Type` of `application/json` and include the following fields in the body:

| Parameter       | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| `client_id`     | string | Your unique client identifier.             |
| `client_secret` | string | Your secret key. **Keep this secure!** |

### Example Request (`curl`)

```bash
curl -X POST \
  [https://cloud.pragmacharge.com/api/v2/auth/token](https://cloud.pragmacharge.com/api/v2/auth/token) \
  -H 'Content-Type: application/json' \
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
  }'