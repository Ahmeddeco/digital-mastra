import { ChartNoAxesCombined, Newspaper, Server, Type, User, Users } from "lucide-react"
import { IoCodeSlashOutline } from "react-icons/io5"

export const serverNav = [
  {
    title: { ar: "سيرفر", en: "server" },
    href: "/server",
    icon: Server
  },
  {
    title: { ar: "الأشخاص", en: "users" },
    href: "/server/users",
    icon: User
  },
  {
    title: { ar: "العملاء", en: "clients" },
    href: "/server/clients",
    icon: Users
  },
  {
    title: { ar: "أنواع المشروعات", en: "Project Types" },
    href: "/server/types",
    icon: Type
  },
  {
    title: { ar: "التسويق الرقمي", en: "projects" },
    href: "/server/projects",
    icon: IoCodeSlashOutline
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