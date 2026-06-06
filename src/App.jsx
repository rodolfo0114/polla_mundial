import { useState, useEffect } from "react";
import { PARTIDOS_INICIAL, SHEET_ID } from "./data.js";
import Ranking from "./components/Ranking.jsx";
import Partidos from "./components/Partidos.jsx";
import MisPicks from "./components/MisPicks.jsx";

const VERDE = "#00C853";
const NEGRO = "#0A0A0A";
const GRIS3 = "#333";
const TEXTO = "#F0F0F0";
const TEXTO2 = "#888";

const PARTICIPANTES_DEMO = [
  { id:"U001", nombre:"Carlos Mendoza", cargo:"Socio Senior" },
  { id:"U002", nombre:"Patricia Quispe", cargo:"Asociada" },
  { id:"U003", nombre:"José Vargas", cargo:"Socio" },
  { id:"U004", nombre:"Lucía Herrera", cargo:"Asociada Senior" },
  { id:"U005", nombre:"Andrés Castro", cargo:"Practicante" },
];

function getUsuarioFromURL(participantes) {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid");
  return uid ? participantes.find(p => p.id === uid) : null;
}

export default function App() {
  const [tab, setTab] = useState("ranking");
  const [partidos, setPartidos] = useState(PARTIDOS_INICIAL);
  const [participantes] = useState(PARTICIPANTES_DEMO);
  const [pronosticos, setPronosticos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [sheetConectado] = useState(SHEET_ID !== "TU_SHEET_ID_AQUI");

  useEffect(() => {
    const u = getUsuarioFromURL(participantes);
    if (u) { setUsuario(u); setTab("picks"); }
    else setUsuario(participantes[0]);
  }, [participantes]);

  useEffect(() => {
    if (!sheetConectado) return;
    const cargarResultados = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=PARTIDOS`;
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;
        const nuevos = rows.map(r => {
          const cols = r.c;
          return {
            id: cols[0]?.v || "",
            fecha: cols[1]?.v || "",
            grupo: cols[2]?.v || "",
            local: cols[3]?.v || "",
            visitante: cols[4]?.v || "",
            gL: cols[5]?.v !== null ? parseInt(cols[5]?.v) : null,
            gV: cols[6]?.v !== null ? parseInt(cols[6]?.v) : null,
            status: cols[7]?.v || "pendiente",
            flagL: PARTIDOS_INICIAL.find(p => p.id === cols[0]?.v)?.flagL || "🏳️",
            flagV: PARTIDOS_INICIAL.find(p => p.id === cols[0]?.v)?.flagV || "🏳️",
          };
        }).filter(p => p.id);
        if (nuevos.length > 0) setPartidos(nuevos);
      } catch(e) {
        console.log("Sheets no conectado aún, usando datos locales");
      }
    };
    cargarResultados();
    const interval = setInterval(cargarResultados, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [sheetConectado]);

  const handleGuardar = (nuevospicks) => {
    setPronosticos(prev => {
      const sinEsteUsuario = prev.filter(p => p.usuarioId !== usuario?.id);
      return [...sinEsteUsuario, ...nuevospicks];
    });
  };

  const navItems = [
    { id:"ranking", label:"🏆 Ranking" },
    { id:"partidos", label:"📅 Partidos" },
    { id:"picks", label:"✏️ Mis picks" },
  ];

  return (
    <div style={{ background:"#0A0A0A", minHeight:"100vh", color:TEXTO, fontFamily:"system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.3)}}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance:none; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <nav style={{ background:"rgba(10,10,10,0.97)", backdropFilter:"blur(10px)", borderBottom:`1px solid ${GRIS3}`, padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:100, gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <div style={{ width:32, height:32, background:VERDE, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>⚽</div>
          <span style={{ fontWeight:900, fontSize:"1rem", letterSpacing:1, color:TEXTO, textTransform:"uppercase" }}>
            Polla <span style={{ color:VERDE }}>Mundial</span> 2026
          </span>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          {navItems.map(({ id, label }) => (
            <button key={id}
              onClick={() => setTab(id)}
              style={{ padding:"7px 13px", borderRadius:6, cursor:"pointer", fontSize:"0.8rem", fontWeight:600, border:"none", background: tab===id ? VERDE : "transparent", color: tab===id ? NEGRO : TEXTO2, transition:"all 0.2s", fontFamily:"inherit" }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:"0.72rem", color:VERDE, fontFamily:"monospace", flexShrink:0 }}>
          <div style={{ width:8, height:8, background:VERDE, borderRadius:"50%", animation:"pulse 1.5s infinite" }} />
          {sheetConectado ? "CONECTADO" : "DEMO"}
        </div>
      </nav>

      {!sheetConectado && (
        <div style={{ background:"rgba(255,214,0,0.08)", border:"1px solid rgba(255,214,0,0.25)", padding:"8px 16px", fontSize:"0.75rem", color:"#FFD600", textAlign:"center", fontFamily:"monospace" }}>
          ⚠️ MODO DEMO · Conecta Google Sheets para datos reales · Estudio Rodrigo del Perú
        </div>
      )}

      {tab === "ranking" && <Ranking participantes={participantes} pronosticos={pronosticos} partidos={partidos} onVerPicks={(j) => { setUsuario(j); setTab("picks"); }} />}
      {tab === "partidos" && <Partidos partidos={partidos} />}
      {tab === "picks" && <MisPicks usuario={usuario} partidos={partidos} pronosticosIniciales={pronosticos.filter(p => p.usuarioId === usuario?.id)} onGuardar={handleGuardar} />}
    </div>
  );
}
