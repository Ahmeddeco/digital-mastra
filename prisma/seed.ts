import { ProjectCategory, ProjectStatus, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

async function main() {
  console.log('🧹 Clearing existing database records...')

  // تنظيف البيانات بالتسلسل لتجنب مشاكل Foreign Keys
  await prisma.article.deleteMany()
  await prisma.demo.deleteMany()
  await prisma.projectService.deleteMany()
  await prisma.project.deleteMany()
  await prisma.service.deleteMany()
  await prisma.clientMember.deleteMany()
  await prisma.client.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  console.log('🌱 Seeding Users...')

  // 1. إنشاء المستخدمين
  await prisma.user.create({
    data: {
      name: 'أحمد محمد',
      email: 'ahmed@flux-agency.com',
      emailVerified: true,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      role: Role.admin,
      mobile: '+201000000001',
    },
  })

  const userClientMeat = await prisma.user.create({
    data: {
      name: 'د. أيمن العبد',
      email: 'ayman@daktoret-lahma.com',
      emailVerified: true,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      role: Role.user,
      mobile: '+201111111101',
    },
  })

  console.log('🌱 Seeding Services...')

  // 2. إنشاء الخدمات
  const devService = await prisma.service.create({
    data: {
      nameAr: 'تطوير المنصات وتطبيقات الويب',
      nameEn: 'Web Platform & App Development',
      category: ProjectCategory.development,
      description: 'بناء منصات متكاملة وحلول ERP وتطبيقات Next.js وPWA عالية الأداء.',
    },
  })

  console.log('🌱 Seeding Clients & Client Members...')

  // 3. إنشاء العملاء
  const clientMeatShop = await prisma.client.create({
    data: {
      companyName: 'سلسلة دكتورة اللحمة',
      industry: 'تجارة وتوزيع اللحوم والمنتجات الطازجة',
      logo: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&q=80&w=300',
      taxId: '100-200-300',
      workTel: '+20133200100',
      secondaryTel: '+20133200101',
      website: 'https://daktoret-lahma.com',
      city: 'بنها',
      state: 'القليوبية',
      country: 'مصر',
      members: {
        create: [
          {
            userId: userClientMeat.id,
            position: 'الرئيس التنفيذي / CEO',
            isPrimary: true,
          },
        ],
      },
    },
  })

  console.log('🌱 Seeding Projects & Demos...')

  // 4. إنشاء مشروع بلدي وربطه بـ Demo
  await prisma.project.create({
    data: {
      code: 'BLD-2026',
      title: 'منصة بلدي الذكية لإدارة ومبيعات تجارة اللحوم',
      description: 'نظام متكامل يربط المبيعات والمخزون وإدارة الذبح والتقطيع مع متجر إلكتروني للسلسلة.',
      clientId: clientMeatShop.id,
      status: ProjectStatus.inProgress,
      startDate: new Date('2026-01-15'),
      services: {
        create: [{ serviceId: devService.id }],
      },
      demo: {
        create: {
          slug: 'balady-meat-erp-platform',
          titleAr: 'مشروع بلدي - التحول الرقمي لسلسلة جزارة وتوزيع لحوم',
          titleEn: 'Balady ERP & E-Commerce Meat Platform',
          category: ProjectCategory.development,
          tags: ['Next.js', 'ERP', 'TailwindCSS', 'AI Agents'],
          descriptionAr: 'منصة برمجية هجينة تجمع بين إدارة طلبات الذبح والتقطيع والتحكم في المخزون المتغير مع متجر إلكتروني سلس للعملاء.',
          descriptionEn: 'An integrated hybrid ERP and e-commerce web platform tailored for fresh meat inventory, cuts management, and quick delivery.',
          painPointsAr: 'صعوبة تتبع أوزان القطعيات والمخزون المتغير يومياً، وغياب منصة تضمن ثقة العميل في اختيار قطعية اللحم المناسبة.',
          painPointsEn: 'Difficulty tracking variable meat cut weights and daily inventory, alongside the absence of an online platform built around trust.',
          solutionsAr: 'تصميم واجهة اختيار مخصصة لكل قطعة لحم، مع ربط مخرجات المخزون بنظام الذكاء الاصطناعي لوضع التوصيات والإشعارات الآلية.',
          solutionsEn: 'Designed custom cut selection interfaces linked with real-time inventory tracking and AI-driven order routing.',
          mainImage: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200',
          images: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000',
          ],
          liveUrl: 'https://balady-demo.flux-agency.com',
          isFeatured: true,
        },
      },
    },
  })

  console.log('🌱 Seeding Articles...')

  // 5. إضافة المقالات (Article)
  await prisma.article.createMany({
    data: [
      {
        titleAr: 'مقدمة في تطوير تطبيقات الويب الحديثة باستخدام Next.js',
        titleEn: 'Introduction to Modern Web Development with Next.js',
        descriptionAr: 'دليل شامل لأحدث التقنيات والأساليب المستخدمة في بناء تطبيقات ويب سريعة وآمنة.',
        descriptionEn: 'A comprehensive guide to building fast and secure full-stack applications.',
        articleBodyAr: 'تعتبر إطارات العمل الحديثة مثل Next.js نقلة نوعية في عالم تطوير الويب، حيث توفر دمجاً ممتازاً بين الـ Server-Side Rendering (SSR) والـ Client Components مما يحسن من أداء الموقع ومحركات البحث (SEO)...',
        articleBodyEn: 'Modern frameworks like Next.js have revolutionized web development by seamlessly combining Server-Side Rendering (SSR) with Client Components for optimized SEO and performance...',
        resources: ['https://nextjs.org/docs', 'https://react.dev'],
      },
      {
        titleAr: 'تصميم قواعد البيانات العالية الكفاءة باستخدام Prisma ORM',
        titleEn: 'Designing High-Performance Database Schemas with Prisma',
        descriptionAr: 'كيفية إنشاء جداول وعلاقات مترابطة ومتطورة في قواعد البيانات دون التعقد المكتبي.',
        descriptionEn: 'Learn how to build scalable and type-safe database schemas effortlessely.',
        articleBodyAr: 'يساعد Prisma ORM المطورين على كتابة كود قاعدة بيانات آمن من حيث الأنماط (Type-safe) وسهل القراءة والتعامل، مما يقلل من الأخطاء أثناء التطوير ويسرع عملية الـ Seeding والـ Migrations...',
        articleBodyEn: 'Prisma ORM simplifies database interactions by offering type safety, automated migrations, and effortless schema validation when integrated with TypeScript...',
        resources: ['https://www.prisma.io/docs'],
      },
      {
        titleAr: 'استراتيجيات التسويق الرقمي وبناء العلامة التجارية للشركات',
        titleEn: 'Digital Marketing Strategies & Corporate Branding',
        descriptionAr: 'خطوات عمل للوصول إلى الجمهور المستهدف وزيادة مبيعات المنتجات والخدمات.',
        descriptionEn: 'Actionable steps to reach your target audience and grow your brand identity effectively.',
        articleBodyAr: 'يعتمد التسويق الرقمي الحديث على تحليل البيانات واستخدام الأدوات الذكية لتوجيه الحملات الإعلانية للعملاء الأكثر اهتماماً، مع صياغة هوية بصرية قوية تعكس قيم الشركة...',
        articleBodyEn: 'Modern digital marketing relies on data analysis and precise audience targeting paired with a strong visual brand identity that effectively reflects company core values...',
        resources: ['https://hubspot.com', 'https://google.com/analytics'],
      },
      {
        titleAr: 'أسس تصميم واجهات المستخدم وتجربة المستخدم (UI/UX)',
        titleEn: 'Fundamentals of UI/UX Design for Web and Mobile Applications',
        descriptionAr: 'كيف تصمم واجهات جليّة وسلسة تجعل تجربة العميل مريحة وممتعة.',
        descriptionEn: 'How to design seamless interfaces that deliver excellent user experiences.',
        articleBodyAr: 'التصميم الجيد لا يقتصر فقط على الألوان الجذابة، بل يتعلق بكيفية تفاعل المستخدم مع التطبيق وسهولة الوصول إلى المعلومات دون تعقيد...',
        articleBodyEn: 'Great design is not just about aesthetics; it focuses on usability, accessibility, and facilitating effortless user interaction with software...',
        resources: ['https://figma.com', 'https://material.io'],
      },
      {
        titleAr: 'أهمية الاختبارات المئتمتة (Automated Testing) في البرمجيات',
        titleEn: 'The Importance of Automated Testing in Software Development',
        descriptionAr: 'لماذا يجب عليك اعتماد أدوات مثل Vitest لضمان جودة تطبيقك واستقراره.',
        descriptionEn: 'Why integrating tools like Vitest ensures product quality and long-term stability.',
        articleBodyAr: 'تضمن كتابة Unit Tests و Integration Tests عدم حدوث أي انكسارات في التطبيق عند إضافة مميزات جديدة، مما يوفر الوقت والجهد على فريق التطوير...',
        articleBodyEn: 'Writing unit and integration tests guarantees that new feature deployments do not break existing logic, saving development time and reducing software bugs...',
        resources: ['https://vitest.dev/'],
      },
      {
        titleAr: 'التحول الرقمي وأثره على إدارة الشركات والأعمال',
        titleEn: 'Digital Transformation and Its Impact on Enterprise Operations',
        descriptionAr: 'كيف تساهم الأنظمة المخصصة (ERP & CRM) في رفع كفاءة بيئة العمل.',
        descriptionEn: 'How custom ERP and CRM systems enhance operational workflow and growth.',
        articleBodyAr: 'يعد الانتقال من الإدارة التقليدية إلى الأنظمة الرقمية المترابطة خطوة أساسية لأي مؤسسة تسعى للتوسع وحفظ بيانات العملاء والمبيعات بدقة...',
        articleBodyEn: 'Transitioning from legacy operations to integrated software platforms allows organizations to scale sustainably and track performance dynamically...',
        resources: ['https://microservices.io'],
      },
    ],
  })

  console.log('✅ Database successfully seeded with Users, Clients, Projects, Demos, and Articles!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })