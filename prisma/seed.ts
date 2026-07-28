import { ProjectCategory, ProjectStatus, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { faker } from "@faker-js/faker"

async function main() {
  console.log("🌱 Starting database seeding process...")

  // 1. Clear old data (Respecting relation order)
  await prisma.article.deleteMany()
  await prisma.demo.deleteMany()
  await prisma.project.deleteMany()
  await prisma.service.deleteMany()
  await prisma.member.deleteMany()
  await prisma.client.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  console.log("🧹 Previous database records cleaned successfully.")

  // 2. Seed Users
  const usersData = [
    {
      name: "Ahmed Abdelfattah",
      email: "ahmed@flux.dev",
      role: Role.admin,
      mobile: "+201000000001",
      emailVerified: true,
      image: faker.image.avatar(),
    },
    {
      name: "Sara Mahmoud",
      email: "sara@flux.dev",
      role: Role.programmer,
      mobile: "+201000000002",
      emailVerified: true,
      image: faker.image.avatar(),
    },
    {
      name: "Mohamed Ali",
      email: "mohamed@flux.dev",
      role: Role.designer,
      mobile: "+201000000003",
      emailVerified: true,
      image: faker.image.avatar(),
    },
    {
      name: "Maryam Hassan",
      email: "maryam@flux.dev",
      role: Role.marketer,
      mobile: "+201000000004",
      emailVerified: true,
      image: faker.image.avatar(),
    },
    {
      name: "Omar Khaled",
      email: "omar@client.com",
      role: Role.user,
      mobile: "+201000000005",
      emailVerified: true,
      image: faker.image.avatar(),
    },
  ]

  const createdUsers = []
  for (const u of usersData) {
    const user = await prisma.user.create({ data: u })
    createdUsers.push(user)
  }

  console.log(`✅ Created ${createdUsers.length} users successfully.`)

  // 3. Seed Services
  const servicesData = [
    {
      nameAr: "تطوير تطبيقات الويب والـ SaaS",
      nameEn: "Web & SaaS Development",
      category: ProjectCategory.development,
      descriptionAr: "بناء منصات وتطبيقات ويب سريعة باستخدام أحدث التقنيات مثل Next.js وPostgreSQL.",
      descriptionEn: "Building scalable web apps using Next.js, TypeScript, and modern backend tech.",
    },
    {
      nameAr: "تصميم الهويات البصرية والواجهات",
      nameEn: "UI/UX & Branding Design",
      category: ProjectCategory.design,
      descriptionAr: "تصميم واجهات المستخدم وتجارب استخدام ممتازة مع هويات تجارية فريدة.",
      descriptionEn: "Creating modern UI/UX designs and comprehensive brand identities.",
    },
    {
      nameAr: "الحملات التسويقية وإدارة النمو",
      nameEn: "Digital Marketing & Growth",
      category: ProjectCategory.marketing,
      descriptionAr: "إدارة الحملات الإعلانية الموجهة وتحسين ظهور المواقع على محركات البحث.",
      descriptionEn: "Data-driven marketing campaigns and SEO optimization.",
    },
  ]

  const createdServices = []
  for (const s of servicesData) {
    const service = await prisma.service.create({ data: s })
    createdServices.push(service)
  }

  console.log(`✅ Created ${createdServices.length} services successfully.`)

  // 4. Seed Clients & Client Members
  const clientsData = [
    {
      companyName: "Al-Amal E-Commerce Co.",
      industry: "E-Commerce",
      workTel: "+20223456781",
      city: "Cairo",
      country: "Egypt",
      website: "https://alamal-shop.com",
    },
    {
      companyName: "Al-Noor Medical Solutions",
      industry: "Healthcare",
      workTel: "+20223456782",
      city: "Giza",
      country: "Egypt",
      website: "https://alnoor-med.com",
    },
  ]

  for (const c of clientsData) {
    const client = await prisma.client.create({
      data: {
        ...c,
        members: {
          create: {
            userId: createdUsers[4].id, // Client user (Omar)
            position: "Project Manager",
            isPrimary: true,
          },
        },
      },
    })

    // 5. Seed Projects
    const project = await prisma.project.create({
      data: {
        title: `${client.companyName} Platform`,
        description: `Development of a comprehensive platform for ${client.companyName} to streamline operations and services.`,
        clientId: client.id,
        status: ProjectStatus.inProgress,
        startDate: new Date(),
        services: {
          connect: [{ id: createdServices[0].id }, { id: createdServices[1].id }],
        },
        metadata: { budget: 5000, priority: "high" },
      },
    })

    // 6. Seed Demos
    await prisma.demo.create({
      data: {
        slug: faker.helpers.slugify(client.companyName).toLowerCase() + "-" + faker.string.alphanumeric(4),
        titleAr: `منصة ${client.companyName}`,
        titleEn: `${client.companyName} Platform`,
        category: ProjectCategory.development,
        tags: ["Next.js", "TailwindCSS", "Prisma", "PostgreSQL"],
        descriptionAr: "مشروع متكامل لإدارة الطلبات والعملاء مع لوحة تحكم سريعة وبسيطة.",
        descriptionEn: "A complete order management system with an intuitive admin dashboard.",
        painPointsAr: "بطء النظام القديم وصعوبة متابعة المخزون.",
        painPointsEn: "Legacy system performance issues and inventory tracking hurdles.",
        solutionsAr: "بناء لوحة تحكم حديثة بنظام Next.js وتحديث فوري للبيانات.",
        solutionsEn: "Built a modern dashboard using Next.js with real-time data sync.",
        mainImage: faker.image.url(),
        images: [
          faker.image.url(),
          faker.image.url(),
        ],
        liveUrl: client.website,
        isFeatured: true,
        projectId: project.id,
      },
    })
  }

  console.log("✅ Seeded clients, projects, and portfolio demos successfully.")

  // 7. Seed Articles
  for (let i = 0; i < 3; i++) {
    await prisma.article.create({
      data: {
        titleAr: `أهمية التحول الرقمي للشركات #${i + 1}`,
        titleEn: `The Importance of Digital Transformation #${i + 1}`,
        descriptionAr: "مقال يتناول كيفية تحسين الكفاءة التشغيلية باستخدام أدوات الويب الحديثة.",
        descriptionEn: "An article covering operational efficiency using modern web technologies.",
        articleBodyAr: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى...",
        articleBodyEn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        resources: ["https://nextjs.org", "https://prisma.io"],
      },
    })
  }

  console.log("✅ Seeded sample articles successfully.")
  console.log("🚀 Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Database seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })