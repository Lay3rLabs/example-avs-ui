# Contract Schemas

In order to auto-generate contract bindings, first install ts-codegen:

```bash
npm install -g @cosmwasm/ts-codegen
```

Then run the following:

```bash
cd ./schemas
./codegen.sh
```

Output will be in `src/contracts/client/*`

Schemas are generated from the `avs-toolkit` repo.
