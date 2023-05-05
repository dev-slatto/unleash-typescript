/**
 * Azure AD hook for securing an Unleash server
 *
 * This example assumes that all users authenticating via
 * azure should have access. You would probably limit access
 * to users you trust, for example users within a tenant.
 *
 * The implementation assumes the following environment variables:
 *
 *  - AUTH_HOST
 *  - AUTH_CLIENT_ID
 *  - AUTH_CLIENT_SECRET
 *  - AUTH_TENANT_ID
 */

import { IUnleashServices } from 'unleash-server'
import passport from 'passport'
import { OIDCStrategy } from 'passport-azure-ad'
import { OIDCconfig } from './azuread-configuration'
import { Application } from 'express'
import { RoleName, AuthenticationRequired } from 'unleash-server'
import { Request, Response, NextFunction } from 'express'

function azureAdminOauth(app: Application, config: unknown, services: IUnleashServices) {
  const { userService } = services

  passport.use(
    'azure',
    // Check passport azure ad documentation for option details: https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/maintenance/passport-azure-ad#4112-options
    new OIDCStrategy(OIDCconfig,
      async (iss, sub, profile, accessToken, refreshToken, cb) => {
        let name = profile.displayName
        let email = profile._json.email
        const user = await userService.loginUserSSO({
          email,
          name,
          rootRole: RoleName.VIEWER,
          autoCreate: true,
        })
        cb(null, user)
      }
    )
  )

  app.use(passport.initialize())
  app.use(passport.session())
  passport.serializeUser((user: Express.User, done) => done(null, user))
  passport.deserializeUser((user: Express.User, done) => done(null, user))

  app.get(
    '/auth/azure/login',
    passport.authenticate('azure', {
      scope: ['email', 'openid', 'profile'],
    })
  )

  app.get(
    '/api/auth/callback',
    passport.authenticate('azure', {
      failureRedirect: '/api/admin/error-login',
    }),
    (req: Request, res: Response) => {
      res.redirect('/')
    }
  )

  app.use('/api', async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      next()
    } else {
      
      return res
        .status(401)
        .json(
          new AuthenticationRequired({
            path: '/auth/azure/login',
            type: 'custom',
            message: `You have to identify yourself in order to use Unleash. Click the button and follow the instructions.`,
          })
        )
        .end()
    }
  })
}

export default azureAdminOauth
