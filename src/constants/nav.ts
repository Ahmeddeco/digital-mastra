import { Code, Home, MapPin, Newspaper, Smartphone, } from "lucide-react"
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { RiRobot3Line, RiShoppingBag4Line } from "react-icons/ri"


export const frontNavLinks = [
  {
    title: { ar: "الرئيسية", en: "home" },
    href: "/",
    icon: Home
  },
  {
    title: { ar: "البرمجة", en: "Development" },
    href: "/Development",
    icon: Code
  },
  {
    title: { ar: "التسويق الرقمي", en: "marketing" },
    href: "/marketing",
    icon: RiShoppingBag4Line
  },
  {
    title: { ar: "مقالاتنا", en: "articles" },
    href: "/articles",
    icon: Newspaper
  },
  {
    title: { ar: "ديكو بوت", en: "deco bot" },
    href: "/bot",
    icon: RiRobot3Line
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