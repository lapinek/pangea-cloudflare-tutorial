# Cloudflare Tutorial App

The code included in under the [transfer-app](./transfer-app/) path, is an example implementation resulted from following [Building a Secure Cloudflare Pages App with Pangea](https://pangea.cloud/docs/tutorials/cloudflare-app).

Note that in addition to the service token saved in in `.env.local` file, the following placeholders in the code needs to be populated with values found in the Pangea User Console.

Under **Configuration Details** on the [AuthN Overview](https://console.pangea.cloud/service/authn) page:

- `domain` - **Domain**
- `clientToken` - **Client Token**
- `loginUrl` - **Hosted Login**
- `brandingId`- **Branding ID**

Under _Service Activity_ **Configuration Details** on the [Secure Audit Log Overview](https://console.pangea.cloud/service/audit) page:

- `activityServiceConfig` - **Config ID**

