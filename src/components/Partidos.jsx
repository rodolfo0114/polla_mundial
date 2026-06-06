const VERDE = "#00C853";
const ROJO = "#E53935";
const GRIS = "#1A1A1A";
const GRIS3 = "#333";
const TEXTO = "#F0F0F0";
const TEXTO2 = "#888";

const grupos = ["A","B","C","D","E","F","G","H"];

export default function Partidos({ partidos }) {
  const jugados = partidos.filter(p => p.status === "jugado").length;
  const pendientes = partidos.filter(p => p.status === "pendiente").length;

  return (
    <div style={{ padding:"1.5rem", maxWidth:1000, margin:"0 auto" }}>
      <h2 style={{ fontWeight:900, fontSize:"1.8rem", textTransform:"uppercase", marginBottom:"0.8rem" }}>
        Fase de <span style={{ color:VERDE }}>Grupos</span>
      </h2>

      <div style={{ display:"flex", gap:8, marginBottom:"1.5rem", flexWrap:"wrap" }}>
        {[[`✓ ${jugados} jugados`, TEXTO2, "#252525"],
          [`⏰ ${pendientes} pendientes`, VERDE, "rgba(0,200,83,0.07)"]].map(([t,c,bg]) => (
          <span key={t} style={{ background:bg, color:c, border:`1px solid ${c}33`, padding:"4px 12px", borderRadius:20, fontSize:"0.72rem", fontFamily:"monospace" }}>{t}</span>
        ))}
      </div>

      {grupos.map(grupo => {
        const ps = partidos.filter(p => p.grupo === grupo);
        if (!ps.length) return null;
        return (
          <div key={grupo} style={{ marginBottom:"1.5rem" }}>
            <div style={{ fontWeight:800, fontSize:"0.85rem", color:VERDE, textTransform:"uppercase", letterSpacing:2, marginBottom:8, paddingBottom:6, borderBottom:`1px solid ${GRIS3}` }}>
              Grupo {grupo}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:8 }}>
              {ps.map(p => (
                <div key={p.id} style={{ background:GRIS, border:`1px solid ${GRIS3}`, borderRadius:10, padding:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, fontSize:"0.65rem", fontFamily:"monospace" }}>
                    <span style={{ color:TEXTO2 }}>{p.fecha}</span>
                    {p.status === "jugado" && <span style={{ background:"rgba(255,255,255,0.04)", color:TEXTO2, border:`1px solid ${GRIS3}`, padding:"2px 8px", borderRadius:4 }}>✓ Finalizado</span>}
                    {p.status === "pendiente" && <span style={{ background:"rgba(0,200,83,0.07)", color:VERDE, border:"1px solid rgba(0,200,83,0.2)", padding:"2px 8px", borderRadius:4 }}>⏰ Pendiente</span>}
                    {p.status === "live" && <span style={{ background:"rgba(229,57,53,0.15)", color:ROJO, border:"1px solid rgba(229,57,53,0.3)", padding:"2px 8px", borderRadius:4 }}>● EN VIVO</span>}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
                    <div style={{ flex:1, textAlign:"center" }}>
                      <span style={{ fontSize:"2rem", display:"block", marginBottom:3 }}>{p.flagL}</span>
                      <div style={{ fontSize:"0.75rem", fontWeight:700, textTransform:"uppercase" }}>{p.local}</div>
                    </div>
                    {p.status === "pendiente"
                      ? <div style={{ fontWeight:700, fontSize:"1rem", color:GRIS3, minWidth:70, textAlign:"center" }}>vs</div>
                      : <div style={{ fontWeight:900, fontSize:"2rem", letterSpacing:4, color: p.status==="live" ? ROJO : TEXTO, minWidth:70, textAlign:"center" }}>{p.gL} – {p.gV}</div>
                    }
                    <div style={{ flex:1, textAlign:"center" }}>
                      <span style={{ fontSize:"2rem", display:"block", marginBottom:3 }}>{p.flagV}</span>
                      <div style={{ fontSize:"0.75rem", fontWeight:700, textTransform:"uppercase" }}>{p.visitante}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
