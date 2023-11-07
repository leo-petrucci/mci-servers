module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.minecraftitalia.net/lista-server',
        permanent: false,
      },
      {
        source: '/server/:id/',
        destination: 'https://www.minecraftitalia.net/lista-server/server/:id',
        permanent: false,
      },
    ]
  },
};
