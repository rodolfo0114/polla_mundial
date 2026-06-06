import { calcularPuntos } from "../data.js";

const VERDE = "#00C853";
const ORO = "#FFD600";
const GRIS = "#1A1A1A";
const GRIS3 = "#333";
const TEXTO = "#F0F0F0";
const TEXTO2 = "#888";

const COLORES = ["#E53935","#8E24AA","#1565C0","#00838F","#2E7D32","#F57F17","#4527A0","#AD1457","#00695C","#6D4C41"];

const posIcon = (i) => i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1;

const rowBg = (i) => {
  if (i === 0) return { background: "rgba(255,214,0,0.07)", borderLeft: `3px solid ${ORO}` };
  if (i === 1) return { background: "rgba(200,200,200,0.04)", borderLeft: "3px solid #C0C0C0" };
  if (i === 2) return { background: "rgba(205,127,50,0.05)", borderLeft: "3px solid #CD7F32" };
  return { borderLeft: "3px solid transparent" };
};

export default function Ranking({ participantes, pronosticos, partidos, onVerPicks }) {
  const ranking = participantes
    .map((p, i) => {
      const misPicks = pronosticos.filter(x => x.usuarioId === p.id);
      const { aciertos, exactos, total } = calcularPuntos(misPicks, partidos);
      return { ...p, aciertos, exactos, total, color: COLORES[i % COLORES.length] };
    })
    .sort((a, b) => b.total - a.total);

  const jugados = partidos.filter(p => p.status === "jugado").length;
  const pendientes = partidos.filter(p => p.status === "pendiente").length;

  return (
    <div style={{ padding:"1.5rem", maxWidth:900, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:"2rem" }}>
        <div style={{ display:"inline-block", background:"rgba(0,200,83,0.12)", border:"1px solid rgba(0,200,83,0.25)", color:VERDE, padding:"3px 14px", borderRadius:20, fontSize:"0.7rem", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>
          ⚽ FIFA World Cup 2026
        </div>
        <h1 style={{ fontWeight:900, fontSize:"clamp(2rem,6vw,3.2rem)", letterSpacing:1, lineHeight:1.05, marginBottom:6, textTransform:"uppercase" }}>
          Tabla de <span style={{ color:VERDE }}>Posiciones</span>
        </h1>
        <p style={{ fontSize:"0.85rem", color:TEXTO2, marginBottom:"1.5rem" }}>
          Actualizado automáticamente · {jugados} partidos jugados
        </p>
        <div style={{ display:"flex", gap:"2.5rem", justifyContent:"center" }}>
          {[[participantes.length,"Participantes"],[jugados,"Jugados"],[pendientes,"Restantes"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontWeight:900, fontSize:"2.2rem", color:VERDE, lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:"0.68rem", color:TEXTO2, textTransform:"uppercase", letterSpacing:1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:"1.2rem", flexWrap:"wrap", justifyContent:"center" }}>
        {[["✅ Resultado correcto","3 pts","rgba(0,2
