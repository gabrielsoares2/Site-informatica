let word = document.getElementById("word");
let excel = document.getElementById("excel");
let powerpoint = document.getElementById("powerpoint");
let hardware = document.getElementById("hardware");
let software = document.getElementById("software");

word.addEventListener("mouseover", () =>{
    word.textContent = "Word";
    word.style.color = "#2B579A";
})

word.addEventListener("mouseout", () =>{
    word.textContent = "Documentos";
    word.style.color = "#F2F2F2"
})

excel.addEventListener("mouseover", () =>{
    excel.textContent = "Excel";
    excel.style.color = "#217346";
})

excel.addEventListener("mouseout", () =>{
    excel.textContent = "Planilhas/Tabelas";
    excel.style.color = "#F2F2F2"
})

powerpoint.addEventListener("mouseover", () =>{
    powerpoint.textContent = "Power Point";
    powerpoint.style.color = "#D24726";
})

powerpoint.addEventListener("mouseout", () =>{
    powerpoint.textContent = "Apresentações/Slides";
    powerpoint.style.color = "#F2F2F2"
})

hardware.addEventListener("mouseover", () =>{
    hardware.innerHTML = "Toda parte física do computador<br> Tudo que podemos tocar com nossas mãos";
    hardware.style.color = "rgba(51, 168, 219, 1)";
})

hardware.addEventListener("mouseout", () =>{
    hardware.textContent = "Hardware";
    hardware.style.color = "#F2F2F2"
})

software.addEventListener("mouseover", () =>{
    software.innerHTML = "Toda parte lógica do computador<br> (Programas, Arquivos, Jogos, etc...)";
    software.style.color = "rgba(51, 168, 219, 1)";
})

software.addEventListener("mouseout", () =>{
    software.textContent = "Software";
    software.style.color = "#F2F2F2"
})