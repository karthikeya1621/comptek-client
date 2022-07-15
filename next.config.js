/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com', 'localhost', 'comptek-server.herokuapp.com', 'comptek-files.s3.ap-south-1.amazonaws.com']
  }
}

module.exports = nextConfig
