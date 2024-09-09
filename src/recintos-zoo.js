const animais = [{
    id: 1,
    especie: "LEAO",
    tamanho: 3,
    bioma: ['savana'],
    carnivoro: true
    
},{
    id: 2,
    especie: 'MACACO',
    tamanho: 1,
    bioma: ['savana', 'floresta'],
    carnivoro: false
},
{
    id: 3,
    especie: "CROCODILO",
    tamanho: 3,
    bioma: ['rio'],
    carnivoro: true
},
{
    id: 4,
    especie: "GAZELA",
    tamanho: 2,
    bioma: ['savana'],
    carnivoro: false
},
{
    id: 5,
    especie: "HIPOPOTAMO",
    tamanho: 4,
    bioma: ['savana', 'rio'],
    carnivoro: false
},
{
    id: 6,
    especie: "LEOPARDO",
    tamanho: 2,
    bioma: ['savana'],
    carnivoro: true
}
]


const recintos = [{
    id: 1,
    bioma: ["savana"],
    tamanho: 10,
    animais: [2,2,2]
}, {
    id: 2,
    bioma: ["floresta"],
    tamanho: 5,
    animais: []
},
{
    id: 3,
    bioma: ["savana", "rio"],
    tamanho: 7,
    animais: [4]
},
{
    id: 4,
    bioma: ["rio"],
    tamanho: 8,
    animais: []
}, {
    id: 5,
    bioma: ["savana"],
    tamanho: 9,
    animais: [1]
}]

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        if (quantidade == 0) {
            return {erro: "Quantidade inválida", recintosViaveis: false};
        }
        const animalAchado = animais.find(a => a.especie === animal)
        if (!animalAchado) {
            return {erro: "Animal inválido", recintosViaveis: false};
        }
        const recintosViaveis = 
        recintos.filter(recinto => 
         animais.filter(animal => recinto.animais.includes(animal.id)).every(animal => animal.carnivoro === animalAchado.carnivoro)
        && animalAchado.bioma.some(bioma => recinto.bioma.includes(bioma)))
        const recinto = recintosViaveis.filter
        (b => b.tamanho >= quantidade && (b.tamanho - b.animais.length) >= quantidade);
        if (!recinto.length) {
            return {erro: "Não há recinto viável", recintosViaveis: false};
        }
        
        return {erro: false, recintosViaveis: 
            recinto.map 
            (r => {
                const animaisDoRecinto = r.animais.map (animal => animais.find(a => a.id === animal));
                const especiesDoRecinto = new Set ([...animaisDoRecinto.map(animal => animal.id), animalAchado.id]);
                const espacoExtra = especiesDoRecinto.size > 1? 1:0;
                const tamanhoOcupado = animaisDoRecinto.reduce ((acc, animal) => acc + animal.tamanho, 0) 
                const espacoLivre = r.tamanho - (tamanhoOcupado + (animalAchado.tamanho * quantidade ) + espacoExtra);
                return `Recinto ${r.id} (espaço livre: ${espacoLivre} total: ${r.tamanho})`})}
               
    }

}

export { RecintosZoo as RecintosZoo };
