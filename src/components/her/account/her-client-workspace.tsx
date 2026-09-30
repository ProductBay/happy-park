"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Heart,
  History,
  Home,
  Leaf,
  MessageCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import type { HerAdminAppointment } from "@/lib/her/admin/admin-types";
import {
  formatCompactDuration,
  formatLocalTime,
  getEstimatedFinishTime,
  getRemainingServiceMs,
  getServiceOvertimeMs,
  getServiceProgress,
  parseEstimatedDurationMs,
} from "@/lib/her/admin/service-timer";
import {
  canClientReschedule,
  createClientAppointmentWhatsappMessage,
  getClientStatusLabel,
  toClientAppointment,
  type HerClientAppointment,
  type HerClientView,
} from "@/lib/her/client-account";
import { herDemoSlots } from "@/lib/her/demo-data";
import { createHerWhatsappUrl } from "@/lib/her/whatsapp";

const money = new Intl.NumberFormat("en-JM", { style: "currency", currency: "JMD", maximumFractionDigits: 0 });
const dateFormat = new Intl.DateTimeFormat("en-JM", { weekday: "long", month: "long", day: "numeric" });

function initialAppointments(): HerClientAppointment[] {
  const now = Date.now();
  const seeded: HerAdminAppointment[] = [
    { id: "HER-CURRENT", clientId: "sarah", client: "Sarah Morgan", date: "2026-09-30", dayLabel: "Today", time: "10:00 AM", serviceId: "her-reset", service: "HER RESET", duration: "2 hr 30 min", price: 18_500, status: "IN SERVICE", contactPreference: "WhatsApp", serviceStartedAt: now - 48 * 60_000, accumulatedPausedMs: 4 * 60_000 },
    { id: "HER-NEXT", clientId: "sarah", client: "Sarah Morgan", date: "2026-10-10", dayLabel: "Saturday", time: "10:30 AM", serviceId: "her-time", service: "HER TIME", duration: "2 hr", price: 14_500, status: "CONFIRMED", contactPreference: "WhatsApp" },
    { id: "HER-H1", clientId: "sarah", client: "Sarah Morgan", date: "2026-09-14", dayLabel: "Sep 14", time: "9:00 AM", serviceId: "her-reset", service: "HER RESET", duration: "2 hr 30 min", price: 18_500, status: "COMPLETED", contactPreference: "WhatsApp", serviceStartedAt: now - 16 * 86_400_000, serviceCompletedAt: now - 16 * 86_400_000 + 142 * 60_000 },
    { id: "HER-H2", clientId: "sarah", client: "Sarah Morgan", date: "2026-08-22", dayLabel: "Aug 22", time: "1:00 PM", serviceId: "silk-press", service: "Silk Press", duration: "2 hr", price: 7_500, status: "COMPLETED", contactPreference: "WhatsApp" },
    { id: "HER-H3", clientId: "sarah", client: "Sarah Morgan", date: "2026-08-03", dayLabel: "Aug 03", time: "11:00 AM", serviceId: "coil-hydration", service: "Coil Hydration Therapy", duration: "1 hr 45 min", price: 8_500, status: "COMPLETED", contactPreference: "WhatsApp" },
  ];
  return seeded.map(toClientAppointment);
}

const nav: { id: HerClientView; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "book", label: "Book", icon: Sparkles },
  { id: "history", label: "History", icon: History },
];

export function HerClientWorkspace() {
  const [view, setView] = useState<HerClientView>("home");
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selected, setSelected] = useState<HerClientAppointment | null>(null);
  const [rescheduling, setRescheduling] = useState<HerClientAppointment | null>(null);
  const active = appointments.find((item) => item.status === "IN SERVICE");
  const upcoming = appointments.filter((item) => ["REQUESTED", "CONFIRMED", "CHECKED IN", "IN SERVICE"].includes(item.status));
  const history = appointments.filter((item) => item.status === "COMPLETED");
  const next = upcoming.find((item) => item.status !== "IN SERVICE");

  function reschedule(id: string, date: string, time: string) {
    setAppointments((current) => current.map((item) => item.id === id ? { ...item, date, dayLabel: dateFormat.format(new Date(`${date}T12:00:00`)), time } : item));
    setRescheduling(null);
  }

  return <main className="min-h-screen bg-[#f8f2e8] pb-28 pt-24 text-[#173d32] sm:pt-28">
    <header className="border-b border-[#173d32]/10 bg-[#fffaf2]/90 px-5 py-5 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#9b7440]">HER · Client preview</p><h1 className="mt-1 font-serif text-3xl">MY HER</h1></div>
        <div className="flex gap-2"><Link href="/her" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#173d32]/12 bg-white px-4 text-xs font-black"><ArrowLeft className="h-4 w-4"/>HER</Link><Link href="/" className="hidden min-h-11 items-center rounded-full px-4 text-xs font-black sm:inline-flex">Happy-Park</Link></div>
      </div>
    </header>

    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
      {view === "home" ? <HomeView active={active} next={next} history={history} onView={setSelected} onReschedule={setRescheduling} onNavigate={setView}/> : null}
      {view === "appointments" ? <AppointmentsView upcoming={upcoming} history={history} onView={setSelected} onReschedule={setRescheduling}/> : null}
      {view === "book" ? <BookView history={history}/> : null}
      {view === "history" ? <HistoryView history={history}/> : null}
    </div>

    <nav aria-label="My HER" className="fixed inset-x-0 bottom-0 z-30 border-t border-[#173d32]/10 bg-[#fffaf2]/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">{nav.map(({id,label,icon:Icon}) => <button key={id} type="button" aria-current={view===id?"page":undefined} onClick={()=>setView(id)} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-black uppercase tracking-[.08em] ${view===id?"bg-[#173d32] text-white":"text-[#64736b]"}`}><Icon className="h-4 w-4"/>{label}</button>)}</div>
    </nav>

    {selected ? <AppointmentSheet appointment={selected} onClose={()=>setSelected(null)} onReschedule={()=>{setSelected(null);setRescheduling(selected)}}/> : null}
    {rescheduling ? <RescheduleSheet appointment={rescheduling} onClose={()=>setRescheduling(null)} onConfirm={(date,time)=>reschedule(rescheduling.id,date,time)}/> : null}
  </main>;
}

function HomeView({active,next,history,onView,onReschedule,onNavigate}:{active?:HerClientAppointment;next?:HerClientAppointment;history:HerClientAppointment[];onView:(item:HerClientAppointment)=>void;onReschedule:(item:HerClientAppointment)=>void;onNavigate:(view:HerClientView)=>void}) {
  return <><section><p className="text-xs font-black uppercase tracking-[.2em] text-[#a1783f]">Good morning, Sarah.</p><h2 className="mt-3 font-serif text-5xl tracking-[-.04em] sm:text-6xl">Your HER</h2><p className="mt-3 max-w-xl text-sm leading-7 text-[#66756d]">A quiet place for your appointments, experiences and next HER moment.</p></section>
    <div className="mt-8">{active?<ClientTimer appointment={active} onView={()=>onView(active)}/>:next?<NextAppointment appointment={next} onView={()=>onView(next)} onReschedule={()=>onReschedule(next)}/>:<Empty title="Your next HER moment starts when you're ready." action="Book an experience" href="/her/book"/>}</div>
    <section className="mt-8"><SectionHeading eyebrow="At your fingertips" title="Quick actions"/><div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4"><QuickLink label="Book" copy="Choose an experience" href="/her/book" icon={Sparkles}/>{next&&canClientReschedule(next.status)?<QuickButton label="Reschedule" copy="Choose another time" icon={CalendarDays} onClick={()=>onReschedule(next)}/>:null}{history[0]?<QuickLink label="Book again" copy={history[0].service} href={`/her/book?service=${history[0].serviceId}`} icon={RefreshCw}/>:null}<QuickLink label="Consultation" copy="Start with guidance" href="/her/book?intent=unsure" icon={Heart}/></div></section>
    <section className="mt-10"><div className="flex items-end justify-between gap-4"><SectionHeading eyebrow="Recent HER" title="Your experiences"/><button type="button" onClick={()=>onNavigate("history")} className="min-h-11 text-xs font-black uppercase tracking-[.1em]">View history</button></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{history.slice(0,2).map(item=><HistoryCard key={item.id} appointment={item}/>)}</div></section>
    <HelpCard/>
  </>;
}

function ClientTimer({appointment,onView}:{appointment:HerClientAppointment;onView:()=>void}) {
  const [now,setNow]=useState(()=>Date.now());
  useEffect(()=>{const interval=window.setInterval(()=>setNow(Date.now()),30_000);return()=>window.clearInterval(interval)},[]);
  const timerAppointment=appointment as HerAdminAppointment;
  const progress=getServiceProgress(timerAppointment,now)??0;
  const remaining=getRemainingServiceMs(timerAppointment,now);
  const elapsedEstimate=getServiceOvertimeMs(timerAppointment,now);
  const finish=getEstimatedFinishTime(timerAppointment);
  return <section className="relative overflow-hidden rounded-[2.2rem] bg-[#173d32] p-6 text-white shadow-[0_25px_80px_rgba(23,61,50,.2)] sm:p-9"><div aria-hidden className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#d9b67a]/15 blur-2xl"/><div className="relative"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#dfc48d]">Your experience is in progress</p><h3 className="mt-3 font-serif text-4xl">{appointment.service}</h3><p className="mt-2 text-sm text-white/60">with Andrea</p></div><span className="rounded-full bg-white/10 px-3 py-2 text-[10px] font-black uppercase">In progress</span></div><dl className="mt-7 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-white/45">Started</dt><dd className="mt-1 font-black">{formatLocalTime(appointment.serviceStartedAt)}</dd></div><div><dt className="text-white/45">Estimated completion</dt><dd className="mt-1 font-black">Around {formatLocalTime(finish??undefined)}</dd></div></dl><div className="mt-8"><p className="font-serif text-4xl">{elapsedEstimate?"Still in progress":`${formatCompactDuration(remaining??0)} estimated remaining`}</p>{elapsedEstimate?<p className="mt-2 text-sm text-white/65">Andrea is completing your HER experience.</p>:null}</div><div className="mt-6"><div role="progressbar" aria-label={`Approximate service progress ${Math.round(progress)} percent`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} className="h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#dfc48d] transition-[width] motion-reduce:transition-none" style={{width:`${progress}%`}}/></div><p className="mt-3 text-xs leading-5 text-white/50">Service times may vary based on your individual experience.</p></div><div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={onView} className="min-h-12 rounded-full bg-[#dfc48d] px-6 text-sm font-black text-[#173d32]">View appointment</button><a href={createHerWhatsappUrl(createClientAppointmentWhatsappMessage(appointment))} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-black"><MessageCircle className="h-4 w-4"/>Contact HER</a></div></div></section>;
}

function NextAppointment({appointment,onView,onReschedule}:{appointment:HerClientAppointment;onView:()=>void;onReschedule:()=>void}) { return <section className="rounded-[2.2rem] border border-[#173d32]/10 bg-white p-6 shadow-[0_20px_70px_rgba(23,61,50,.08)] sm:p-9"><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#a1783f]">Your next HER</p><div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row"><div><h3 className="font-serif text-4xl">{appointment.service}</h3><p className="mt-3 font-black">{formatDate(appointment.date)} · {appointment.time}</p><p className="mt-2 text-sm text-[#6d7b74]">Estimated duration: {appointment.duration} · {money.format(appointment.price)}</p></div><span className="h-fit w-fit rounded-full bg-[#e7efe8] px-3 py-2 text-[10px] font-black uppercase">{getClientStatusLabel(appointment.status)}</span></div><div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={onView} className="min-h-12 rounded-full bg-[#173d32] px-6 text-sm font-black text-white">View</button>{canClientReschedule(appointment.status)?<button type="button" onClick={onReschedule} className="min-h-12 rounded-full border border-[#173d32]/15 bg-white px-6 text-sm font-black">Reschedule</button>:null}<a href={createHerWhatsappUrl(createClientAppointmentWhatsappMessage(appointment))} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-[#173d32]/15 px-6 text-sm font-black">WhatsApp HER</a></div></section> }

function AppointmentsView({upcoming,history,onView,onReschedule}:{upcoming:HerClientAppointment[];history:HerClientAppointment[];onView:(item:HerClientAppointment)=>void;onReschedule:(item:HerClientAppointment)=>void}) { return <><SectionHeading eyebrow="My HER" title="Appointments"/><section className="mt-8"><h3 className="text-xs font-black uppercase tracking-[.18em] text-[#9d7742]">Upcoming</h3><div className="mt-4 space-y-3">{upcoming.length?upcoming.map(item=><AppointmentCard key={item.id} appointment={item} onView={()=>onView(item)} onReschedule={()=>onReschedule(item)}/>):<Empty title="Your next HER moment starts when you're ready." action="Book an experience" href="/her/book"/>}</div></section><section className="mt-10"><h3 className="text-xs font-black uppercase tracking-[.18em] text-[#9d7742]">Past</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{history.map(item=><HistoryCard key={item.id} appointment={item}/>)}</div></section></> }

function BookView({history}:{history:HerClientAppointment[]}) { return <><SectionHeading eyebrow="Your next moment" title="Book with HER"/><div className="mt-8 grid gap-4 lg:grid-cols-2"><div className="rounded-[2rem] bg-[#173d32] p-7 text-white"><Sparkles className="h-7 w-7 text-[#dfc48d]"/><h3 className="mt-8 font-serif text-4xl">Choose a new experience.</h3><p className="mt-4 text-sm leading-7 text-white/60">Continue into the existing HER Journey to explore services and choose demo date and time.</p><Link href="/her/book" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#dfc48d] px-6 text-sm font-black text-[#173d32]">Book an appointment<ArrowRight className="h-4 w-4"/></Link></div><div className="rounded-[2rem] border border-[#173d32]/10 bg-white p-7"><Heart className="h-7 w-7 text-[#a1783f]"/><h3 className="mt-8 font-serif text-4xl">Start with a consultation.</h3><p className="mt-4 text-sm leading-7 text-[#66756d]">Share a general hair or scalp concern and let the HER Journey guide your next step. No diagnosis or medical intake.</p><Link href="/her/book?intent=unsure" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#173d32] px-6 text-sm font-black text-white">Request a consultation<ArrowRight className="h-4 w-4"/></Link></div></div><section className="mt-10"><SectionHeading eyebrow="Enjoyed your experience?" title="Book again"/><div className="mt-4 grid gap-3 sm:grid-cols-2">{history.slice(0,4).map(item=><HistoryCard key={item.id} appointment={item}/>)}</div></section></> }

function HistoryView({history}:{history:HerClientAppointment[]}) { return <><SectionHeading eyebrow="Completed experiences" title="Your HER history"/>{history.length?<div className="mt-8 grid gap-3 sm:grid-cols-2">{history.map(item=><HistoryCard key={item.id} appointment={item}/>)}</div>:<div className="mt-8"><Empty title="Your HER story starts here." action="Explore experiences" href="/her/services"/></div>}<HelpCard/></> }

function AppointmentCard({appointment,onView,onReschedule}:{appointment:HerClientAppointment;onView:()=>void;onReschedule:()=>void}) { return <article className="rounded-[1.6rem] border border-[#173d32]/10 bg-white p-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#9d7742]">{getClientStatusLabel(appointment.status)}</p><h3 className="mt-2 font-serif text-2xl">{appointment.service}</h3><p className="mt-2 text-sm font-bold">{formatDate(appointment.date)} · {appointment.time}</p><p className="mt-1 text-xs text-[#718078]">{appointment.duration} · {money.format(appointment.price)}</p></div><div className="flex gap-2"><button type="button" onClick={onView} className="min-h-11 rounded-full bg-[#173d32] px-5 text-xs font-black text-white">View</button>{canClientReschedule(appointment.status)?<button type="button" onClick={onReschedule} className="min-h-11 rounded-full border px-5 text-xs font-black">Reschedule</button>:null}</div></div></article> }

function HistoryCard({appointment}:{appointment:HerClientAppointment}) { return <article className="rounded-[1.6rem] border border-[#173d32]/10 bg-white p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#9d7742]">{appointment.dayLabel} · Completed</p><h3 className="mt-2 font-serif text-2xl">{appointment.service}</h3><p className="mt-2 text-sm font-bold">{money.format(appointment.price)}</p></div><Check className="h-5 w-5 text-[#66826f]"/></div><Link href={`/her/book?service=${appointment.serviceId}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-black uppercase tracking-[.08em] text-[#80602f]">Book this experience again<ArrowRight className="h-4 w-4"/></Link></article> }

function AppointmentSheet({appointment,onClose,onReschedule}:{appointment:HerClientAppointment;onClose:()=>void;onReschedule:()=>void}) { const eligible=canClientReschedule(appointment.status); return <Overlay title="Appointment" onClose={onClose}><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#9d7742]">{getClientStatusLabel(appointment.status)}</p><h3 className="mt-3 font-serif text-4xl">{appointment.service}</h3><dl className="mt-7 grid grid-cols-2 gap-5 text-sm"><Info label="Date" value={formatDate(appointment.date)}/><Info label="Time" value={appointment.time}/><Info label="Estimated duration" value={parseEstimatedDurationMs(appointment.duration)===null?"To be confirmed":appointment.duration}/><Info label="Service value" value={money.format(appointment.price)}/></dl>{appointment.status==="COMPLETED"?<div className="mt-7 rounded-2xl bg-[#edf3ed] p-5"><p className="font-serif text-2xl">Your HER experience is complete.</p><p className="mt-2 text-sm text-[#66756d]">We hope you enjoyed your HER time.</p></div>:null}<div className="mt-7 grid gap-3 sm:grid-cols-2">{eligible?<button type="button" onClick={onReschedule} className="min-h-13 rounded-xl bg-[#173d32] text-sm font-black text-white">Reschedule</button>:null}<a href={createHerWhatsappUrl(createClientAppointmentWhatsappMessage(appointment))} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-[#173d32]/15 bg-white text-sm font-black"><MessageCircle className="h-4 w-4"/>WhatsApp HER</a>{appointment.status==="COMPLETED"?<Link href={`/her/book?service=${appointment.serviceId}`} className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#173d32] text-sm font-black text-white">Book again</Link>:null}</div>{eligible?<p className="mt-5 text-xs leading-5 text-[#748179]">Cancellation policies are not defined in this preview. Contact HER to request a cancellation.</p>:null}</Overlay> }

function RescheduleSheet({appointment,onClose,onConfirm}:{appointment:HerClientAppointment;onClose:()=>void;onConfirm:(date:string,time:string)=>void}) { const [date,setDate]=useState(appointment.date); const [time,setTime]=useState(appointment.time); const [confirmed,setConfirmed]=useState(false); if(!canClientReschedule(appointment.status)) return <Overlay title="Rescheduling unavailable" onClose={onClose}><p className="text-sm leading-7 text-[#66756d]">This appointment can no longer be rescheduled in the client preview. Please contact HER for help.</p></Overlay>; if(confirmed) return <Overlay title="Appointment updated" onClose={onClose}><span className="grid h-14 w-14 place-items-center rounded-full bg-[#173d32] text-white"><Check/></span><h3 className="mt-6 font-serif text-4xl">Your appointment has been updated.</h3><p className="mt-3 text-sm font-black uppercase tracking-[.16em] text-[#9d7742]">Interactive preview</p><p className="mt-5 text-sm text-[#66756d]">{formatDate(date)} at {time}. No production appointment was changed.</p><button type="button" onClick={()=>onConfirm(date,time)} className="mt-7 min-h-13 w-full rounded-xl bg-[#173d32] text-sm font-black text-white">Return to My HER</button></Overlay>; return <Overlay title="Reschedule" onClose={onClose}><div className="rounded-2xl bg-[#f6eee0] p-5"><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#9d7742]">Current appointment</p><h3 className="mt-2 font-serif text-3xl">{appointment.service}</h3><p className="mt-2 text-sm font-bold">{formatDate(appointment.date)} · {appointment.time}</p></div><label className="mt-6 block text-sm font-black">Choose a new day<input type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-2 min-h-13 w-full rounded-xl border border-[#173d32]/15 bg-white px-4"/></label><fieldset className="mt-6"><legend className="text-sm font-black">Choose a new time</legend><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{herDemoSlots.map(slot=><button key={slot.value} type="button" aria-pressed={time===slot.value} onClick={()=>setTime(slot.value)} className={`min-h-12 rounded-xl border text-sm font-bold ${time===slot.value?"border-[#173d32] bg-[#173d32] text-white":"border-[#173d32]/15 bg-white"}`}>{slot.label}</button>)}</div></fieldset><div className="mt-6 rounded-2xl border border-[#173d32]/10 p-5"><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#9d7742]">Review change</p><p className="mt-3 text-sm"><strong>Current:</strong> {formatDate(appointment.date)} · {appointment.time}</p><p className="mt-2 text-sm"><strong>New:</strong> {formatDate(date)} · {time}</p></div><p className="mt-4 text-xs leading-5 text-[#748179]">Demo availability only. These times are not connected to live production availability.</p><button type="button" disabled={!date||!time||(date===appointment.date&&time===appointment.time)} onClick={()=>setConfirmed(true)} className="mt-6 min-h-13 w-full rounded-xl bg-[#b28a4d] text-sm font-black text-[#173d32] disabled:opacity-40">Confirm demo reschedule</button></Overlay> }

function Overlay({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}) { return <div className="fixed inset-0 z-50 flex items-end bg-[#0c211a]/45 p-0 sm:items-center sm:justify-center sm:p-5" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="max-h-[92svh] w-full overflow-y-auto rounded-t-[2rem] bg-[#fffaf2] p-6 shadow-2xl sm:max-w-2xl sm:rounded-[2rem] sm:p-8"><div className="flex items-center justify-between gap-4"><p className="text-xs font-black uppercase tracking-[.18em] text-[#9d7742]">{title}</p><button type="button" onClick={onClose} className="min-h-11 rounded-full border px-4 text-xs font-black">Close</button></div><div className="mt-6">{children}</div></section></div> }

function QuickLink({label,copy,href,icon:Icon}:{label:string;copy:string;href:string;icon:typeof Home}) { return <Link href={href} className="flex min-h-32 flex-col rounded-[1.5rem] border border-[#173d32]/10 bg-white p-5 transition hover:-translate-y-0.5 motion-reduce:transition-none"><Icon className="h-5 w-5 text-[#a1783f]"/><strong className="mt-auto">{label}</strong><span className="mt-1 text-xs text-[#718078]">{copy}</span></Link> }
function QuickButton({label,copy,onClick,icon:Icon}:{label:string;copy:string;onClick:()=>void;icon:typeof Home}) { return <button type="button" onClick={onClick} className="flex min-h-32 flex-col rounded-[1.5rem] border border-[#173d32]/10 bg-white p-5 text-left transition hover:-translate-y-0.5 motion-reduce:transition-none"><Icon className="h-5 w-5 text-[#a1783f]"/><strong className="mt-auto">{label}</strong><span className="mt-1 text-xs text-[#718078]">{copy}</span></button> }
function SectionHeading({eyebrow,title}:{eyebrow:string;title:string}) { return <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#a1783f]">{eyebrow}</p><h2 className="mt-2 font-serif text-4xl tracking-[-.03em]">{title}</h2></div> }
function HelpCard() { return <section className="mt-10 flex flex-col justify-between gap-5 rounded-[2rem] bg-[#ead8cf] p-6 sm:flex-row sm:items-center"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#815d50]">Need help?</p><h2 className="mt-2 font-serif text-3xl">HER is a message away.</h2></div><a href={createHerWhatsappUrl("Hi HER! I need some help with my appointment.")} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#173d32] px-6 text-sm font-black text-white"><MessageCircle className="h-4 w-4"/>Chat with HER</a></section> }
function Empty({title,action,href}:{title:string;action:string;href:string}) { return <div className="rounded-[2rem] border border-dashed border-[#173d32]/20 bg-white/60 p-8 text-center"><Leaf className="mx-auto h-6 w-6 text-[#a1783f]"/><h3 className="mx-auto mt-4 max-w-md font-serif text-3xl">{title}</h3><Link href={href} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#173d32] px-6 text-sm font-black text-white">{action}</Link></div> }
function Info({label,value}:{label:string;value:string}) { return <div><dt className="text-xs text-[#748179]">{label}</dt><dd className="mt-1 font-black">{value}</dd></div> }
function formatDate(date:string) { const value=new Date(`${date}T12:00:00`); return Number.isNaN(value.getTime())?date:dateFormat.format(value) }
