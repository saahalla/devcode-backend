module.exports = [
  {
    script: './bin/www',
    name: 'Api-Todo',
    exec_mode: 'cluster',
    instances: 2,
  },
]
