import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
  const [nif, setNif] = useState("");
  const [idade, setIdade] = useState(null);
  const [podeVotar, setPodeVotar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchEleitor() {
      try {
        const response = await axios.get(`http://localhost:3001/eleitores`);
        const eleitores = response.data;

        const eleitor = eleitores.find(
          (eleitor) => eleitor.NIF === parseInt(nif)
        );
        if (eleitor) {
          setIdade(eleitor.idade);

          setPodeVotar(eleitor.idade >= 18);
        } else {
          console.log("Eleitor não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao recuperar os eleitores:", error);
        setPodeVotar(false);
      } finally {
      }
    }

    if (nif) {
      fetchEleitor();
    }
  }, [nif]);

  const handleVotar = () => {
    if (!podeVotar) {
      alert("Você não pode votar pois é menor de 18 anos.");
      return;
    }

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

  const renderizarVotacao = () => {
    if (!nif) {
      return null;
    } else if (idade === null) {
      return <p>Verificando idade...</p>;
    } else if (idade < 18) {
      return <p>Você tem menos de 18 anos e ainda não pode votar.</p>;
    } else if (podeVotar) {
      return (
        <div>
          <label htmlFor="voto">Digite o partido em que deseja votar:</label>
          <input
            type="text"
            id="voto"
            value={voto}
            onChange={(e) => setVoto(e.target.value)}
          />
          <button onClick={handleVotar}>Votar</button>
        </div>
      );
    } else {
      return <p>Você não foi encontrado na lista de eleitores.</p>;
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="App">
      <h1>Eleições 2024</h1>
      <h4>Votação para Primeiro Ministro de Portugal</h4>

      <label htmlFor="nif">Digite seu NIF:</label>
      <input
        type="number"
        id="nif"
        value={nif}
        onChange={(e) => setNif(e.target.value)}
      />

      {renderizarVotacao()}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ width: 400, bgcolor: "background.paper", p: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Resultados
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Número de votos para o PS: {ps}
            <br />
            Número de votos para o PSD: {psd}
            <br />
            Número de votos para o CH: {ch}
            <br />
            Número de votos para o IL: {il}
            <br />
            Número de votos para o BE: {be}
            <br />
            Número de votos para o PCP: {pcp}
            <br />
            Número de votos para o L: {l}
            <br />
            Número de votos nulos: {nulo}
            <br />
          </Typography>
        </Box>
      </Modal>

      {podeVotar ? (
        <Button onClick={handleOpenModal}>Ver Resultados</Button>
      ) : null}
    </div>
  );
}

export default App;
