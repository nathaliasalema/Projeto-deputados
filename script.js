const endAPI = "https://dadosabertos.camara.leg.br/api/v2/deputados";
let deputados = [];
let partidos = [];
let showingAllDeputados = false;
let showingAllPartidos = false;

const partidoFotos={
  "PL": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Logomarca_Partido_Liberal_%28Brasil%29.jpg/933px-Logomarca_Partido_Liberal_%28Brasil%29.jpg",
  "REPUBLICANOS": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTaIJ_Z4jSo4V9WLlvWKQrh6Jmbbi9o7AB1IAEW7RKnOiaOp3",
"MDB":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Movimento_Democr%C3%A1tico_Brasileiro_%282017%29.svg/1200px-Movimento_Democr%C3%A1tico_Brasileiro_%282017%29.svg.png",
"PSDB":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd4Ac0hBmKLmb3dbrCKfRdyZm-8Zjox2YlRQ&s",
"NOVO": "https://pbs.twimg.com/profile_images/1708262146503520256/kNoc9zIQ_400x400.jpg",
  "PP": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFqj9uRqmlNooAIC8LD9uzHsSV8uHLD3SjA&s",
"PDT":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvAcSuy25-9yv53XGtI5nXODj8LzfsVz0yYw&s",
"PT":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2c48Vf7bL1yYSjyvelzcnupNXSAvefRTWQ&s",
"CIDADANIA":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4CkzdsQH09J9r2HpCrshoxkvbCUk2BCbUmA&s",
"UNIÃO":"https://s2-oglobo.glbimg.com/spWSXaxi1WhIbbeOAj0O38unXrI=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/T/Q/ddIKCrSAuk686zXBpeoA/uniao.png",
"PCdoB":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/PCdoB_flag.svg/1280px-PCdoB_flag.svg.png",
"PV":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRozYcTb62zp9UaBHTa8_JpIf9979GxbmELBg&s",
"AVANTE":"https://http2.mlstatic.com/D_NQ_NP_898952-MLB73111613612_122023-O.webp",
"PSD":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1vrO9kvfwCZ-morUX0chsq-If5MRN2ZQiw&s",
"SOLIDARIEDADE":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5aqjdH9PEKrIaxWcUvMNJE1ZO6xW8-Tt9OFyv_PBCAmr498CvAaG1kjnqD0L0ZIukyB4&usqp=CAU",
"PSB":"https://rbj.com.br/wp-content/uploads/2020/08/psb.jpg",
"PODE":"https://storage.googleapis.com/ecdt-logo-saida/4643197c424d0789baf49ce77a6f00d3687a606222f0674bd36d147142d24fdb/PODEMOS.webp",
"PSOL": "https://memorialdademocracia.com.br/publico/image/15402",
"PRD":"https://midias.correiobraziliense.com.br/_midias/jpg/2024/01/04/1000x1000/1_partido_-33939343.jpg",
"REDE":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT11xYQDNMuBeQQwoqn8BQIsyiqN5ACWK2okQ&s",
"S.PART.":"https://st.depositphotos.com/3538103/5151/i/450/depositphotos_51514387-stock-photo-photograph-icon.jpg"
};


fetch(endAPI)
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    deputados = data.dados;
    const uniquePartidos = new Set(deputados.map(deputado => deputado.siglaPartido));
    partidos = Array.from(uniquePartidos);
  })
  .catch(error => {
    console.warn("Erro na chamada do API: ", error);
  });

function displayDeputados(deputadosExibidos) {
  const divResultado = document.getElementById("resultadoDeputados");
  divResultado.innerHTML = "";
  deputadosExibidos.forEach(deputado => {
    let item = document.createElement("div");
    item.classList.add("deputado-item");
    item.innerHTML = `
      <div class="deputado-info">
        <img src="${deputado.urlFoto}" alt="${deputado.nome}" class="deputado-foto"/>
        <div>
          <h3>${deputado.nome}</h3>
          <p>Partido: ${deputado.siglaPartido}</p>
          <p>Estado: ${deputado.siglaUf}</p>
          <p>Email: <a href="mailto:${deputado.email}">${deputado.email}</a></p>
        </div>
      </div>`;
    divResultado.appendChild(item);
  });
}

function displayPartidos(partidosExibidos) {
  const divResultado = document.getElementById("resultadoPartidos");
  divResultado.innerHTML = "";
  partidosExibidos.forEach(partido => {
    let item = document.createElement("div");
    item.classList.add("partido-item");
    item.innerHTML = `
      <div class="partido-info">
        <img src="${partidoFotos[partido]}" alt="${partido}" class="partido-foto"/>
        <h3>${partido}</h3>
      </div>`;
    divResultado.appendChild(item);
  });
}

document.getElementById('consultaDeputado').addEventListener('input', function() {
  const searchText = this.value.toLowerCase();
  if (searchText === '') {
    document.getElementById("resultadoDeputados").innerHTML = "";
    showingAllDeputados = false;
    document.getElementById('mostrartodosDeputadosButton').textContent = "Mostrar Todos";
  } else {
    const filteredDeputados = deputados.filter(deputado => deputado.nome.toLowerCase().includes(searchText));
    displayDeputados(filteredDeputados);
  }
});

document.getElementById('mostrartodosButton').addEventListener('click', function() {
  const divResultado = document.getElementById("resultadoDeputados");
  if (showingAllDeputados) {
    divResultado.innerHTML = "";
    this.textContent = "Mostrar Todos";
  } else {
    displayDeputados(deputados);
    this.textContent = "Esconder Todos";
  }
  showingAllDeputados = !showingAllDeputados;
});

document.getElementById('consultaPartido').addEventListener('input', function() {
  const searchText = this.value.toLowerCase();
  if (searchText === '') {
    document.getElementById("resultadoPartidos").innerHTML = "";
    showingAllPartidos = false;
    document.getElementById('mostrartodosPartidosButton').textContent = "Mostrar Todos";
  } else {
    const filteredPartidos = partidos.filter(partido => partido.toLowerCase().includes(searchText));
    displayPartidos(filteredPartidos);
  }
});

document.getElementById('mostrarpartidosButton').addEventListener('click', function() {
  const divResultado = document.getElementById("resultadoPartidos");
  if (showingAllPartidos) {
    divResultado.innerHTML = "";
    this.textContent = "Mostrar Todos";
  } else {
    displayPartidos(partidos);
    this.textContent = "Esconder Todos";
  }
  showingAllPartidos = !showingAllPartidos;
});

const eventosAPI = "https://dadosabertos.camara.leg.br/api/v2/eventos?dataInicio=2024-03-01&dataFim=2024-03-10&ordem=ASC&ordenarPor=dataHoraInicio";
let eventos = [];
let showingAllEventos = false;

fetch(eventosAPI)
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    eventos = data.dados;
  })
  .catch(error => {
    console.warn("Erro na chamada da API: ", error);
  });

function displayEventos(eventosExibidos) {
  const divResultado = document.getElementById("resultadoEventos");
  divResultado.innerHTML = "";
  eventosExibidos.forEach(evento => {
    let item = document.createElement("div");
    item.classList.add("evento-item");
    item.innerHTML = `
      <div class="evento-info">
        <h3>${evento.descricaoTipo}</h3>
        <p>Data: ${new Date(evento.dataHoraInicio).toLocaleString()}</p>
        <p>Local: ${evento.localCamara ? evento.localCamara.nome : "Local não informado"}</p>
        <p>Descrição: ${evento.descricao ? evento.descricao : "Descrição não disponível"}</p>
      </div>`;
    divResultado.appendChild(item);
  });
}

document.getElementById('mostrarEventosButton').addEventListener('click', function() {
  const divResultado = document.getElementById("resultadoEventos");
  if (showingAllEventos) {
    divResultado.innerHTML = "";
    this.textContent = "Mostrar Todos";
  } else {
    displayEventos(eventos);
    this.textContent = "Esconder Todos";
  }
  showingAllEventos = !showingAllEventos;
});

document.getElementById("btnTopo").addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});