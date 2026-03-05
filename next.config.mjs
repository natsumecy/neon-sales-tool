/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Include publishers/ in Vercel serverless bundle (fs.readFileSync can't be traced)
  outputFileTracingIncludes: {
    "/*": ["publishers/**/*"],
  },
}

export default nextConfig
