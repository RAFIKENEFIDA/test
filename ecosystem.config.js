module.exports = {
  apps: [
    {
      name: 'nuxt',
      port: 3000,
      script: 'npm run dev',
      instances: 1,
      // autorestart: true,
      // watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'development'
      },
      // name: 'nuxt',
      // port: 3000,
      // script: './node_modules/nuxt/bin/nuxt.js',
      cwd: '/home/tim/projects/rovara-nuxt-gcloud',
      // env: {
      //   NODE_ENV: 'development'
      // },
      env_production: {
        NODE_ENV: 'production'
      },
      // script: 'npm',
      // args: 'run dev',
      // instances: 1,
      exec_mode: 'fork'
    }
  ]
}
