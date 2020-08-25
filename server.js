const request = require('request');
const cheerio = require('cheerio');
const fs    = require('fs');
const _ = require('lodash');
const handle = require('./utils/handleData')
const urlElement = [
    "hydrogen",
    "helium",
    "lithium",
    "beryllium",
    "boron",
    "carbon",
    "nitrogen",
    "oxygen",
    "fluorine",
    "neon",
    "sodium",
    "magnesium",
    "aluminium",
    "silicon",
    "phosphorus",
    "sulfur",
    "chlorine",
    "argon",
    "potassium",
    "calcium",
    "scandium",
    "titanium",
    "vanadium",
    "chromium",
    "manganese",
    "iron",
    "cobalt",
    "nickel",
    "copper",
    "zinc",
    "gallium",
    "germanium",
    "arsenic",
    "selenium",
    "bromine",
    "krypton",
    "rubidium",
    "strontium",
    "yttrium",
    "zirconium",
    "niobium",
    "molybdenum",
    "technetium",
    "ruthenium",
    "rhodium",
    "palladium",
    "silver",
    "cadmium",
    "indium",
    "tin",
    "antimony",
    "tellurium",
    "iodine",
    "xenon",
    "cesium",
    "barium",
    "lanthanum",
    "cerium",
    "praseodymium",
    "neodymium",
    "promethium",
    "samarium",
    "europium",
    "gadolinium",
    "terbium",
    "dysprosium",
    "holmium",
    "erbium",
    "thulium",
    "ytterbium",
    "lutetium",
    "hafnium",
    "tantalum",
    "tungsten",
    "rhenium",
    "osmium",
    "iridium",
    "platinum",
    "gold",
    "mercury",
    "thallium",
    "lead",
    "bismuth",
    "polonium",
    "astatine",
    "radon",
    "francium",
    "radium",
    "actinium",
    "thorium",
    "protactinium",
    "uranium",
    "neptunium",
    "plutonium",
    "americium",
    "curium",
    "berkelium",
    "californium",
    "einsteinium",
    "fermium",
    "mendelevium",
    "nobelium",
    "lawrencium",
    "rutherfordium",
    "dubnium",
    "seaborgium",
    "bohrium",
    "hassium",
    "meitnerium",
    "darmstadtium",
    "roentgenium",
    "copernicium",
    "nihonium",
    "flerovium",
    "moscovium",
    "livermorium",
    "tennessine",
    "oganesson",
    "ununennium"
]

let getData = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if( err ) reject(err)
            if( res.statusCode != 200)
                reject('Some thing wrong !')
            resolve(body)
        })
    })
}


let crawlData = async (endPoint) => {
   try{
        const body = await getData(`https://en.wikipedia.org/wiki/${endPoint}`);
        let $ = cheerio.load(body);
        let rawData = []
        const dataBox = 'div#content>#bodyContent>#mw-content-text>.mw-parser-output>.infobox>tbody>tr';
        $(dataBox).map( (i, el) => {
            let title = $(el).find('th').text();
            let value  = $(el).find('td').text();
            if(title != '')
                rawData.push([title, value]);
        });
        return rawData;
   }
   catch(err){
       console.err('' + err);
   }
}

let check = (arr, word) => {
    for(let i = 0; i < arr.length; i++){
        if(_.includes(arr[i][0], word)){
            return arr[i][1];
        }
    }
    return null;
} 

crawlData('boron').then(result => {
    let element = {}
    element.name = result[0][0] === undefined ? '' : result[0][0]
    element.alternative = check(result, 'Alternative')
    element.appearance = check(result, 'Appearance')
    element.atomic_weight = handle.handle_weight(check(result, 'Standard atomic'))
    element.number = Number(check(result, 'Atomic number'))
    element.group = Number(check(result, 'Group').replace(/[^0-9]/gi,''))
    element.period = Number(check(result, 'Period').replace(/[^0-9]/gi,''))
    element.block = check(result, 'Block')
    element.category = check(result, 'Element category')
    element.configuration = check(result, 'Electron configuration')
    element.shells = check(result, 'Electrons per shell').replace(/\s+/g,'').split(',').map(x => +x)
    element.phase = check(result, 'Phase')
    element.melting_point = check(result, 'Melting point')
    element.boiling_point = check(result, 'Boiling point')
    element.density = check(result, 'Density')
    element.density_when_liquid = check(result, 'when liquid')
    element.heat_of_fusion = check(result, 'Heat of fusion')
    element.heat_of_vaporization = check(result, 'Heat of vaporization')
    element.molar_heat_capacity = check(result, 'Molar heat capacity')
    element.oxidation_state = handle.handle_oxidation(check(result, 'Oxidation states'))
    element.electronegativity = Number(handle.only_number(check(result, 'Electronegativity')))
    element.atomic_radius = Number(handle.only_number(check(result, 'Atomic radius')))
    element.covalent_radius = handle.covalent_radius(check(result, 'Covalent radius'))
    element.vanderwaals_radius = check(result, 'Van der Waals radius')
    element.natural_occurrence = check(result, 'Natural occurrence')
    element.crystal_structure = handle.handle_structure(check(result, 'Crystal structure'))
    element.speed_of_sound = check(result, 'Speed of sound')
    element.thermal_expansion = check(result, 'Thermal expansion')
    element.thermal_conductivity = check(result, 'Thermal conductivity')
    element.electrical_resistivity = check(result, 'Electrical resistivity')
    element.magnetic_susceptibility = check(result, 'Magnetic susceptibility')
    element.young_modulus = check(result, `Young's modulus`)
    element.shear_modulus = check(result, 'Shear modulus')
    element.bulk_modulus = check(result, 'Bulk modulus')
    element.poisson_ratio = check(result, 'Poisson ratio')
    element.mohs_hardness = check(result, 'Mohs hardness')
    element.brinell_hardness = check(result, 'Brinell hardness')
    element.brinell_hardness = check(result, 'Brinell hardness')
    element.cas_number = check(result, 'CAS Number')
    element.naming = check(result, 'Naming')
    element.named_by = check(result, 'Named by')
    element.discovery = check(result, 'Discovery')
    element.first_isolation = check(result, 'First isolation')

    fs.readFile('data-element.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        let obj = JSON.parse(data); 
        obj.element.push(element); 
        let finalElement = JSON.stringify(obj);
        fs.writeFileSync('data-element.json', finalElement);
    }});
})



