const icones = document.querySelectorAll('.office_icone');
const conteudo = document.getElementById('conteudo');

const dados = {
    word: `
        <h2>Microsoft Word</h2>

        <div class="office_bloco">
            <h3>O que é?</h3>
            <p>
                O <em>Word</em> é um programa usado para
                <strong>criar e editar textos</strong>.
            </p>
        </div>

        <div class="office_bloco">
            <h3>Para que serve?</h3>
            <ul class="lista_simples">
                <li>Trabalhos escolares</li>
                <li>Currículos</li>
                <li>Cartas e documentos</li>
            </ul>
        </div>

        <div class="office_bloco">
            <h3>O que você vai aprender</h3>
            <ul class="lista_simples">
                <li>Digitar textos</li>
                <li>Formatar letras</li>
                <li>Salvar arquivos</li>
            </ul>
        </div>

        <div class="office_dica">
            💡 O Word é muito exigido no mercado de trabalho.
        </div>

        <button class="office_botao" onclick="iniciarPratica('word')">Praticar agora</button>
    `,

    excel: `
        <h2>Microsoft Excel</h2>

        <div class="office_bloco">
            <h3>O que é?</h3>
            <p>
                O <em>Excel</em> é usado para <strong>organizar dados</strong>
                e fazer cálculos.
            </p>
        </div>

        <div class="office_bloco">
            <h3>Para que serve?</h3>
            <ul class="lista_simples">
                <li>Planilhas</li>
                <li>Cálculos automáticos</li>
                <li>Controle financeiro</li>
            </ul>
        </div>

        <div class="office_dica">
            💡 O Excel ajuda a evitar erros em contas.
        </div>

        <button class="office_botao" onclick="iniciarPratica('excel')">Praticar agora</button>
    `,

    powerpoint: `
        <h2>Microsoft PowerPoint</h2>

        <div class="office_bloco">
            <h3>O que é?</h3>
            <p>
                O <em>PowerPoint</em> é usado para criar
                <strong>apresentações em slides</strong>.
            </p>
        </div>

        <div class="office_bloco">
            <h3>Para que serve?</h3>
            <ul class="lista_simples">
                <li>Trabalhos</li>
                <li>Reuniões</li>
                <li>Aulas</li>
            </ul>
        </div>

        <div class="office_dica">
            💡 Slides claros facilitam o entendimento.
        </div>

        <button class="office_botao" onclick="iniciarPratica('powerpoint')">Praticar agora</button>
    `
};

icones.forEach(icone => {
    icone.addEventListener('click', () => {
        icones.forEach(i => i.classList.remove('ativo'));
        icone.classList.add('ativo');

        const app = icone.dataset.app;
        conteudo.innerHTML = dados[app];
    });
});

// Conteúdo inicial (Word)
conteudo.innerHTML = dados.word;
icones[0].classList.add('ativo');

function iniciarPratica(app) {

    if (app === 'word') {
        conteudo.innerHTML = `
            <h2>Prática — Microsoft Word</h2>

            <div class="office_bloco">
                <h3>Passo 1</h3>
                <p>
                    Abra o <strong>Microsoft Word</strong> no computador.
                </p>
            </div>

            <div class="office_bloco">
                <h3>Passo 2</h3>
                <p>
                    Clique em <em>Documento em Branco</em>.
                </p>
            </div>

            <div class="office_bloco">
                <h3>Passo 3</h3>
                <p>
                    Digite o texto abaixo:
                </p>

                <div class="office_exercicio">
                    Meu primeiro documento no Word
                </div>
            </div>

            <div class="office_pergunta">
                ✅ Você conseguiu digitar o texto?
            </div>

            <div class="office_botoes">
                <button onclick="finalizarPratica()">Sim</button>
                <button onclick="alert('Sem problema! Tente novamente 🙂')">
                    Ainda não
                </button>
            </div>
        `;
    }

}

function finalizarPratica() {
    conteudo.innerHTML = `
        <h2>🎉 Parabéns!</h2>

        <p>
            Você concluiu sua primeira prática no <strong>Word</strong>.
        </p>

        <p>
            Continue praticando para melhorar cada vez mais.
        </p>

        <button class="office_botao" onclick="conteudo.innerHTML = dados.word">
            Voltar para a explicação
        </button>
    `;
}
