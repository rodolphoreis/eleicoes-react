import React, { useState } from "react";
import "./App.css";

function App() {
  const [voto, setVoto] = useState("");
  const [ps, setPs] = useState(0);
  const [psd, setPsd] = useState(0);
  const [ch, setCh] = useState(0);
  const [il, setIl] = useState(0);
  const [be, setBe] = useState(0);
  const [pcp, setPcp] = useState(0);
  const [l, setL] = useState(0);
  const [nulo, setNulo] = useState(0);

  const handleVotar = () => {
    switch (voto.toLowerCase()) {
      case "ps":
        setPs(ps + 1);
        break;
      case "psd":
        setPsd(psd + 1);
        break;
      case "ch":
        setCh(ch + 1);
        break;
      case "il":
        setIl(il + 1);
        break;
      case "be":
        setBe(be + 1);
        break;
      case "pcp":
        setPcp(pcp + 1);
        break;
      case "l":
        setL(l + 1);
        break;
      case "nulo":
        setNulo(nulo + 1);
        break;
      default:
        alert("Opção inválida. Por favor, tente outro partido ou vote nulo.");
    }
    setVoto("");
  };

  return (
    <div className="App">
      <h1>Eleições 2024</h1>
      <h4>Votação para Primeiro Ministro de Portugal</h4>

      <label htmlFor="voto">Digite o partido em que deseja votar:</label>
      <input
        type="text"
        id="voto"
        value={voto}
        onChange={(e) => setVoto(e.target.value)}
      />
      <button onClick={handleVotar}>Votar</button>

      <div id="resultado">
        <h2>Resultados</h2>
        <p>Número de votos para o PS: {ps}</p>
        <p>Número de votos para o PSD: {psd}</p>
        <p>Número de votos para o CH: {ch}</p>
        <p>Número de votos para o IL: {il}</p>
        <p>Número de votos para o BE: {be}</p>
        <p>Número de votos para o PCP: {pcp}</p>
        <p>Número de votos para o L: {l}</p>
        <p>Número de votos nulos: {nulo}</p>
      </div>
    </div>
  );
}

export default App;
