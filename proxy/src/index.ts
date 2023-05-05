import { createApp } from "@unleash/proxy";
import * as dotenv from 'dotenv'

dotenv.config()
const port = parseInt(process.env.PORT || '') || 3000;
const unleashUrl = process.env.UNLEASH_URL || ''
const unleashApiToken = process.env.UNLEASH_API_TOKEN || ''
const clientKeys = process.env.UNLEASH_CLIENT_KEYS || ''

const app = createApp({
    unleashUrl: unleashUrl,
    unleashApiToken: unleashApiToken,
    clientKeys: [clientKeys],
    //Example on how to implement custom strategies
    //customStrategies: [new TimeStampStrategy()]
});

app.listen(port, () =>
    console.log(`Unleash Proxy listening on http://localhost:${port}/proxy`),
);