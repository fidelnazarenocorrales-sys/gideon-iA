<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gideon v7.1 ◆ STAR Labs Command</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Mono&display=swap');
        body { font-family: 'Roboto Mono', monospace; background-color: #010409; color: #e6edf3; height: 100vh; overflow: hidden; }
        .glass { background: rgba(13, 17, 23, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(34, 211, 238, 0.2); }
        .bubble-user { background: linear-gradient(135deg, #0ea5e9, #22d3ee); color: #010409; border-radius: 18px 18px 2px 18px; font-weight: bold; }
        .bubble-gideon { background: #0d1117; border-left: 3px solid #22d3ee; border-radius: 2px 18px 18px 18px; position: relative; }
        .speed-bolt { color: #22d3ee; filter: drop-shadow(0 0 5px #22d3ee); }
        .app-link { background: #161b22; border: 1px solid #22d3ee; color: #22d3ee; padding: 10px 20px; border-radius: 12px; display: inline-flex; align-items: center; gap: 10px; margin-top: 10px; transition: all 0.3s; }
        .app-link:hover { background: #22d3ee; color: #010409; box-shadow: 0 0 15px #22d3ee; }
        #chat { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #22d3ee; }
    </style>
</head>
<body class="flex flex-col">

    <div id="lockScreen" class="fixed inset-0 z-[100] glass flex items-center justify-center p-6 transition-all duration-1000">
        <div class="w-full max-w-md p-8 rounded-3xl border border-cyan-500/30 text-center space-y-6">
            <h1 class="font-[Orbitron] text-2xl tracking-[0.3em] text-cyan-400 uppercase">Seguridad STAR Labs</h1>
            <div id="step1">
                <input type="password" id="passInput" placeholder="PIN" class="w-full bg-black border border-cyan-500/30 rounded-xl py-4 text-center text-2xl tracking-[0.5em] text-cyan-400 focus:outline-none mb-4">
                <button onclick="unlock()" class="w-full bg-cyan-600 text-black font-bold py-3 rounded-xl uppercase tracking-widest font-[Orbitron]">Entrar</button>
            </div>
            <div id="step2" class="hidden">
                <input type="text" id="nameInput" placeholder="Nombre" class="w-full bg-black border border-cyan-500/30 rounded-xl py-4 text-center text-white focus:outline-none mb-4">
                <button onclick="register()" class="w-full bg-cyan-600 text-black font-bold py-3 rounded-xl uppercase tracking-widest font-[Orbitron]">Sincronizar</button>
            </div>
        </div>
    </div>

    <header class="p-4 glass border-b border-cyan-900/50 flex justify-between items-center px-8">
        <h1 class="font-[Orbitron] font-black text-lg tracking-widest text-cyan-100">Gideon <span class="text-cyan-500">v7.1</span></h1>
        <span id="userDisplay" class="text-[10px] text-cyan-700 uppercase"></span>
    </header>

    <main id="chat" class="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        </main>

    <footer class="p-6 glass border-t border-cyan-900/50">
        <div class="max-w-5xl mx-auto flex gap-3">
            <input id="userInput" type="text" placeholder="Gideon, poné Flash en Netflix..." 
                   class="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500"
                   onkeydown="if(event.key === 'Enter') sendMessage()">
            <button onclick="sendMessage()" class="bg-cyan-600 hover:bg-cyan-400 text-black font-bold px-8 rounded-2xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <i class="fas fa-bolt"></i>
            </button>
        </div>
    </footer>

    <script>
        const API_KEY = "AlzaSyCufCgOfYtn9cX3vVLAT6Nsr_xRq_9AGf0";
        let usuario = localStorage.getItem('gideon_v7_user') || "";

        function unlock() {
            if(document.getElementById('passInput').value === "flash") {
                document.getElementById('step1').classList.add('hidden');
                document.getElementById('step2').classList.remove('hidden');
            }
        }

        function register() {
            const n = document.getElementById('nameInput').value.trim();
            if(n) { localStorage.setItem('gideon_v7_user', n); usuario = n; init(); }
        }

        function init() {
            document.getElementById('lockScreen').classList.add('hidden');
            document.getElementById('userDisplay').innerText = `CREADOR: ${usuario}`;
            const s = `Sistemas operativos, ${usuario}. ¿Listo para escribir o buscamos entretenimiento en la Speed Force?`;
            addMsg('assistant', s);
            speak(s);
        }

        async function sendMessage() {
            const input = document.getElementById('userInput');
            const text = input.value.trim();
            if(!text) return;

            addMsg('user', text);
            input.value = "";

            // Lógica de Atajos (Netflix/Spotify)
            if(text.toLowerCase().includes("netflix") || text.toLowerCase().includes("reproducir flash")) {
                const res = "Protocolo de entretenimiento activado. Preparando acceso directo a la línea temporal de Barry Allen en Netflix.";
                addMsg('assistant', res, true, "https://www.netflix.com/title/80027042", "Abrir Netflix");
                speak(res);
                return;
            }
            
            if(text.toLowerCase().includes("harry styles") || text.toLowerCase().includes("música")) {
                const res = "Sintonizando frecuencias de Fine Line. Generando acceso a Spotify.";
                addMsg('assistant', res, true, "https://open.spotify.com/artist/6KImCVD70vtGezmFW0PrWD", "Abrir Spotify");
                speak(res);
                return;
            }

            try {
                const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: `Sos Gideon de Flash. Usuario: ${usuario}. Fidel es escritor zurdo de 16 años (Villa Gesell). Sabe de Kael y El Legado de Nero. No hables de máscaras. Hablá argentino. Mensaje: ${text}` }] }] })
                });
                const d = await r.json();
                const resText = d.candidates[0].content.parts[0].text;
                addMsg('assistant', resText);
                speak(resText);
            } catch(e) { addMsg('assistant', "Error en el enlace neuronal."); }
        }

        function addMsg(role, text, isLink = false, url = "", btnText = "") {
            const chat = document.getElementById('chat');
            const div = document.createElement('div');
            div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;
            
            let content = `<div class="${role === 'user' ? 'bubble-user' : 'bubble-gideon'} px-6 py-4 max-w-[90%]">
                ${marked.parse(text)}`;
            
            if(isLink) {
                content += `<br><a href="${url}" target="_blank" class="app-link"><i class="fas fa-play"></i> ${btnText}</a>`;
            }
            
            content += `</div>`;
            div.innerHTML = content;
            chat.appendChild(div);
            chat.scrollTo(0, chat.scrollHeight);
        }

        function speak(t) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(t);
            u.lang = 'es-AR';
            window.speechSynthesis.speak(u);
        }

        if(usuario) init();
    </script>
</body>
</html>
