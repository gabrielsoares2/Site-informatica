let word = document.getElementById("word");
let excel = document.getElementById("excel");
let powerpoint = document.getElementById("powerpoint");

word.addEventListener("mouseover", () =>{
    word.textContent = "Word";
    word.style.color = "#2B579A";
})

word.addEventListener("mouseout", () =>{
    word.textContent = "Criação de Currículo";
    word.style.color = "#F2F2F2"
})

excel.addEventListener("mouseover", () =>{
    excel.textContent = "Excel";
    excel.style.color = "#217346";
})

excel.addEventListener("mouseout", () =>{
    excel.textContent = "Planilhas Automáticas";
    excel.style.color = "#F2F2F2"
})

powerpoint.addEventListener("mouseover", () =>{
    powerpoint.textContent = "Power Point";
    powerpoint.style.color = "#D24726";
})

powerpoint.addEventListener("mouseout", () =>{
    powerpoint.textContent = "Apresentações";
    powerpoint.style.color = "#F2F2F2"
})