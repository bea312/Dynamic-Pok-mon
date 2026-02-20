const input = document.getElementById('poke-input');
        const btn = document.getElementById('search-btn');
        const display = document.getElementById('display-area');
        const loader = document.getElementById('loader');
        const errorMsg = document.getElementById('error-msg');
        const themeToggle = document.getElementById('theme-toggle');

        
         //  Fetch 
        
        async function getPokemon() {
            const query = input.value.trim().toLowerCase();
            if (!query) return;

            // UI Reset
            display.innerHTML = '';
            errorMsg.classList.add('hidden');
            loader.classList.remove('hidden');
            btn.disabled = true;

            try {
                // Fetching from  PokéAPI
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
                
                if (!response.ok) {
                    throw new Error("Pokémon not found!");
                }

                const data = await response.json();
                
                // Building the Card
                createCard(data);

            } catch (err) {
                errorMsg.textContent = err.message;
                errorMsg.classList.remove('hidden');
            } finally {
                loader.classList.add('hidden');
                btn.disabled = false;
            }
        }

        
       