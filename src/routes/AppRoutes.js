import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { PATH_APP } from './paths';
import AuthProtect from '~/components/Auth/AuthProtect';
import DashboardLayout from '~/layouts/DashboardLayout';

// ----------------------------------------------------------------------

const AppRoutes = {
  path: '/insight',
  // guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // MAIN DASHBOARD
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: '/insight/login',
      component: lazy(() => import('~/views/home/ComponentsView'))
    }
    // {
    //   component: () => <Redirect to="/404" />
    // }
  ]
};

export default AppRoutes;
