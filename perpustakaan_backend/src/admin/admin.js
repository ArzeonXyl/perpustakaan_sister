async function setupAdmin(app) {
  const { default: AdminJS } = await import('adminjs')
  const AdminJSExpress = await import('@adminjs/express')

  const admin = new AdminJS({
    rootPath: '/admin',
    branding: {
      companyName: 'Perpustakaan Dashboard',
      softwareBrothers: false,
    },
    pages: {
      logout: {
        label: '🚪 Logout',
        icon: 'Logout', // biar tampil ikon logout di sidebar
        handler: async (req, res, context) => {
          // Hapus cookie token
          res.clearCookie('token')

          return {
            notice: {
              message: 'Logout berhasil',
              type: 'success',
            },
            // Redirect ke login page Vite
            redirectUrl: 'http://localhost:5173/login',
          }
        },
        component: false, // Gak perlu page baru
      },
    },
  })

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  console.log(`✅ AdminJS ready at http://localhost:3000${admin.options.rootPath}`)
}

module.exports = setupAdmin
