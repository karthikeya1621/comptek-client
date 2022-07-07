/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com', 'localhost', 'comptek-server.herokuapp.com']
  }
}

module.exports = nextConfig
