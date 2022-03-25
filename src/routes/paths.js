// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  app: '/app',
  auth: '/authen'
};

export const PATH_PAGE = {
  auth: {
    root: ROOTS.auth,
    login: path(ROOTS.auth, '/login'),
    loginUnprotected: path(ROOTS.auth, '/login-unprotected')
  }
};

export const PATH_HOME = {
  components: '/components',
  dashboard: ROOTS.app
};

export const PATH_APP = {
  root: ROOTS.app,
  main: {
    root: path(ROOTS.app, '/dashboard'),
    dashboard: path(ROOTS.app, '/dashboard')
  }
};
