export const routes = {
  root: '/',
  login: '/login',
  signUp: '/sign-up',
  resetPassword: '/reset-password',
  notFound: '/not-found',
  somethingWentWrong: '/something-went-wrong',
  dashboard: '/dashboard',
}

export const defaultLoggedOutRoute = routes.login
export const defaultLoggedInRoute = routes.dashboard
