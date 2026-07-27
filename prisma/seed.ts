import { ProjectCategory, ProjectStatus, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

async function main() {
  console.log('🧹 Clearing existing database records...')

  // تنظيف البيانات بالتسلسل لتجنب مشاكل الـ Foreign Keys
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

  // 1. إنشاء المستخدمين (أعضاء الفريق والعملاء)
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

  await prisma.user.create({
    data: {
      name: 'محمود حسن',
      email: 'mahmoud.dev@flux-agency.com',
      emailVerified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      role: Role.programmer,
      mobile: '+201000000002',
    },
  })

  await prisma.user.create({
    data: {
      name: 'سارة خليل',
      email: 'sara.design@flux-agency.com',
      emailVerified: true,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      role: Role.designer,
      mobile: '+201000000003',
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

  const userClientProduce = await prisma.user.create({
    data: {
      name: 'الحاج مصطفى العاصمي',
      email: 'mostafa@fakahany-aasima.com',
      emailVerified: true,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      role: Role.user,
      mobile: '+201111111102',
    },
  })

  console.log('🌱 Seeding Services...')

  // 2. إنشاء الخدمات التشغيلية
  const devService = await prisma.service.create({
    data: {
      nameAr: 'تطوير المنصات وتطبيقات الويب',
      nameEn: 'Web Platform & App Development',
      category: ProjectCategory.development,
      description: 'بناء منصات متكاملة وحلول ERP وتطبيقات Next.js وPWA عالية الأداء.',
    },
  })

  const marketingService = await prisma.service.create({
    data: {
      nameAr: 'الحملات الإعلانية والتسويق الرقمي',
      nameEn: 'Digital Marketing & Paid Ads',
      category: ProjectCategory.marketing,
      description: 'إدارة الحملات الإعلانية واستراتيجيات النمو وتوجيه العملاء المحتملين.',
    },
  })

  const designService = await prisma.service.create({
    data: {
      nameAr: 'الهوية البصرية وتصميم المتاجر',
      nameEn: 'Branding & Store Interior Design',
      category: ProjectCategory.design,
      description: 'تصميم الهويات التجارية والتصاميم المعمارية والمعارض الثلاثية الأبعاد.',
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
      tel: '+20133200100',
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

  const clientProduceShop = await prisma.client.create({
    data: {
      companyName: 'فاكهاني العاصمة',
      industry: 'تجارة التجزئة للخضراوات والفواكه',
      logo: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300',
      taxId: '400-500-600',
      tel: '+20482200200',
      website: 'https://fakahany-aasima.com',
      city: 'شبين الكوم',
      state: 'المنوفية',
      country: 'مصر',
      members: {
        create: [
          {
            userId: userClientProduce.id,
            position: 'مالك المؤسسة',
            isPrimary: true,
          },
        ],
      },
    },
  })

  console.log('🌱 Seeding Projects & Linked Demos...')

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
        create: [
          { serviceId: devService.id },
          { serviceId: marketingService.id },
        ],
      },
      metadata: {
        techStack: ['Next.js 16', 'PostgreSQL', 'Prisma', 'Tailwind CSS 4', 'Mastra AI'],
        targetAudience: 'B2C / B2B Meat Distributors',
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
            'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000',
          ],
          liveUrl: 'https://balady-demo.flux-agency.com',
          isFeatured: true,
        },
      },
    },
  })

  // 5. إنشاء مشروع فاكهاني العاصمة وربطه بـ Demo
  await prisma.project.create({
    data: {
      code: 'FKH-2026',
      title: 'الهوية البصرية وتطبيق الطلب السريع لفاكهاني العاصمة',
      description: 'إعادة هيكلة الهوية الميدانية وإطلاق منصة طلب سريع لتوصيل الخضراوات والفواكه الطازجة.',
      clientId: clientProduceShop.id,
      status: ProjectStatus.completed,
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-05-10'),
      isArchived: true,
      services: {
        create: [
          { serviceId: devService.id },
          { serviceId: designService.id },
        ],
      },
      demo: {
        create: {
          slug: 'fakahany-el-aasima-rebranding',
          titleAr: 'تطوير هوية ومتجر فاكهاني العاصمة',
          titleEn: 'Fakahany El Aasima E-Commerce & Brand Redesign',
          category: ProjectCategory.design,
          tags: ['Branding', 'PWA', 'React', 'UI/UX'],
          descriptionAr: 'تصميم هوية بصرية مبهجة تعكس جودة المنتجات الطازجة مع بناء Progressive Web App للطلب السريع.',
          descriptionEn: 'A vibrant brand identity redesign paired with a lightning-fast Progressive Web App built for quick local delivery.',
          painPointsAr: 'اعتماد المتجر على الطلبات الهاتفية الشفهية مما تسبب في بطء وتداخل مواعيد التوصيل.',
          painPointsEn: 'Over-reliance on phone orders causing delivery scheduling delays and inaccuracies.',
          solutionsAr: 'بناء تطبيق PWA بواجهة عصرية تعتمد على الصور عالية الجودة وخيار السلة السريعة بنقرة واحدة.',
          solutionsEn: 'Constructed an intuitive PWA with rich imagery and single-tap checkout logic.',
          mainImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1200',
          images: [
            'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1573248197036-8a56c8a24322?auto=format&fit=crop&q=80&w=1000',
          ],
          liveUrl: 'https://fakahany.flux-agency.com',
          isFeatured: true,
        },
      },
    },
  })

  console.log('🌱 Seeding Standalone Demos...')

  // 6. إنشاء نماذج Demo قائمة بذاتها (غير مرتبطة بـ Project) للمعاينة المباشرة
  await prisma.demo.create({
    data: {
      slug: 'modern-furniture-ecommerce-demo',
      titleAr: 'متجر الأثاث والتصميم الداخلي العصري',
      titleEn: 'Modern Furniture Store & Interior Showcase Demo',
      category: ProjectCategory.development,
      tags: ['Next.js 16', 'Zustand', 'Tailwind CSS 4', 'PWA', '3D View'],
      descriptionAr: 'نموذج عرض تفاعلي لمتجر أثاث مودرن يتيح تصفح قطع الأثاث واستعراض الغرف مع خاصية تجميع الطلبات وإدارتها.',
      descriptionEn: 'An interactive demo store for modern furniture and interior products with customizable room bundles and smooth cart state management.',
      painPointsAr: 'صعوبة تخيل العملاء للأثاث داخل منازلهم وضياع تفاصيل الخامات أثناء التصفح التقليدي.',
      painPointsEn: 'Customers struggle to visualize furniture products in real spaces using static images.',
      solutionsAr: 'توفير استعراض بدقة عالية مع معالجة سريعة لحالات السلة وإتاحة فلترة سريعة حساسة للتصنيف.',
      solutionsEn: 'Delivered high-definition asset views, fast filtering, and seamless Zustand state persistence.',
      mainImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
      images: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000',
      ],
      liveUrl: 'https://furniture-demo.flux-agency.com',
      isFeatured: true,
    },
  })

  await prisma.demo.create({
    data: {
      slug: 'digital-marketing-campaign-dashboard-demo',
      titleAr: 'لوحة تحكم وتتبع حملات التسويق الرقمي',
      titleEn: 'Digital Marketing Campaign Analytics Demo',
      category: ProjectCategory.marketing,
      tags: ['Meta Ads', 'Google Ads', 'Analytics', 'Recharts'],
      descriptionAr: 'نموذج لوحة تحليلية لعرض نتائج ومؤشرات أداء الحملات الإعلانية ومعدل التحويل (ROAS).',
      descriptionEn: 'A demo analytics dashboard for monitoring advertising campaigns performance, user acquisition costs, and conversion rates.',
      mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      ],
      liveUrl: 'https://marketing-dashboard.flux-agency.com',
      isFeatured: false,
    },
  })

  console.log('✅ Database successfully seeded!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })