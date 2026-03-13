// CONFIGURATION GOOGLE SHEETS APP SCRIPT URL
        // Remplacer cette URL par celle générée lors du déploiement de votre Google Apps Script
        const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwUWD2Pj0ZpWWydb7bJJw_EHE7N0fPOy1aJ95Qu9IezNC5zhXB7d3Iz5EIl17X-QU46/exec"; 

        // LISTE DES PAYS (Triée par ordre alphabétique)
        const COUNTRIES = [
            { id: 'dz', name: 'Algérie' },
            { id: 'bj', name: 'Bénin' },
            { id: 'br', name: 'Brésil' },
            { id: 'bf', name: 'Burkina' },
            { id: 'bi', name: 'Burundi' },
            { id: 'ca', name: 'Canada' },
            { id: 'ci', name: "Côte d'Ivoire" },
            { id: 'fr', name: 'France' },
            { id: 'gn', name: 'Guinée' },
            { id: 'in', name: 'Inde' },
            { id: 'ma', name: 'Maroc' },
            { id: 'mx', name: 'Mexique' },
            { id: 'ng', name: 'Nigeria' },
            { id: 'cd', name: 'RDC' },
            { id: 'ch', name: 'Suisse' },
            { id: 'tg', name: 'Togo' }
        ];

        // BASE DE DONNÉES DES QUESTIONS (10 par cat : 5 Faciles, 4 Moyennes, 1 Difficile)
        const QUESTIONS = {
            culture: [
                // FACILES
                { q: "De quel pays est originaire la célèbre chanteuse Céline Dion ?", options: ["France", "Suisse", "Canada", "Belgique"], a: "Canada" },
                { q: "De quel pays vient Fally Ipupa, star de la musique africaine ?", options: ["RDC", "Côte d'Ivoire", "Nigeria", "Bénin"], a: "RDC" },
                { q: "Quel pays est mondialement connu pour son Festival de Cannes ?", options: ["Suisse", "Canada", "France", "Maroc"], a: "France" },
                { q: "Le groupe Magic System, célèbre pour la chanson 'Premier Gaou', vient de...", options: ["Guinée", "Togo", "Bénin", "Côte d'Ivoire"], a: "Côte d'Ivoire" },
                { q: "Dans quel pays est né le légendaire footballeur Pelé ?", options: ["Mexique", "Brésil", "France", "Nigeria"], a: "Brésil" },
                // MOYENNES
                { q: "'Nollywood' est l'industrie du cinéma très célèbre de quel pays ?", options: ["Afrique du Sud", "Kenya", "Nigeria", "RDC"], a: "Nigeria" },
                { q: "Angélique Kidjo, lauréate de plusieurs Grammy Awards, est originaire du...", options: ["Bénin", "Togo", "Burkina", "Guinée"], a: "Bénin" },
                { q: "L'humoriste Jamel Debbouze a des origines de quel pays d'Afrique du Nord ?", options: ["Algérie", "Tunisie", "Maroc", "Égypte"], a: "Maroc" },
                { q: "L'auteur de la célèbre bande dessinée 'Titeuf', Zep, est de quelle nationalité ?", options: ["Française", "Belge", "Canadienne", "Suisse"], a: "Suisse" },
                // DIFFICILE
                { q: "L'écrivain Camara Laye, auteur du célèbre roman 'L'Enfant noir', est natif de...", options: ["Sénégal", "Mali", "Guinée", "Côte d'Ivoire"], a: "Guinée" }
            ],
            pays: [
                // FACILES
                { q: "Quelle est la capitale de la France ?", options: ["Lyon", "Marseille", "Paris", "Bordeaux"], a: "Paris" },
                { q: "Ottawa est la capitale de quel grand pays nord-américain ?", options: ["États-Unis", "Canada", "Mexique", "Groenland"], a: "Canada" },
                { q: "Rabat est la capitale de quel pays d'Afrique du Nord ?", options: ["Algérie", "Maroc", "Tunisie", "Libye"], a: "Maroc" },
                { q: "Kinshasa est la plus grande ville et capitale de quel pays ?", options: ["RDC", "Congo-Brazzaville", "Burundi", "Angola"], a: "RDC" },
                { q: "Quelle est la capitale de l'Inde ?", options: ["Mumbai", "New Delhi", "Calcutta", "Bangalore"], a: "New Delhi" },
                // MOYENNES
                { q: "Quelle est la capitale de la Suisse ?", options: ["Genève", "Zurich", "Berne", "Lausanne"], a: "Berne" },
                { q: "Lomé est la capitale de quel pays d'Afrique de l'Ouest ?", options: ["Bénin", "Guinée", "Burkina", "Togo"], a: "Togo" },
                { q: "Quel est le pays le plus vaste d'Afrique par sa superficie ?", options: ["RDC", "Algérie", "Nigeria", "Soudan"], a: "Algérie" },
                { q: "Dans quel pays se trouve la péninsule du Yucatán ?", options: ["Brésil", "Colombie", "Mexique", "Pérou"], a: "Mexique" },
                // DIFFICILE
                { q: "Depuis 2019, quelle ville est devenue la capitale politique du Burundi ?", options: ["Bujumbura", "Gitega", "Ngozi", "Rumonge"], a: "Gitega" }
            ],
            lieux: [
                // FACILES
                { q: "Où se trouve la célèbre Tour Eiffel ?", options: ["Canada", "Suisse", "France", "Belgique"], a: "France" },
                { q: "La statue du Christ Rédempteur domine la ville de Rio de Janeiro dans quel pays ?", options: ["Mexique", "Brésil", "Argentine", "Pérou"], a: "Brésil" },
                { q: "Dans quel pays peut-on visiter le magnifique Taj Mahal ?", options: ["Inde", "Pakistan", "Thaïlande", "Chine"], a: "Inde" },
                { q: "Les célèbres chutes du Niagara se trouvent à la frontière entre les États-Unis et le...", options: ["Mexique", "Canada", "Brésil", "Russie"], a: "Canada" },
                { q: "Chichén Itzá, une des nouvelles merveilles du monde, se situe au...", options: ["Guatemala", "Brésil", "Mexique", "Honduras"], a: "Mexique" },
                // MOYENNES
                { q: "Où se trouve la Basilique Notre-Dame de la Paix, l'une des plus grandes au monde ?", options: ["France", "Côte d'Ivoire", "Bénin", "RDC"], a: "Côte d'Ivoire" },
                { q: "Le Mont Cervin (Matterhorn), célèbre sommet des Alpes, se trouve principalement en...", options: ["France", "Suisse", "Italie", "Autriche"], a: "Suisse" },
                { q: "Dans quel pays peut-on se promener sur la place Jemaa el-Fna ?", options: ["Algérie", "Tunisie", "Maroc", "Égypte"], a: "Maroc" },
                { q: "Le volcan Nyiragongo, célèbre pour son lac de lave, se situe à l'est de...", options: ["Kenya", "RDC", "Burundi", "Tanzanie"], a: "RDC" },
                // DIFFICILE
                { q: "Les ruines de Loropéni, forteresse millénaire classée par l'UNESCO, se trouvent au...", options: ["Togo", "Bénin", "Mali", "Burkina"], a: "Burkina" }
            ],
            mots: [
                // FACILES
                { q: "Quel pain long et croustillant est le symbole de la gastronomie française ?", options: ["La brioche", "Le croissant", "La baguette", "Le pain de mie"], a: "La baguette" },
                { q: "Quel liquide sucré, tiré d'un arbre, est l'emblème culinaire du Canada ?", options: ["Le miel d'acacia", "Le sirop d'érable", "La sève de bouleau", "Le caramel"], a: "Le sirop d'érable" },
                { q: "Quel plat populaire mexicain est composé d'une galette pliée remplie de viande ?", options: ["Le sushi", "La pizza", "Le taco", "Le couscous"], a: "Le taco" },
                { q: "Quelle spécialité suisse consiste à tremper des morceaux de pain dans du fromage fondu ?", options: ["La raclette", "La fondue", "La tartiflette", "Le gratin"], a: "La fondue" },
                { q: "Qu'est-ce que l'Attiéké, un plat très populaire en Côte d'Ivoire ?", options: ["Une sauce piquante", "Une semoule de manioc", "Un poisson braisé", "Une boisson locale"], a: "Une semoule de manioc" },
                // MOYENNES
                { q: "Au Congo et en RDC, que signifie 'Saper' dans le mouvement culturel de la SAPE ?", options: ["Danser vite", "Boire beaucoup", "Bien s'habiller", "Couper du bois"], a: "Bien s'habiller" },
                { q: "La 'Babouche' est une chaussure traditionnelle en cuir très populaire au...", options: ["Maroc", "Sénégal", "Brésil", "Inde"], a: "Maroc" },
                { q: "Qu'est-ce qu'un 'Zémidjan' couramment utilisé au Togo et au Bénin ?", options: ["Un repas épicé", "Une moto-taxi", "Un vêtement coloré", "Un instrument de musique"], a: "Une moto-taxi" },
                { q: "De quel pays d'Afrique du Nord le 'Raï' est-il un genre musical traditionnel ?", options: ["Égypte", "Maroc", "Tunisie", "Algérie"], a: "Algérie" },
                // DIFFICILE
                { q: "Au Burundi, quel instrument est au centre de performances sacrées classées par l'UNESCO ?", options: ["Le balafon", "La kora", "Le tambour", "La flûte en bambou"], a: "Le tambour" }
            ]
        };

        // ETAT DE L'APPLICATION
        const appState = {
            user: { username: '', countryName: '', countryFlag: '', avatarUrl: '' },
            currentQuestions: [],
            qIndex: 0,
            score: 0,
            timeLeft: 90,
            timerInterval: null,
            audioEnabled: true,
            audioCtx: null,
            hasPlayed: false
        };

        // --- AUDIO SYSTEM (Web Audio API for basic beeps, avoids broken external links) ---
        function initAudio() {
            if (!appState.audioCtx) {
                appState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        function playSound(type) {
            if (!appState.audioEnabled) return;
            initAudio();
            const ctx = appState.audioCtx;
            if(ctx.state === 'suspended') ctx.resume();
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'success') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
                gain.gain.setValueAtTime(0.5, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'fail') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.5, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'win') {
                // Chord
                [523.25, 659.25, 783.99].forEach(freq => {
                    let o = ctx.createOscillator();
                    let g = ctx.createGain();
                    o.type = 'triangle';
                    o.frequency.value = freq;
                    o.connect(g);
                    g.connect(ctx.destination);
                    g.gain.setValueAtTime(0.3, ctx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
                    o.start(ctx.currentTime);
                    o.stop(ctx.currentTime + 1);
                });
            } else if (type === 'lose') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(200, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.8);
                gain.gain.setValueAtTime(0.5, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.8);
            }
        }

        // --- APP CONTROLLER ---
        const app = {
            leaderboardData: [], // Stocke les données du leaderboard pour le téléchargement
            init() {
                this.renderCountryGrid();
                this.checkSession(); // Vérification de la session au démarrage
                
                // --- SETUP BACKGROUND MUSIC ---
                const bgMusic = document.getElementById('bg-music');
                bgMusic.volume = 0.15; // Volume à 15% pour être "Chill" et ne pas casser les oreilles
                
                // Astuce pour contourner le blocage "Autoplay" des navigateurs
                // La musique se lance au premier clic de l'utilisateur sur l'écran
                const startBgm = () => {
                    if (appState.audioEnabled && bgMusic.paused) {
                        bgMusic.play().catch(e => console.log("Attente interaction utilisateur pour l'audio"));
                    }
                    document.removeEventListener('click', startBgm);
                    document.removeEventListener('touchstart', startBgm);
                };
                document.addEventListener('click', startBgm);
                document.addEventListener('touchstart', startBgm);
                // ------------------------------

                // Gestion de la sélection de pays
                document.querySelectorAll('.country-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        document.querySelectorAll('.country-card').forEach(c => c.classList.remove('selected'));
                        e.currentTarget.classList.add('selected');
                        appState.user.countryName = e.currentTarget.dataset.name;
                        appState.user.countryFlag = e.currentTarget.dataset.flag;
                        document.getElementById('login-error').classList.add('hidden'); // Cacher l'erreur si on sélectionne
                    });
                });
                // Initialisation des icônes Lucide
                lucide.createIcons();
                // Recalcul du scale de la carte au redimensionnement
                window.addEventListener('resize', () => {
                    if (!document.getElementById('view-result').classList.contains('hidden')) {
                        app.scaleCard();
                    }
                });
            },

            renderCountryGrid() {
                const grid = document.getElementById('country-grid');
                grid.innerHTML = COUNTRIES.map(c => `
                    <!-- Ajustement strict à 10.5% sur LG pour garantir 8 éléments par ligne avec les gaps -->
                    <div class="country-card p-2 flex flex-col items-center justify-center text-center w-[23%] md:w-[14%] lg:w-[10.5%]" data-name="${c.name}" data-flag="https://flagcdn.com/w40/${c.id}.png">
                        <img src="https://flagcdn.com/w40/${c.id}.png" alt="${c.name}" class="w-8 md:w-10 lg:w-12 h-auto mb-1 rounded-sm shadow-sm object-cover border border-gray-200">
                        <span class="text-[9px] md:text-[11px] font-bold uppercase truncate w-full leading-tight text-wood-dark">${c.name}</span>
                    </div>
                `).join('');
            },

            // --- GESTION DE SESSION (CACHE) ---
            checkSession() {
                const cachedData = localStorage.getItem('cog_user_session');
                if (cachedData) {
                    let session = JSON.parse(cachedData);
                    const now = new Date().getTime();
                    // Vérifier si la session a moins de 1 heure (3600000 millisecondes)
                    if (now - session.timestamp < 3600000) {
                        // Compatibilité ascendante : on s'assure que attempts existe
                        if (session.attempts === undefined) {
                            session.attempts = 0;
                            localStorage.setItem('cog_user_session', JSON.stringify(session));
                        }

                        // Remplir la modale de retour
                        document.getElementById('wb-avatar').src = session.user.avatarUrl;
                        document.getElementById('wb-username').textContent = session.user.username;
                        document.getElementById('wb-country').textContent = session.user.countryName;
                        document.getElementById('wb-flag').src = session.user.countryFlag;
                        
                        this.pendingSession = session.user; // Sauvegarde temporaire
                        document.getElementById('modal-welcome-back').classList.remove('hidden');
                        return;
                    } else {
                        // Session expirée
                        localStorage.removeItem('cog_user_session');
                    }
                }
                // Si pas de session valide, on s'assure d'être sur le login
                this.switchView('view-login');
            },

            continueSession() {
                document.getElementById('modal-welcome-back').classList.add('hidden');
                appState.user = this.pendingSession;
                this.updateDashboardUI();
                this.switchView('view-dashboard');
                document.getElementById('bottom-nav').classList.remove('hidden');
                document.getElementById('bottom-nav').classList.add('flex');
            },

            clearSession() {
                localStorage.removeItem('cog_user_session');
                document.getElementById('modal-welcome-back').classList.add('hidden');
                this.switchView('view-login');
            },

            updateDashboardUI() {
                document.getElementById('dash-username').textContent = appState.user.username;
                document.getElementById('dash-country').textContent = appState.user.countryName;
                document.getElementById('dash-flag').src = appState.user.countryFlag;
                document.getElementById('dash-flag').classList.remove('hidden');
                document.getElementById('dash-avatar').src = appState.user.avatarUrl;
            },
            // --- FIN GESTION SESSION ---

            async login() {
                const usernameInput = document.getElementById('input-username').value.trim();
                const errorDiv = document.getElementById('login-error');
                const btn = document.getElementById('btn-login');
                
                if (!usernameInput) {
                    errorDiv.textContent = "⚠️ Veuillez entrer votre pseudo !";
                    errorDiv.classList.remove('hidden');
                    return;
                }
                if (!appState.user.countryName) {
                    errorDiv.textContent = "⚠️ Veuillez sélectionner votre pays !";
                    errorDiv.classList.remove('hidden');
                    return;
                }
                
                errorDiv.classList.add('hidden');

                // Clean username, remove @ if user typed it
                const username = usernameInput.startsWith('@') ? usernameInput.substring(1) : usernameInput;
                
                // --- VÉRIFICATION DU PSEUDO (ANTI-DOUBLON) ---
                btn.innerHTML = '<div class="inline-block animate-spin w-5 h-5 border-4 border-white border-t-transparent rounded-full align-middle mr-2"></div> Vérification...';
                btn.disabled = true;
                btn.classList.add('opacity-70', 'cursor-not-allowed');

                try {
                    let foundUser = null;

                    if(!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "VOTRE_URL_WEB_APP_ICI" || GOOGLE_SHEET_URL.includes("VOTRE_URL")) {
                        // Simulation (Mock) si l'URL Google Sheet n'est pas encore connectée (Correction au format PNG ici aussi)
                        const mockUsers = [
                            { username: 'Marie', country: 'France', emoji: 'https://flagcdn.com/w40/fr.png', avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Marie&backgroundColor=c0aede,b6e3f4,ffdfbf' },
                            { username: 'Kofi', country: 'Côte d\'Ivoire', emoji: 'https://flagcdn.com/w40/ci.png', avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Kofi&backgroundColor=c0aede,b6e3f4,ffdfbf' }
                        ];
                        foundUser = mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
                        await new Promise(r => setTimeout(r, 800)); // Simule le temps de réseau
                    } else {
                        // Vrai appel vers ta base de données Google Sheets
                        const res = await fetch(GOOGLE_SHEET_URL);
                        const data = await res.json();
                        // Vérifie si le nom existe déjà et récupère ses données complètes
                        foundUser = data.find(u => u.username.toLowerCase() === username.toLowerCase());
                    }

                    if (foundUser) {
                        // Remplir et afficher la popup de compte existant
                        document.getElementById('af-username-text').textContent = foundUser.username;
                        document.getElementById('af-avatar').src = foundUser.avatar || `https://api.dicebear.com/7.x/bottts/png?seed=${foundUser.username}&backgroundColor=c0aede,b6e3f4,ffdfbf`;
                        document.getElementById('af-country').textContent = foundUser.country;
                        
                        // Sécurité pour bien afficher le drapeau du joueur retrouvé
                        const flagSrc = (foundUser.emoji && foundUser.emoji.startsWith('http')) ? foundUser.emoji : appState.user.countryFlag;
                        document.getElementById('af-flag').src = flagSrc;

                        this.pendingAccount = foundUser; // On sauvegarde le compte trouvé en attente

                        document.getElementById('modal-account-found').classList.remove('hidden');
                        
                        // Restaure le bouton
                        btn.innerHTML = 'JOUER';
                        btn.disabled = false;
                        btn.classList.remove('opacity-70', 'cursor-not-allowed');
                        return; // On stoppe le processus de création de compte
                    }
                } catch (err) {
                    console.error("Erreur de vérification ignorée pour ne pas bloquer le jeu :", err);
                }

                // Restauration du bouton si le pseudo est libre (NOUVEAU COMPTE)
                btn.innerHTML = 'JOUER';
                btn.disabled = false;
                btn.classList.remove('opacity-70', 'cursor-not-allowed');

                appState.user.username = username;
                
                // --- CORRECTION MAJEURE : Utilisation de PNG au lieu de SVG pour html2canvas ---
                const seed = encodeURIComponent(username);
                appState.user.avatarUrl = `https://api.dicebear.com/7.x/bottts/png?seed=${seed}&backgroundColor=c0aede,b6e3f4,ffdfbf`;

                // Sauvegarder la session dans le cache pour 1h avec 0 tentative initiale
                localStorage.setItem('cog_user_session', JSON.stringify({
                    user: appState.user,
                    timestamp: new Date().getTime(),
                    attempts: 0
                }));

                // Création de l'utilisateur dans la base de données de manière silencieuse (Score 0)
                this.submitScoreToSheet(0);

                this.updateDashboardUI();
                this.switchView('view-dashboard');
                document.getElementById('bottom-nav').classList.remove('hidden');
                document.getElementById('bottom-nav').classList.add('flex');
            },

            // --- NOUVELLES FONCTIONS POUR CONFIRMER/ANNULER UN COMPTE EXISTANT ---
            confirmAccountFound() {
                document.getElementById('modal-account-found').classList.add('hidden');
                
                // On restaure les données de l'utilisateur depuis la BD
                appState.user.username = this.pendingAccount.username;
                appState.user.countryName = this.pendingAccount.country;
                // Forcer le format PNG si l'ancienne URL était un SVG dans la BD
                let userAvatar = this.pendingAccount.avatar || `https://api.dicebear.com/7.x/bottts/png?seed=${this.pendingAccount.username}&backgroundColor=c0aede,b6e3f4,ffdfbf`;
                appState.user.avatarUrl = userAvatar.replace('/svg?', '/png?');
                appState.user.countryFlag = (this.pendingAccount.emoji && this.pendingAccount.emoji.startsWith('http')) 
                    ? this.pendingAccount.emoji 
                    : `https://flagcdn.com/w40/${COUNTRIES.find(c => c.name === this.pendingAccount.country)?.id || 'fr'}.png`;

                // Sauvegarder la session dans le cache pour 1h avec 0 tentative initiale (relance le chrono)
                localStorage.setItem('cog_user_session', JSON.stringify({
                    user: appState.user,
                    timestamp: new Date().getTime(),
                    attempts: 0
                }));

                this.updateDashboardUI();
                this.switchView('view-dashboard');
                document.getElementById('bottom-nav').classList.remove('hidden');
                document.getElementById('bottom-nav').classList.add('flex');
            },

            cancelAccountFound() {
                document.getElementById('modal-account-found').classList.add('hidden');
                this.pendingAccount = null;
                // L'utilisateur reste sur la page de login pour modifier son pseudo car c'est un autre joueur
            },

            switchView(viewId) {
                ['view-login', 'view-dashboard', 'view-game', 'view-result'].forEach(v => {
                    document.getElementById(v).classList.add('hidden');
                });
                document.getElementById(viewId).classList.remove('hidden');
            },

            startGame(category) {
                initAudio(); // Initialize audio context on first user interaction (game start)
                
                // --- VÉRIFICATION DE LA LIMITE DE TENTATIVES (CACHE) ---
                const cachedData = localStorage.getItem('cog_user_session');
                if (cachedData) {
                    let session = JSON.parse(cachedData);
                    
                    // Si le joueur a déjà 2 tentatives ou plus, on le bloque
                    if (session.attempts >= 2) {
                        document.getElementById('modal-limit').classList.remove('hidden');
                        lucide.createIcons(); // Assure l'affichage de l'icône timer-off
                        return; // Stoppe le lancement du jeu
                    }

                    // Sinon, on incrémente sa tentative et on met à jour le cache
                    session.attempts += 1;
                    localStorage.setItem('cog_user_session', JSON.stringify(session));
                } else {
                    // Sécurité : S'il n'y a plus de cache du tout, on renvoie au login
                    this.switchView('view-login');
                    return;
                }
                // -------------------------------------------------------

                // Préparation des questions
                appState.currentQuestions = [...QUESTIONS[category]].sort(() => Math.random() - 0.5);
                appState.qIndex = 0;
                appState.score = 0;
                appState.timeLeft = 90;

                document.getElementById('game-score').textContent = "0";
                
                this.switchView('view-game');
                document.getElementById('bottom-nav').classList.add('hidden'); // Cacher la nav en jeu
                
                this.renderQuestion();
                this.startTimer();
            },

            startTimer() {
                clearInterval(appState.timerInterval);
                const bar = document.getElementById('timer-bar');
                const text = document.getElementById('timer-text');
                
                appState.timerInterval = setInterval(() => {
                    appState.timeLeft--;
                    
                    // Update UI
                    const percentage = (appState.timeLeft / 90) * 100;
                    bar.style.width = `${percentage}%`;
                    
                    // Format MM:SS
                    const m = Math.floor(appState.timeLeft / 60);
                    const s = appState.timeLeft % 60;
                    text.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;

                    // Color change
                    if(appState.timeLeft < 15) bar.className = "bg-glg-red h-full transition-all duration-1000";
                    else if(appState.timeLeft < 45) bar.className = "bg-glg-yellow h-full transition-all duration-1000";
                    else bar.className = "bg-glg-green h-full transition-all duration-1000";

                    if (appState.timeLeft <= 0) {
                        this.endGame();
                    }
                }, 1000);
            },

            renderQuestion() {
                if (appState.qIndex >= appState.currentQuestions.length) {
                    return this.endGame();
                }

                const qData = appState.currentQuestions[appState.qIndex];
                document.getElementById('q-counter').textContent = `Question ${appState.qIndex + 1}/10`;
                document.getElementById('question-text').textContent = qData.q;

                // Shuffle options
                const options = [...qData.options].sort(() => Math.random() - 0.5);
                
                const grid = document.getElementById('answers-grid');
                grid.innerHTML = options.map(opt => `
                    <button onclick="app.checkAnswer('${opt.replace(/'/g, "\\'")}')" class="wood-btn w-full p-4 text-left font-semibold text-lg hover:bg-wood-light active:bg-wood-base transition-colors">
                        ${opt}
                    </button>
                `).join('');
            },

            checkAnswer(selected) {
                const correct = appState.currentQuestions[appState.qIndex].a;
                if (selected === correct) {
                    appState.score++;
                    document.getElementById('game-score').textContent = appState.score;
                    playSound('success');
                } else {
                    playSound('fail');
                }
                
                appState.qIndex++;
                setTimeout(() => this.renderQuestion(), 200); // Petit délai pour fluidité
            },

            endGame() {
                clearInterval(appState.timerInterval);
                
                // Setup Result View
                document.getElementById('res-avatar').src = appState.user.avatarUrl;
                document.getElementById('res-username').textContent = appState.user.username;
                document.getElementById('res-country').textContent = appState.user.countryName;
                document.getElementById('res-flag').src = appState.user.countryFlag;
                document.getElementById('res-flag').classList.remove('hidden');
                document.getElementById('res-score').textContent = `${appState.score}/10`;
                
                if (appState.score >= 5) {
                    playSound('win');
                    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                } else {
                    playSound('lose');
                }

                appState.hasPlayed = true;
                this.switchView('view-result');
                document.getElementById('bottom-nav').classList.remove('hidden');
                lucide.createIcons(); // Force le rendu des nouvelles icônes au cas où
                setTimeout(() => this.scaleCard(), 60); // Adapte la taille de la carte pour mobile
                
                this.submitScoreToSheet(); // Met à jour le score réel (Update) en arrière-plan
            },

            submitScoreToSheet(overrideScore = null) {
                if(!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "VOTRE_URL_WEB_APP_ICI") {
                    console.log("Sheet URL non configurée. Transaction ignorée.");
                    return;
                }

                const finalScore = overrideScore !== null ? overrideScore : appState.score;
                const isSilent = overrideScore === 0;

                if (!isSilent) {
                    document.getElementById('submit-loader').classList.remove('hidden');
                }
                
                const data = {
                    username: appState.user.username,
                    country: appState.user.countryName,
                    emoji: appState.user.countryFlag,
                    avatar: appState.user.avatarUrl,
                    score: finalScore
                };

                fetch(GOOGLE_SHEET_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Requis pour éviter les erreurs CORS simples avec GAS si non config
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(() => {
                    if (!isSilent) {
                        setTimeout(() => {
                            document.getElementById('submit-loader').classList.add('hidden');
                        }, 1000);
                    }
                }).catch(err => {
                    console.error("Erreur DB :", err);
                    if (!isSilent) {
                        document.getElementById('submit-loader').classList.add('hidden');
                    }
                });
            },

            showDashboard() {
                this.switchView('view-dashboard');
            },

            // Scale la carte selon l'espace disponible (mobile/desktop)
            scaleCard() {
                const card = document.getElementById('shareable-card');
                const wrapper = document.querySelector('.card-scale-wrapper');
                if (!card || !wrapper) return;
                const available = wrapper.clientWidth;
                const scale = Math.min(1, (available - 8) / 520);
                card.style.transform = `scale(${scale})`;
                wrapper.style.height = `${Math.round(390 * scale)}px`;
            },

            // --- UI ACTIONS ---
            toggleAudio() {
                appState.audioEnabled = !appState.audioEnabled;
                const bgMusic = document.getElementById('bg-music');
                
                if(appState.audioEnabled) {
                    document.getElementById('icon-audio-on').classList.remove('hidden');
                    document.getElementById('icon-audio-off').classList.add('hidden');
                    bgMusic.play(); // Relance la musique de fond
                } else {
                    document.getElementById('icon-audio-on').classList.add('hidden');
                    document.getElementById('icon-audio-off').classList.remove('hidden');
                    bgMusic.pause(); // Coupe la musique de fond
                }
            },

            showRules() {
                document.getElementById('modal-rules').classList.remove('hidden');
            },

            showLeaderboard() {
                document.getElementById('modal-leaderboard').classList.remove('hidden');
                // Afficher le bouton téléchargement dès que l'utilisateur est connecté
                const dlBtn = document.getElementById('lb-download-btn');
                if (dlBtn) {
                    dlBtn.style.display = appState.user.username ? 'flex' : 'none';
                    if (appState.user.username) lucide.createIcons();
                }
                this.fetchLeaderboard();
            },

            closeModals() {
                document.getElementById('modal-rules').classList.add('hidden');
                document.getElementById('modal-leaderboard').classList.add('hidden');
            },

            fetchLeaderboard() {
                const list = document.getElementById('lb-list');
                const loader = document.getElementById('lb-loader');
                
                list.classList.add('hidden');
                loader.classList.remove('hidden');

                // Utilisation d'une condition générique pour les Mocks
                if(!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "VOTRE_URL_WEB_APP_ICI" || GOOGLE_SHEET_URL.includes("VOTRE_URL")) {
                    // Mock data si non configuré (ajout de joueurs pour bien voir le podium + la liste)
                    setTimeout(() => {
                        this.renderLeaderboard([
                            { username: appState.user.username || 'Toi', country: appState.user.countryName || 'France', emoji: appState.user.countryFlag || 'https://flagcdn.com/w40/fr.png', score: appState.score || 10, avatar: appState.user.avatarUrl || 'https://api.dicebear.com/7.x/bottts/png?seed=Toi' },
                            { username: 'Marie', country: 'Canada', emoji: 'https://flagcdn.com/w40/ca.png', score: 9, avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Marie&backgroundColor=c0aede,b6e3f4,ffdfbf' },
                            { username: 'Kofi', country: 'Côte d\'Ivoire', emoji: 'https://flagcdn.com/w40/ci.png', score: 8, avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Kofi&backgroundColor=c0aede,b6e3f4,ffdfbf' },
                            { username: 'Amina', country: 'Sénégal', emoji: 'https://flagcdn.com/w40/sn.png', score: 7, avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Amina&backgroundColor=c0aede,b6e3f4,ffdfbf' },
                            { username: 'Jean', country: 'Suisse', emoji: 'https://flagcdn.com/w40/ch.png', score: 5, avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Jean&backgroundColor=c0aede,b6e3f4,ffdfbf' }
                        ].sort((a,b) => b.score - a.score));
                    }, 1000);
                    return;
                }

                // Vrai fetch (Assurez-vous que le GAS Web App accepte les GET et retourne JSON)
                fetch(GOOGLE_SHEET_URL)
                    .then(res => res.json())
                    .then(data => {
                        this.renderLeaderboard(data);
                    })
                    .catch(err => {
                        console.error(err);
                        loader.classList.add('hidden');
                        list.innerHTML = "<p class='text-center text-red-800 font-bold'>Erreur de chargement.</p>";
                        list.classList.remove('hidden');
                    });
            },

            renderLeaderboard(data) {
                this.leaderboardData = data; // Sauvegarder pour le téléchargement depuis le leaderboard
                const list = document.getElementById('lb-list');
                const loader = document.getElementById('lb-loader');
                
                loader.classList.add('hidden');
                list.classList.remove('hidden');

                if(!data || data.length === 0) {
                    list.innerHTML = "<p class='text-center font-bold'>Aucun score pour le moment.</p>";
                    return;
                }

                let html = '';
                
                // Petit helper pour afficher le drapeau proprement (avec class 'block' pour éviter les marges invisibles)
                const getFlag = (user) => user && user.emoji && user.emoji.startsWith('http') 
                    ? `<img src="${user.emoji}" alt="flag" class="w-4 h-3 sm:w-5 sm:h-3.5 rounded-[2px] shadow-sm object-cover block">` 
                    : `<span class="text-[10px] leading-none">${user?.emoji || ''}</span>`;

                // --- 🏆 PODIUM (Top 3) ---
                if (data.length > 0) {
                    const p1 = data[0];
                    const p2 = data[1];
                    const p3 = data[2];

                    html += `<div class="flex justify-center items-end gap-2 sm:gap-4 mb-6 mt-8 pt-2 pb-4 border-b-4 border-wood-border/20 px-2">`;

                    // Marche 2 (Argent - À gauche)
                    if (p2) {
                        html += `
                        <div class="flex flex-col items-center w-1/3 max-w-[110px] transform translate-y-2 fade-in" style="animation-delay: 0.1s;">
                            <!-- Espace pour aligner avec la couronne du 1er -->
                            <div class="mt-4"></div>
                            
                            <!-- Avatar + Badges séparés -->
                            <div class="relative mb-2 z-10 flex flex-col items-center">
                                <img src="${p2.avatar}" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-4 border-gray-300 shadow-md object-cover">
                                <!-- Place (Top Left) -->
                                <div class="absolute -top-2 -left-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-100 to-gray-400 rounded-full border-2 border-gray-500 flex items-center justify-center font-black text-white shadow-sm text-sm z-20">2</div>
                                <!-- Drapeau (Bottom Right) -->
                                <div class="absolute -bottom-1 -right-1 sm:-right-2 bg-white p-0.5 sm:p-1 rounded shadow-md border border-gray-200 z-20 flex items-center justify-center">
                                    ${getFlag(p2)}
                                </div>
                            </div>
                            
                            <!-- Username bien lisible en dessous -->
                            <p class="font-bold text-[10px] sm:text-xs truncate w-[95%] text-center text-wood-dark bg-white/60 rounded-full px-2 py-0.5 mb-2 z-10 shadow-sm border border-white/40">${p2.username}</p>
                            
                            <div class="w-full bg-gradient-to-t from-gray-400 to-gray-200 h-24 sm:h-28 rounded-t-lg border-2 border-b-0 border-gray-400 shadow-[inset_0_4px_8px_rgba(255,255,255,0.5)] flex justify-center pt-2 relative overflow-hidden">
                                <span class="font-black text-xl text-gray-700 drop-shadow-sm">${p2.score}</span>
                            </div>
                        </div>`;
                    }

                    // Marche 1 (Or - Au centre)
                    if (p1) {
                        html += `
                        <div class="flex flex-col items-center w-1/3 max-w-[130px] z-20 fade-in">
                            <i data-lucide="crown" class="w-8 h-8 sm:w-10 sm:h-10 text-glg-yellow fill-glg-yellow mb-1 drop-shadow-md animate-bounce"></i>
                            
                            <!-- Avatar + Badges séparés -->
                            <div class="relative mb-2 z-10 flex flex-col items-center">
                                <img src="${p1.avatar}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 border-glg-yellow shadow-lg object-cover">
                                <!-- Place (Top Left) -->
                                <div class="absolute -top-2 -left-2 sm:-left-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full border-2 border-yellow-700 flex items-center justify-center font-black text-white shadow-md text-base sm:text-lg z-20">1</div>
                                <!-- Drapeau (Bottom Right) -->
                                <div class="absolute -bottom-1 -right-1 sm:-right-2 bg-white p-0.5 sm:p-1 rounded shadow-md border border-gray-200 z-20 flex items-center justify-center">
                                    ${getFlag(p1)}
                                </div>
                            </div>
                            
                            <!-- Username bien lisible en dessous -->
                            <p class="font-black text-[11px] sm:text-sm truncate w-[95%] text-center text-wood-dark bg-white/70 rounded-full px-2 py-0.5 mb-2 z-10 shadow-sm border border-white/50">${p1.username}</p>
                            
                            <div class="w-full bg-gradient-to-t from-yellow-600 to-glg-yellow h-32 sm:h-40 rounded-t-xl border-2 border-b-0 border-yellow-600 shadow-[inset_0_4px_10px_rgba(255,255,255,0.6)] flex justify-center pt-2 sm:pt-3 relative overflow-hidden">
                                <span class="font-black text-2xl sm:text-3xl text-yellow-900 drop-shadow-md">${p1.score}</span>
                            </div>
                        </div>`;
                    }

                    // Marche 3 (Bronze - À droite)
                    if (p3) {
                        html += `
                        <div class="flex flex-col items-center w-1/3 max-w-[110px] transform translate-y-6 fade-in" style="animation-delay: 0.2s;">
                            <!-- Espace pour aligner avec la couronne du 1er -->
                            <div class="mt-4"></div>
                            
                            <!-- Avatar + Badges séparés -->
                            <div class="relative mb-2 z-10 flex flex-col items-center">
                                <img src="${p3.avatar}" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-4 border-[#CD7F32] shadow-md object-cover">
                                <!-- Place (Top Left) -->
                                <div class="absolute -top-2 -left-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#CD7F32] to-[#A0522D] rounded-full border-2 border-[#8B4513] flex items-center justify-center font-black text-white shadow-sm text-sm z-20">3</div>
                                <!-- Drapeau (Bottom Right) -->
                                <div class="absolute -bottom-1 -right-1 sm:-right-2 bg-white p-0.5 sm:p-1 rounded shadow-md border border-gray-200 z-20 flex items-center justify-center">
                                    ${getFlag(p3)}
                                </div>
                            </div>
                            
                            <!-- Username bien lisible en dessous -->
                            <p class="font-bold text-[10px] sm:text-xs truncate w-[95%] text-center text-wood-dark bg-white/60 rounded-full px-2 py-0.5 mb-2 z-10 shadow-sm border border-white/40">${p3.username}</p>
                            
                            <div class="w-full bg-gradient-to-t from-[#8B4513] to-[#CD7F32] h-20 sm:h-24 rounded-t-lg border-2 border-b-0 border-[#8B4513] shadow-[inset_0_4px_8px_rgba(255,255,255,0.3)] flex justify-center pt-2 relative overflow-hidden">
                                <span class="font-black text-xl text-orange-900 drop-shadow-sm">${p3.score}</span>
                            </div>
                        </div>`;
                    }

                    html += `</div>`;
                }

                // --- 📜 LISTE SUIVANTE (Rang 4 à 20) ---
                const restData = data.slice(3, 20);
                if (restData.length > 0) {
                    html += `<div class="flex flex-col gap-2 px-1 sm:px-4">`;
                    html += restData.map((user, index) => {
                        const actualRank = index + 4; // On commence à 4 !
                        return `
                        <div class="flex items-center justify-between p-3 rank-row bg-white/40 border-wood-border hover:bg-white/60 transition-colors fade-in" style="animation-delay: ${0.3 + (index * 0.05)}s">
                            <div class="flex items-center gap-3">
                                <span class="font-black text-lg text-wood-dark w-6 text-center">${actualRank}</span>
                                <img src="${user.avatar}" class="w-10 h-10 rounded-full bg-white border-2 border-wood-border object-cover shadow-sm">
                                <div>
                                    <p class="font-bold text-sm leading-tight text-wood-dark">${user.username}</p>
                                    <div class="flex items-center gap-1 mt-0.5">
                                        ${getFlag(user)}
                                        <p class="text-[10px] font-semibold text-wood-dark/70">${user.country}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="wood-panel px-3 py-1 border-2 border-wood-border text-center min-w-[50px] shadow-sm">
                                <span class="font-bold text-lg text-glg-yellow">${user.score}</span>
                            </div>
                        </div>
                        `;
                    }).join('');
                    html += `</div>`;
                }

                list.innerHTML = html;
                lucide.createIcons(); // On force Lucide à dessiner la Couronne sur le 1er !
            },

            // Télécharge la carte en utilisant les données du leaderboard pour l'utilisateur connecté
            downloadCardFromLeaderboard() {
                const username = appState.user.username;
                const entry = this.leaderboardData.find(
                    u => u.username && u.username.replace('@','') === username.replace('@','')
                );

                // Peupler la carte avec les données du leaderboard (ou appState en fallback)
                document.getElementById('res-avatar').src = entry ? entry.avatar : appState.user.avatarUrl;
                document.getElementById('res-username').textContent = username;
                document.getElementById('res-country').textContent = entry ? entry.country : appState.user.countryName;
                const flagEl = document.getElementById('res-flag');
                flagEl.src = entry ? entry.emoji : appState.user.countryFlag;
                flagEl.classList.remove('hidden');
                document.getElementById('res-score').textContent = entry ? `${entry.score}/10` : `${appState.score}/10`;

                // view-result est hidden quand on vient du dashboard/leaderboard.
                // On le place hors-écran le temps de la capture pour que html2canvas puisse le lire.
                const viewResult = document.getElementById('view-result');
                const wasHidden = viewResult.classList.contains('hidden');
                if (wasHidden) {
                    viewResult.classList.remove('hidden');
                    viewResult.style.cssText = 'position:fixed;top:-9999px;left:-9999px;z-index:-1;';
                }

                const card = document.getElementById('shareable-card');
                const wrapper = document.querySelector('.card-scale-wrapper');
                const prevTransform = card.style.transform;
                const prevWrapperHeight = wrapper ? wrapper.style.height : '';

                card.style.transform = 'scale(1)';
                if (wrapper) wrapper.style.height = '390px';

                const restore = () => {
                    card.style.transform = prevTransform;
                    if (wrapper) wrapper.style.height = prevWrapperHeight;
                    if (wasHidden) {
                        viewResult.classList.add('hidden');
                        viewResult.style.cssText = '';
                    }
                };

                document.fonts.ready.then(() => {
                    setTimeout(() => {
                        html2canvas(card, {
                            backgroundColor: null,
                            width: 520,
                            height: 390,
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            logging: false
                        }).then(canvas => {
                            restore();
                            const link = document.createElement('a');
                            link.download = `CulturOGuides_${username.replace('@','')}.png`;
                            link.href = canvas.toDataURL('image/png', 1.0);
                            link.click();
                        }).catch(err => {
                            restore();
                            alert("Erreur lors de la génération de l'image. Veuillez réessayer.");
                            console.error(err);
                        });
                    }, 150);
                });
            },

            downloadCard() {
                const card = document.getElementById('shareable-card');
                const wrapper = document.querySelector('.card-scale-wrapper');

                // Sauvegarder le transform mobile actuel
                const prevTransform = card.style.transform;
                const prevWrapperHeight = wrapper ? wrapper.style.height : '';

                // Réinitialiser le scale pour capturer à 520×390 (taille réelle, identique sur tous les appareils)
                card.style.transform = 'scale(1)';
                if (wrapper) wrapper.style.height = '390px';

                document.fonts.ready.then(() => {
                    setTimeout(() => {
                        html2canvas(card, {
                            backgroundColor: null,
                            width: 520,
                            height: 390,
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            logging: false
                        }).then(canvas => {
                            // Restaurer le scale mobile
                            card.style.transform = prevTransform;
                            if (wrapper) wrapper.style.height = prevWrapperHeight;

                            const link = document.createElement('a');
                            link.download = `CulturOGuides_${appState.user.username.replace('@','')}.png`;
                            link.href = canvas.toDataURL('image/png', 1.0);
                            link.click();
                        }).catch(err => {
                            card.style.transform = prevTransform;
                            if (wrapper) wrapper.style.height = prevWrapperHeight;
                            alert("Erreur lors de la génération de l'image. Veuillez réessayer.");
                            console.error(err);
                        });
                    }, 150);
                });
            }
        };

        // Initialisation
        window.onload = () => app.init();
