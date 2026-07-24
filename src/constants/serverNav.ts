import { ChartNoAxesCombined, Newspaper, Server, Users } from "lucide-react"
import { IoCodeSlashOutline } from "react-icons/io5"
import { RiShoppingBag4Line } from "react-icons/ri"

export const serverNav = [
  {
    title: { ar: "سيرفر", en: "server" },
    href: "/server",
    icon: Server
  },
  {
    title: { ar: "الأشخاص", en: "users" },
    href: "/server/users",
    icon: Users
  },
  {
    title: { ar: "البرمجة", en: "Development" },
    href: "/server/Development",
    icon: IoCodeSlashOutline
  },
  {
    title: { ar: "التسويق الرقمي", en: "marketing" },
    href: "/server/marketing",
    icon: RiShoppingBag4Line
  },
  {
    title: { ar: "مقالاتنا", en: "articles" },
    href: "/server/articles",
    icon: Newspaper
  },
  {
    title: { ar: "الإحصائيات", en: "charts" },
    href: "/server/charts",
    icon: ChartNoAxesCombined
  },

]