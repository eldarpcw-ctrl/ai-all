/* =========================================================
   AI ALL — app.js
   Data, rendering, interactions
   ========================================================= */

// ===================== DATA =====================

const INDUSTRIES = [
  {
    id: 'medicine',
    icon: '🏥',
    name: 'Медицина и здравоохранение',
    desc: 'Диагностика, анализ снимков, разработка лекарств, мониторинг пациентов',
    color: '#22d3ee',
    toolCount: 12,
    tools: ['Med-PaLM 2', 'BioGPT', 'PathAI', 'Aidoc', 'Paige AI', 'IBM Watson Health', 'Butterfly Network', 'DeepMind AlphaFold', 'Tempus AI', 'Suki AI'],
    models: ['Med-PaLM 2 (Google)', 'BioGPT (Microsoft)', 'AlphaFold (DeepMind)', 'CheXNet (Stanford)', 'Whisper (медицина)'],
    practices: [
      {
        title: 'Анализ медицинских снимков',
        desc: 'Автоматическое выявление аномалий на рентгенах, МРТ, КТ',
        prompt: 'Проанализируй данный рентгеновский снимок лёгких. Определи: 1) наличие патологий, 2) степень серьёзности, 3) рекомендации для врача. Формат: структурированный отчёт.'
      },
      {
        title: 'Разработка плана лечения',
        desc: 'ИИ помогает составлять персонализированные планы лечения',
        prompt: 'Пациент, 45 лет, диагноз: [диагноз], анализы: [данные]. Составь оптимальный план лечения с учётом противопоказаний и международных протоколов.'
      },
      {
        title: 'Транскрипция и документация визитов',
        desc: 'Автоматическое создание медицинских записей из аудио приёма',
        prompt: 'Преобрази транскрипцию визита пациента в структурированную медицинскую карту. Выдели: жалобы, анамнез, осмотр, диагноз, назначения.'
      },
      {
        title: 'Предиктивный анализ рисков',
        desc: 'Прогнозирование рисков заболеваний на основе данных',
        prompt: 'На основе данных пациента [возраст, пол, история болезней, образ жизни] оцени риск развития сердечно-сосудистых заболеваний в течение 10 лет и дай рекомендации.'
      }
    ]
  },
  {
    id: 'education',
    icon: '🎓',
    name: 'Образование',
    desc: 'Персонализированное обучение, автопроверка, генерация учебных материалов',
    color: '#a78bfa',
    toolCount: 10,
    tools: ['Khan Academy (Khanmigo)', 'Synthesis', 'Duolingo AI', 'Coursera AI', 'ChatGPT Edu', 'Socratic (Google)', 'Quizlet AI', 'Otter.ai', 'Gradescope', 'Turnitin AI'],
    models: ['GPT-4o (OpenAI)', 'Claude 3.5 (Anthropic)', 'Gemini Pro (Google)', 'Llama 3 (Meta)'],
    practices: [
      {
        title: 'Создание учебных материалов',
        desc: 'Генерация конспектов, тестов, задач по теме',
        prompt: 'Создай полный учебный модуль по теме "[тема]" для [уровень аудитории]: 1) краткий конспект, 2) 10 тестовых вопросов, 3) 3 практических задания, 4) список ресурсов.'
      },
      {
        title: 'Адаптивная проверка знаний',
        desc: 'Система вопросов, адаптирующихся к уровню ученика',
        prompt: 'Проведи мини-экзамен по [теме]. Начни с простых вопросов, усложняй по мере правильных ответов. Давай объяснения на неправильные ответы.'
      },
      {
        title: 'Автоматическая проверка эссе',
        desc: 'Оценка письменных работ по заданным критериям',
        prompt: 'Проверь эссе по критериям: структура (0-25), аргументация (0-25), язык (0-25), оригинальность (0-25). Дай развёрнутую обратную связь по каждому критерию.'
      },
      {
        title: 'Персональный репетитор',
        desc: 'Объяснение сложных концепций простым языком',
        prompt: 'Объясни концепцию [понятие] простым языком для [уровень]. Используй аналогии из повседневной жизни, примеры и задай 2–3 проверочных вопроса в конце.'
      }
    ]
  },
  {
    id: 'finance',
    icon: '💰',
    name: 'Финансы и банкинг',
    desc: 'Алготрейдинг, скоринг, выявление мошенничества, управление рисками',
    color: '#fbbf24',
    toolCount: 14,
    tools: ['Bloomberg GPT', 'FinGPT', 'Stripe Radar', 'Darktrace', 'Kensho', 'AlphaSense', 'Numerai', 'Ayasdi', 'DataRobot', 'H2O.ai'],
    models: ['Bloomberg GPT', 'FinBERT', 'GPT-4 (с финансовыми данными)', 'TimeGPT', 'Chronos (Amazon)'],
    practices: [
      {
        title: 'Анализ финансовых отчётов',
        desc: 'Быстрый разбор балансов, P&L отчётов, прогнозов',
        prompt: 'Проанализируй финансовый отчёт компании [название] за [период]. Определи: 1) ключевые метрики, 2) тренды, 3) риски, 4) сравнение с отраслью. Вывод: инвестиционная привлекательность.'
      },
      {
        title: 'Обнаружение мошенничества',
        desc: 'Выявление аномальных транзакций в режиме реального времени',
        prompt: 'Транзакция: сумма [X], локация [Y], время [Z], история клиента [данные]. Оцени вероятность мошенничества (0-100%) и объясни причины.'
      },
      {
        title: 'Кредитный скоринг',
        desc: 'Оценка кредитоспособности на основе альтернативных данных',
        prompt: 'На основе данных заявителя [данные] рассчитай кредитный скор, выяви ключевые факторы риска и предложи условия кредитования или причины отказа.'
      },
      {
        title: 'Торговые сигналы',
        desc: 'Анализ рынка и генерация торговых рекомендаций',
        prompt: 'Проанализируй рыночные данные [тикер, период]. Применяя технический и фундаментальный анализ, сгенерируй торговые сигналы с обоснованием и уровнями стоп-лоссов.'
      }
    ]
  },
  {
    id: 'marketing',
    icon: '📣',
    name: 'Маркетинг и реклама',
    desc: 'Персонализация, генерация контента, аналитика аудитории, A/B тесты',
    color: '#fb923c',
    toolCount: 16,
    tools: ['Jasper AI', 'Copy.ai', 'Persado', 'Phrasee', 'Midjourney', 'DALL-E 3', 'Runway', 'HubSpot AI', 'Salesforce Einstein', 'Seventh Sense', 'Pattern89', 'Albert AI'],
    models: ['GPT-4o (OpenAI)', 'Claude 3.5 Sonnet', 'Gemini Flash', 'Stable Diffusion XL', 'DALL-E 3'],
    practices: [
      {
        title: 'Написание рекламных текстов',
        desc: 'Создание высококонверсионных копирайтинговых материалов',
        prompt: 'Напиши 5 вариантов рекламного заголовка для [продукт/услуга], целевая аудитория: [описание]. Используй принципы AIDA. Для каждого варианта укажи, какую боль/желание он затрагивает.'
      },
      {
        title: 'Разработка контент-стратегии',
        desc: 'Планирование контента на месяц с темами и форматами',
        prompt: 'Разработай контент-план на месяц для [бренд/тема] в [платформы]. Целевая аудитория: [описание]. Создай 20 идей для постов с хэштегами и форматами.'
      },
      {
        title: 'Анализ целевой аудитории',
        desc: 'Создание детальных персон покупателей',
        prompt: 'Создай 3 детальных портрета потребителя для [продукт]. Для каждого: демография, психография, боли, цели, каналы коммуникации, триггеры покупки.'
      },
      {
        title: 'Оптимизация email-кампаний',
        desc: 'Персонализация и улучшение email-маркетинга',
        prompt: 'Улучши данное письмо для повышения открываемости и кликов. Предложи: 3 альтернативных темы, улучшенный прехедер, оптимизированный CTA, A/B варианты.'
      }
    ]
  },
  {
    id: 'law',
    icon: '⚖️',
    name: 'Юриспруденция',
    desc: 'Анализ контрактов, юридические исследования, предсказание решений суда',
    color: '#f472b6',
    toolCount: 8,
    tools: ['Harvey AI', 'Casetext', 'Kira Systems', 'LexisNexis AI', 'Westlaw Edge', 'Ironclad', 'Luminance', 'Lex Machina'],
    models: ['GPT-4 (юридика)', 'Claude 3 Opus', 'Harvey (on GPT-4)', 'Gemini Pro'],
    practices: [
      {
        title: 'Анализ и проверка контрактов',
        desc: 'Выявление рисков и несоответствий в договорах',
        prompt: 'Проверь данный договор. Выяви: 1) нечёткие формулировки, 2) опасные для клиента условия, 3) отсутствующие важные пункты, 4) несоответствие законодательству. Приоритизируй по степени риска.'
      },
      {
        title: 'Юридический анализ ситуации',
        desc: 'Быстрая оценка юридических рисков и перспектив',
        prompt: 'Ситуация: [описание]. Проанализируй с точки зрения [страна/юрисдикция] права. Укажи: применимые нормы, судебную практику, вероятность исходов, рекомендуемые действия.'
      },
      {
        title: 'Составление правовых документов',
        desc: 'Генерация шаблонов документов по заданным параметрам',
        prompt: 'Составь [вид документа] для следующей ситуации: [условия]. Документ должен соответствовать требованиям [страна], включать все существенные условия и защитные пункты.'
      }
    ]
  },
  {
    id: 'programming',
    icon: '💻',
    name: 'Разработка ПО',
    desc: 'Автодополнение кода, ревью, отладка, генерация тестов, документация',
    color: '#34d399',
    toolCount: 18,
    tools: ['GitHub Copilot', 'Cursor', 'Tabnine', 'Amazon CodeWhisperer', 'Replit AI', 'Sourcegraph Cody', 'JetBrains AI', 'Devin', 'Continue.dev', 'Aider', 'v0.dev', 'Bolt.new'],
    models: ['GPT-4o', 'Claude 3.5 Sonnet', 'Codestral (Mistral)', 'DeepSeek Coder V2', 'Gemini Code Assist', 'Llama 3 Code', 'Qwen2.5-Coder'],
    practices: [
      {
        title: 'Code Review с ИИ',
        desc: 'Автоматическая проверка кода на баги, стиль, безопасность',
        prompt: 'Проведи code review следующего кода. Проверь: 1) баги и логические ошибки, 2) уязвимости безопасности, 3) производительность, 4) читаемость, 5) соответствие SOLID. Дай исправленную версию.'
      },
      {
        title: 'Генерация тестов',
        desc: 'Автоматическое написание unit и integration тестов',
        prompt: 'Напиши полный набор тестов для следующей функции/класса. Включи: happy path, edge cases, error cases. Используй [pytest/jest/etc]. Добейся >90% покрытия.'
      },
      {
        title: 'Рефакторинг и оптимизация',
        desc: 'Улучшение качества и производительности существующего кода',
        prompt: 'Оптимизируй данный код. Цели: 1) уменьши сложность алгоритма, 2) улучши читаемость, 3) удали дублирование, 4) добавь обработку ошибок. Объясни каждое изменение.'
      },
      {
        title: 'Генерация документации',
        desc: 'Автоматическое создание документации из кода',
        prompt: 'Напиши полную документацию для данного API/модуля: описание, параметры, возвращаемые значения, исключения, примеры использования. Формат: JSDoc/docstring.'
      }
    ]
  },
  {
    id: 'creative',
    icon: '🎨',
    name: 'Творчество и дизайн',
    desc: 'Генерация изображений, музыки, видео, шрифтов, логотипов, контента',
    color: '#e879f9',
    toolCount: 20,
    tools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Adobe Firefly', 'Runway ML', 'Suno AI', 'Udio', 'ElevenLabs', 'Luma AI', 'Kling AI', 'Canva AI', 'Figma AI'],
    models: ['Flux.1 (Black Forest Labs)', 'SDXL', 'Midjourney v6', 'Sora (OpenAI)', 'Stable Video Diffusion', 'AudioCraft (Meta)'],
    practices: [
      {
        title: 'Генерация концепт-арта',
        desc: 'Создание визуальных концепций для проектов',
        prompt: 'Создай концепт-арт [объект/сцена]: стиль [cyberpunk/реализм/аниме/etc], цветовая палитра [цвета], настроение [атмосфера], освещение [тип], детализация [высокая]. 4K, детализированный.'
      },
      {
        title: 'Генерация музыки и звука',
        desc: 'Создание фоновой музыки и звуковых эффектов',
        prompt: 'Создай музыкальную тему для [описание сцены/продукта]: жанр [жанр], темп [BPM], инструменты [список], настроение [эмоция], длительность [секунды].'
      },
      {
        title: 'Создание бренд-айдентики',
        desc: 'Разработка визуальной идентичности с помощью ИИ',
        prompt: 'Предложи концепцию брендинга для компании [описание]: 1) ключевые ценности бренда, 2) цветовая схема с кодами, 3) типографика, 4) стиль изображений, 5) промпты для генерации логотипа.'
      }
    ]
  },
  {
    id: 'hr',
    icon: '👥',
    name: 'HR и управление персоналом',
    desc: 'Подбор персонала, адаптация, оценка производительности, обучение',
    color: '#60a5fa',
    toolCount: 10,
    tools: ['Workday AI', 'HireVue', 'Eightfold AI', 'Pymetrics', 'Paradox (Olivia)', 'Leena AI', 'Lattice AI', 'BambooHR AI', 'SeekOut', 'Beamery'],
    models: ['GPT-4o', 'Claude 3.5', 'Gemini Pro', 'Custom fine-tuned HR models'],
    practices: [
      {
        title: 'Скрининг резюме',
        desc: 'Автоматический анализ и ранжирование кандидатов',
        prompt: 'Проанализируй резюме кандидата: [резюме]. Вакансия: [описание]. Оцени соответствие (0-100%), выдели: сильные стороны, пробелы в требованиях, вопросы для интервью, рекомендацию.'
      },
      {
        title: 'Разработка вопросов для интервью',
        desc: 'Создание структурированных интервью под роль',
        prompt: 'Разработай структурированное интервью на [должность]. Создай: 5 поведенческих вопросов (STAR метод), 5 технических вопросов, 3 ситуационных кейса, критерии оценки ответов.'
      },
      {
        title: 'Создание программы адаптации',
        desc: 'Онбординг-план для новых сотрудников',
        prompt: 'Разработай 90-дневный план онбординга для [должность] в [отрасль]. Структура: первая неделя, первый месяц, три месяца. Включи: задачи, KPI, встречи, ресурсы для изучения.'
      }
    ]
  },
  {
    id: 'manufacturing',
    icon: '🏭',
    name: 'Производство и промышленность',
    desc: 'Предиктивное ТО, контроль качества, оптимизация цепочки поставок',
    color: '#94a3b8',
    toolCount: 11,
    tools: ['Siemens Industrial Copilot', 'GE Predix', 'Uptake', 'SparkCognition', 'Sight Machine', 'Augury', 'Aspen Technology', 'C3.ai', 'Cognite', 'Rockwell Automation AI'],
    models: ['GPT-4 Vision', 'Azure AI Vision', 'Google Cloud Vision', 'Custom CNNs', 'Digital Twin AI'],
    practices: [
      {
        title: 'Предиктивное обслуживание',
        desc: 'Прогнозирование поломок оборудования до их возникновения',
        prompt: 'Данные датчиков оборудования [тип] за [период]: [данные]. Определи аномалии, оцени вероятность отказа в ближайшие [период], рекомендуй превентивные меры.'
      },
      {
        title: 'Computer Vision контроль качества',
        desc: 'Автоматическое обнаружение дефектов на производстве',
        prompt: 'Разработай схему системы контроля качества для [продукт] с использованием computer vision. Определи: типы дефектов, параметры обучения модели, пороговые значения, интеграцию в линию.'
      },
      {
        title: 'Оптимизация производственного расписания',
        desc: 'Планирование производства для максимальной эффективности',
        prompt: 'Оптимизируй производственный план. Вводные данные: [заказы, ресурсы, ограничения]. Цели: минимизация простоев, максимизация OEE, соблюдение сроков. Предложи оптимальное расписание.'
      }
    ]
  },
  {
    id: 'retail',
    icon: '🛍️',
    name: 'Торговля и e-commerce',
    desc: 'Рекомендательные системы, управление запасами, чат-боты, персонализация',
    color: '#f97316',
    toolCount: 13,
    tools: ['Shopify AI (Sidekick)', 'Dynamic Yield', 'Algolia AI', 'Salesforce Commerce AI', 'Syte', 'Vue.ai', 'Reflektion', 'Bloomreach', 'Emarsys AI', 'Klevu'],
    models: ['GPT-4o', 'Gemini Flash', 'LLaMA 3 (on-premise)', 'RecBole', 'Two-Tower NN'],
    practices: [
      {
        title: 'Персональные рекомендации',
        desc: 'Создание персонализированных рекомендаций товаров',
        prompt: 'Пользователь [история покупок и просмотров]. Порекомендуй 10 товаров из каталога [данные]. Объясни логику каждой рекомендации и ожидаемый uplift конверсии.'
      },
      {
        title: 'Описания товаров с ИИ',
        desc: 'Генерация убедительных описаний для каждого товара',
        prompt: 'Создай SEO-оптимизированное описание товара: [характеристики]. Включи: заголовок (до 60 символов), кратное описание, детальное описание 200 слов, ключевые слова, список преимуществ.'
      },
      {
        title: 'Прогноз спроса и управление запасами',
        desc: 'Предсказание потребности в товарах для оптимизации закупок',
        prompt: 'Спрогнозируй спрос на [товар] на следующие [период]. Данные: история продаж, сезонность, маркетинговые акции. Рассчитай оптимальный уровень запасов, точку заказа, страховой запас.'
      }
    ]
  },
  {
    id: 'cybersecurity',
    icon: '🛡️',
    name: 'Кибербезопасность',
    desc: 'Обнаружение угроз, анализ вредоносного кода, защита инфраструктуры',
    color: '#ef4444',
    toolCount: 12,
    tools: ['Darktrace', 'CrowdStrike Falcon AI', 'SentinelOne AI', 'Vectra AI', 'Secureworks Taegis', 'Microsoft Security Copilot', 'Google Chronicle', 'Palo Alto Cortex XSIAM', 'Recorded Future', 'ThreatLocker'],
    models: ['Microsoft Security Copilot', 'GPT-4 (security)', 'Claude (Anthropic)', 'Custom anomaly detection models'],
    practices: [
      {
        title: 'Анализ подозрительных логов',
        desc: 'Быстрый анализ системных журналов на наличие угроз',
        prompt: 'Проанализируй системные логи. Выяви: подозрительную активность, потенциальные IOC (индикаторы компрометации), возможные векторы атак, рекомендуемые действия по реагированию.'
      },
      {
        title: 'Reverse Engineering вредоносного кода',
        desc: 'ИИ-помощь в анализе вредоносного ПО',
        prompt: 'Проанализируй данный код/скрипт. Определи: тип вредоносной активности, используемые техники (по MITRE ATT&CK), C2-серверы, механизмы персистентности, способы обнаружения и нейтрализации.'
      },
      {
        title: 'Threat Intelligence отчёт',
        desc: 'Создание отчётов об угрозах по данным с различных источников',
        prompt: 'На основе данных угроз за [период] составь TI-отчёт: ключевые угрозы, атакующие группировки, уязвимые системы, рекомендации по митигации, приоритизированный план защиты.'
      }
    ]
  },
  {
    id: 'science',
    icon: '🔬',
    name: 'Наука и исследования',
    desc: 'Анализ данных, структуры белков, синтез литературы, разработка гипотез',
    color: '#4ade80',
    toolCount: 9,
    tools: ['AlphaFold 3', 'Elicit', 'Semantic Scholar', 'Consensus AI', 'Scite.ai', 'Research Rabbit', 'Iris.ai', 'Explainpaper', 'Scholarcy'],
    models: ['AlphaFold 3 (Google DeepMind)', 'Galactica (Meta)', 'GPT-4 (research)', 'Claude 3 Opus', 'Gemini Ultra'],
    practices: [
      {
        title: 'Систематический обзор литературы',
        desc: 'Анализ и синтез научных публикаций по теме',
        prompt: 'Проведи систематический обзор научной литературы по теме "[тема]". Найди ключевые исследования, выяви консенсус и противоречия, резюмируй методологии, предложи gaps для дальнейших исследований.'
      },
      {
        title: 'Анализ экспериментальных данных',
        desc: 'Статистический анализ и интерпретация результатов',
        prompt: 'Проанализируй экспериментальные данные: [данные]. Проведи статистический анализ, визуализируй результаты, проверь гипотезы, интерпретируй значимость результатов в контексте области.'
      },
      {
        title: 'Написание научных текстов',
        desc: 'Помощь в написании академических статей и грантов',
        prompt: 'Помоги написать [abstract/introduction/discussion] для статьи на тему [тема]. Структура, научный стиль, impactful statements, правильное цитирование ключевых работ.'
      }
    ]
  }
];

const AI_MODELS = [
  { name: 'GPT-4o', company: 'OpenAI', icon: '🟢', type: 'multimodal', badge: 'Флагман', color: '#10a37f', desc: 'Самая мощная мультимодальная модель OpenAI. Обрабатывает текст, изображения, аудио в реальном времени.', tags: ['Текст', 'Изображения', 'Аудио', 'API'] },
  { name: 'Claude 3.5 Sonnet', company: 'Anthropic', icon: '🟤', type: 'text', badge: 'Топ кода', color: '#cc785c', desc: 'Лучшая модель для написания кода, анализа и длинных документов. 200K токенов контекста.', tags: ['Код', 'Анализ', 'Документы', 'API'] },
  { name: 'Gemini 2.0 Flash', company: 'Google', icon: '🔵', type: 'multimodal', badge: 'Быстрый', color: '#4285f4', desc: 'Быстрая и эффективная мультимодальная модель от Google с огромным окном контекста 1M токенов.', tags: ['Мультимодальный', 'Быстрый', 'Большой контекст'] },
  { name: 'Llama 3.3 70B', company: 'Meta', icon: '🦙', type: 'text', badge: 'Open Source', color: '#0668e1', desc: 'Мощнейшая открытая языковая модель от Meta. Запускается локально, бесплатна для коммерческого использования.', tags: ['Open Source', 'Локально', 'Бесплатно'] },
  { name: 'Midjourney v6', company: 'Midjourney', icon: '🎨', type: 'image', badge: 'Лучший арт', color: '#e879f9', desc: 'Лучший генератор изображений для художественного и коммерческого контента. Реализм и художественность.', tags: ['Изображения', 'Арт', 'Коммерческий'] },
  { name: 'Flux.1 Pro', company: 'Black Forest Labs', icon: '⚡', type: 'image', badge: 'Фотореализм', color: '#f59e0b', desc: 'Передовой генератор изображений с фотореалистичным качеством. Превосходит Stable Diffusion по качеству.', tags: ['Изображения', 'Фото', 'Реализм'] },
  { name: 'DALL-E 3', company: 'OpenAI', icon: '🖼️', type: 'image', badge: 'ChatGPT', color: '#10a37f', desc: 'Встроен в ChatGPT. Лучше понимает инструкции и создаёт точные изображения по описанию.', tags: ['Изображения', 'ChatGPT', 'API'] },
  { name: 'Suno AI v4', company: 'Suno', icon: '🎵', type: 'audio', badge: 'Музыка', color: '#f472b6', desc: 'Генератор музыки с вокалом по текстовому описанию. Создаёт полноценные треки в любом жанре.', tags: ['Музыка', 'Вокал', 'Треки'] },
  { name: 'ElevenLabs v2', company: 'ElevenLabs', icon: '🎙️', type: 'audio', badge: 'Голос', color: '#a78bfa', desc: 'Лучший синтез речи с клонированием голоса. 29+ языков, эмоции, естественная интонация.', tags: ['TTS', 'Клонирование', 'Многоязычный'] },
  { name: 'Whisper Large v3', company: 'OpenAI', icon: '🎤', type: 'audio', badge: 'STT', color: '#6366f1', desc: 'Лучший открытый движок распознавания речи. Поддерживает 99 языков, высокая точность.', tags: ['STT', 'Open Source', '99 языков'] },
  { name: 'Sora', company: 'OpenAI', icon: '🎬', type: 'video', badge: 'Новинка', color: '#10a37f', desc: 'Революционный генератор видео até 1 минуты. HD-качество, физически достоверные сцены.', tags: ['Видео', 'HD', 'Физика'] },
  { name: 'Runway Gen-3', company: 'Runway', icon: '🎥', type: 'video', badge: 'Видео', color: '#22d3ee', desc: 'Профессиональный генератор видео из текста и изображений. Используется в кино и рекламе.', tags: ['Видео', 'Кино', 'Реклама'] },
  { name: 'DeepSeek Coder V2', company: 'DeepSeek', icon: '🐋', type: 'code', badge: 'Бесплатно', color: '#3b82f6', desc: 'Мощная модель для написания кода. Конкурирует с GPT-4, доступна бесплатно. 338B параметров.', tags: ['Код', 'Бесплатно', 'On-premise'] },
  { name: 'Codestral', company: 'Mistral', icon: '💫', type: 'code', badge: 'Быстрый код', color: '#6c63ff', desc: 'Специализированная кодовая модель Mistral. Очень быстрая autocomplete, 80+ языков программирования.', tags: ['Код', 'Autocomplete', 'Быстрый'] },
  { name: 'Qwen2.5-Coder', company: 'Alibaba', icon: '🐼', type: 'code', badge: 'Open Source', color: '#f97316', desc: 'Топовая открытая кодовая модель. Превосходит многие коммерческие модели, запускается локально.', tags: ['Код', 'Open Source', 'Локально'] },
  { name: 'Gemini Flash 2.0', company: 'Google', icon: '✨', type: 'multimodal', badge: 'Агент', color: '#4285f4', desc: 'Оптимизирован для агентных задач и реального времени. Поддерживает инструменты и длинный контекст.', tags: ['Агенты', 'Реальное время', 'Инструменты'] },
  { name: 'o1 / o3-mini', company: 'OpenAI', icon: '🧮', type: 'text', badge: 'Рассуждение', color: '#10a37f', desc: 'Модели с усиленным рассуждением (chain-of-thought). Лучшие для математики, логики, науки.', tags: ['Рассуждение', 'Математика', 'Наука'] },
  { name: 'Grok 2', company: 'xAI', icon: '🚀', type: 'multimodal', badge: 'X.com', color: '#1da1f2', desc: 'ИИ от Илона Маска с доступом к реальному времени через X (Twitter). Мультимодальный с FLUX изображениями.', tags: ['Реал-тайм', 'X/Twitter', 'Мультимодальный'] }
];

const PRACTICES_BY_CATEGORY = {
  'Все отрасли': [
    { icon: '⚡', title: 'Автоматизация задач', industry: 'Любая отрасль', desc: 'ИИ-агенты для рутинных бизнес-задач', steps: ['Определи повторяющиеся задачи', 'Выбери подходящий ИИ-инструмент', 'Настрой автоматизацию с Make/n8n', 'Контролируй и улучшай процесс'] },
    { icon: '📊', title: 'Анализ данных с ИИ', industry: 'Любая отрасль', desc: 'Превращение сырых данных в инсайты', steps: ['Подготовь и очисти данные', 'Загрузи в ChatGPT/Claude с контекстом', 'Запроси анализ и визуализацию', 'Действуй на основе инсайтов'] },
    { icon: '📝', title: 'Создание контента', industry: 'Любая отрасль', desc: 'Массовое создание качественного контента', steps: ['Создай шаблон промпта для твоей ниши', 'Используй контент-план как входные данные', 'Генерируй и редактируй с ИИ', 'Публикуй через автоматизацию'] },
    { icon: '🤝', title: 'ИИ-ассистент для команды', industry: 'Любая отрасль', desc: 'Создание внутреннего корпоративного ИИ', steps: ['Собери базу знаний компании', 'Настрой RAG-систему', 'Разверни для команды (Chatbot UI)', 'Обучи сотрудников работе с системой'] },
  ],
  'Промпт-инжиниринг': [
    { icon: '🎯', title: 'Chain-of-Thought промпты', industry: 'Промпты', desc: 'Пошаговое рассуждение для сложных задач', steps: ['Добавь "Рассуждай пошагово" в промпт', 'Просите показывать промежуточные шаги', 'Проверяй логику на каждом шаге', 'Итерируй для улучшения качества'] },
    { icon: '🔧', title: 'Few-Shot обучение', industry: 'Промпты', desc: 'Обучение модели на нескольких примерах', steps: ['Подготовь 3-5 качественных примеров', 'Формат: "Пример 1: [вход] → [выход]"', 'Добавь свою задачу после примеров', 'Проверь соответствие формату'] },
    { icon: '🎭', title: 'Role Prompting', industry: 'Промпты', desc: 'Назначение роли для лучших результатов', steps: ['Определи нужную экспертизу', '"Ты — эксперт в [область] с [годы] опытом"', 'Добавь контекст задачи', 'Уточни формат ответа'] },
    { icon: '🔄', title: 'Итеративный рефайнинг', industry: 'Промпты', desc: 'Улучшение ответов через диалог', steps: ['Начни с базового запроса', 'Оцени результат', '"Улучши [конкретный аспект]"', 'Повторяй до получения нужного результата'] },
  ],
  'ИИ-агенты': [
    { icon: '🤖', title: 'Создание AI-агента', industry: 'Агенты', desc: 'Автономный агент для выполнения задач', steps: ['Определи задачи и инструменты агента', 'Выбери платформу: LangChain/CrewAI/AutoGen', 'Настрой LLM и tools', 'Тестируй и отлаживай поведение'] },
    { icon: '🌐', title: 'Web Browsing агент', industry: 'Агенты', desc: 'Агент для работы с веб-ресурсами', steps: ['Настрой браузерные инструменты', 'Дай задачу по исследованию', 'Агент ищет, читает, анализирует', 'Получи структурированный отчёт'] },
    { icon: '📁', title: 'Агент для работы с файлами', industry: 'Агенты', desc: 'Обработка и анализ большого числа документов', steps: ['Подключи файловую систему', 'Настрой парсинг форматов (PDF/Excel/Word)', 'Агент читает и извлекает данные', 'Синтезирует результаты в отчёт'] },
  ],
  'RAG & Базы знаний': [
    { icon: '📚', title: 'Построение Knowledge Base', industry: 'RAG', desc: 'Корпоративная база знаний с ИИ-поиском', steps: ['Собери документы компании', 'Разбей на chunks (500-1000 токенов)', 'Создай эмбеддинги и векторную БД', 'Подключи LLM для ответов на вопросы'] },
    { icon: '🔍', title: 'Умный поиск по документам', industry: 'RAG', desc: 'Семантический поиск вместо ключевых слов', steps: ['Индексируй документы через эмбеддинги', 'Настрой гибридный поиск BM25+vector', 'Добавь reranker для точности', 'Интегрируй в интерфейс'] },
  ]
};

// ===================== STATE =====================
let activeIndustry = null;
let activePracticeTab = 'Все отрасли';

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderIndustries();
  renderModels('all');
  renderPracticesTabs();
  renderPractices('Все отрасли');
  initScrollEffects();
  initHeader();
  initCounters();
  initMobileMenu();
  initModelFilter();
  initDetailPanel();
});

// ===================== PARTICLES =====================
function initParticles() {
  const container = document.getElementById('bgParticles');
  const colors = ['#6c63ff', '#22d3ee', '#f472b6', '#34d399', '#a78bfa'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 20 + 15}s;
      animation-delay: ${Math.random() * 20}s;
    `;
    container.appendChild(p);
  }
}

// ===================== INDUSTRIES =====================
function renderIndustries() {
  const grid = document.getElementById('industryGrid');
  grid.innerHTML = INDUSTRIES.map((ind, i) => `
    <div class="industry-card reveal" style="--card-color:${ind.color}; animation-delay:${i * 0.05}s"
         data-id="${ind.id}" onclick="openIndustry('${ind.id}')">
      <span class="industry-icon">${ind.icon}</span>
      <div class="industry-name">${ind.name}</div>
      <div class="industry-desc">${ind.desc}</div>
      <div class="industry-count">${ind.toolCount}+ инструментов</div>
    </div>
  `).join('');
}

function openIndustry(id) {
  const ind = INDUSTRIES.find(i => i.id === id);
  if (!ind) return;
  activeIndustry = id;

  const content = document.getElementById('detailContent');
  content.innerHTML = `
    <div class="detail-header">
      <span class="detail-icon">${ind.icon}</span>
      <div class="detail-title">${ind.name}</div>
      <div class="detail-subtitle">${ind.desc}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Инструменты и платформы</div>
      <div>${ind.tools.map(t => `<span class="tool-tag">🔧 ${t}</span>`).join('')}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Рекомендуемые модели ИИ</div>
      <div>${ind.models.map(m => `<span class="tool-tag">🤖 ${m}</span>`).join('')}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Готовые практики</div>
      ${ind.practices.map((p, i) => `
        <div class="practice-item">
          <div class="practice-item-title">
            <span class="num">${i + 1}</span> ${p.title}
          </div>
          <div class="practice-item-desc">${p.desc}</div>
          <div class="prompt-box">${p.prompt}</div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('detailOverlay').classList.add('active');
  document.getElementById('detailPanel').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===================== DETAIL PANEL =====================
function initDetailPanel() {
  document.getElementById('detailClose').onclick = closeDetail;
  document.getElementById('detailOverlay').onclick = closeDetail;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDetail(); });
}

function closeDetail() {
  document.getElementById('detailOverlay').classList.remove('active');
  document.getElementById('detailPanel').classList.remove('active');
  document.body.style.overflow = '';
  activeIndustry = null;
}

// ===================== MODELS =====================
function renderModels(filter) {
  const grid = document.getElementById('modelsGrid');
  const filtered = filter === 'all' ? AI_MODELS : AI_MODELS.filter(m => m.type === filter);
  grid.innerHTML = filtered.map(m => `
    <div class="model-card reveal" style="--model-color:${m.color}">
      <div class="model-top">
        <div class="model-logo" style="background:${m.color}22">${m.icon}</div>
        <div class="model-info">
          <div class="model-name">${m.name}</div>
          <div class="model-company">${m.company}</div>
        </div>
        <div class="model-badge">${m.badge}</div>
      </div>
      <div class="model-desc">${m.desc}</div>
      <div class="model-tags">${m.tags.map(t => `<span class="model-tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');
  observeReveal();
}

function initModelFilter() {
  document.getElementById('modelFilter').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderModels(btn.dataset.filter);
  });
}

// ===================== PRACTICES =====================
function renderPracticesTabs() {
  const tabs = document.getElementById('practicesTabs');
  const icons = { 'Все отрасли': '🌐', 'Промпт-инжиниринг': '✍️', 'ИИ-агенты': '🤖', 'RAG & Базы знаний': '📚' };
  tabs.innerHTML = Object.keys(PRACTICES_BY_CATEGORY).map(cat => `
    <button class="practice-tab ${cat === activePracticeTab ? 'active' : ''}" data-cat="${cat}">
      ${icons[cat] || '📌'} ${cat}
    </button>
  `).join('');
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.practice-tab');
    if (!btn) return;
    activePracticeTab = btn.dataset.cat;
    document.querySelectorAll('.practice-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPractices(activePracticeTab);
  });
}

function renderPractices(category) {
  const container = document.getElementById('practicesContent');
  const practices = PRACTICES_BY_CATEGORY[category] || [];
  container.innerHTML = practices.map(p => `
    <div class="practice-card reveal">
      <div class="practice-card-header">
        <div class="practice-card-icon">${p.icon}</div>
        <div>
          <div class="practice-card-title">${p.title}</div>
          <div class="practice-card-industry">${p.industry}</div>
        </div>
      </div>
      <div class="practice-card-desc">${p.desc}</div>
      <ul class="practice-steps">
        ${p.steps.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>
  `).join('');
  observeReveal();
}

// ===================== SCROLL & ANIMATIONS =====================
function initScrollEffects() {
  observeReveal();
}

function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===================== COUNTERS =====================
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(update);
}

// ===================== MOBILE MENU =====================
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = nav.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}
