import { OIDCOptions } from "passport-azure-ad";
import * as dotenv from 'dotenv'

dotenv.config()
const host = process.env.AUTH_HOST!;
const clientSecret = process.env.AUTH_CLIENT_SECRET!;
const clientID = process.env.AUTH_CLIENT_ID!;
const tenantGUID = process.env.AUTH_TENANT_ID!;
const redirectUrl = `${host}/api/auth/callback`;
const identityMetadata = `https://login.microsoftonline.com/${tenantGUID}/v2.0/.well-known/openid-configuration`;

export const OIDCconfig: OIDCOptions = {
    identityMetadata,
    loggingNoPII: true,
    responseType: 'code',
    responseMode: 'query',
    passReqToCallback: false,
    allowHttpForRedirectUrl: true,
    scope: ['openid', 'email', 'profile'],
    loggingLevel: 'error',
    clientID,
    redirectUrl,
    clientSecret
};