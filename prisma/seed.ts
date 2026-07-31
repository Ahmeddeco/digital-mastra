import { ProjectCategory, ProjectStatus, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { fakerAR, fakerEN } from "@faker-js/faker"


async function main() {
  console.log("🌱 Starting database cleanup and seeding...")

  // 1. Clean up database tables to avoid unique constraint collisions
  await prisma.demo.deleteMany()
  await prisma.project.deleteMany()
  await prisma.service.deleteMany()
  await prisma.member.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
  await prisma.client.deleteMany()
  await prisma.article.deleteMany()

  console.log("🧹 Database cleared successfully.")

  // ------------------------------------------------------
  // 2. Create Users
  // ------------------------------------------------------
  console.log("👥 Seeding users...")

  // Static admin user for testing and login
  const adminUser = await prisma.user.create({
    data: {
      name: "Ahmed Abdelfattah",
      email: "admin@example.com",
      emailVerified: true,
      role: Role.admin,
      mobile: "+201000000000",
      image: fakerEN.image.avatar(),
    },
  })

  const createdUsers = [adminUser]

  // Roles for random users
  const roles: Role[] = [Role.user, Role.programmer, Role.marketer, Role.designer]

  for (let i = 0; i < 15; i++) {
    const user = await prisma.user.create({
      data: {
        name: fakerAR.person.fullName(),
        email: fakerEN.internet.email().toLowerCase(),
        emailVerified: fakerEN.datatype.boolean(),
        role: roles[i % roles.length],
        // استخدام string.numeric بدلاً من replaceSymbolWithNumber
        mobile: `+2011${fakerEN.string.numeric(7)}`,
        image: fakerEN.image.avatar(),
      },
    })
    createdUsers.push(user)
  }

  // ------------------------------------------------------
  // 3. Create Clients
  // ------------------------------------------------------
  console.log("🏢 Seeding clients and companies...")

  const createdClients = []
  for (let i = 0; i < 5; i++) {
    const client = await prisma.client.create({
      data: {
        companyName: fakerAR.company.name(),
        industry: fakerAR.person.jobTitle(),
        // استخدام url(),
        logo: fakerEN.image.url(),
        taxId: fakerEN.string.numeric(9),
        workTel: `+2022${fakerEN.string.numeric(7)}`,
        secondaryTel: `+2012${fakerEN.string.numeric(7)}`,
        website: fakerEN.internet.url(),
        city: "Cairo",
        state: "Cairo",
        country: "Egypt",
        isArchived: false,
      },
    })
    createdClients.push(client)
  }

  // ------------------------------------------------------
  // 4. Link Members to Clients
  // ------------------------------------------------------
  console.log("🔗 Assigning members to client companies...")

  for (const client of createdClients) {
    // Select 2 to 3 random users per client
    const randomUsers = fakerEN.helpers.arrayElements(createdUsers, { min: 2, max: 3 })

    for (let i = 0; i < randomUsers.length; i++) {
      await prisma.member.create({
        data: {
          clientId: client.id,
          userId: randomUsers[i].id,
          position: fakerAR.person.jobTitle(),
          isPrimary: i === 0, // First member is designated as primary
        },
      })
    }
  }

  // ------------------------------------------------------
  // 5. Create Services
  // ------------------------------------------------------
  console.log("🛠️ Seeding services...")

  const servicesData = [
    {
      nameAr: "تطوير تطبيقات الويب",
      nameEn: "Web Development",
      category: ProjectCategory.development,
      descriptionAr: "بناء تطبيقات ويب متكاملة، سريعة وآمنة باستخدام أحدث التقنيات.",
      descriptionEn: "Building modern, fast, and secure web applications.",
    },
    {
      nameAr: "الحملات الإعلانية والتسويق الرقمي",
      nameEn: "Digital Marketing Campaigns",
      category: ProjectCategory.marketing,
      descriptionAr: "إدارة واستراتيجيات التسويق الرقمي للشركات لتكبير قاعدة العملاء.",
      descriptionEn: "Managing digital marketing strategies and ad campaigns.",
    },
    {
      nameAr: "تصميم واجهات المستخدم UI/UX",
      nameEn: "UI/UX Design",
      category: ProjectCategory.design,
      descriptionAr: "تصميم واجهات تجربة مستخدم فريدة وعصرية تناسب احتياجات عملائك.",
      descriptionEn: "Crafting modern user interface and experience designs.",
    },
  ]

  const createdServices = []
  for (const service of servicesData) {
    const s = await prisma.service.create({
      data: service,
    })
    createdServices.push(s)
  }

  // ------------------------------------------------------
  // 6. Create Projects & Demos
  // ------------------------------------------------------
  console.log("🚀 Seeding projects and portfolio demos...")

  const statuses: ProjectStatus[] = [
    ProjectStatus.inProgress,
    ProjectStatus.completed,
    ProjectStatus.onboarding,
    ProjectStatus.inReview,
  ]

  for (let i = 0; i < createdClients.length; i++) {
    const client = createdClients[i]
    const category = i % 2 === 0 ? ProjectCategory.development : ProjectCategory.design

    const project = await prisma.project.create({
      data: {
        titleAr: `مشروع ${fakerAR.company.name()}`,
        titleEn: `${fakerEN.company.name()} Project`,
        descriptionAr: fakerAR.lorem.paragraph(),
        descriptionEn: fakerEN.lorem.paragraph(),
        clientId: client.id,
        status: statuses[i % statuses.length],
        category: category,
        startDate: fakerEN.date.past(),
        endDate: fakerEN.date.future(),
        services: {
          connect: [{ id: createdServices[i % createdServices.length].id }],
        },
        metadata: {
          budget: fakerEN.number.int({ min: 5000, max: 50000 }),
          priority: "high",
        },
      },
    })

    // Attach Demo to selected projects
    if (i % 2 === 0) {
      await prisma.demo.create({
        data: {
          slug: fakerEN.helpers.slugify(project.titleEn.toLowerCase() + "-" + fakerEN.string.nanoid(4)),
          titleAr: project.titleAr,
          titleEn: project.titleEn,
          descriptionAr: project.descriptionAr,
          descriptionEn: project.descriptionEn,
          painPointsAr: "كان العميل يعاني من بطء النظام القديم وصعوبة إدارة المبيعات.",
          painPointsEn: "Client faced issues with legacy software speed and sales tracking.",
          solutionsAr: "تمت إعادة بناء النظام بالكامل باستخدام بنية سحابية سريعة.",
          solutionsEn: "Rebuilt system architecture using modern cloud technologies.",
          mainImage: fakerEN.image.url(),
          images: [
            fakerEN.image.url(),
            fakerEN.image.url(),
          ],
          liveUrl: fakerEN.internet.url(),
          projectId: project.id,
        },
      })
    }
  }

  // ------------------------------------------------------
  // 7. Create Articles
  // ------------------------------------------------------
  console.log("📝 Seeding articles...")

  for (let i = 0; i < 5; i++) {
    await prisma.article.create({
      data: {
        titleAr: fakerAR.lorem.sentence({ min: 3, max: 6 }),
        titleEn: fakerEN.lorem.sentence({ min: 3, max: 6 }),
        descriptionAr: fakerAR.lorem.sentences(2),
        descriptionEn: fakerEN.lorem.sentences(2),
        articleBodyAr: fakerAR.lorem.paragraphs(3, "\n\n"),
        articleBodyEn: fakerEN.lorem.paragraphs(3, "\n\n"),
        resources: [fakerEN.internet.url(), fakerEN.internet.url()],
      },
    })
  }

  console.log("✅ Database seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })