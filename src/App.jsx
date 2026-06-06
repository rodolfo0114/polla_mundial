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
          retu
