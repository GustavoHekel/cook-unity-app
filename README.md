## Cook Unity APP

### APP
* NextJS framework was used
* `src/interfaces` folder is generated from API spec using `openapi-generator`
  * You can run `npx @openapitools/openapi-generator-cli generate -i ../specs/API.yaml -g typescript-axios  -o ./src/interfaces/`

### Deployment
* You'll be able to find a working instance of the APP running on Vercel
* https://cook-unity-app.vercel.app/