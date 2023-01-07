var moedas = [
    {
        coin:'btc',
        price:'100'
    },
    {
        coin:'etc',
        price:'50'
    }
]

var inputs_criados = [
    {
        
    }
]
// var inputs_criados = []
window.onload = function () {
    renderizar_calculadora();
}

const renderizar_calculadora = () => {

    const fundo_da_calculadora = document.createElement("div")
    fundo_da_calculadora.classList.add("fundo_da_calculadora")

    const btn_novo = document.createElement("button")
    btn_novo.classList.add("btn_novo")
    // btn_novo.textContent("Teste")
    btn_novo.innerText = "+"
    btn_novo.value = "novo"

    fundo_da_calculadora.appendChild(renderizar_inputs())
    fundo_da_calculadora.appendChild(btn_novo)

    document.querySelector("body").appendChild(fundo_da_calculadora)
}

const renderizar_inputs = () => {
    const grupo_inputs = document.createElement("div")
    grupo_inputs.classList.add("grupo_inputs")

    const inp_moeda = document.createElement("select")
    inp_moeda.classList.add("inp_padrao")

    fetch(`https://brapi.dev/api/v2/crypto?coin=BTC%2CADA%2CETH&currency=BRL`)
    .then(function(respostaDoServidor) {
        return respostaDoServidor.json()
    })
    .then(function(dadosConvertidosEmObjeto) {

        moedas = dadosConvertidosEmObjeto
        moedas.coins.forEach(moeda => {
            const option_moeda = document.createElement("option")
            option_moeda.classList.add(moeda.coin)
            option_moeda.value = moeda.regularMarketPrice
            option_moeda.innerText = moeda.coin
    
            inp_moeda.appendChild(option_moeda)
        })

        // moedas.coins.forEach(moeda => {
        //     const option_moeda = document.createElement("option")
        //     option_moeda.classList.add(moeda.coin)
        //     option_moeda.value = moeda.regularMarketPrice
        //     option_moeda.innerText = moeda.coin
    
        //     inp_moeda.appendChild(option_moeda)
            
        // console.log(moedas)
    })
    // moedas.forEach(moeda => {
    //     // const option_moeda = document.createElement("option")
    //     // option_moeda.value = moeda.coin
    //     // option_moeda.innerText = moeda.coin

    //     // inp_moeda.appendChild(option_moeda)
    //     console.log(moeda)
    // })

    const inp_quantidade = document.createElement("input")
    inp_quantidade.placeholder = "Quantidade"
    inp_quantidade.classList.add("inp_padrao")
    
    // inp_quantidade.type = "number"
    // inp_quantidade.min = "0"
    // inp_quantidade.step = "1"

    const inp_total = document.createElement("p")
    inp_total.classList.add("inp_padrao")
    // inp_total.placeholder = "Total"
    inp_total.innerHTML = "0"

    const img_options = document.createElement("img")
    img_options.src = "assets/more.png"
    // img_options.classList.add("")

    grupo_inputs.appendChild(inp_moeda)
    grupo_inputs.appendChild(inp_quantidade)
    grupo_inputs.appendChild(inp_total)
    grupo_inputs.appendChild(img_options)

    inp_quantidade.addEventListener("keypress", function(event){
        if (event.key === "Enter") {
            const quantidade_atual = event.target.value
            const preco_atual = document.querySelector("option.BTC").value

            console.log(quantidade_atual*preco_atual)
            inp_total.innerText = quantidade_atual*preco_atual
        }
    })

    return grupo_inputs
}