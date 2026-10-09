# SoldFetch API documentation

Source for [docs.soldfetch.com](https://docs.soldfetch.com), built with Mintlify. Adapted from the Glade documentation structure and green Almond theme for SoldFetch's eBay REST and MCP interfaces.

- `docs.json`: navigation and branding
- `openapi.json`: public contract snapshot used by endpoint pages
- `concepts/` and `guides/`: usage, limitations, and workflows
- `api-reference/`: generated endpoint reference bindings

## Develop

```bash
npm test
npm run check:live
npx mint validate
npx mint dev --port 3333
```

Use a branch and preview before merging. Mintlify deploys `main`. To refresh the public contract, download `https://soldfetch.com/api/v1/openapi.json` to `openapi.json`, inspect the diff, and run both checks. Never copy the private app's operational docs or environment files here.

[Product](https://soldfetch.com) · [Examples](https://github.com/ricciflow-api/soldfetch-api-examples) · [MCP](https://github.com/ricciflow-api/soldfetch-mcp) · [Skills](https://github.com/ricciflow-api/soldfetch-agent-skills)

[MIT](LICENSE)
