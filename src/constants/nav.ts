import { Home, MapPin, Newspaper, Server, Smartphone, } from "lucide-react"
import { FaCode, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { RiRobot3Line, RiShoppingBag4Line } from "react-icons/ri"
import { AiOutlineProject } from "react-icons/ai"


export const frontNavLinks = [
  {
    title: { ar: "الرئيسية", en: "home" },
    href: "/",
    icon: Home
  },
  {
    title: { ar: "البرمجة", en: "Development" },
    href: "/Development",
    icon: FaCode
  },
  {
    title: { ar: "التسويق الرقمي", en: "marketing" },
    href: "/marketing",
    icon: RiShoppingBag4Line
  },
  {
    title: { ar: "المشروعات", en: "our projects" },
    href: "/projects",
    icon: AiOutlineProject
  },
  {
    title: { ar: "مقالاتنا", en: "articles" },
    href: "/articles",
    icon: Newspaper
  },
  {
    title: { ar: "ديجي بوت", en: "digi bot" },
    href: "/bot",
    icon: RiRobot3Line
  },
  {
    title: { ar: "سيرفر", en: "server" },
    href: "/server",
    icon: Server
  },
]

export const socials = [
  {
    href: "https://www.facebook.com/",
    icon: FaFacebookF
  },
  {
    href: "https://www.instagram.com/",
    icon: FaInstagram
  },
  {
    href: "https://x.com/",
    icon: FaXTwitter
  },
]

export const footerData = [
  {
    icon: MapPin,
    title: "شبين الكوم - المنوفية - مصر"
  },
  {
    icon: Smartphone,
    title: "01152640142"
  },
]