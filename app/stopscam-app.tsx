'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Database,
  FileText,
  Globe2,
  LockKeyhole,
  Phone,
  PhoneCall,
  PhoneOff,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  UserRound,
  UsersRound,
  Wifi,
  X,
} from 'lucide-react'

type Language = 'ru' | 'kk' | 'en'
type Scenario = 'bank' | 'relative' | 'unknown'
type Screen = 'home' | 'check' | 'reports' | 'incoming' | 'after-call' | 'active-call' | 'report-form'
type Risk = 'danger' | 'caution' | 'none'

const translations = {
  en: {
    greeting: 'Stay one step ahead', subtitle: 'A little check can protect a lot.', checkTitle: 'Check a number', checkDescription: 'Look up community reports before you call back.', placeholder: '+7 (___) ___-__-__', checkButton: 'Check number', testTitle: 'Try a live call demo', testDescription: 'Choose a scenario and see the warning before answering.', bank: 'Bank', relative: 'Relative', unknown: 'Unknown', testCall: 'Test incoming call', recent: 'Recent checks', seeAll: 'See all', noRecent: 'Your recent checks will appear here.', home: 'Home', check: 'Check', reports: 'Reports', today: 'Today', checking: 'Checking this number', foundDanger: 'High risk', foundCaution: 'Be cautious', noReports: 'No reports found', reportCount: 'community reports', reportedAs: 'Most reported as', smsTag: 'SMS code request', transferTag: 'Safe account transfer', relativeTag: 'Impersonating a relative', noData: 'This number has no community reports yet. That does not confirm it is safe.', advice: 'What to do', callBank: 'Hang up and call your bank using the number on your card.', neverCode: 'Never share an SMS code — not even with someone claiming to be from your bank.', safeAccount: 'Do not transfer money to a “safe account”. Banks never ask you to do this.', verifyRelative: 'Call your relative back on their old, saved number. Ask a question only they would know.', unknownAdvice: 'No reports have been found. Verify who is calling before sharing information.', incoming: 'INCOMING CALL', fromBank: 'Bank security', fromRelative: 'A family member', fromUnknown: 'Unknown caller', beforeAnswer: 'Warning shown before you answer', decline: 'Decline', answer: 'Answer', screening: 'Stopscam call screening', screened: 'Caller checked against community reports', active: 'Call in progress', endCall: 'End call', postCall: 'What would you like to do?', block: 'Block number', report: 'Report as scam', doNothing: 'Do nothing', backHome: 'Back to home', reportTitle: 'Report this number', reportHint: 'Choose the closest reason. Your report helps warn others.', submitReport: 'Submit report', reportSent: 'Report added to this demo', myReports: 'My reports', noReportsYet: 'No reports submitted yet', localDemo: 'Saved in this demo only', status: 'Prototype status', demoOnly: 'Demo data · not a live caller lookup', architecture: 'How Stopscam works', phoneLayer: 'On your phone', phoneDetails: 'Incoming call → offline cache → warning', networkLayer: 'Secure connection', networkDetails: 'HTTPS request and response', cloudLayer: 'Cloud service', cloudDetails: 'API checks reports in PostgreSQL', planned: 'Planned architecture', currentPrototype: 'This prototype simulates the phone and cloud lookup with demo numbers. It does not intercept real calls or send reports to a server.', close: 'Close', resultLabel: 'Lookup result', safeNotImplied: 'No reports does not mean safe', prototype: 'Interactive prototype', language: 'Language', clear: 'Clear', notSure: 'Not sure? Hang up and contact the person or organisation directly.', minutesAgo: '2 min ago', watchOut: 'Take a moment before you answer.', scamAlert: 'Known scam pattern', cautionAlert: 'Unverified caller', noReportsCall: 'No reports found', tagBank: 'SMS code', tagTransfer: 'Money transfer', tagFamily: 'Fake relative', chooseReason: 'Report reason', verified: 'No contact list or call audio is collected.',
  },
  ru: {
    greeting: 'Будьте на шаг впереди', subtitle: 'Одна проверка может защитить от потерь.', checkTitle: 'Проверить номер', checkDescription: 'Посмотрите жалобы сообщества перед обратным звонком.', placeholder: '+7 (___) ___-__-__', checkButton: 'Проверить номер', testTitle: 'Попробуйте тестовый звонок', testDescription: 'Выберите сценарий и увидьте предупреждение до ответа.', bank: 'Банк', relative: 'Родственник', unknown: 'Неизвестный', testCall: 'Тест входящего звонка', recent: 'Недавние проверки', seeAll: 'Все', noRecent: 'Здесь появятся недавние проверки.', home: 'Главная', check: 'Проверка', reports: 'Жалобы', today: 'Сегодня', checking: 'Проверка номера', foundDanger: 'Высокий риск', foundCaution: 'Будьте осторожны', noReports: 'Жалоб не найдено', reportCount: 'жалоб сообщества', reportedAs: 'Чаще всего отмечен как', smsTag: 'Запрос SMS-кода', transferTag: 'Перевод на «безопасный счёт»', relativeTag: 'Выдаёт себя за родственника', noData: 'Жалоб на этот номер пока нет. Это не подтверждает его безопасность.', advice: 'Как поступить', callBank: 'Завершите звонок и перезвоните в банк по номеру с карты.', neverCode: 'Никому не сообщайте код из SMS — даже тому, кто представился сотрудником банка.', safeAccount: 'Не переводите деньги на «безопасный счёт». Банки так не просят.', verifyRelative: 'Перезвоните родственнику по сохранённому старому номеру. Задайте личный вопрос.', unknownAdvice: 'Жалоб не найдено. Уточните, кто звонит, прежде чем сообщать информацию.', incoming: 'ВХОДЯЩИЙ ЗВОНОК', fromBank: 'Служба безопасности банка', fromRelative: 'Член семьи', fromUnknown: 'Неизвестный номер', beforeAnswer: 'Предупреждение до ответа на звонок', decline: 'Отклонить', answer: 'Ответить', screening: 'Проверка Stopscam', screened: 'Номер сверён с жалобами сообщества', active: 'Идёт разговор', endCall: 'Завершить звонок', postCall: 'Что вы хотите сделать?', block: 'Заблокировать номер', report: 'Пожаловаться', doNothing: 'Ничего не делать', backHome: 'На главную', reportTitle: 'Пожаловаться на номер', reportHint: 'Выберите причину. Жалоба поможет предупредить других.', submitReport: 'Отправить жалобу', reportSent: 'Жалоба добавлена в демо', myReports: 'Мои жалобы', noReportsYet: 'Пока нет отправленных жалоб', localDemo: 'Сохранено только в этом демо', status: 'Статус прототипа', demoOnly: 'Демо-данные · не реальная проверка звонящего', architecture: 'Как работает Stopscam', phoneLayer: 'На телефоне', phoneDetails: 'Входящий звонок → кэш → предупреждение', networkLayer: 'Защищённое соединение', networkDetails: 'Запрос и ответ по HTTPS', cloudLayer: 'Облачный сервис', cloudDetails: 'API проверяет жалобы в PostgreSQL', planned: 'Планируемая архитектура', currentPrototype: 'Этот прототип имитирует телефон и облачную проверку на демо-номерах. Он не перехватывает реальные звонки и не отправляет жалобы на сервер.', close: 'Закрыть', resultLabel: 'Результат проверки', safeNotImplied: 'Нет жалоб — не значит безопасно', prototype: 'Интерактивный прототип', language: 'Язык', clear: 'Очистить', notSure: 'Сомневаетесь? Завершите звонок и свяжитесь с организацией напрямую.', minutesAgo: '2 мин назад', watchOut: 'Не торопитесь отвечать.', scamAlert: 'Известная схема мошенничества', cautionAlert: 'Звонящий не подтверждён', noReportsCall: 'Жалоб не найдено', tagBank: 'SMS-код', tagTransfer: 'Перевод денег', tagFamily: 'Подмена родственника', chooseReason: 'Причина жалобы', verified: 'Контакты и аудио звонков не собираются.',
  },
  kk: {
    greeting: 'Алаяқтардан бір қадам алда болыңыз', subtitle: 'Бір тексеріс көп нәрседен қорғайды.', checkTitle: 'Нөмірді тексеру', checkDescription: 'Қайта қоңырау шалмас бұрын шағымдарды қараңыз.', placeholder: '+7 (___) ___-__-__', checkButton: 'Нөмірді тексеру', testTitle: 'Қоңырау көрінісін сынау', testDescription: 'Сценарийді таңдап, жауап бермей тұрып ескертуді көріңіз.', bank: 'Банк', relative: 'Туыс', unknown: 'Белгісіз', testCall: 'Кіріс қоңырауын сынау', recent: 'Соңғы тексерулер', seeAll: 'Барлығы', noRecent: 'Соңғы тексерулер осы жерде көрсетіледі.', home: 'Басты бет', check: 'Тексеру', reports: 'Шағымдар', today: 'Бүгін', checking: 'Нөмірді тексеру', foundDanger: 'Қауіп жоғары', foundCaution: 'Абай болыңыз', noReports: 'Шағымдар табылмады', reportCount: 'қауымдастық шағымы', reportedAs: 'Көбіне мынадай деп белгіленген', smsTag: 'SMS кодын сұрау', transferTag: '«Қауіпсіз шотқа» аудару', relativeTag: 'Туысы болып хабарласу', noData: 'Бұл нөмірге әзірге шағым жоқ. Бұл оның қауіпсіз екенін білдірмейді.', advice: 'Не істеу керек', callBank: 'Қоңырауды аяқтап, картадағы нөмір арқылы банкке хабарласыңыз.', neverCode: 'SMS кодын ешкімге айтпаңыз — өзін банк қызметкері деп таныстырса да.', safeAccount: 'Ақшаны «қауіпсіз шотқа» аудармаңыз. Банктер мұны сұрамайды.', verifyRelative: 'Туысыңызға бұрыннан сақталған ескі нөміріне қайта қоңырау шалыңыз.', unknownAdvice: 'Шағым табылмады. Ақпарат бермес бұрын қоңырау шалушыны анықтаңыз.', incoming: 'КІРІС ҚОҢЫРАУЫ', fromBank: 'Банк қауіпсіздік қызметі', fromRelative: 'Отбасы мүшесі', fromUnknown: 'Белгісіз нөмір', beforeAnswer: 'Жауап бермей тұрып көрсетілген ескерту', decline: 'Қабылдамау', answer: 'Жауап беру', screening: 'Stopscam тексеруі', screened: 'Нөмір қауымдастық шағымдарымен салыстырылды', active: 'Қоңырау жүріп жатыр', endCall: 'Қоңырауды аяқтау', postCall: 'Енді не істегіңіз келеді?', block: 'Нөмірді бұғаттау', report: 'Шағым жіберу', doNothing: 'Ештеңе істемеу', backHome: 'Басты бетке', reportTitle: 'Нөмірге шағым жіберу', reportHint: 'Себебін таңдаңыз. Бұл басқаларға ескертуге көмектеседі.', submitReport: 'Шағым жіберу', reportSent: 'Шағым демоға қосылды', myReports: 'Менің шағымдарым', noReportsYet: 'Әзірге шағым жіберілмеді', localDemo: 'Тек осы демода сақталған', status: 'Прототип күйі', demoOnly: 'Демо деректері · нақты қоңырау тексерісі емес', architecture: 'Stopscam қалай жұмыс істейді', phoneLayer: 'Телефонда', phoneDetails: 'Кіріс қоңырау → кэш → ескерту', networkLayer: 'Қорғалған байланыс', networkDetails: 'HTTPS арқылы сұрау және жауап', cloudLayer: 'Бұлттық қызмет', cloudDetails: 'API шағымдарды PostgreSQL ішінен тексереді', planned: 'Жоспарланған архитектура', currentPrototype: 'Бұл прототип демо нөмірлермен телефон мен бұлттық тексерісті үлгілейді. Нақты қоңырауларды ұстамайды және серверге шағым жібермейді.', close: 'Жабу', resultLabel: 'Тексеру нәтижесі', safeNotImplied: 'Шағым жоқ болуы — қауіпсіз деген сөз емес', prototype: 'Интерактивті прототип', language: 'Тіл', clear: 'Тазарту', notSure: 'Күмәніңіз болса, қоңырауды аяқтап, ұйыммен өзіңіз байланысыңыз.', minutesAgo: '2 мин бұрын', watchOut: 'Жауап беруге асықпаңыз.', scamAlert: 'Белгілі алаяқтық тәсіл', cautionAlert: 'Қоңырау шалушы расталмады', noReportsCall: 'Шағымдар табылмады', tagBank: 'SMS коды', tagTransfer: 'Ақша аудару', tagFamily: 'Жалған туыс', chooseReason: 'Шағым себебі', verified: 'Байланыс тізімі мен қоңырау аудиосы жиналмайды.',
  },
} as const

const demoNumbers = [
  { number: '+7 707 123 45 67', risk: 'danger' as Risk, reports: 24, tag: 'sms' as const },
  { number: '+7 701 555 20 20', risk: 'caution' as Risk, reports: 4, tag: 'transfer' as const },
]

const scenarios: Scenario[] = ['bank', 'relative', 'unknown']

export default function StopscamApp() {
  const [language, setLanguage] = useState<Language>('ru')
  const [screen, setScreen] = useState<Screen>('home')
  const [scenario, setScenario] = useState<Scenario>('bank')
  const [number, setNumber] = useState('')
  const [checkedNumber, setCheckedNumber] = useState('')
  const [result, setResult] = useState<(typeof demoNumbers)[number] | { number: string; risk: Risk; reports: number; tag: 'none' } | null>(null)
  const [reports, setReports] = useState<string[]>([])
  const [reportOrigin, setReportOrigin] = useState<'home' | 'check'>('home')
  const [reportReason, setReportReason] = useState<'sms' | 'transfer' | 'relative'>('sms')
  const [toast, setToast] = useState('')
  const t = translations[language]

  const formattedNumber = useMemo(() => {
    if (scenario === 'bank') return demoNumbers[0].number
    if (scenario === 'relative') return '+7 701 555 20 20'
    return '+7 747 000 12 34'
  }, [scenario])

  const getTagLabel = (tag: 'sms' | 'transfer' | 'relative' | 'none') => {
    if (tag === 'sms') return t.smsTag
    if (tag === 'transfer') return t.transferTag
    if (tag === 'relative') return t.relativeTag
    return t.noReports
  }

  const getAdvice = (tag: 'sms' | 'transfer' | 'relative' | 'none') => {
    if (tag === 'sms') return t.neverCode
    if (tag === 'transfer') return t.safeAccount
    if (tag === 'relative') return t.verifyRelative
    return t.unknownAdvice
  }

  const lookup = (value: string) => {
    const normalized = value.replace(/\D/g, '')
    if (normalized.length < 10) {
      setToast(language === 'ru' ? 'Введите полный номер телефона' : language === 'kk' ? 'Телефон нөмірін толық енгізіңіз' : 'Enter a complete phone number')
      window.setTimeout(() => setToast(''), 2200)
      return
    }
    const match = demoNumbers.find((entry) => entry.number.replace(/\D/g, '').endsWith(normalized.slice(-10)))
    setResult(match ?? { number: value.trim(), risk: 'none', reports: 0, tag: 'none' })
    setCheckedNumber(value.trim())
    setScreen('check')
  }

  const startIncomingCall = () => {
    setScreen('incoming')
  }

  const finishCallAction = (action: 'block' | 'report' | 'nothing') => {
    if (action === 'report') {
      setCheckedNumber(formattedNumber)
      setReportOrigin('home')
      setReportReason(scenario === 'bank' ? 'sms' : scenario === 'relative' ? 'relative' : 'transfer')
      setScreen('report-form')
      return
    }
    if (action === 'block') {
      setToast(language === 'ru' ? 'Номер заблокирован в этой демо-сессии' : language === 'kk' ? 'Нөмір осы демо сессиясында бұғатталды' : 'Number blocked in this demo session')
      window.setTimeout(() => setToast(''), 2500)
    }
    setScreen('home')
  }

  const submitReport = () => {
    setReports((current) => [checkedNumber || formattedNumber, ...current])
    setToast(t.reportSent)
    window.setTimeout(() => setToast(''), 2200)
    setScreen('home')
  }

  const scenarioName = scenario === 'bank' ? t.fromBank : scenario === 'relative' ? t.fromRelative : t.fromUnknown
  const scenarioTag = scenario === 'bank' ? 'sms' : scenario === 'relative' ? 'relative' : 'none'
  const scenarioRisk: Risk = scenario === 'bank' ? 'danger' : scenario === 'relative' ? 'caution' : 'none'
  const isIncoming = screen === 'incoming' || screen === 'active-call'

  const riskLabel = (risk: Risk) => risk === 'danger' ? t.foundDanger : risk === 'caution' ? t.foundCaution : t.noReports

  return (
    <main className="presentation-shell">
      <header className="presentation-header">
        <a className="brand-lockup" href="#home" onClick={(event) => { event.preventDefault(); setScreen('home') }} aria-label="Stopscam home">
          <span className="brand-mark"><Shield aria-hidden="true" /></span>
          <span>stopscam<span className="brand-period">.</span></span>
        </a>
        <span className="prototype-badge"><span className="status-dot" />{t.prototype}</span>
      </header>

      <div className="showcase-grid">
        <section className="intro-column" aria-label="Project overview">
          <div className="eyebrow"><span className="eyebrow-line" />CS-2614 · KAZAKHSTAN</div>
          <h1>{t.greeting}</h1>
          <p className="intro-copy">{t.subtitle}</p>
          <div className="intro-note"><ShieldCheck aria-hidden="true" /><span>{t.verified}</span></div>
          <div className="architecture-card">
            <div className="architecture-heading"><span>{t.architecture}</span><span className="planned-chip">{t.planned}</span></div>
            <div className="architecture-flow">
              <div className="architecture-step"><span className="architecture-icon"><Smartphone aria-hidden="true" /></span><span className="architecture-step-copy"><strong>{t.phoneLayer}</strong><small>{t.phoneDetails}</small></span></div>
              <div className="flow-connector"><span /><ArrowDownLeft aria-hidden="true" /></div>
              <div className="architecture-step"><span className="architecture-icon"><Server aria-hidden="true" /></span><span className="architecture-step-copy"><strong>{t.networkLayer}</strong><small>{t.networkDetails}</small></span></div>
              <div className="flow-connector"><span /><ArrowDownLeft aria-hidden="true" /></div>
              <div className="architecture-step"><span className="architecture-icon"><Database aria-hidden="true" /></span><span className="architecture-step-copy"><strong>{t.cloudLayer}</strong><small>{t.cloudDetails}</small></span></div>
            </div>
            <p className="architecture-footnote">{t.currentPrototype}</p>
          </div>
        </section>

        <section className="device-column" aria-label="Stopscam mobile application demo">
          <div className={`phone-frame ${isIncoming && scenarioRisk === 'danger' ? 'phone-frame-alert' : ''}`}>
            <div className="phone-hardware"><span className="phone-camera" /><span className="phone-speaker" /></div>
            <div className={`phone-screen ${isIncoming ? 'phone-screen-call' : ''}`}>
              <div className="phone-status-bar"><span>9:41</span><span className="status-icons"><Wifi aria-hidden="true" /><span className="signal-bars"><i /><i /><i /><i /></span><span className="battery-icon"><i /></span></span></div>

              {screen === 'incoming' || screen === 'active-call' ? (
                <div className={`call-screen ${scenarioRisk === 'danger' ? 'call-danger' : scenarioRisk === 'caution' ? 'call-caution' : 'call-neutral'}`}>
                  <button className="call-close" type="button" onClick={() => setScreen('home')} aria-label={t.close}><X aria-hidden="true" /></button>
                  <div className="call-topline"><span className="call-pulse" />{screen === 'active-call' ? t.active : t.incoming}</div>
                  <div className="caller-avatar"><UserRound aria-hidden="true" /></div>
                  <h2>{scenarioName}</h2>
                  <p className="caller-number">{formattedNumber}</p>
                  {screen === 'active-call' ? <p className="call-timer">00:18</p> : <p className="call-timer">{t.watchOut}</p>}
                  <div className={`call-warning-card ${scenarioRisk === 'none' ? 'call-warning-neutral' : ''}`}>
                    <span className="warning-icon">{scenarioRisk === 'danger' ? <ShieldAlert aria-hidden="true" /> : scenarioRisk === 'caution' ? <CircleHelp aria-hidden="true" /> : <Search aria-hidden="true" />}</span>
                    <span className="warning-copy"><strong>{scenarioRisk === 'danger' ? t.scamAlert : scenarioRisk === 'caution' ? t.cautionAlert : t.noReportsCall}</strong><small>{scenarioRisk === 'none' ? t.noData : `${scenario === 'bank' ? 24 : 4} ${t.reportCount}`}</small></span>
                  </div>
                  <div className="call-advice"><span className="advice-label">{t.advice}</span><p>{getAdvice(scenarioTag)}</p></div>
                  <p className="before-answer"><LockKeyhole aria-hidden="true" />{t.beforeAnswer}</p>
                  {screen === 'active-call' ? (
                    <button className="end-call-button" type="button" onClick={() => setScreen('after-call')}><PhoneOff aria-hidden="true" />{t.endCall}</button>
                  ) : (
                    <div className="call-actions"><button className="decline-button" type="button" onClick={() => setScreen('after-call')}><PhoneOff aria-hidden="true" /><span>{t.decline}</span></button><button className="answer-button" type="button" onClick={() => setScreen('active-call')}><Phone aria-hidden="true" /><span>{t.answer}</span></button></div>
                  )}
                </div>
              ) : screen === 'after-call' ? (
                <div className="after-call-screen">
                  <button className="back-button" type="button" onClick={() => setScreen('home')} aria-label={t.backHome}><ArrowLeft aria-hidden="true" /></button>
                  <div className="after-call-icon"><PhoneOff aria-hidden="true" /></div>
                  <div className="section-kicker">{t.today}</div>
                  <h2>{t.postCall}</h2>
                  <p className="after-call-number">{formattedNumber}</p>
                  <button className="post-action" type="button" onClick={() => finishCallAction('block')}><span className="post-action-icon"><ShieldAlert aria-hidden="true" /></span><span><strong>{t.block}</strong><small>{t.localDemo}</small></span><ChevronRight aria-hidden="true" /></button>
                  <button className="post-action" type="button" onClick={() => finishCallAction('report')}><span className="post-action-icon"><FileText aria-hidden="true" /></span><span><strong>{t.report}</strong><small>{t.reportHint}</small></span><ChevronRight aria-hidden="true" /></button>
                  <button className="post-action" type="button" onClick={() => finishCallAction('nothing')}><span className="post-action-icon post-icon-muted"><X aria-hidden="true" /></span><span><strong>{t.doNothing}</strong><small>{t.clear}</small></span><ChevronRight aria-hidden="true" /></button>
                </div>
              ) : screen === 'check' && result ? (
                <div className="check-result-screen">
                  <button className="back-button" type="button" onClick={() => setScreen('home')} aria-label={t.backHome}><ArrowLeft aria-hidden="true" /></button>
                  <div className="section-kicker">{t.resultLabel}</div>
                  <h2>{t.checking}</h2>
                  <p className="result-number">{result.number}</p>
                  <div className={`risk-card risk-${result.risk}`}>
                    <span className="risk-icon">{result.risk === 'danger' ? <ShieldAlert aria-hidden="true" /> : result.risk === 'caution' ? <CircleHelp aria-hidden="true" /> : <Search aria-hidden="true" />}</span>
                    <span className="risk-copy"><strong>{riskLabel(result.risk)}</strong><small>{result.reports} {t.reportCount}</small></span>
                    {result.risk === 'none' && <span className="neutral-dot" aria-hidden="true" />}
                  </div>
                  {result.risk !== 'none' ? (
                    <><div className="tag-card"><span>{t.reportedAs}</span><strong>{getTagLabel(result.tag)}</strong></div><div className="advice-card"><div className="advice-card-title"><ShieldCheck aria-hidden="true" />{t.advice}</div><p>{getAdvice(result.tag)}</p><small>{t.notSure}</small></div></>
                  ) : <div className="neutral-explainer"><CircleHelp aria-hidden="true" /><p>{t.noData}</p><strong>{t.safeNotImplied}</strong></div>}
                  <button className="secondary-action" type="button" onClick={() => { setCheckedNumber(result.number); setReportOrigin('check'); setReportReason('sms'); setScreen('report-form') }}><FileText aria-hidden="true" />{t.report}</button>
                  <button className="text-action" type="button" onClick={() => { setResult(null); setNumber(''); setScreen('home') }}>{t.backHome}<ArrowRight aria-hidden="true" /></button>
                </div>
              ) : screen === 'report-form' ? (
                <div className="report-form-screen"><button className="back-button" type="button" onClick={() => setScreen(reportOrigin)} aria-label={t.close}><ArrowLeft aria-hidden="true" /></button><div className="section-kicker">{t.chooseReason}</div><h2>{t.reportTitle}</h2><p className="after-call-number">{checkedNumber}</p><div className="reason-options">{(['sms', 'transfer', 'relative'] as const).map((reason) => <button key={reason} className={`reason-option ${reportReason === reason ? 'reason-active' : ''}`} onClick={() => setReportReason(reason)} type="button"><span>{getTagLabel(reason)}</span>{reportReason === reason && <Check aria-hidden="true" />}</button>)}</div><button className="primary-action" type="button" onClick={submitReport}>{t.submitReport}<ArrowRight aria-hidden="true" /></button></div>
              ) : screen === 'reports' ? (
                <div className="reports-screen"><div className="section-kicker">{t.localDemo}</div><h2>{t.myReports}</h2>{reports.length ? reports.map((entry, index) => <div className="report-history-item" key={`${entry}-${index}`}><span className="history-icon"><FileText aria-hidden="true" /></span><span><strong>{entry}</strong><small>{t.minutesAgo}</small></span><Check aria-hidden="true" /></div>) : <div className="empty-reports"><span className="empty-icon"><FileText aria-hidden="true" /></span><strong>{t.noReportsYet}</strong><small>{t.reportHint}</small></div>}<button className="secondary-action" type="button" onClick={() => setScreen('home')}><ArrowLeft aria-hidden="true" />{t.backHome}</button></div>
              ) : (
                <div className="home-screen">
                  <div className="home-topline"><span className="mini-brand"><span className="mini-brand-icon"><Shield aria-hidden="true" /></span>stopscam</span><label className="language-picker" aria-label={t.language}><Globe2 aria-hidden="true" /><select value={language} onChange={(event) => setLanguage(event.target.value as Language)}><option value="ru">RU</option><option value="kk">KZ</option><option value="en">EN</option></select></label></div>
                  <div className="home-greeting"><span className="greeting-eyebrow"><span className="status-dot" />{t.today}</span><h2>{t.greeting}</h2><p>{t.subtitle}</p></div>
                  <div className="phone-search-card"><div className="card-heading"><span className="search-icon-wrap"><Search aria-hidden="true" /></span><span><strong>{t.checkTitle}</strong><small>{t.checkDescription}</small></span></div><form onSubmit={(event) => { event.preventDefault(); lookup(number) }}><input aria-label={t.checkTitle} inputMode="tel" autoComplete="tel" placeholder={t.placeholder} value={number} onChange={(event) => setNumber(event.target.value)} /><button aria-label={t.checkButton} type="submit"><ArrowRight aria-hidden="true" /></button></form><button className="check-submit-label" type="button" onClick={() => lookup(number)}>{t.checkButton}<ArrowRight aria-hidden="true" /></button></div>
                  <div className="demo-call-card"><div className="demo-card-header"><span className="demo-icon"><PhoneCall aria-hidden="true" /></span><span><strong>{t.testTitle}</strong><small>{t.testDescription}</small></span></div><div className="scenario-select" role="group" aria-label={t.testTitle}>{scenarios.map((item) => <button key={item} type="button" className={`scenario-button ${scenario === item ? 'scenario-selected' : ''}`} aria-pressed={scenario === item} onClick={() => setScenario(item)}>{item === 'bank' ? <Shield aria-hidden="true" /> : item === 'relative' ? <UsersRound aria-hidden="true" /> : <CircleHelp aria-hidden="true" />}{t[item]}</button>)}</div><button className="test-call-button" type="button" onClick={startIncomingCall}><PhoneCall aria-hidden="true" />{t.testCall}<ArrowRight aria-hidden="true" /></button></div>
                  <div className="recent-section"><div className="recent-heading"><strong>{t.recent}</strong><button type="button" onClick={() => setScreen('reports')}>{t.seeAll}<ChevronRight aria-hidden="true" /></button></div><div className="recent-row"><span className="recent-avatar"><ArrowDownLeft aria-hidden="true" /></span><span className="recent-copy"><strong>+7 700 123 45 67</strong><small>{t.minutesAgo}</small></span><span className="recent-status"><span className="neutral-dot" />{t.noReports}</span></div><div className="recent-row"><span className="recent-avatar recent-avatar-red"><ShieldAlert aria-hidden="true" /></span><span className="recent-copy"><strong>+7 707 123 45 67</strong><small>Bank · {t.smsTag}</small></span><span className="recent-status recent-status-danger">{t.foundDanger}</span></div></div>
                  <div className="privacy-note"><LockKeyhole aria-hidden="true" /><span>{t.verified}</span></div>
                </div>
              )}

              {screen !== 'incoming' && screen !== 'active-call' && screen !== 'after-call' && <nav className="bottom-nav" aria-label="Main navigation"><button className={screen === 'home' ? 'nav-active' : ''} type="button" onClick={() => setScreen('home')}><Shield aria-hidden="true" /><span>{t.home}</span></button><button className={screen === 'check' ? 'nav-active' : ''} type="button" onClick={() => { setResult(null); setScreen('home'); window.setTimeout(() => document.querySelector<HTMLInputElement>('.phone-search-card input')?.focus(), 0) }}><Search aria-hidden="true" /><span>{t.check}</span></button><button className={screen === 'reports' ? 'nav-active' : ''} type="button" onClick={() => setScreen('reports')}><FileText aria-hidden="true" /><span>{t.reports}</span></button></nav>}
              {toast && <div className="toast-message" role="status"><Check aria-hidden="true" />{toast}</div>}
            </div>
            <div className="phone-bottom-hardware"><span /></div>
          </div>
          <div className="device-caption"><span><span className="device-caption-dot" />{t.demoOnly}</span><span>Android · 01</span></div>
        </section>

        <aside className="side-column" aria-label="Prototype information">
          <div className="side-card"><div className="side-icon"><Bell aria-hidden="true" /></div><div className="side-overline">01 / INCOMING CALL</div><h2>{t.screening}</h2><p>{t.screened}. {t.beforeAnswer}.</p><div className="side-divider" /><div className="side-quote"><span>“</span><p>{t.advice}: {getAdvice('sms')}</p></div></div>
          <div className="side-metrics"><div><span className="metric-number">3</span><span className="metric-label">LANGUAGES</span></div><span className="metric-divider" /><div><span className="metric-number">0</span><span className="metric-label">CONTACTS UPLOADED</span></div></div>
        </aside>
      </div>
      <footer className="presentation-footer"><span>STOPSCAM · CS-2614</span><span>{t.status} · INTERACTIVE DEMO</span></footer>
    </main>
  )
}
