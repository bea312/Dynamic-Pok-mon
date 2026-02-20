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

        
         // 2. DOM Construction & Destructuring
         
        function createCard(pokemon) {
            // DESTRUCTURING
            const { name, id, height, weight, base_experience, types, sprites } = pokemon;

            // DOM CONSTRUCTION
            const card = document.createElement('div');
            card.className = "bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 border-b-8 border-red-500 animate-pop text-center relative overflow-hidden";

            // Formatting ID and Types
            const pokeId = `#${String(id).padStart(3, '0')}`;
            const typesMarkup = types.map(t => `
                <span class="px-3 py-1 bg-slate-100 dark:bg-gray-700 rounded-lg text-[10px] font-black uppercase text-slate-500 dark:text-slate-300">
                    ${t.type.name}
                </span>
            `).join('');

            // Setting content
            card.innerHTML = `
                <div class="absolute top-4 left-6 text-4xl font-black text-slate-100 dark:text-gray-700 italic select-none">${pokeId}</div>
                
                <div class="relative z-10">
                    <div class="flex justify-center items-center mb-4">
                        <img src="${sprites.front_default}" class="w-32 h-32 hover:scale-110 transition-transform" alt="Front">
                        <img src="${sprites.front_shiny}" class="w-32 h-32 hover:scale-110 transition-transform" alt="Shiny">
                    </div>
                    
                    <h2 class="text-3xl font-black capitalize dark:text-white mb-2">${name}</h2>
                    <div class="flex justify-center gap-2 mb-8">${typesMarkup}</div>

                    <div class="grid grid-cols-3 gap-2 border-t dark:border-gray-700 pt-6">
                        <div>
                            <p class="text-[10px] uppercase text-slate-400 font-bold">Height</p>
                            <p class="font-bold dark:text-white">${height / 10}m</p>
                        </div>
                        <div class="border-x dark:border-gray-700">
                            <p class="text-[10px] uppercase text-slate-400 font-bold">Weight</p>
                            <p class="font-bold dark:text-white">${weight / 10}kg</p>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase text-slate-400 font-bold">Base XP</p>
                            <p class="font-bold dark:text-white">${base_experience}</p>
                        </div>
                    </div>
                </div>
            `;

            display.appendChild(card);
        }

        //  Event Listeners 
        btn.addEventListener('click', getPokemon);
        input.addEventListener('keypress', (e) => { if(e.key === 'Enter') getPokemon(); });
        
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            document.getElementById('theme-icon').textContent = 
                document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
        });