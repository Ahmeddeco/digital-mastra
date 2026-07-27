import { ChartNoAxesCombined, IdCard, Newspaper, Server, User } from "lucide-react"
import { FaCode, FaDisplay, } from "react-icons/fa6"
import { RiCustomerService2Fill } from "react-icons/ri"
import { GrUserSettings } from "react-icons/gr"

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
    icon: GrUserSettings
  },
  {
    title: { ar: "موظفي العملاء", en: "Client members" },
    href: "/server/clients/members",
    icon: IdCard
  },
  {
    title: { ar: "الخدمات", en: "Services" },
    href: "/server/Services",
    icon: RiCustomerService2Fill
  },
  {
    title: { ar: "المشروعات", en: "projects" },
    href: "/server/projects",
    icon: FaCode
  },
  {
    title: { ar: "المشروعات المعروضة", en: "demos" },
    href: "/server/demos",
    icon: FaDisplay
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