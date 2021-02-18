const fetch = require('node-fetch');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150 ; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    return Promise.all(promises).then( (results) => {
        const pokemon = results.map( (result) => ({
            name: result.name,
            image:result.sprites['front_default'],
            type: result.types.map( (type) => type.type.name),
            stats: result.stats.map( (stat) => ({
                name : stat.stat.name,
                value : stat.base_stat
            })),
            abilities: result.abilities.map( (ability) => ({
                hidden : (ability.is_hidden) ? ability.ability.name : '',
                normal : ability.ability.name
            })),
            id: result.id
        }));
        return pokemon;
    });
};


module.exports = async function() {
    return await fetchPokemon();
}