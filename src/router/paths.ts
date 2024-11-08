export const aAdmin = 'admin';
export const aHome = 'home';
export const aContent = 'content';
export const aUsers = 'users';

export const routes = {
  // Basic
  home: '/',
  myAccount: '/my-account',
  license: '/license',
  // Admin
  adminHome: `/${aAdmin}/${aHome}`,
  adminContent: `/${aAdmin}/${aContent}`,
  adminUsers: `/${aAdmin}/${aUsers}`,
};
