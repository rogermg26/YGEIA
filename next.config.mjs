// // next.config.mjs

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     webpack: (config, { isServer }) => {
//       // Add a rule to handle .node files
//       config.module.rules.push({
//         test: /\.node$/,
//         loader: 'node-loader',
//       });
  
//       // Prevent `canvas` from being bundled on the client side
//       if (!isServer) {
//         config.resolve.fallback = {
//           fs: false,
//           'canvas': false,
//         };
//       }
  
//       return config;
//     },
//   };
  
//   export default nextConfig;
  

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
