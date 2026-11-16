# eBay sold listings API documentation | SoldFetch

[SoldFetch](https://soldfetch.com) is an **eBay sold listings API** for searching sold items, retrieving listing details, and building resale research tools. Get structured JSON through REST, or connect an AI agent through MCP.

Use sold listing evidence to find comparable items, research resale prices, and monitor markets. SoldFetch is an independent service and is not affiliated with eBay.

[Get an API key](https://soldfetch.com/auth/login?next=/dashboard) · [Documentation](https://soldfetch.com/docs) · [API reference](https://soldfetch.com/docs/api-reference/search) · [Code examples](https://github.com/ricciflow-api/soldfetch-api-examples)

## Search eBay sold listings

Create an API key in the [SoldFetch dashboard](https://soldfetch.com/auth/login?next=/dashboard), then make your first request. Keep your key on your server and load it through an environment variable.

```bash
export SOLDFETCH_API_KEY="YOUR_SOLDFETCH_API_KEY"
curl --fail-with-body --get 'https://soldfetch.com/v1/scrape' \
  --data-urlencode 'keyword=sony wh-1000xm5' \
  --data-urlencode 'ebaySite=ebay.com' \
  --data-urlencode 'sold=true' \
  --data-urlencode 'count=20' \
  -H "Authorization: Bearer $SOLDFETCH_API_KEY"
```

The response contains `items`, pagination information, and data-quality metadata. Use an `itemId` from the results with `GET /v1/item/{itemId}` to inspect a listing.

Each successful search page or item lookup consumes one request, including cached and empty successful results. Errors consume zero. See [authentication](https://soldfetch.com/docs/authentication) for safe retries with an `Idempotency-Key` and [usage and billing](https://soldfetch.com/docs/concepts/units-and-billing) for metering details.

## What the eBay sold listings API supports

- **Sold comparables:** Search by keyword, category, condition, price range, and buying format to collect candidate listings for resale research.
- **Regional marketplaces:** Search `ebay.com`, `ebay.co.uk`, and `ebay.de`. Check [live capabilities](https://soldfetch.com/v1/capabilities) for current availability.
- **Item details:** Inspect individual listings using their eBay item IDs.
- **Active listing research:** Set `sold=false` to search active listings alongside your sold comparables.
- **Background and bulk searches:** Run bounded search jobs, download job results as CSV, or search multiple keywords.
- **AI agent integration:** Connect through the [hosted MCP server](https://github.com/ricciflow-api/soldfetch-mcp) or use the [SoldFetch agent skills](https://github.com/ricciflow-api/soldfetch-agent-skills).

## REST endpoints

The API base URL is `https://soldfetch.com`. Data requests require a SoldFetch API key.

| Endpoint | Purpose |
| --- | --- |
| [`GET /v1/scrape`](https://soldfetch.com/docs/api-reference/search) | Search sold listings by keyword; use `sold=false` for active listings. |
| [`GET /v1/scrape/category`](https://soldfetch.com/docs/api-reference/category) | Search a category using `categoryId`. |
| [`GET /v1/item/{itemId}`](https://soldfetch.com/docs/api-reference/item) | Retrieve details for one listing. |
| [`GET /v1/capabilities`](https://soldfetch.com/v1/capabilities) | Check enabled marketplaces, operations, and limits without authentication. |
| [`GET /usage`](https://soldfetch.com/docs/api-reference/usage) | Check remaining quota without consuming a monthly request. |

Search supports `page` from 1 to 100 and `count` from 1 to 200. Keep your filters consistent between pages, deduplicate by marketplace and item ID, and stop when no new items are returned. See [pagination](https://soldfetch.com/docs/concepts/pagination) for the full stop conditions.

Use the [public OpenAPI contract](https://soldfetch.com/api/v1/openapi.json) for endpoint parameters and response schemas.

## Interpret sold listing data

SoldFetch returns listing evidence with limitations you should preserve in your application:

- Prices are displayed listing prices, not verified final transaction or accepted-offer amounts.
- Search sale dates are source-reported and unverified. Sale-date filters and verified date windows are unavailable.
- `exactMatch=true` excludes explicitly marked loose matches; it does not verify product identity, condition, bundles, or accessories.
- Pagination is inferred. Results do not guarantee an exhaustive market history, and an ended listing alone is not proof of a sale.

Read [data quality and freshness](https://soldfetch.com/docs/concepts/data-quality) before building valuations or date-based reports.

## Guides and examples

- [Quickstart](https://soldfetch.com/docs/quickstart): Create a key and make your first API request.
- [Sold comparables](https://soldfetch.com/docs/guides/sold-comparables): Build comparisons while preserving listing context.
- [Price monitoring](https://soldfetch.com/docs/guides/price-monitoring): Track listing observations over time.
- [Background searches](https://soldfetch.com/docs/guides/background-searches) and [bulk search](https://soldfetch.com/docs/guides/bulk-search): Collect results across bounded workflows.
- [AI agents](https://soldfetch.com/docs/guides/ai-agents): Use MCP and agent skills.
- [Runnable code examples](https://github.com/ricciflow-api/soldfetch-api-examples): cURL, JavaScript, Python, and Go.

[Service status](https://soldfetch.com/status) · [Support](https://soldfetch.com/contact)

## Develop this documentation

This repository is the source for [soldfetch.com/docs](https://soldfetch.com/docs), built with Mintlify. `docs.json` configures navigation and branding, `openapi.json` is the public contract snapshot, `concepts/` and `guides/` contain usage documentation, and `api-reference/` contains endpoint reference bindings.

```bash
npm test
npm run check:live
npx mint validate
npx mint dev --port 3333
```

Use a branch and preview before merging. Mintlify deploys `main`. To refresh the public contract, download `https://soldfetch.com/api/v1/openapi.json` to `openapi.json`, inspect the diff, and run both checks. Never copy the private app's operational docs or environment files here.

[MIT](LICENSE)
