// ─── CONFIGURACIÓN GOOGLE SHEETS ───
export const SHEET_ID = "TU_SHEET_ID_AQUI";
export const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=`;

// ─── PARTIDOS DEL MUNDIAL 2026 ───
export const PARTIDOS_INICIAL = [
  { id:"P001", fecha:"11/06/2026", grupo:"A", local:"México",         visitante:"Polonia",        gL:null, gV:null, status:"pendiente", flagL:"🇲🇽", flagV:"🇵🇱" },
  { id:"P002", fecha:"11/06/2026", grupo:"A", local:"Arabia Saudita", visitante:"Argentina",      gL:null, gV:null, status:"pendiente", flagL:"🇸🇦", flagV:"🇦🇷" },
  { id:"P003", fecha:"12/06/2026", grupo:"B", local:"Inglaterra",     visitante:"Irán",           gL:null, gV:null, status:"pendiente", flagL:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", flagV:"🇮🇷" },
  { id:"P004", fecha:"12/06/2026", grupo:"B", local:"EE.UU.",         visitante:"Gales",          gL:null, gV:null, status:"pendiente", flagL:"🇺🇸", flagV:"🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { id:"P005", fecha:"13/06/2026", grupo:"C", local:"Argentina",      visitante:"México",         gL:null, gV:null, status:"pendiente", flagL:"🇦🇷", flagV:"🇲🇽" },
  { id:"P006", fecha:"13/06/2026", grupo:"C", local:"Polonia",        visitante:"Arabia Saudita", gL:null, gV:null, status:"pendiente", flagL:"🇵🇱", flagV:"🇸🇦" },
  { id:"P007", fecha:"14/06/2026", grupo:"D", local:"Francia",        visitante:"Australia",      gL:null, gV:null, status:"pendiente", flagL:"🇫🇷", flagV:"🇦🇺" },
  { id:"P008", fecha:"14/06/2026", grupo:"D", local:"Dinamarca",      visitante:"Túnez",          gL:null, gV:null, status:"pendiente", flagL:"🇩🇰", flagV:"🇹🇳" },
  { id:"P009", fecha:"15/06/2026", grupo:"E", local:"Alemania",       visitante:"Japón",          gL:null, gV:null, status:"pendiente", flagL:"🇩🇪", flagV:"🇯🇵" },
  { id:"P010", fecha:"15/06/2026", grupo:"E", local:"España",         visitante:"Costa Rica",     gL:null, gV:null, status:"pendiente", flagL:"🇪🇸", flagV:"🇨🇷" },
  { id:"P011", fecha:"16/06/2026", grupo:"F", local:"Bélgica",        visitante:"Canadá",         gL:null, gV:null, status:"pendiente", flagL:"🇧🇪", flagV:"🇨🇦" },
  { id:"P012", fecha:"16/06/2026", grupo:"F", local:"Marruecos",      visitante:"Croacia",        gL:null, gV:null, status:"pendiente", flagL:"🇲🇦", flagV:"🇭🇷" },
  { id:"P013", fecha:"17/06/2026", grupo:"G", local:"Brasil",         visitante:"Serbia",         gL:null, gV:null, status:"pendiente", flagL:"🇧🇷", flagV:"🇷🇸" },
  { id:"P014", fecha:"17/06/2026", grupo:"G", local:"Suiza",          visitante:"Camerún",        gL:null, gV:null, status:"pendiente", flagL:"🇨🇭", flagV:"🇨🇲" },
  { id:"P015", fecha:"18/06/2026", grupo:"H", local:"Portugal",       visitante:"Ghana",          gL:null, gV:null, status:"pendiente", flagL:"🇵🇹", flagV:"🇬🇭" },
  { id:"P016", fecha:"18/06/2026", grupo:"H", local:"Uruguay",        visitante:"Corea del Sur",  gL:null, gV:null, status:"pendiente", flagL:"🇺🇾", flagV:"🇰🇷" },
];

// ─── SISTEMA DE PUNTOS ───
export const PUNTOS = {
  resultado: 3,
  exacto: 5,
};

// ─── CALCULAR PUNTOS ───
export function calcularPuntos(pronosticos, partidos) {
  let aciertos = 0, exactos = 0, total = 0;
  pronosticos.forEach(p => {
    const partido = partidos.find(x => x.id === p.partidoId);
    if (!partido || partido.status !== "jugado") return;
    const resReal = Math.sign(partido.gL - partido.gV);
    const resPron = Math.sign(p.gL - p.gV);
    if (p.gL === partido.gL && p.gV === partido.gV) {
      exactos++; total += PUNTOS.exacto;
    } else if (resReal === resPron) {
      aciertos++; total += PUNTOS.resultado;
    }
  });
  return { aciertos, exactos, total };
}
