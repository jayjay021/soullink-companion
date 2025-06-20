// Simple test script for the Pokédex service
import { pokedexService } from '../src/services/pokedexService.js';

async function testPokedexService() {
  console.log('🧪 Testing Pokédex Service...');
  
  try {
    // Load data
    await pokedexService.loadData();
    console.log(`✅ Data loaded successfully. Count: ${pokedexService.getPokemonCount()}`);
    
    // Test getting all Pokémon (limit to first 3 for brevity)
    const allPokemon = pokedexService.getPokemon();
    console.log(`✅ All Pokémon count: ${allPokemon.length}`);
    console.log(`First 3: ${allPokemon.slice(0, 3).map(p => p.name.english).join(', ')}`);
    
    // Test filtering by ID
    const bulbasaur = pokedexService.getPokemon({ id: 1 });
    console.log(`✅ Filter by ID=1: ${bulbasaur.length > 0 ? bulbasaur[0].name.english : 'Not found'}`);
    
    // Test filtering by name
    const pikachuSearch = pokedexService.getPokemon({ name: 'pikachu' });
    console.log(`✅ Filter by name='pikachu': ${pikachuSearch.length} results`);
    if (pikachuSearch.length > 0) {
      console.log(`  - ${pikachuSearch[0].name.english} (ID: ${pikachuSearch[0].id})`);
    }
    
    // Test partial name search
    const bulbaSearch = pokedexService.getPokemon({ name: 'bulba' });
    console.log(`✅ Filter by name='bulba': ${bulbaSearch.length} results`);
    bulbaSearch.forEach(p => console.log(`  - ${p.name.english} (ID: ${p.id})`));
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testPokedexService();
