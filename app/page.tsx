'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Info,
  Landmark,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const lenders = [
  { initials: 'MV', name: 'Mariana V.', amount: '$100 MXN', color: 'bg-[#d8f36b]' },
  { initials: 'JR', name: 'Jorge R.', amount: '$100 MXN', color: 'bg-[#ffc47d]' },
  { initials: 'AC', name: 'Ana C.', amount: '$100 MXN', color: 'bg-[#b7c9ff]' },
]

export default function Page() {
  const [activeView, setActiveView] = useState<'borrower' | 'lender'>('borrower')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [funded, setFunded] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <button className="rounded-xl p-2 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menú">
              {mobileOpen ? <X /> : <Menu />}
            </button>
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <span className="text-lg font-black">C</span>
            </div>
            <span className="text-lg font-bold tracking-tight">CrediKlub</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card p-1 md:flex">
            <button onClick={() => setActiveView('borrower')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeView === 'borrower' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Prestatario</button>
            <button onClick={() => setActiveView('lender')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeView === 'lender' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Prestamista</button>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full border border-border bg-card p-2.5" aria-label="Notificaciones"><Bell className="size-4" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#ff8a5b]" /></button>
            <div className="hidden items-center gap-2 border-l border-border pl-3 sm:flex"><div className="flex size-8 items-center justify-center rounded-full bg-[#b7c9ff] text-xs font-bold">LP</div><span className="text-sm font-semibold">Luis P.</span><ChevronDown className="size-4 text-muted-foreground" /></div>
          </div>
        </div>
        {mobileOpen && <div className="border-t border-border px-5 py-3 md:hidden"><div className="flex gap-2"><Button size="sm" variant={activeView === 'borrower' ? 'default' : 'outline'} onClick={() => { setActiveView('borrower'); setMobileOpen(false) }}>Prestatario</Button><Button size="sm" variant={activeView === 'lender' ? 'default' : 'outline'} onClick={() => { setActiveView('lender'); setMobileOpen(false) }}>Prestamista</Button></div></div>}
      </header>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[224px_1fr]">
        <aside className="hidden border-r border-border px-5 py-8 lg:block">
          <nav className="flex flex-col gap-2" aria-label="Navegación principal">
            <NavItem icon={<LayoutDashboard />} label="Resumen" active />
            <NavItem icon={<Wallet />} label="Mi actividad" />
            <NavItem icon={<ShieldCheck />} label="Reputación" />
            <NavItem icon={<Landmark />} label="Tesorería" />
          </nav>
          <div className="mt-16 rounded-2xl bg-primary p-4 text-primary-foreground"><Sparkles className="mb-5 size-5 text-[#d8f36b]" /><p className="text-sm font-semibold leading-tight">Tu reputación crece contigo.</p><p className="mt-2 text-xs leading-relaxed text-primary-foreground/70">Cada pago puntual desbloquea mejores condiciones.</p><button className="mt-5 text-xs font-bold underline underline-offset-4">Ver niveles</button></div>
        </aside>

        <section className="min-w-0 px-5 py-8 lg:px-10 lg:py-10">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-sm font-medium text-muted-foreground">Miércoles, 24 de septiembre</p><h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{activeView === 'borrower' ? 'Hola, Luis.' : 'Haz que tu dinero avance.'}</h1></div><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#77bf67]" /><span className="text-sm font-medium text-muted-foreground">Red Stellar conectada</span></div></div>
          {activeView === 'borrower' ? <BorrowerView /> : <LenderView funded={funded} onFund={() => setFunded(true)} />}
        </section>
      </div>
    </main>
  )
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) { return <button className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary'}`}>{icon && <span className="[&>svg]:size-[18px]">{icon}</span>}{label}</button> }

function BorrowerView() {
  return <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]"><div className="flex flex-col gap-6"><div className="grid gap-6 md:grid-cols-[1.12fr_0.88fr]"><div className="rounded-[28px] bg-primary p-6 text-primary-foreground sm:p-8"><div className="flex items-start justify-between"><div><p className="text-sm text-primary-foreground/60">Disponible para ti</p><p className="mt-4 text-5xl font-bold tracking-tight">$1,000</p><p className="mt-1 text-sm text-primary-foreground/60">MXN · a 30 días</p></div><div className="rounded-full bg-primary-foreground/10 p-3"><CircleDollarSign className="size-6 text-[#d8f36b]" /></div></div><div className="mt-9 flex items-center justify-between border-t border-primary-foreground/10 pt-4"><span className="text-sm text-primary-foreground/60">Comisión actual</span><span className="rounded-full bg-[#d8f36b] px-3 py-1 text-xs font-bold text-primary">20% · Nivel 1</span></div><Button className="mt-5 w-full bg-[#d8f36b] text-primary hover:bg-[#c8e75d]">Solicitar préstamo <ArrowUpRight data-icon="inline-end" /></Button></div><div className="rounded-[28px] border border-border bg-card p-6 sm:p-8"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Tu reputación</p><BadgeCheck className="size-5 text-[#77bf67]" /></div><div className="mt-6 flex items-end gap-3"><span className="text-5xl font-bold tracking-tight">420</span><span className="mb-2 text-sm text-muted-foreground">puntos</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[62%] rounded-full bg-[#77bf67]" /></div><div className="mt-3 flex justify-between text-xs text-muted-foreground"><span>Nivel 1</span><span>180 pts para Nivel 2</span></div><div className="mt-6 flex items-center gap-3 rounded-2xl bg-secondary p-3"><div className="flex size-9 items-center justify-center rounded-xl bg-background"><Sparkles className="size-4 text-[#e3aa37]" /></div><p className="text-xs leading-relaxed"><span className="font-bold">Tu próximo pago puntual</span><br />baja tu comisión a 17.5%</p></div></div></div><div className="rounded-[28px] border border-border bg-card p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="text-lg font-bold">Tu préstamo activo</p><p className="mt-1 text-sm text-muted-foreground">Sin préstamos activos</p></div><Clock3 className="size-5 text-muted-foreground" /></div><div className="mt-8 rounded-2xl border border-dashed border-border p-6 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary"><Wallet className="size-5 text-muted-foreground" /></div><p className="mt-4 text-sm font-semibold">Tu siguiente paso está aquí</p><p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">Solicita tu primer microcrédito y empieza a construir tu historial financiero.</p><Button variant="outline" className="mt-5">Explorar opciones</Button></div></div></div><aside className="flex flex-col gap-6"><div className="rounded-[28px] bg-[#d8f36b] p-6"><div className="flex items-center justify-between"><p className="font-bold text-primary">Así funciona</p><Info className="size-4 text-primary/60" /></div><div className="mt-5 flex flex-col gap-4">{['Elige cuánto necesitas', '10 personas financian tu pool', 'Paga puntual y sube de nivel'].map((item, i) => <div key={item} className="flex items-center gap-3"><div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</div><span className="text-sm font-semibold text-primary">{item}</span></div>)}</div></div><div className="rounded-[28px] border border-border bg-card p-6"><p className="text-sm font-bold">Actividad reciente</p><div className="mt-5 flex flex-col gap-5">{lenders.map((lender) => <div key={lender.initials} className="flex items-center gap-3"><div className={`flex size-9 items-center justify-center rounded-full ${lender.color} text-xs font-bold text-primary`}>{lender.initials}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{lender.name}</p><p className="text-xs text-muted-foreground">Aportó a tu pool</p></div><span className="text-sm font-bold">{lender.amount}</span></div>)}</div><div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground"><Users className="size-3.5" /> 3 de 10 prestamistas listos</div></div></aside></div>
}

function LenderView({ funded, onFund }: { funded: boolean; onFund: () => void }) {
  return <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]"><div className="flex flex-col gap-6"><div className="rounded-[28px] bg-primary p-6 text-primary-foreground sm:p-8"><div className="flex items-start justify-between"><div><p className="text-sm text-primary-foreground/60">Capital disponible</p><p className="mt-4 text-5xl font-bold tracking-tight">$2,450</p><p className="mt-1 text-sm text-primary-foreground/60">MXN listo para trabajar</p></div><div className="rounded-full bg-primary-foreground/10 p-3"><TrendingUp className="size-6 text-[#d8f36b]" /></div></div><div className="mt-9 grid grid-cols-2 gap-4 border-t border-primary-foreground/10 pt-4"><div><p className="text-xs text-primary-foreground/50">Rendimiento estimado</p><p className="mt-1 text-xl font-bold text-[#d8f36b]">+8.5% anual</p></div><div><p className="text-xs text-primary-foreground/50">En préstamos</p><p className="mt-1 text-xl font-bold">$1,200 MXN</p></div></div></div><div className="rounded-[28px] border border-border bg-card p-6 sm:p-8"><div className="flex items-start justify-between"><div><p className="text-lg font-bold">Pool recomendado</p><p className="mt-1 text-sm text-muted-foreground">Microcrédito · 30 días · Nivel 1</p></div><span className="rounded-full bg-[#d8f36b] px-3 py-1 text-xs font-bold text-primary">92% lleno</span></div><div className="mt-7 flex items-end justify-between"><div><p className="text-4xl font-bold">$100 <span className="text-base font-medium text-muted-foreground">MXN</span></p><p className="mt-1 text-sm text-muted-foreground">Tu aportación</p></div><div className="text-right"><p className="text-2xl font-bold text-[#5e9b57]">+$8</p><p className="text-sm text-muted-foreground">retorno estimado</p></div></div><div className="mt-6 h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[92%] rounded-full bg-[#77bf67]" /></div><div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>9 de 10 aportaciones</span><span>$900 / $1,000</span></div><Button onClick={onFund} disabled={funded} className="mt-7 w-full bg-[#d8f36b] text-primary hover:bg-[#c8e75d]">{funded ? <><Check data-icon="inline-start" /> Aportación confirmada</> : <>Aportar $100 MXN <ArrowUpRight data-icon="inline-end" /></>}</Button></div></div><aside className="flex flex-col gap-6"><div className="rounded-[28px] bg-[#ffc47d] p-6"><div className="flex items-center justify-between"><p className="font-bold text-primary">Tu impacto</p><Users className="size-5 text-primary/60" /></div><p className="mt-5 text-4xl font-bold text-primary">12</p><p className="mt-1 text-sm text-primary/70">personas financiadas</p><div className="mt-6 flex items-center gap-2 border-t border-primary/10 pt-4 text-xs font-medium text-primary/70"><ShieldCheck className="size-4" /> Riesgo fragmentado en pools</div></div><div className="rounded-[28px] border border-border bg-card p-6"><p className="text-sm font-bold">Cómo se distribuye</p><div className="mt-5 flex flex-col gap-4 text-sm">{[['Prestamistas', '8%', 'bg-[#77bf67]'], ['Fondo de protección', '7%', 'bg-[#ffc47d]'], ['Tesorería RWA', '5%', 'bg-[#b7c9ff]']].map(([label, value, color]) => <div key={label} className="flex items-center gap-3"><span className={`size-2.5 rounded-full ${color}`} /><span className="flex-1 text-muted-foreground">{label}</span><span className="font-bold">{value}</span></div>)}</div></div></aside></div>
}
