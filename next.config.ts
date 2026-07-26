import withPWAInit from "@ducanh2912/next-pwa"


const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  dynamicStartUrl: true,
  reloadOnOnline: true,
})

export default withPWA({
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "6elzo5uqan.ufs.sh" },
    ]
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true
  },
  turbopack: {},
  cacheComponents: true,
})