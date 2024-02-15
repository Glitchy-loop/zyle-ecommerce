/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rzccndjaotjpyktlcxya.supabase.co",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig
