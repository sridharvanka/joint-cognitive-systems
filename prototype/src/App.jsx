import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BookOpen, CaretDown, Check, Gavel, LinkSimple, SlidersHorizontal, Target, UserCircle, X } from "@phosphor-icons/react";
import { CartesianGrid, ComposedChart, Label, LabelList, Line, ReferenceArea, ResponsiveContainer, Scatter, XAxis, YAxis } from "recharts";

const sources = [
  { authors: "Lisanne Bainbridge", year: "1983", title: "Ironies of Automation", detail: "How automation transforms - rather than eliminates - the human operator's problems.", href: "https://doi.org/10.1016/0005-1098(83)90046-8" },
  { authors: "Thomas B. Sheridan & William L. Verplank", year: "1978", title: "Human and Computer Control of Undersea Teleoperators", detail: "A foundational continuum for levels of human and computer control.", href: "https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/ADA057655.xhtml" },
  { authors: "Raja Parasuraman, Thomas B. Sheridan & Christopher D. Wickens", year: "2000", title: "A Model for Types and Levels of Human Interaction with Automation", detail: "Automation across acquisition, analysis, decision selection and implementation.", href: "https://doi.org/10.1109/3468.844354" },
  { authors: "David D. Woods & Erik Hollnagel", year: "2006", title: "Joint Cognitive Systems", detail: "People, technology and work treated as one coordinated cognitive system.", href: "https://www.routledge.com/Joint-Cognitive-Systems-Patterns-in-Cognitive-Systems-Engineering/Woods/p/book/9780849339332" },
];

const industries = [
  { name: "Aviation", x: 18, y: 20 }, { name: "Mobility", x: 34, y: 52 },
  { name: "Cybersecurity", x: 69, y: 81 }, { name: "Power grids", x: 88, y: 84 },
  { name: "Finance", x: 88, y: 55 },
];
const boundary = Array.from({ length: 11 }, (_, i) => ({ x: i * 10, y: 25 + 48 * (1 - Math.exp(-(i * 10) / 32)) }));
const journey = [["Augmentation", "AI advises"], ["Delegation", "bounded tasks"], ["Supervision", "human monitors"], ["Latency mismatch", "approval slows system"], ["Operational exclusion", "runtime loop closes"], ["Governance after exclusion", "authority moves upstream"]];
const functions = [
  { id: "acquire", no: "01", label: "Acquire", note: "Sense the environment" },
  { id: "analyze", no: "02", label: "Analyze", note: "Interpret and detect context" },
  { id: "decide", no: "03", label: "Decide", note: "Select course of action" },
  { id: "act", no: "04", label: "Act", note: "Execute in the world" },
];
const notes = {
  acquire: { HITL: "human directs sensing", HOTL: "machine gathers, human checks", HOOTL: "machine monitors continuously" },
  analyze: { HITL: "human performs analysis", HOTL: "machine proposes interpretation", HOOTL: "machine reports on exception" },
  decide: { HITL: "human selects the action", HOTL: "machine acts unless vetoed", HOOTL: "machine selects independently" },
  act: { HITL: "human approval required", HOTL: "human may interrupt execution", HOOTL: "machine executes independently" },
};
const roleCopy = {
  HITL: ["Human-in-the-loop", "Human participation is required before action."],
  HOTL: ["Human-on-the-loop", "The machine acts while a human supervises and may intervene."],
  HOOTL: ["Human-out-of-the-loop", "The machine acts without runtime intervention."],
};
const mode = (level) => level <= 5 ? "HITL" : level <= 7 ? "HOTL" : "HOOTL";

function Header({ page, setPage, openSources }) {
  const navigate = (next) => { window.location.hash = next; setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <>
    <header className="site-header">
      <a className="wordmark" href="/">SRIDHAR VANKA</a>
      <nav className="site-nav"><a className="active" href="/research/">Research</a><a href="/#writing">Writing</a><a href="/build.html">Building</a></nav>
      <button className="source-button" onClick={openSources}><BookOpen size={17}/> Sources</button>
    </header>
    <div className="project-nav">
      <span>THE HUMAN EXCLUSION THRESHOLD</span>
      <div role="tablist"><button className={page === "theory" ? "active" : ""} onClick={() => navigate("theory")}>Theory</button><button className={page === "model" ? "active" : ""} onClick={() => navigate("model")}>Model</button></div>
    </div>
  </>;
}

function Sources({ open, close }) {
  useEffect(() => { const handler = (e) => e.key === "Escape" && close(); window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, [close]);
  return <div className={`drawer-shell ${open ? "open" : ""}`} aria-hidden={!open}>
    <button className="drawer-scrim" aria-label="Close sources" onClick={close}/>
    <aside className="sources-drawer">
      <div className="drawer-head"><div><span className="eyebrow">INTELLECTUAL LINEAGE</span><h2>Sources & method</h2></div><button className="icon-button" aria-label="Close sources panel" onClick={close}><X size={20}/></button></div>
      <p className="drawer-intro">Established frameworks, this project's adaptations and the proposed threshold are deliberately separated.</p>
      <div className="epistemic-key"><span><i className="dot established"/> Established framework</span><span><i className="dot synthesis"/> Proposed synthesis</span><span><i className="dot illustrative"/> Illustrative model</span></div>
      {sources.map((s) => <article className="source-entry" key={s.title}><small>{s.authors} - {s.year}</small><h3>{s.title}</h3><p>{s.detail}</p><a href={s.href} target="_blank" rel="noreferrer">Open canonical source <LinkSimple size={14}/></a></article>)}
      <div className="synthesis-note"><b>PROPOSED SYNTHESIS</b><p>The threshold, phase diagram and control signature are conceptual adaptations by Sridhar Vanka.</p></div>
    </aside>
  </div>;
}

function ThresholdChart({ autonomy, tempo, compact = false }) {
  const marker = [{ x: autonomy, y: tempo }];
  return <div className={compact ? "mini-chart" : "chart-frame"}>
    {!compact && <><div className="region direct"><b>DIRECT EXECUTION</b><span>Human action remains compatible with system tempo.</span></div><div className="region approval"><b>APPROVAL</b></div><div className="region supervision"><b>SUPERVISION</b></div><div className="region governance"><b>GOVERNANCE</b></div><span className="boundary-label">HUMAN PARTICIPATION BECOMES NON-VIABLE</span></>}
    {compact && <><span className="mini viable">HUMAN PARTICIPATION<br/>VIABLE</span><span className="mini nonviable">HUMAN PARTICIPATION<br/>NON-VIABLE</span></>}
    <ResponsiveContainer width="100%" height="100%"><ComposedChart margin={{ top: 22, right: compact ? 20 : 38, bottom: compact ? 30 : 40, left: compact ? 16 : 32 }}>
      {!compact && <CartesianGrid stroke="rgba(20,19,15,.06)" vertical={false}/>}<XAxis type="number" dataKey="x" domain={[0,100]} tickCount={compact ? 2 : 3} tickFormatter={(v) => v === 0 ? "Low" : v === 100 ? "High" : ""} axisLine={{stroke:"#14130F"}} tickLine={false}><Label value="DEGREE OF MACHINE AUTONOMY" position="bottom" offset={14}/></XAxis>
      <YAxis type="number" dataKey="y" domain={[0,100]} tick={compact ? false : {fill:"#57544B",fontSize:10}} tickCount={3} tickFormatter={(v) => v === 0 ? "Low" : v === 100 ? "High" : ""} axisLine={{stroke:"#14130F"}} tickLine={false}><Label value={compact ? "OPERATIONAL TEMPO" : "OPERATIONAL TEMPO & SYSTEM COUPLING"} angle={-90} position="insideLeft" offset={compact ? -4 : -16}/></YAxis>
      {!compact && <ReferenceArea x1={76} x2={100} y1={0} y2={100} fill="#0E8A6E" fillOpacity={0.025}/>}<Line data={boundary} dataKey="y" stroke="#8C887C" strokeDasharray="7 6" strokeWidth={1.4} dot={false} isAnimationActive={false}/>
      {!compact && <Scatter data={industries} fill="#0A5C49"><LabelList dataKey="name" position="right" className="chart-label"/></Scatter>}<Scatter data={marker} fill="#0E8A6E" shape="cross"/>
    </ComposedChart></ResponsiveContainer>
  </div>;
}

function Theory({ setPage }) {
  const [autonomy, setAutonomy] = useState(49), [tempo, setTempo] = useState(28), [step, setStep] = useState(3);
  const journeyRef = useRef(null);
  return <main>
    <section className="theory-hero">
      <div className="theory-copy"><span className="eyebrow">A CONCEPTUAL INVESTIGATION</span><h1>When does the human leave the loop?</h1><p className="lead">As automated systems become faster, more interconnected and more internally coordinated, human participation may pass from advantage to constraint.</p><div className="hypothesis"><b>PROPOSED HYPOTHESIS</b><p>Exclusion refers to real-time execution. It is not a claim about removing humans from governance, accountability or moral responsibility.</p></div><button className="text-link" onClick={() => journeyRef.current?.scrollIntoView({behavior:"smooth"})}>Trace the journey <ArrowRight size={18}/></button></div>
      <div className="theory-figure"><span className="figure-title">FIG. 01 - CONDITIONS OF OPERATIONAL EXCLUSION</span><ThresholdChart autonomy={autonomy} tempo={tempo}/><div className="explorer"><Target size={20}/><b>Explore a system</b><span>adjust the variables</span></div><div className="chart-controls"><label>Machine autonomy <b>{autonomy}</b><input type="range" min="5" max="95" value={autonomy} onChange={(e)=>setAutonomy(+e.target.value)}/></label><label>Operational tempo <b>{tempo}</b><input type="range" min="5" max="95" value={tempo} onChange={(e)=>setTempo(+e.target.value)}/></label></div><div className="figure-caption"><span>Conceptual model - not an empirical universal threshold</span><button className="text-link">Assumptions & methodology <ArrowRight size={14}/></button></div></div>
    </section>
    <section className="journey" ref={journeyRef}><span className="section-label">THE APPROACH TO EXCLUSION</span><div className="journey-track">{journey.map(([title,sub],i)=><button key={title} className={step===i?"active":""} onClick={()=>setStep(i)}><small>{String(i+1).padStart(2,"0")}</small><b>{title}</b><i/><span>{sub}</span></button>)}</div><div className="journey-result"><div><small>CONTROL RELATIONSHIP</small><b>{step<2?"HITL - Human-in-the-loop":step===2?"HOTL - Human-on-the-loop":step===3?"THE INTERVENTION WINDOW NARROWS":step===4?"HOOTL - Human-out-of-the-loop":"HOVTL / SITL - Authority moves upstream"}</b></div><button className="primary" onClick={()=>{window.location.hash="model";setPage("model");}}>Test this in the model <ArrowRight size={16}/></button></div></section>
    <AcademicFooter theory/>
  </main>;
}

function Role({ value }) { return <span className="role" tabIndex="0">{value}<span><b>{roleCopy[value][0]}</b>{roleCopy[value][1]}</span></span>; }
function AcademicFooter({ theory }) { return <footer className="academic-footer"><span>{theory?"Related foundations:":"Taxonomy foundations:"}</span><span>{theory?"Bainbridge, 1983":"Sheridan & Verplank, 1978"}</span><span>Parasuraman, Sheridan & Wickens, 2000</span>{theory&&<span>Woods & Hollnagel, 2006</span>}<em>{theory?"Epistemic status: proposed synthesis by Sridhar Vanka.":"Control signature and threshold interpretation are conceptual adaptations by Sridhar Vanka."}</em></footer>; }

function Model() {
  const [scenario,setScenario]=useState("Coordinated urban mobility"), [levels,setLevels]=useState({acquire:9,analyze:8,decide:6,act:5}), [gov,setGov]=useState({HOVTL:true,SITL:true,RLHF:true}), [open,setOpen]=useState(false), [tested,setTested]=useState(false);
  const avg=Object.values(levels).reduce((a,b)=>a+b,0)/4, tempo=scenario==="High-frequency finance"?86:scenario==="Power grid balancing"?74:61;
  const signature=useMemo(()=>`${mode(levels.acquire)==="HOOTL"?"autonomous acquisition":"human-guided acquisition"} - ${mode(levels.analyze)==="HOOTL"?"autonomous analysis":"human-supervised analysis"} - ${mode(levels.decide)==="HITL"?"human-selected decisions":mode(levels.decide)==="HOTL"?"human-supervised decisions":"autonomous decisions"} - ${mode(levels.act)==="HITL"?"human-authorized action":mode(levels.act)==="HOTL"?"interruptible action":"autonomous action"}${gov.SITL?" - societally governed":""}.`,[levels,gov.SITL]);
  const inference=tested?(mode(levels.act)==="HITL"&&tempo>70?"Stress test failed: approval latency exceeds the intervention window. Move authority upstream or introduce a deterministic fallback.":mode(levels.decide)==="HOOTL"&&!gov.HOVTL?"Stress test exposed a governance gap: runtime autonomy increased without upstream policy authority.":"Configuration remained viable under the simulated tempo, with fallback authority preserved."):(mode(levels.act)==="HITL"?"Human authority remains viable at decision and action - but approval latency is the limiting constraint.":"Runtime authority has shifted toward the machine; recovery and governance now determine viability.");
  return <main>
    <section className="model-intro"><div><span className="eyebrow">MODEL 01 - CONTROL ARCHITECTURE</span><h1>Where does human authority reside?</h1><p>Assign control across the cognitive workflow, then test whether intervention remains viable under system tempo.</p></div><label className="scenario"><span>SCENARIO</span><div><select value={scenario} onChange={(e)=>{setScenario(e.target.value);setTested(false)}}><option>Coordinated urban mobility</option><option>Power grid balancing</option><option>High-frequency finance</option><option>Cyber incident response</option></select><CaretDown size={15}/></div></label></section>
    <div className="model-grid"><section className="architecture"><span className="figure-title">FIG. 02 - FUNCTION-SPECIFIC AUTONOMY</span><div className="architecture-head"><span>Function</span><span>Autonomy allocation</span><span>Level & human relationship</span></div>{functions.map((f,i)=>{const m=mode(levels[f.id]);return <div className="function-row" key={f.id}><div className="function-name"><small>{f.no}</small><b>{f.label}</b><span>{f.note}</span>{i<3&&<ArrowRight className="flow" size={16}/>}</div><label className="allocation"><span><i>Human</i><i>Machine</i></span><input type="range" min="1" max="10" value={levels[f.id]} onChange={(e)=>{setLevels({...levels,[f.id]:+e.target.value});setTested(false)}}/></label><div className="level"><b>L{levels[f.id]} - <Role value={m}/></b><span>{notes[f.id][m]}</span></div></div>})}<button className="text-link continuum" onClick={()=>setOpen(!open)}>View the 10-level continuum <ArrowRight className={open?"turn":""} size={15}/></button>{open&&<div className="continuum-panel">{Array.from({length:10},(_,i)=><button key={i} onClick={()=>setLevels({acquire:i+1,analyze:i+1,decide:i+1,act:i+1})}><b>{String(i+1).padStart(2,"0")}</b><small>{i===0?"Manual":i===4?"Approval":i===5?"Veto":i===8?"Exception":i===9?"Full autonomy":""}</small></button>)}</div>}
      <div className="governance-band"><b className="governance-title">AUTHORITY ABOVE THE RUNTIME LOOP</b><div>{[["HOVTL","Human sets objectives and constraints",UserCircle],["SITL","Law and public values define outcomes",Gavel],["RLHF","Evaluation informs behavior before deployment",SlidersHorizontal]].map(([key,text,Icon])=><button key={key} className={gov[key]?"selected":""} onClick={()=>setGov({...gov,[key]:!gov[key]})}><Icon size={23}/><span><b>{key}</b>{text}</span>{gov[key]&&<Check size={15}/>}</button>)}</div><em>Governance is orthogonal to runtime autonomy and constrains the entire system.</em></div>
    </section><aside className="interpretation"><span className="section-label">CONTROL SIGNATURE</span><p className="signature">{signature}</p><hr/><span className="figure-title">FIG. 03 - THRESHOLD POSITION</span><ThresholdChart compact autonomy={avg*9.5} tempo={tempo}/><div className={tested?"inference tested":"inference"}><span className="section-label">MODEL INFERENCE</span><p>{inference}</p></div><div className="properties"><div>Runtime speed <b>{tempo>75?"Extreme":"High"}</b></div><div>Intervention window <b>{tempo>70?"Critical":"Narrow"}</b></div><div>Recovery capacity <b>{gov.HOVTL?"Moderate":"Low"}</b></div></div><button className="primary stress" onClick={()=>setTested(true)}>{tested?"Stress test complete":"Stress-test configuration"}{tested?<Check size={17}/>:<ArrowRight size={17}/>}</button><button className="text-link assumptions">Inspect assumptions <ArrowRight size={14}/></button></aside></div>
    <AcademicFooter/>
  </main>;
}

export function App() {
  const [page,setPage]=useState(window.location.hash==="#model"?"model":"theory"), [sourcesOpen,setSourcesOpen]=useState(false);
  useEffect(()=>{const sync=()=>setPage(window.location.hash==="#model"?"model":"theory");window.addEventListener("hashchange",sync);return()=>window.removeEventListener("hashchange",sync)},[]);
  return <div className="app-shell"><div className="grid-bg"/><Header page={page} setPage={setPage} openSources={()=>setSourcesOpen(true)}/>{page==="theory"?<Theory setPage={setPage}/>:<Model/>}<Sources open={sourcesOpen} close={()=>setSourcesOpen(false)}/></div>;
}
