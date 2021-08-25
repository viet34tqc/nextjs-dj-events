/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'] // Fix error when the source of the images is outside the current domain
  }
}
