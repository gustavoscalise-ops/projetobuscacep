// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
    carregarEstados();
});

// ================= LOADER =================
function mostrarLoader() {
    document.getElementById("loader").style.display = "block";
}

function esconderLoader() {
    document.getElementById("loader").style.display = "none";
}

// ================= CEP =================
async function buscarCEP() {
    const cep = document.getElementById("cep").value.replace(/\D/g, '');

    if (cep.length !== 8) {
        M.toast({ html: "CEP inválido" });
        return;
    }

    mostrarLoader();

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            M.toast({ html: "CEP não encontrado" });
            return;
        }

        document.getElementById("rua").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("estado").value = data.uf;
        document.getElementById("ddd").value = data.ddd;

        M.updateTextFields();

        adicionarLog(`CEP buscado: ${cep}`);

    } catch (e) {
        console.error(e);
        M.toast({ html: "Erro ao buscar CEP" });
    }

    esconderLoader();
}

// ================= LIMPAR =================
function limparCampos() {
    document.querySelectorAll("input").forEach(input => input.value = "");
    M.updateTextFields();
}

// ================= ESTADOS =================
async function carregarEstados() {
    try {
        const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const estados = await res.json();

        const select = document.getElementById("uf");
        select.innerHTML = '<option value="" disabled selected>Escolha o estado</option>';

        estados.sort((a, b) => a.nome.localeCompare(b.nome));

        estados.forEach(e => {
            select.innerHTML += `<option value="${e.sigla}">${e.nome}</option>`;
        });

        M.FormSelect.init(select);

    } catch (e) {
        console.error("Erro ao carregar estados", e);
    }
}

// ================= CIDADES =================
document.getElementById("uf").addEventListener("change", async function () {
    const uf = this.value;

    if (!uf) return;

    mostrarLoader();

    try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const cidades = await res.json();

        const selectCidade = document.getElementById("cidadeSelect");
        selectCidade.innerHTML = '<option value="" disabled selected>Escolha a cidade</option>';

        cidades.forEach(c => {
            selectCidade.innerHTML += `<option value="${c.nome}">${c.nome}</option>`;
        });

        M.FormSelect.init(selectCidade);

    } catch (e) {
        console.error("Erro ao carregar cidades", e);
    }

    esconderLoader();
});

// ================= BUSCA POR RUA =================
async function buscarPorRua() {
    const uf = document.getElementById("uf").value;
    const cidade = document.getElementById("cidadeSelect").value;
    const rua = document.getElementById("ruaBusca").value;

    if (!uf || !cidade || !rua) {
        M.toast({ html: "Preencha todos os campos" });
        return;
    }

    mostrarLoader();

    try {
        const response = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`);
        const data = await response.json();

        const lista = document.getElementById("resultadoRua");
        lista.innerHTML = "";

        if (!data || data.length === 0) {
            lista.innerHTML = "<li class='collection-item'>Nenhum resultado encontrado</li>";
            return;
        }

        data.forEach(endereco => {
            lista.innerHTML += `
                <li class="collection-item">
                    <strong>${endereco.logradouro}</strong><br>
                    ${endereco.bairro} - ${endereco.localidade}/${endereco.uf}<br>
                    CEP: ${endereco.cep}
                </li>
            `;
        });

        adicionarLog(`Busca por rua: ${rua}, ${cidade} - ${uf}`);

    } catch (e) {
        console.error(e);
        M.toast({ html: "Erro na busca por rua" });
    }

    esconderLoader();
}

// ================= LOG =================
function adicionarLog(texto) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.textContent = texto;

    document.getElementById("logs").appendChild(li);
}