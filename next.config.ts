/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/plugins/*': ['./content/plugins/**/*'],
  },
}
export default nextConfig;
