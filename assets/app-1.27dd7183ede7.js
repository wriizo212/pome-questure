
        const state = {
            studentName: "",
            studentClass: "5 Sains Lestari SMK",
            selectedAvatar: "biogas",
            soundEnabled: true,
            bgmEnabled: false,
            voiceEnabled: false,
            currentScreen: "welcome",
            stage: 1,
            questionIndex: 0,
            stage3MissionIndex: 0,
            score: 0,
            streak: 0,
            maxStreak: 0,
            reactorBoostClicks: 0,
            reactorCooled: false,
            reactorNeutralized: false,
            selfieDataUrl: null,
            certPledgeIndex: 0,
            hintUsedForQuestion: false,
            stageScores: { s1: 0, s2: 0, s3: 0 },
            questionLocked: false,
            cameraReady: false,
            aiModelsReady: false,
            debugModeActive: false,
            debugTarget: "hand",
            facePitchOffset: 0.02,
            faceYawOffset: 0,
            faceAutoCalibrated: false,
            currentGestureKey: null,
            gestureHoldStart: 0,
            gestureHoldDuration: 1200,
            stage3Matches: {},
            answers: {}, missionCompleted: {}, controlMode: "manual", sessionSaved: false,
            selectedStage3CardId: null
        };

        const AVATAR_PROFILES = {
            biogas: { emoji: "⚡", title: "Kapten Biogas CH₄", desc: "Pakar penukaran metana kepada elektrik hijau" },
            membrane: { emoji: "💧", title: "Saintis Membran RO", desc: "Pakar penulenan air sifar sisa" },
            microbe: { emoji: "🦠", title: "Doktor Mikrob Anaerob", desc: "Penjaga mikroorganisma metanogen Si Methano" },
            eco: { emoji: "🌿", title: "Renjer Sungai Lestari", desc: "Pelindung ekosistem & oksigen terlarut sungai" }
        };

        const MASCOT_FACTS = [
            "Tahukah anda? Bakteria anaerobik 'Si Methano' bekerja tanpa oksigen untuk menukar POME menjadi gas Metana (CH₄)!",
            "Setiap 1 tan minyak sawit mentah menghasilkan kira-kira 0.65 tan efluen POME yang kaya dengan bahan organik.",
            "Jika POME panas (85°C) terus dimasukkan ke bioreaktor tanpa disejukkan ke 38°C, bakteria baik akan mati!",
            "Melalui penapisan membran Osmosis Berbalik (RO), air POME boleh dikitar semula menjadi air dandang kilang!",
            "Gas Metana (CH₄) adalah gas rumah hijau yang menyumbang kepada pemanasan global—sebab itu kita wajib memerangkapnya!"
        ];
        let mascotFactIdx = 0;

        const CONCEPT_CARDS = [
            {
                icon: "fa-solid fa-flask",
                text: "<strong class='text-amber-300'>Fakta POME:</strong> Efluen Kilang Kelapa Sawit (POME) ialah air sisa organik pekat berwarna perang (Suhu 80–90°C, pH 4.0–5.0) hasil pengekstrakan minyak sawit. Ia tidak mengandungi bahan kimia sintetik beracun, tetapi kandungan organiknya amat tinggi!"
            },
            {
                icon: "fa-solid fa-skull-crossbones",
                text: "<strong class='text-rose-300'>Bahaya BOD (25,000 mg/L):</strong> Keperluan Oksigen Biokimia (BOD) POME ialah tinggi dalam model ini; bacaan sebenar bergantung pada efluen. Jika mengalir ke sungai, penguraian mikrob boleh mengurangkan oksigen terlarut (DO) sehingga ikan mati lemas."
            },
            {
                icon: "fa-solid fa-bolt",
                text: "<strong class='text-cyan-300'>Tenaga Biogas (CH₄):</strong> Di dalam Bioreaktor Anaerobik tertutup, mikroorganisma metanogen menguraikan POME tanpa oksigen dan membebaskan 65% gas Metana (CH₄) yang boleh menjana elektrik 2 MW untuk kilang dan kampung!"
            },
            {
                icon: "fa-solid fa-recycle",
                text: "<strong class='text-emerald-300'>Sifar Sisa (Zero Discharge):</strong> Selepas rawatan anaerobik dan aerobik, teknologi Membran Ultrafiltrasi &amp; Reverse Osmosis (RO) menghasilkan air jernih (BOD &lt; 20 mg/L) manakala enap cemar dijadikan baja kompos bio-NPK."
            }
        ];

        const MICROSCOPE_SAMPLES = {
            raw: {
                bg: "#451a03",
                title: "Sampel 1: Efluen POME Mentah (Sebelum Rawatan)",
                badge: "Bahaya Pencemaran Tinggi",
                badgeClass: "px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-[10px] font-bold",
                desc: "Di bawah zum 400x, POME mentah penuh dengan titisan minyak sawit, serat selulosa dan pepejal terampai (TSS ~18,000 mg/L). Suhunya yang panas (85°C) dan berasid (pH 4.2) akan membunuh hidupan sungai serta-merta jika dilepaskan tanpa rawatan.",
                bod: "25,000 mg/L",
                ph: "85°C • pH 4.2",
                res: "Belum Dipulihkan"
            },
            anaerobic: {
                bg: "#0f172a",
                title: "Sampel 2: Dalam Bioreaktor Anaerobik (Mikroorganisma Metanogen Aktif)",
                badge: "Penjanaan Biogas CH₄ Aktif",
                badgeClass: "px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold",
                desc: "Selepas disejukkan ke 38°C dan dineutralkan (pH 7.0), bakteria anaerobik 'Si Methano' membiak pesat tanpa oksigen! Mereka menguraikan 80% bahan organik POME sambil membebaskan gelembung gas Metana (CH₄) untuk janakuasa elektrik.",
                bod: "~3,500 mg/L (-85%)",
                ph: "38°C • pH 7.0",
                res: "⚡ Biogas CH₄ Dijana"
            },
            ro: {
                bg: "#022c22",
                title: "Sampel 3: Air Tapisan Membran Ultrafiltrasi & RO (Sifar Sisa)",
                badge: "Air pulih: perlu ujian mengikut kegunaan",
                badgeClass: "px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold",
                desc: "Selepas pengudaraan aerobik dan penapisan membran Osmosis Berbalik (RO), bahan tertahan dipisahkan daripada air pulih. Aliran pekatan masih perlu diurus. Kesesuaian air untuk kegunaan kilang memerlukan ujian lanjut; jernih tidak bermakna boleh diminum.",
                bod: "< 15 mg/L (Bersih)",
                ph: "28°C • pH 7.2",
                res: "💧 Air RO + Baja NPK"
            }
        };

        const SIM_SYSTEMS = {
            pond: {
                title: "Sistem 1: Kolam Fakultatif & Anaerobik Terbuka (Konvensional)",
                desc: "Digunakan oleh kebanyakan kilang lama. Kos rendah tetapi memerlukan tanah luas, masa rawatan 60–90 hari, dan melepaskan gas rumah hijau Metana (CH₄) terus ke udara.",
                bod: "100 - 250 mg/L",
                ch4: "Tinggi (Terlepas)",
                power: "0 MW (Tiada)",
                water: "Tiada Kitar Semula"
            },
            open_tank: {
                title: "Sistem 2: Tangki Pencernaan Terbuka & Pengudaraan",
                desc: "Menggunakan tangki keluli terbuka yang menjimatkan ruang tanah berbanding kolam, namun gas Metana (CH₄) masih terbebas ke atmosfera tanpa penjanaan tenaga.",
                bod: "50 - 100 mg/L",
                ch4: "Sederhana (Terlepas)",
                power: "0 MW (Tiada)",
                water: "Pelepasan Sungai"
            },
            biogas: {
                title: "Sistem 3: Bioreaktor Anaerobik Tertutup + Tangki Aerobik (Pemulihan Tenaga)",
                desc: "Memerangkap gas Metana (CH₄) di dalam kubah tertutup untuk menjana ~2.0 MW elektrik melalui enjin CHP serta menurunkan BOD sebanyak >90%.",
                bod: "< 50 mg/L (Patuh)",
                ch4: "Diperangkap 95%",
                power: "1.8 - 2.2 MW Elektrik",
                water: "Pengairan Ladang"
            },
            zero_discharge: {
                title: "Sistem 4: Loji Bersepadu Bioreaktor Anaerobik + Aerobik + Membran RO (Sifar Sisa)",
                desc: "Penyelesaian paling lestari! Menjana elektrik daripada biogas CH₄, menukar enap cemar kepada baja kompos bio-NPK, dan menapis efluen menjadi air bersih dandang melalui Membran RO.",
                bod: "< 15 mg/L (Sangat Bersih)",
                ch4: "Diperangkap 98%",
                power: "2.2 MW + Haba",
                water: "Air pulih untuk kegunaan sesuai"
            }
        };

        let audioCtx = null;
        let bgmInterval = null;

        function playTone(type) {
            if (!state.soundEnabled) return;
            try {
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                if (audioCtx.state === "suspended") audioCtx.resume();
                const now = audioCtx.currentTime;
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);

                if (type === "tick") {
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(660, now);
                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                    osc.start(now);
                    osc.stop(now + 0.08);
                } else if (type === "correct") {
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(523.25, now);
                    osc.frequency.setValueAtTime(659.25, now + 0.09);
                    osc.frequency.setValueAtTime(783.99, now + 0.18);
                    gain.gain.setValueAtTime(0.14, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    osc.start(now);
                    osc.stop(now + 0.35);
                } else if (type === "wrong") {
                    osc.type = "sawtooth";
                    osc.frequency.setValueAtTime(220, now);
                    osc.frequency.setValueAtTime(165, now + 0.15);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    osc.start(now);
                    osc.stop(now + 0.35);
                } else if (type === "fanfare") {
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(523.25, now);
                    osc.frequency.setValueAtTime(659.25, now + 0.12);
                    osc.frequency.setValueAtTime(783.99, now + 0.24);
                    osc.frequency.setValueAtTime(1046.5, now + 0.36);
                    gain.gain.setValueAtTime(0.16, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
                    osc.start(now);
                    osc.stop(now + 0.7);
                }
            } catch (e) {}
        }

        function speakText(text) {
            if (!state.voiceEnabled || !("speechSynthesis" in window)) return;
            try {
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ""));
                utter.lang = "ms-MY";
                utter.rate = 1.02;
                window.speechSynthesis.speak(utter);
            } catch (e) {}
        }

        function setMascotMood(mood, speechText) {
            const speechEl = document.getElementById("hud-mascot-speech");
            const antennaEl = document.getElementById("hud-mascot-antenna");
            if (speechEl && speechText) speechEl.textContent = speechText;
            if (antennaEl) {
                const color = mood === "happy" ? "#34d399" : mood === "encourage" ? "#fbbf24" : "#22d3ee";
                antennaEl.setAttribute("fill", color);
            }
        }

        window.setMicroscopeSample = function (sampleKey) {
            const data = MICROSCOPE_SAMPLES[sampleKey];
            if (!data) return;
            playTone("tick");

            ["raw", "anaerobic", "ro"].forEach((k) => {
                const g = document.getElementById(`micro-group-${k}`);
                const btn = document.getElementById(`micro-btn-${k}`);
                if (g) g.classList.toggle("hidden", k !== sampleKey);
                if (btn) {
                    btn.className = k === sampleKey
                        ? "px-2.5 py-1 rounded-lg bg-emerald-400 text-navy-950 font-display font-bold text-[10px] shadow transition"
                        : "px-2.5 py-1 rounded-lg bg-navy-800 text-slate-300 border border-slate-700 hover:bg-navy-700 font-display font-bold text-[10px] transition";
                }
            });

            const bgRect = document.getElementById("micro-bg-rect");
            if (bgRect) bgRect.setAttribute("fill", data.bg);
            const titleEl = document.getElementById("micro-sample-title");
            if (titleEl) titleEl.textContent = data.title;
            const badgeEl = document.getElementById("micro-sample-badge");
            if (badgeEl) {
                badgeEl.textContent = data.badge;
                badgeEl.className = data.badgeClass;
            }
            const descEl = document.getElementById("micro-sample-desc");
            if (descEl) descEl.textContent = data.desc;
            const bodEl = document.getElementById("micro-stat-bod");
            if (bodEl) bodEl.textContent = data.bod;
            const phEl = document.getElementById("micro-stat-ph");
            if (phEl) phEl.textContent = data.ph;
            const resEl = document.getElementById("micro-stat-resource");
            if (resEl) resEl.textContent = data.res;
        };

        window.selectConceptCard = function (index) {
            const item = CONCEPT_CARDS[index];
            if (!item) return;
            playTone("tick");
            const iconEl = document.getElementById("concept-detail-icon");
            const textEl = document.getElementById("concept-detail-text");
            if (iconEl) iconEl.innerHTML = `<i class="${item.icon}"></i>`;
            if (textEl) textEl.innerHTML = item.text;
        };

        window.selectStudentAvatar = function (avatarKey) {
            if (!AVATAR_PROFILES[avatarKey]) return;
            state.selectedAvatar = avatarKey;
            playTone("tick");
            document.querySelectorAll(".avatar-card-btn").forEach((btn) => {
                const isSelected = btn.getAttribute("data-avatar") === avatarKey;
                btn.className = isSelected
                    ? "avatar-card-btn p-2.5 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 text-left transition flex items-center gap-2.5 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : "avatar-card-btn p-2.5 rounded-xl bg-navy-950/80 border border-slate-700/80 hover:border-cyan-400/50 text-left transition flex items-center gap-2.5";
            });
            const meta = AVATAR_PROFILES[avatarKey];
            const badge = document.getElementById("selected-avatar-badge");
            if (badge) badge.textContent = `${meta.emoji} ${meta.title}`;
            const hudEmoji = document.getElementById("hud-avatar-emoji");
            if (hudEmoji) hudEmoji.textContent = meta.emoji;
        };

        window.MascotInteract = function () {
            playTone("correct");
            mascotFactIdx = (mascotFactIdx + 1) % MASCOT_FACTS.length;
            const fact = MASCOT_FACTS[mascotFactIdx];
            const welcomeSpeech = document.getElementById("mascot-welcome-speech");
            if (welcomeSpeech) welcomeSpeech.textContent = `"${fact}"`;
            setMascotMood("happy", `"${fact}"`);
            speakText(fact);
        };

        window.switchSimSystem = function (sysKey) {
            const data = SIM_SYSTEMS[sysKey];
            if (!data) return;
            playTone("tick");
            ["pond", "open_tank", "biogas", "zero_discharge"].forEach((k) => {
                const tab = document.getElementById(`sim-tab-${k}`);
                if (tab) {
                    tab.className = k === sysKey
                        ? "sim-tab-btn p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-display font-bold text-xs text-center transition"
                        : "sim-tab-btn p-2.5 rounded-xl bg-navy-800 border border-slate-700 text-slate-300 font-display font-bold text-xs text-center transition";
                }
            });
            const t = document.getElementById("sim-sys-title");
            const d = document.getElementById("sim-sys-desc");
            const b = document.getElementById("sim-val-bod");
            const c = document.getElementById("sim-val-ch4");
            const p = document.getElementById("sim-val-power");
            const w = document.getElementById("sim-val-water");
            if (t) t.textContent = data.title;
            if (d) d.textContent = data.desc;
            if (b) b.textContent = data.bod;
            if (c) c.textContent = data.ch4;
            if (p) p.textContent = data.power;
            if (w) w.textContent = data.water;
        };

        function updateBadgesAndVillageGrid() {
            const b1 = document.getElementById("badge-item-1");
            const b2 = document.getElementById("badge-item-2");
            const b3 = document.getElementById("badge-item-3");
            const b4 = document.getElementById("badge-item-4");

            if (b1 && state.stageScores.s1 >= 3) {
                b1.classList.remove("opacity-45");
                b1.classList.add("badge-unlocked");
            }
            if (b2 && state.stageScores.s2 >= 3) {
                b2.classList.remove("opacity-45");
                b2.classList.add("badge-unlocked");
            }
            if (b3 && state.stageScores.s3 >= 1) {
                b3.classList.remove("opacity-45");
                b3.classList.add("badge-unlocked");
            }
            if (b4 && state.maxStreak >= 3) {
                b4.classList.remove("opacity-45");
                b4.classList.add("badge-unlocked");
            }

            const envBonus = (state.reactorCooled ? 12 : 0) + (state.reactorNeutralized ? 12 : 0);
            const powerPct = Math.min(100, Math.max(20, Math.round(((state.score + state.reactorBoostClicks * 4 + envBonus) / 140) * 100)));
            const powerLbl = document.getElementById("kampung-power-label");
            if (powerLbl) powerLbl.textContent = `Grid Kampung: ${powerPct}%`;

            const win1 = document.getElementById("kampung-win-1");
            const win2 = document.getElementById("kampung-win-2");
            const win3 = document.getElementById("kampung-win-3");
            const win4 = document.getElementById("kampung-win-4");

            if (win1) win1.setAttribute("fill", powerPct >= 20 ? "#fde047" : "#334155");
            if (win2) win2.setAttribute("fill", powerPct >= 45 ? "#fde047" : "#334155");
            if (win3) win3.setAttribute("fill", powerPct >= 70 ? "#34d399" : "#334155");
            if (win4) win4.setAttribute("fill", powerPct >= 90 ? "#22d3ee" : "#334155");
        }

        window.toggleReactorCooling = function () {
            state.reactorCooled = !state.reactorCooled;
            playTone("correct");
            const btn = document.getElementById("btn-reactor-temp");
            const lbl = document.getElementById("lbl-reactor-temp");
            if (state.reactorCooled) {
                if (btn) btn.className = "p-2 rounded-xl bg-emerald-500/20 border border-emerald-400 text-left transition flex items-center justify-between";
                if (lbl) {
                    lbl.textContent = "38°C (Mesofilik Optimum)";
                    lbl.className = "font-display font-bold text-[11px] text-emerald-300";
                }
                setMascotMood("happy", `"Bagus! Kolam penyejuk menurunkan suhu POME dari 85°C ke 38°C supaya bakteria Si Methano tidak mati kepanasan!"`);
            } else {
                if (btn) btn.className = "p-2 rounded-xl bg-rose-500/15 border border-rose-400/40 text-left transition flex items-center justify-between";
                if (lbl) {
                    lbl.textContent = "85°C (Terlalu Panas!)";
                    lbl.className = "font-display font-bold text-[11px] text-rose-300";
                }
            }
            updateBadgesAndVillageGrid();
        };

        window.toggleReactorPh = function () {
            state.reactorNeutralized = !state.reactorNeutralized;
            playTone("correct");
            const btn = document.getElementById("btn-reactor-ph");
            const lbl = document.getElementById("lbl-reactor-ph");
            if (state.reactorNeutralized) {
                if (btn) btn.className = "p-2 rounded-xl bg-emerald-500/20 border border-emerald-400 text-left transition flex items-center justify-between";
                if (lbl) {
                    lbl.textContent = "pH 7.0 (Neutral Stabil)";
                    lbl.className = "font-display font-bold text-[11px] text-emerald-300";
                }
                setMascotMood("happy", `"Syabas! Keasidan POME (pH 4.2) telah dineutralkan ke pH 7.0. Bakteria metanogen kini menghasilkan gas CH₄ maksimum!"`);
            } else {
                if (btn) btn.className = "p-2 rounded-xl bg-amber-500/15 border border-amber-400/40 text-left transition flex items-center justify-between";
                if (lbl) {
                    lbl.textContent = "pH 4.2 (Berasid)";
                    lbl.className = "font-display font-bold text-[11px] text-amber-300";
                }
            }
            updateBadgesAndVillageGrid();
        };

        window.feedMethanoReactor = function () {
            state.reactorBoostClicks = Math.min(10, state.reactorBoostClicks + 1);
            playTone("correct");
            updateBadgesAndVillageGrid();
            const msg = document.getElementById("reactor-status-msg");
            if (msg) {
                msg.innerHTML = `<span class="text-emerald-300 font-bold">⚡ Bakteria Si Methano aktif!</span> Biogas CH₄ meningkat &amp; menerangi rumah penduduk kampung!`;
            }
        };

        window.triggerManualAeration = function () {
            playTone("tick");
            setMascotMood("happy", `"Suntikan Oksigen Terlarut (+O₂) meningkatkan kecekapan tangki aerobik dan menyelamatkan hidupan sungai!"`);
        };

        window.selectCertPledge = function (idx) {
            state.certPledgeIndex = idx;
            playTone("tick");
            document.querySelectorAll(".pledge-btn").forEach((btn, i) => {
                btn.className = i === idx
                    ? "pledge-btn p-3 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 text-left text-xs text-white font-semibold transition"
                    : "pledge-btn p-3 rounded-xl bg-navy-950 border border-slate-800 hover:border-cyan-500/40 text-left text-xs text-slate-300 transition";
            });
            drawCertificateCanvas();
        };

        window.closeStageTransitionModal = function () {
            const m = document.getElementById("modal-stage-transition");
            if (m) m.classList.add("hidden");
        };

        window.jumpToStage = function (targetStage) {
            playTone("tick");
            state.stage = targetStage;
            state.questionIndex = 0;
            state.stage3MissionIndex = 0;
            renderCurrentQuestion();
        };

        const QUESTIONS_STAGE_1 = [
            {
                category: "Pencirian POME",
                question: "Apakah maksud singkatan POME dalam industri pemprosesan kelapa sawit di Malaysia?",
                options: [
                    "Palm Oil Mill Effluent (Efluen Kilang Kelapa Sawit)",
                    "Plant Organic Methane Energy (Tenaga Metana Organik)",
                    "Pure Oxygen Membrane Extraction (Pengekstrakan Membran)",
                    "Palm Oil Mechanical Engine (Enjin Mekanikal Sawit)"
                ],
                correct: 0,
                explanation: "Betul! POME ialah Palm Oil Mill Effluent iaitu air sisa organik pekat yang terhasil semasa proses pengekstrakan minyak sawit mentah (CPO)."
            },
            {
                category: "Parameter Pencemaran",
                question: "Berapakah anggaran bacaan BOD (Biochemical Oxygen Demand) bagi POME mentah yang belum dirawat?",
                options: [
                    "Sekitar 15 mg/L (Sama seperti air hujan)",
                    "Sekitar 25,000 mg/L (100x lebih pekat daripada kumbahan domestik)",
                    "Sifar BOD kerana tiada bahan organik",
                    "Kurang daripada 5 mg/L"
                ],
                correct: 1,
                explanation: "Tepat sekali! POME mentah mempunyai BOD sekitar 25,000 mg/L dan COD ~50,000 mg/L yang amat berbahaya kepada sungai."
            },
            {
                category: "Impak Ekosistem Sungai",
                question: "Apakah yang akan berlaku kepada ekosistem sungai jika POME mentah dilepaskan terus tanpa rawatan?",
                options: [
                    "Air sungai menjadi semakin jernih dan sejuk",
                    "Ikan membiak lebih cepat kerana banyak minyak",
                    "Mikrob menggunakan semua Oksigen Terlarut (DO) lalu menyebabkan ikan mati lemas",
                    "Paras pH sungai kekal neutral tanpa sebarang perubahan"
                ],
                correct: 2,
                explanation: "Benar! Kepekatan organik tinggi menyebabkan penguraian mikrob meningkatkan penggunaan oksigen terlarut, mengakibatkan kematian akuatik."
            },
            {
                category: "Kelemahan Sistem Lama",
                question: "Mengapakah sistem Kolam Terbuka (Open Ponding) konvensional kurang lestari untuk alam sekitar?",
                options: [
                    "Membebaskan gas rumah hijau Metana (CH₄) terus ke atmosfera & memerlukan tanah luas",
                    "Menghasilkan terlalu banyak tenaga elektrik percuma",
                    "Menggunakan membran RO yang terlalu mahal",
                    "Menukar air sungai menjadi ais"
                ],
                correct: 0,
                explanation: "Syabas! Kolam terbuka membebaskan gas Metana (CH₄) yang gas rumah hijau yang menyumbang kepada pemanasan global."
            },
            {
                category: "Sifat Fizikal POME",
                question: "Apakah keadaan suhu dan nilai pH bagi POME mentah sebaik sahaja keluar dari proses pensterilan kilang?",
                options: [
                    "Sejuk (10°C) dan Beralkali (pH 11)",
                    "Suhu bilik (25°C) dan Neutral (pH 7)",
                    "Panas (80°C–90°C) dan Berasid (pH 4.0–5.0)",
                    "Beku (0°C) dan Sangat Beralkali (pH 14)"
                ],
                correct: 2,
                explanation: "Tepat! POME keluar pada suhu 80–90°C dan berasid (pH ~4.2), jadi ia mesti disejukkan dan dineutralkan sebelum masuk ke bioreaktor."
            }
        ];

        const QUESTIONS_STAGE_2 = [
            {
                category: "Teknologi Bioreaktor",
                question: "Dalam Bioreaktor Anaerobik tertutup, apakah gas bernilai tinggi yang dihasilkan oleh mikroorganisma metanogen?",
                options: [
                    "Gas Metana / Biogas (CH₄) untuk janakuasa elektrik",
                    "Gas Klorin beracun",
                    "Gas Neon untuk lampu papan tanda",
                    "Asid Sulfurik pekat"
                ],
                correct: 0,
                explanation: "Cemerlang! Biogas mengandungi ~65% Metana (CH₄) yang boleh dibakar dalam enjin CHP untuk menjana ~2 MW tenaga elektrik hijau."
            },
            {
                category: "Rawatan Sekunder",
                question: "Selepas pencernaan anaerobik, mengapakah efluen POME perlu melalui Tangki Pengudaraan Aerobik?",
                options: [
                    "Untuk menambah minyak sawit semula ke dalam air",
                    "Untuk membekalkan oksigen kepada bakteria aerobik menurunkan baki BOD < 20 mg/L",
                    "Untuk memanaskan semula air ke suhu 90°C",
                    "Untuk menghasilkan lebih banyak asap hitam"
                ],
                correct: 1,
                explanation: "Betul! Pengudaraan aerobik menggilap (polish) efluen dengan menurunkan baki BOD dalam model rawatan. Keperluan pelepasan sebenar bergantung pada lokasi serta proses."
            },
            {
                category: "Pemulihan Air Sifar Sisa",
                question: "Teknologi manakah yang menapis efluen terawat menjadi air bersih untuk dikitar semula ke dandang (boiler) kilang?",
                options: [
                    "Jaring penangkap ikan biasa",
                    "Kipas angin gergasi",
                    "Membran Ultrafiltrasi (UF) & Reverse Osmosis (RO)",
                    "Pembakaran terbuka di tapak pelupusan"
                ],
                correct: 2,
                explanation: "Hebat! Gabungan UF dan Membran RO menyingkirkan warna, garam, dan pepejal terampai untuk memulihkan air. Aliran pekatan masih perlu diurus; kadar pemulihan bergantung pada proses."
            },
            {
                category: "Pemulihan Nutrien",
                question: "Apakah kegunaan terbaik bagi enap cemar biologi (sludge) dan tandan kosong (EFB) daripada loji POME?",
                options: [
                    "Dibuang terus ke dalam sungai berhampiran",
                    "Dibakar secara terbuka di tepi jalan",
                    "Dibiarkan reput tanpa kawalan di hutan",
                    "Diproses menjadi Baja Bio-Kompos Organik kaya nutrien NPK"
                ],
                correct: 3,
                explanation: "Tepat! Enap cemar POME kaya dengan Nitrogen, Fosforus, dan Kalium (NPK) yang menggantikan baja kimia sintetik di ladang sawit."
            },
            {
                category: "Keputusan Kejuruteraan",
                question: "Mengapakah pendekatan 'Kawalan Pencemaran + Pemulihan Sumber' lebih baik daripada 'Rawatan Pematuhan Sahaja'?",
                options: [
                    "Melindungi sungai sambil menjana pendapatan elektrik biogas, air RO & baja kompos (Ekonomi Kitaran)",
                    "Kerana ia membenarkan kilang membuang POME mentah ke sungai",
                    "Kerana ia tidak memerlukan sebarang penyelenggaraan",
                    "Kerana ia menghapuskan keperluan memproses buah sawit"
                ],
                correct: 0,
                explanation: "Syabas! Pendekatan bersepadu mengubah masalah air sisa (POME) menjadi sumber tenaga boleh diperbaharui dan sifar sisa!"
            }
        ];

        const STAGE_3_MISSIONS = [
            {
                badge: "MISI 3A • REKA BENTUK ALIRAN PROSES LOJI POME",
                title: "Susun 4 Stesen Teknologi Mengikut Urutan Loji Sifar Sisa",
                desc: "Klik kad teknologi di sebelah kiri dan padankan ke stesen urutan proses (Stesen 1 hingga Stesen 4) yang betul.",
                cards: [
                    { id: "c_cool", title: "Pra-Rawatan: Penyejukan (38°C) & Penyahminyak", icon: "fa-temperature-arrow-down" },
                    { id: "c_anaerob", title: "Bioreaktor Anaerobik Tertutup (Tangkap Biogas CH₄)", icon: "fa-fire-flame-simple" },
                    { id: "c_aerob", title: "Tangki Pengudaraan Aerobik (Turunkan BOD < 20 mg/L)", icon: "fa-wind" },
                    { id: "c_ro", title: "Penapisan Membran UF/RO & Kompos Bio-NPK", icon: "fa-recycle" }
                ],
                zones: [
                    { id: "z1", label: "STESEN 1: Pra-Rawatan Efluen Panas (85°C)", expected: "c_cool" },
                    { id: "z2", label: "STESEN 2: Pencernaan Tanpa Oksigen & Tenaga", expected: "c_anaerob" },
                    { id: "z3", label: "STESEN 3: Penggilapan Oksigen Terlarut (+O₂)", expected: "c_aerob" },
                    { id: "z4", label: "STESEN 4: Kitar Semula Air Dandang & Baja", expected: "c_ro" }
                ]
            },
            {
                badge: "MISI 3B • PENYELESAIAN MASALAH PENCEMARAN POME",
                title: "Padankan Masalah Alam Sekitar dengan Intervensi Teknologi",
                desc: "Pilih teknologi kejuruteraan yang tepat untuk menyelesaikan setiap masalah kritikal di kilang kelapa sawit.",
                cards: [
                    { id: "m_chp", title: "Kubah Biogas + Janakuasa Turbin CHP (2 MW)", icon: "fa-bolt" },
                    { id: "m_pond", title: "Kolam Penyejuk & Penimbal Kapur (pH 7.0)", icon: "fa-droplet" },
                    { id: "m_compost", title: "Loji Bio-Kompos Enap Cemar + Tandan EFB", icon: "fa-seedling" },
                    { id: "m_ro", title: "Sistem Membran Reverse Osmosis (Air Dandang)", icon: "fa-filter" }
                ],
                zones: [
                    { id: "mz1", label: "MASALAH 1: Pelepasan Gas Rumah Hijau Metana (CH₄)", expected: "m_chp" },
                    { id: "mz2", label: "MASALAH 2: POME Mentah Terlalu Panas (85°C) & Berasid (pH 4.2)", expected: "m_pond" },
                    { id: "mz3", label: "MASALAH 3: Lambakan Enap Cemar Pekat & Sisa Tandan", expected: "m_compost" },
                    { id: "mz4", label: "MASALAH 4: Pembaziran Penggunaan Air Bersih di Kilang", expected: "m_ro" }
                ]
            }
        ];

        function showScreen(screenName) {
            state.currentScreen = screenName;
            ["welcome", "game", "certificate"].forEach((s) => {
                const el = document.getElementById(`screen-${s}`);
                if (el) el.classList.toggle("hidden", s !== screenName);
            });
        }

        function updateEnvironmentalTelemetry() {
            const pct = Math.min(1, state.score / 140);
            const currentBod = Math.max(15, Math.round(15 + 24985 * Math.pow(1 - pct, 2.4)));
            const currentDo = (1.2 + pct * 6.4).toFixed(1);
            const biogasMw = (pct * 2.2).toFixed(2);
            const co2Saved = Math.round(pct * 38500);

            const bodVal = document.getElementById("river-bod-val");
            const bodBar = document.getElementById("river-bod-bar");
            const doBadge = document.getElementById("river-do-badge");
            const biogasVal = document.getElementById("river-biogas-val");
            const co2Val = document.getElementById("river-co2-val");
            const waterBg = document.getElementById("river-water-bg");

            if (bodVal) bodVal.textContent = `${currentBod.toLocaleString()} mg/L`;
            if (bodBar) bodBar.style.width = `${Math.max(8, Math.round((1 - pct) * 100))}%`;
            if (doBadge) doBadge.textContent = `DO: ${currentDo} mg/L`;
            if (biogasVal) biogasVal.textContent = `${biogasMw} MW`;
            if (co2Val) co2Val.textContent = `${co2Saved.toLocaleString()} tCO₂e`;

            if (waterBg) {
                if (pct < 0.35) waterBg.setAttribute("fill", "#451a03");
                else if (pct < 0.7) waterBg.setAttribute("fill", "#0f766e");
                else waterBg.setAttribute("fill", "#0284c7");
            }
            updateBadgesAndVillageGrid();
        }

        function updateStagePills() {
            [1, 2, 3].forEach((s) => {
                const pill = document.getElementById(`hud-stage-pill-${s}`);
                if (!pill) return;
                if (s === state.stage) {
                    pill.className = "cursor-pointer px-3 py-1 rounded-full bg-emerald-400 text-navy-950 font-display font-black text-xs shadow";
                } else if (s < state.stage) {
                    pill.className = "cursor-pointer px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-display font-bold text-xs";
                } else {
                    pill.className = "cursor-pointer px-3 py-1 rounded-full bg-navy-800 border border-slate-700 text-slate-400 font-display font-bold text-xs";
                }
            });

            const compass = document.getElementById("face-compass-overlay");
            const calBtn = document.getElementById("btn-calibrate-face");
            if (compass) compass.classList.toggle("hidden", state.stage !== 2);
            if (calBtn) calBtn.classList.toggle("hidden", state.stage !== 2);
        }

        function renderCurrentQuestion() {
            state.awaitNeutral = true;
            state.questionLocked = false;
            state.hintUsedForQuestion = false;
            state.currentGestureKey = null;
            state.gestureHoldStart = 0;

            updateStagePills();
            updateEnvironmentalTelemetry();

            const quizBox = document.getElementById("quiz-mode-container");
            const s3Box = document.getElementById("stage3-mode-container");
            const fbBanner = document.getElementById("feedback-banner");
            if (fbBanner) fbBanner.classList.add("hidden");

            const scoreEl = document.getElementById("hud-score");
            if (scoreEl) scoreEl.textContent = state.score;

            if (state.stage === 3) {
                if (quizBox) quizBox.classList.add("hidden");
                if (s3Box) s3Box.classList.remove("hidden");
                renderStage3Mission();
                return;
            }

            if (quizBox) quizBox.classList.remove("hidden");
            if (s3Box) s3Box.classList.add("hidden");

            const list = state.stage === 1 ? QUESTIONS_STAGE_1 : QUESTIONS_STAGE_2;
            const qObj = list[state.questionIndex];
            if (!qObj) return;

            const qCounter = document.getElementById("hud-question-counter");
            if (qCounter) qCounter.textContent = `Peringkat ${state.stage} • Soalan ${state.questionIndex + 1}/${list.length}`;

            const catBadge = document.getElementById("question-category-badge");
            if (catBadge) catBadge.textContent = qObj.category;

            const stageHint = document.getElementById("question-stage-hint");
            if (stageHint) {
                stageHint.textContent = state.stage === 1
                    ? "✋ Angkat 1, 2, 3 atau 4 Jari selama 1.2s (atau klik kad)"
                    : "😊 Gerakkan Wajah Kiri (A), Kanan (B), Atas (C) atau Bawah (D)";
            }

            const qText = document.getElementById("question-text");
            if (qText) qText.textContent = qObj.question;

            const hintBtn = document.getElementById("btn-use-hint");
            if (hintBtn) {
                hintBtn.disabled = false;
                hintBtn.className = "px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-display font-bold text-[10px] transition";
            }

            const letters = ["A", "B", "C", "D"];
            const badges = state.stage === 1
                ? ["☝️ 1 Jari", "✌️ 2 Jari", "🤟 3 Jari", "🖖 4 Jari"]
                : ["⬅️ Tengok Kiri", "➡️ Tengok Kanan", "⬆️ Dongak Atas", "⬇️ Tunduk Bawah"];

            const grid = document.getElementById("options-grid");
            if (grid) {
                grid.innerHTML = qObj.options.map((optText, idx) => `
                    <button type="button" data-opt-index="${idx}" class="option-card group relative p-4 rounded-2xl bg-navy-900/90 hover:bg-navy-800 border-2 border-slate-700/80 hover:border-cyan-400/60 text-left transition flex flex-col justify-between gap-2 overflow-hidden">
                        <div class="flex items-center justify-between gap-2 w-full">
                            <span class="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-display font-black text-xs">
                                PILIHAN ${letters[idx]}
                            </span>
                            <span class="px-2 py-0.5 rounded-md bg-navy-950 border border-slate-700 text-[11px] font-semibold text-amber-300">
                                ${badges[idx]}
                            </span>
                        </div>
                        <p class="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                            ${optText}
                        </p>
                        <div class="w-full h-1.5 bg-navy-950 rounded-full overflow-hidden mt-1">
                            <div id="opt-fill-${idx}" class="h-full w-0 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-75"></div>
                        </div>
                    </button>
                `).join("");

                grid.querySelectorAll(".option-card").forEach((btn) => {
                    btn.addEventListener("click", () => {
                        const idx = parseInt(btn.getAttribute("data-opt-index"), 10);
                        submitQuizAnswer(idx);
                    });
                });
            }

            speakText(qObj.question);
        }

        function submitQuizAnswer(selectedIndex) {
            if (state.questionLocked || state.stage === 3 || state.currentScreen !== "game") return;
            const answerKey = `${state.stage}-${state.questionIndex}`;
            if (state.answers[answerKey]) return;
            state.questionLocked = true;

            const list = state.stage === 1 ? QUESTIONS_STAGE_1 : QUESTIONS_STAGE_2;
            const qObj = list[state.questionIndex];
            if (!qObj) return;

            const isCorrect = selectedIndex === qObj.correct;
            state.answers[answerKey] = { selected: selectedIndex, correct: isCorrect, hinted: state.hintUsedForQuestion };
            const cards = document.querySelectorAll("#options-grid .option-card");

            cards.forEach((c, idx) => {
                if (idx === qObj.correct) {
                    c.className = "option-card p-4 rounded-2xl bg-emerald-500/25 border-2 border-emerald-400 text-left transition flex flex-col justify-between gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)]";
                } else if (idx === selectedIndex && !isCorrect) {
                    c.className = "option-card p-4 rounded-2xl bg-rose-500/25 border-2 border-rose-400 text-left transition flex flex-col justify-between gap-2";
                } else {
                    c.className = "option-card p-4 rounded-2xl bg-navy-950/50 border border-slate-800 opacity-50 text-left transition flex flex-col justify-between gap-2";
                }
            });

            if (isCorrect) {
                state.score += state.questionWeight || 5;
                state.streak += 1;
                if (state.streak > state.maxStreak) state.maxStreak = state.streak;
                if (state.stage === 1) state.stageScores.s1 += 1;
                if (state.stage === 2) state.stageScores.s2 += 1;
                playTone("correct");
                setMascotMood("happy", `"Syabas ${state.studentName}! Jawapan tepat — sungai semakin pulih & biogas meningkat!"`);
            } else {
                state.streak = 0;
                playTone("wrong");
                setMascotMood("encourage", `"Jangan putus asa! Semak penerangan saintifik di bawah untuk memahami konsep POME ini."`);
            }

            const scoreEl = document.getElementById("hud-score");
            if (scoreEl) scoreEl.textContent = state.score;

            const streakBadge = document.getElementById("hud-streak-badge");
            const streakCount = document.getElementById("hud-streak-count");
            if (streakBadge && streakCount) {
                streakCount.textContent = `STREAK x${state.streak}`;
                streakBadge.classList.toggle("hidden", state.streak < 2);
            }

            updateEnvironmentalTelemetry();

            const fbBanner = document.getElementById("feedback-banner");
            const fbTitle = document.getElementById("feedback-title");
            const fbExp = document.getElementById("feedback-explanation");
            const fbIcon = document.getElementById("feedback-icon");

            if (fbBanner) fbBanner.classList.remove("hidden");
            if (fbTitle) {
                fbTitle.textContent = isCorrect ? `JAWAPAN TEPAT! (+${state.questionWeight || 5} MARKAH)` : "KURANG TEPAT — INFO SAINTIFIK:";
                fbTitle.className = isCorrect ? "font-display font-black text-xs sm:text-sm text-emerald-300" : "font-display font-black text-xs sm:text-sm text-rose-300";
            }
            if (fbExp) fbExp.textContent = qObj.explanation;
            if (fbIcon) {
                fbIcon.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check text-emerald-300"></i>` : `<i class="fa-solid fa-triangle-exclamation text-rose-300"></i>`;
            }

            speakText(qObj.explanation);
        }

        function advanceToNextQuestion() {
            if (!state.questionLocked || state.stage === 3) return;
            const list = state.stage === 1 ? QUESTIONS_STAGE_1 : QUESTIONS_STAGE_2;
            if (state.questionIndex + 1 < list.length) {
                state.questionIndex += 1;
                renderCurrentQuestion();
            } else if (state.stage === 1) {
                state.stage = 2;
                state.questionIndex = 0;
                state.faceAutoCalibrated = false;
                showStageTransitionModal(
                    "PERINGKAT 2: RADAR ARAH WAJAH AI",
                    "Anda telah menamatkan Peringkat 1! Kini gunakan gerakan kepala/wajah: Tengok Kiri (A), Tengok Kanan (B), Dongak Atas (C), atau Tunduk Bawah (D)."
                );
                renderCurrentQuestion();
            } else if (state.stage === 2) {
                state.stage = 3;
                state.stage3MissionIndex = 0;
                showStageTransitionModal(
                    "PERINGKAT 3: JURUTERA LOJI POME",
                    "Peringkat Terakhir! Klik atau padankan stesen teknologi untuk membina Loji Sifar Sisa POME."
                );
                renderCurrentQuestion();
            }
        }

        function showStageTransitionModal(title, desc) {
            const m = document.getElementById("modal-stage-transition");
            const t = document.getElementById("transition-stage-title");
            const d = document.getElementById("transition-stage-desc");
            if (t) t.textContent = title;
            if (d) d.textContent = desc;
            if (m) m.classList.remove("hidden");
        }

        function renderStage3Mission() {
            const mission = STAGE_3_MISSIONS[state.stage3MissionIndex];
            if (!mission) {
                finishMissionAndShowCertificate();
                return;
            }
            state.stage3Matches = {};
            state.selectedStage3CardId = null;

            const bEl = document.getElementById("s3-mission-badge");
            const tEl = document.getElementById("s3-mission-title");
            const dEl = document.getElementById("s3-mission-desc");
            if (bEl) bEl.textContent = mission.badge;
            if (tEl) tEl.textContent = mission.title;
            if (dEl) dEl.textContent = mission.desc;

            updateStage3BoardUI();
        }

        function updateStage3BoardUI() {
            const mission = STAGE_3_MISSIONS[state.stage3MissionIndex];
            if (!mission) return;

            const poolEl = document.getElementById("s3-cards-pool");
            const zonesEl = document.getElementById("s3-dropzones-grid");
            const matchedCardIds = Object.values(state.stage3Matches);

            if (poolEl) {
                poolEl.innerHTML = mission.cards.map((card) => {
                    const isUsed = matchedCardIds.includes(card.id);
                    const isSelected = state.selectedStage3CardId === card.id;
                    return `
                        <button type="button" data-card-id="${card.id}" ${isUsed ? "disabled" : ""} class="s3-card-item w-full p-3 rounded-xl text-left transition flex items-center gap-3 ${
                            isUsed
                                ? "bg-navy-950/40 border border-slate-800 opacity-40 cursor-not-allowed"
                                : isSelected
                                ? "bg-cyan-500/25 border-2 border-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.4)]"
                                : "bg-navy-900 hover:bg-navy-800 border border-cyan-500/30"
                        }">
                            <span class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0">
                                <i class="fa-solid ${card.icon}"></i>
                            </span>
                            <span class="text-xs font-bold text-white leading-snug">${card.title}</span>
                        </button>
                    `;
                }).join("");

                poolEl.querySelectorAll(".s3-card-item").forEach((btn) => {
                    btn.addEventListener("click", () => {
                        const cid = btn.getAttribute("data-card-id");
                        state.selectedStage3CardId = cid;
                        playTone("tick");
                        updateStage3BoardUI();
                    });
                });
            }

            if (zonesEl) {
                zonesEl.innerHTML = mission.zones.map((zone) => {
                    const matchedId = state.stage3Matches[zone.id];
                    const matchedCard = mission.cards.find((c) => c.id === matchedId);
                    return `
                        <button type="button" data-zone-id="${zone.id}" class="s3-zone-item w-full p-3.5 rounded-xl text-left transition border-2 ${
                            matchedCard
                                ? "bg-emerald-500/20 border-emerald-400"
                                : state.selectedStage3CardId
                                ? "bg-navy-900/90 border-dashed border-amber-400 hover:bg-amber-500/10"
                                : "bg-navy-950/80 border-dashed border-slate-700 hover:border-cyan-400/50"
                        }">
                            <div class="text-[11px] font-display font-bold text-cyan-300 mb-1">${zone.label}</div>
                            ${
                                matchedCard
                                    ? `<div class="text-xs font-bold text-emerald-300 flex items-center gap-2"><i class="fa-solid fa-circle-check"></i> ${matchedCard.title}</div>`
                                    : `<div class="text-[11px] text-slate-400 italic">Klik kad teknologi dahulu, kemudian klik stesen ini...</div>`
                            }
                        </button>
                    `;
                }).join("");

                zonesEl.querySelectorAll(".s3-zone-item").forEach((btn) => {
                    btn.addEventListener("click", () => {
                        const zid = btn.getAttribute("data-zone-id");
                        handleStage3ZoneAttempt(zid);
                    });
                });
            }
        }

        function handleStage3ZoneAttempt(zoneId) {
            const mission = STAGE_3_MISSIONS[state.stage3MissionIndex];
            if (!mission || state.missionCompleted[state.stage3MissionIndex]) return;

            const zone = mission.zones.find((z) => z.id === zoneId);
            if (!zone || state.stage3Matches[zoneId]) return;

            const candidateCardId = state.selectedStage3CardId;
            if (!candidateCardId) return;

            if (candidateCardId === zone.expected) {
                state.stage3Matches[zoneId] = candidateCardId;
                state.selectedStage3CardId = null;
                playTone("correct");
                updateStage3BoardUI();

                if (Object.keys(state.stage3Matches).length === mission.zones.length) {
                    state.missionCompleted[state.stage3MissionIndex] = true;
                    state.score += 20;
                    state.stageScores.s3 += 1;
                    const scoreEl = document.getElementById("hud-score");
                    if (scoreEl) scoreEl.textContent = state.score;
                    updateEnvironmentalTelemetry();

                    const completionSession = missionSession;
                    setTimeout(() => {
                        if (completionSession !== missionSession || state.currentScreen !== "game") return;
                        if (state.stage3MissionIndex + 1 < STAGE_3_MISSIONS.length) {
                            state.stage3MissionIndex += 1;
                            renderStage3Mission();
                        } else {
                            finishMissionAndShowCertificate();
                        }
                    }, 900);
                }
            } else {
                playTone("wrong");
                setMascotMood("encourage", `"Urutan stesen tersebut kurang tepat. Cuba semak fungsi teknologi pada kad yang dipilih!"`);
            }
        }

        function finishMissionAndShowCertificate() {
            showScreen("certificate");
            playTone("fanfare");
            const sScore = document.getElementById("cert-stat-score");
            const s1 = document.getElementById("cert-stat-s1");
            const s2 = document.getElementById("cert-stat-s2");
            const s3 = document.getElementById("cert-stat-s3");
            if (sScore) sScore.textContent = `${state.score} / 140`;
            if (s1) s1.textContent = `${state.stageScores.s1} / ${QUESTIONS_STAGE_1.length} Betul`;
            if (s2) s2.textContent = `${state.stageScores.s2} / ${QUESTIONS_STAGE_2.length} Betul`;
            if (s3) s3.textContent = `${state.stageScores.s3} / 2 Misi`;
            saveScoreToLeaderboard();
            renderLeaderboardTable();
            drawCertificateCanvas();
        }

        window.captureWebcamToCertificate = function () {
            const video = document.getElementById("webcam-video");
            if (!state.cameraReady || !video || video.videoWidth === 0) {
                setMascotMood("encourage", `"Kamera belum aktif. Sila benarkan akses kamera untuk merakam foto anda pada sijil!"`);
                return;
            }
            try {
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = 160;
                tempCanvas.height = 160;
                const tCtx = tempCanvas.getContext("2d");
                tCtx.translate(160, 0);
                tCtx.scale(-1, 1);
                const minDim = Math.min(video.videoWidth, video.videoHeight);
                const sx = (video.videoWidth - minDim) / 2;
                const sy = (video.videoHeight - minDim) / 2;
                tCtx.drawImage(video, sx, sy, minDim, minDim, 0, 0, 160, 160);
                state.selfieDataUrl = tempCanvas.toDataURL("image/png");
                playTone("fanfare");
                const btnTxt = document.getElementById("selfie-btn-text");
                if (btnTxt) btnTxt.textContent = "Foto Kamera AI Disertakan! (Klik untuk Ambil Semula)";
                drawCertificateCanvas();
            } catch (e) {}
        };

        let memoryLeaderboard = [];

        function saveScoreToLeaderboard() {
            const avatarMeta = AVATAR_PROFILES[state.selectedAvatar] || AVATAR_PROFILES.biogas;
            const entry = {
                name: state.studentName || "JURUTERA MUDA SMK",
                studentClass: state.studentClass || "5 Sains Lestari",
                avatarTitle: avatarMeta.title,
                score: state.score,
                timeStr: new Date().toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" })
            };
            memoryLeaderboard.push(entry);
            memoryLeaderboard.sort((a, b) => b.score - a.score);
            memoryLeaderboard = memoryLeaderboard.slice(0, 8);
        }

        function renderLeaderboardTable() {
            const tbody = document.getElementById("leaderboard-tbody");
            if (!tbody) return;
            if (memoryLeaderboard.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="py-3 text-center text-slate-400">Menunggu rekod pencapaian pertama...</td></tr>`;
                return;
            }
            tbody.innerHTML = memoryLeaderboard.map((item, idx) => {
                const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`;
                return `
                    <tr class="hover:bg-navy-800/60 transition">
                        <td class="py-2 px-2 font-display font-bold text-amber-300">${medal}</td>
                        <td class="py-2 px-2 font-bold text-white">${escapeHTML(item.name)}</td>
                        <td class="py-2 px-2 text-slate-300">${escapeHTML(item.studentClass)}</td>
                        <td class="py-2 px-2 text-cyan-300 font-semibold">${escapeHTML(item.avatarTitle)}</td>
                        <td class="py-2 px-2 font-display font-black text-emerald-400">${item.score} / 140</td>
                        <td class="py-2 px-2 text-slate-400">${escapeHTML(item.timeStr)}</td>
                    </tr>
                `;
            }).join("");
        }

        window.clearLeaderboard = function () {
            memoryLeaderboard = [];
            renderLeaderboardTable();
        };

        function drawCertificateCanvas() {
            const c = document.getElementById("certificate-canvas");
            if (!c) return;
            const ctx = c.getContext("2d");

            const grad = ctx.createLinearGradient(0, 0, c.width, c.height);
            grad.addColorStop(0, "#040814");
            grad.addColorStop(0.5, "#0b1528");
            grad.addColorStop(1, "#022c22");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, c.width, c.height);

            ctx.strokeStyle = "#10b981";
            ctx.lineWidth = 4;
            ctx.strokeRect(28, 28, c.width - 56, c.height - 56);

            ctx.strokeStyle = "rgba(34, 211, 238, 0.4)";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(42, 42, c.width - 84, c.height - 84);

            ctx.textAlign = "center";
            ctx.fillStyle = "#34d399";
            ctx.font = "bold 18px 'Orbitron', sans-serif";
            ctx.fillText("SIJIL PENCAPAIAN JURUTERA MUDA TEKNOLOGI ALAM SEKITAR", c.width / 2, 95);

            ctx.fillStyle = "#ffffff";
            ctx.font = "900 38px 'Orbitron', sans-serif";
            ctx.fillText("POME QUESTURE: SIFAR SISA", c.width / 2, 145);

            ctx.fillStyle = "#94a3b8";
            ctx.font = "16px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText("Dengan ini disahkan bahawa", c.width / 2, 195);

            ctx.fillStyle = "#fde047";
            ctx.font = "800 34px 'Orbitron', sans-serif";
            ctx.fillText((state.studentName || "JURUTERA MUDA SMK").toUpperCase(), c.width / 2, 245);

            const avatarMeta = AVATAR_PROFILES[state.selectedAvatar] || AVATAR_PROFILES.biogas;
            ctx.fillStyle = "#22d3ee";
            ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText(`${state.studentClass}  •  Gelaran: ${avatarMeta.title}`, c.width / 2, 282);

            ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
            ctx.fillRect(110, 315, c.width - 220, 115);
            ctx.strokeStyle = "rgba(52, 211, 153, 0.45)";
            ctx.strokeRect(110, 315, c.width - 220, 115);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 24px 'Orbitron', sans-serif";
            ctx.fillText(`MARKAH KESELURUHAN: ${state.score} / 140`, c.width / 2, 355);

            ctx.fillStyle = "#cbd5e1";
            ctx.font = "600 16px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText(
                `Stage 1 (Jari): ${state.stageScores.s1}/${QUESTIONS_STAGE_1.length}   |   Stage 2 (Wajah): ${state.stageScores.s2}/${QUESTIONS_STAGE_2.length}   |   Stage 3 (Loji POME): ${state.stageScores.s3}/2`,
                c.width / 2,
                390
            );

            const pledges = [
                "Deklarasi: Mengutamakan Sistem Bersepadu Bioreaktor Biogas CH₄ + Membran RO (Sifar Sisa)",
                "Deklarasi: Memulihkan Tenaga Elektrik Hijau (2 MW) & Baja Kompos Bio-NPK daripada POME",
                "Deklarasi: Melindungi Oksigen Terlarut (DO) Sungai dengan BOD Akhir < 20 mg/L"
            ];
            ctx.fillStyle = "#6ee7b7";
            ctx.font = "italic 14px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText(pledges[state.certPledgeIndex] || pledges[0], c.width / 2, 418);

            // Gold Seal CLO3 Verified
            ctx.save();
            ctx.beginPath();
            ctx.arc(c.width / 2, 515, 48, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(251, 191, 36, 0.18)";
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#fbbf24";
            ctx.stroke();
            ctx.fillStyle = "#fde047";
            ctx.font = "bold 12px 'Orbitron', sans-serif";
            ctx.fillText("CLO3 VERIFIED", c.width / 2, 512);
            ctx.font = "bold 10px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText("SBV60104 POME", c.width / 2, 528);
            ctx.restore();

            ctx.textAlign = "left";
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText("SBV60104 Environmental Technology (CLO3)", 80, 605);
            ctx.fillStyle = "#94a3b8";
            ctx.font = "15px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText(`Tarikh: ${new Date().toLocaleDateString("ms-MY")}`, 80, 628);

            ctx.textAlign = "right";
            ctx.fillStyle = "#22d3ee";
            ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText("Dikuasakan oleh MediaPipe Computer Vision AI", c.width - 80, 605);
            ctx.fillStyle = "#94a3b8";
            ctx.font = "600 15px 'Plus Jakarta Sans', sans-serif";
            ctx.fillText("Inovasi PdP Digital Interaktif • Option 2: POME", c.width - 80, 628);

            if (state.selfieDataUrl) {
                const img = new Image();
                img.onload = () => {
                    ctx.save();
                    const cx = c.width - 135;
                    const cy = 145;
                    const r = 52;
                    ctx.beginPath();
                    ctx.arc(cx, cy, r, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
                    ctx.restore();

                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(c.width - 135, 145, 52, 0, Math.PI * 2);
                    ctx.lineWidth = 3.5;
                    ctx.strokeStyle = "#34d399";
                    ctx.stroke();
                    ctx.fillStyle = "#fde047";
                    ctx.font = "bold 10px 'Orbitron', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText("FOTO JURUTERA AI", c.width - 135, 212);
                    ctx.restore();
                };
                img.src = state.selfieDataUrl;
            }
        }

        let visionGeneration = 0;
        let cameraStarting = false;
        let handLandmarker = null;
        let faceLandmarker = null;
        let webcamStream = null;
        let lastVideoTime = -1;
        let frameCount = 0;
        let lastFpsTime = performance.now();

        async function ensureMediaPipeModels() {
            if (state.aiModelsReady && handLandmarker && faceLandmarker) return true;
            try {
                const visionModule = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm");
                const FilesetResolver = visionModule.FilesetResolver;
                const HandLandmarker = visionModule.HandLandmarker;
                const FaceLandmarker = visionModule.FaceLandmarker;

                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
                );

                handLandmarker = await HandLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
                        delegate: "CPU"
                    },
                    runningMode: "VIDEO",
                    numHands: 2
                });

                faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                        delegate: "CPU"
                    },
                    runningMode: "VIDEO",
                    numFaces: 1
                });

                state.aiModelsReady = true;
                return true;
            } catch (err) {
                console.log("MediaPipe load notice:", err);
                return false;
            }
        }

        async function startCameraAndAI() {
            if (cameraStarting) return;
            cameraStarting = true;
            const generation = ++visionGeneration;
            const loadingOverlay = document.getElementById("camera-loading-overlay");
            const errorOverlay = document.getElementById("camera-error-overlay");
            if (loadingOverlay) loadingOverlay.classList.remove("hidden");
            if (errorOverlay) errorOverlay.classList.add("hidden");

            try {
                const environment = cameraEnvironment();
                if (!environment.secure) throw new Error("INSECURE_CONTEXT");
                if (!environment.api) throw new Error("CAMERA_API_UNAVAILABLE");
                if (!webcamStream) {
                    webcamStream = await navigator.mediaDevices.getUserMedia({
                        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
                        audio: false
                    });
                }

                const gameVideo = document.getElementById("webcam-video");
                const debugVideo = document.getElementById("debug-webcam-video");
                if (gameVideo && gameVideo.srcObject !== webcamStream) {
                    gameVideo.srcObject = webcamStream;
                    await gameVideo.play().catch(() => {});
                }
                if (debugVideo && debugVideo.srcObject !== webcamStream) {
                    debugVideo.srcObject = webcamStream;
                    await debugVideo.play().catch(() => {});
                }

                if (generation !== visionGeneration) { webcamStream?.getTracks().forEach(t => t.stop()); webcamStream = null; return; }
                state.cameraReady = true;
                const modelReady = await ensureMediaPipeModels();
                if (generation !== visionGeneration) return;
                if (!modelReady) throw new Error("MODEL_LOAD_FAILED");

                if (loadingOverlay) loadingOverlay.classList.add("hidden");
                requestAnimationFrame(() => processVisionLoop(generation));
            } catch (err) {
                state.cameraReady = false;
                webcamStream?.getTracks().forEach(t => t.stop()); webcamStream = null;
                if (loadingOverlay) loadingOverlay.classList.add("hidden");
                if (errorOverlay) errorOverlay.classList.remove("hidden");
                const errText = document.getElementById("camera-error-text");
                const cameraMessage = cameraFailureMessage(err);
                refreshCameraDiagnostics(err);
                if (errText) errText.textContent = cameraMessage;
                const debugStatus = document.getElementById("debug-status-text");
                if (debugStatus) debugStatus.textContent = cameraMessage;
                premiumToast(cameraMessage);
            } finally { cameraStarting = false;
            }
        }

        function countRaisedFingers(landmarks) {
            if (!landmarks || landmarks.length < 21) return 0;
            let count = 0;
            const tips = [8, 12, 16, 20];
            const pips = [6, 10, 14, 18];
            for (let i = 0; i < 4; i++) {
                if (landmarks[tips[i]].y < landmarks[pips[i]].y - 0.02) count++;
            }
            const thumbExtended = Math.abs(landmarks[4].x - landmarks[17].x) > Math.abs(landmarks[3].x - landmarks[17].x) + 0.03;
            if (thumbExtended && count === 4) count = 5;
            return count;
        }

        function detectHeadDirection(faceLandmarks) {
            if (!faceLandmarks || faceLandmarks.length < 455) return { key: null, label: "Tiada Wajah" };
            const nose = faceLandmarks[1];
            const leftEye = faceLandmarks[33];
            const rightEye = faceLandmarks[263];
            const leftEar = faceLandmarks[234];
            const rightEar = faceLandmarks[454];

            const eyeMidX = (leftEye.x + rightEye.x) / 2;
            const earMidY = (leftEar.y + rightEar.y) / 2;
            const faceWidth = Math.max(0.08, Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y));

            if (!state.faceAutoCalibrated) {
                state.faceYawOffset = (nose.x - eyeMidX) / faceWidth;
                state.facePitchOffset = (nose.y - earMidY) / faceWidth;
                state.faceAutoCalibrated = true;
            }

            const rawYaw = (nose.x - eyeMidX) / faceWidth - state.faceYawOffset;
            const rawPitch = (nose.y - earMidY) / faceWidth - state.facePitchOffset;
            const mirroredYaw = -rawYaw;

            if (mirroredYaw < -0.20) return { key: 0, label: "⬅️ Tengok Kiri (Pilihan A)", yaw: mirroredYaw, pitch: rawPitch };
            if (mirroredYaw > 0.20) return { key: 1, label: "➡️ Tengok Kanan (Pilihan B)", yaw: mirroredYaw, pitch: rawPitch };
            if (rawPitch < -0.11) return { key: 2, label: "⬆️ Dongak Atas (Pilihan C)", yaw: mirroredYaw, pitch: rawPitch };
            if (rawPitch > 0.12) return { key: 3, label: "⬇️ Tunduk Bawah (Pilihan D)", yaw: mirroredYaw, pitch: rawPitch };

            return { key: null, label: "😊 Wajah Neutral (Tengah)", yaw: mirroredYaw, pitch: rawPitch };
        }

        function processVisionLoop(generation) {
            if (!state.cameraReady || generation !== visionGeneration) return;

            const activeVideo = state.debugModeActive
                ? document.getElementById("debug-webcam-video")
                : document.getElementById("webcam-video");
            const activeCanvas = state.debugModeActive
                ? document.getElementById("debug-landmark-canvas")
                : document.getElementById("landmark-canvas");

            if (activeVideo && activeCanvas && activeVideo.readyState >= 2) {
                const now = performance.now();

                if (now - lastFpsTime >= 1000) {
                    const fps = Math.round((frameCount * 1000) / (now - lastFpsTime));
                    const fpsBadge = document.getElementById("fps-badge");
                    const dbgMetrics = document.getElementById("debug-metrics-text");
                    if (fpsBadge) fpsBadge.textContent = `${fps} FPS`;
                    if (dbgMetrics) dbgMetrics.textContent = `Diagnostik: ${fps} FPS`;
                    frameCount = 0;
                    lastFpsTime = now;
                }

                if (activeVideo.currentTime !== lastVideoTime && state.aiModelsReady) {
                    frameCount++;
                    lastVideoTime = activeVideo.currentTime;
                    activeCanvas.width = activeVideo.videoWidth || 640;
                    activeCanvas.height = activeVideo.videoHeight || 480;
                    const ctx = activeCanvas.getContext("2d");
                    ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);

                    const useFace = (state.debugModeActive && state.debugTarget === "face") || (!state.debugModeActive && state.stage === 2);

                    if (!useFace && handLandmarker) {
                        const res = detectVisionSafely(handLandmarker, activeVideo, now);
                        if (res.landmarks && res.landmarks.length > 0) {
                            const lm = res.landmarks[0];
                            drawHandSkeleton(ctx, lm, activeCanvas.width, activeCanvas.height);
                            const fingers = countRaisedFingers(lm);
                            const dbgStatus = document.getElementById("debug-status-text");
                            if (dbgStatus) dbgStatus.textContent = `Tangan Dikesan: ${fingers} Jari`;

                            if (!state.debugModeActive && state.currentScreen === "game") {
                                handleGameHandGesture(fingers, now);
                            }
                        } else {
                            state.currentGestureKey = null;
                            updateGestureHUD("Tiada Tangan", 0);
                        }
                    } else if (useFace && faceLandmarker) {
                        const res = detectVisionSafely(faceLandmarker, activeVideo, now);
                        if (res.faceLandmarks && res.faceLandmarks.length > 0) {
                            const flm = res.faceLandmarks[0];
                            drawFaceVector(ctx, flm, activeCanvas.width, activeCanvas.height);
                            const dir = detectHeadDirection(flm);
                            const dbgStatus = document.getElementById("debug-status-text");
                            if (dbgStatus) dbgStatus.textContent = dir.label;

                            if (!state.debugModeActive && state.currentScreen === "game") {
                                handleGameFaceGesture(dir, now);
                            }
                        } else {
                            state.currentGestureKey = null;
                            updateGestureHUD("Tiada Wajah", 0);
                        }
                    }
                }
            }

            requestAnimationFrame(() => processVisionLoop(generation));
        }

        function drawHandSkeleton(ctx, lm, w, h) {
            const connections = [
                [0,1],[1,2],[2,3],[3,4],
                [0,5],[5,6],[6,7],[7,8],
                [5,9],[9,10],[10,11],[11,12],
                [9,13],[13,14],[14,15],[15,16],
                [13,17],[17,18],[18,19],[19,20],[0,17]
            ];
            ctx.strokeStyle = "rgba(52, 211, 153, 0.75)";
            ctx.lineWidth = 2.5;
            connections.forEach(([a, b]) => {
                ctx.beginPath();
                ctx.moveTo(lm[a].x * w, lm[a].y * h);
                ctx.lineTo(lm[b].x * w, lm[b].y * h);
                ctx.stroke();
            });
            ctx.fillStyle = "#22d3ee";
            for (let i = 0; i < lm.length; i++) {
                ctx.beginPath();
                ctx.arc(lm[i].x * w, lm[i].y * h, 4.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function drawFaceVector(ctx, flm, w, h) {
            const nose = flm[1];
            const leftEar = flm[234];
            const rightEar = flm[454];
            ctx.strokeStyle = "rgba(34, 211, 238, 0.6)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(leftEar.x * w, leftEar.y * h);
            ctx.lineTo(rightEar.x * w, rightEar.y * h);
            ctx.stroke();

            ctx.fillStyle = "#fde047";
            ctx.beginPath();
            ctx.arc(nose.x * w, nose.y * h, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        function handleGameHandGesture(fingers, now) {
            if (visionSuspended() || state.stage === 3) { state.currentGestureKey = null; return; }
            if (state.awaitNeutral) { if (fingers === 0) state.awaitNeutral = false; else { updateGestureHUD("Turunkan jari dahulu", 0); return; } }
            if (state.questionLocked) {
                if (fingers === 5) {
                    if (state.currentGestureKey !== "next5") {
                        state.currentGestureKey = "next5";
                        state.gestureHoldStart = now;
                    }
                    const pct = Math.min(100, Math.round(((now - state.gestureHoldStart) / 800) * 100));
                    updateGestureHUD("🖐️ 5 Jari (Soalan Seterusnya)", pct);
                    if (pct >= 100) {
                        state.currentGestureKey = null;
                        advanceToNextQuestion();
                    }
                } else {
                    state.currentGestureKey = null;
                    updateGestureHUD("Angkat 5 Jari → Seterusnya", 0);
                }
                return;
            }

            if (fingers >= 1 && fingers <= 4) {
                const choiceIdx = fingers - 1;
                if (state.currentGestureKey !== choiceIdx) {
                    state.currentGestureKey = choiceIdx;
                    state.gestureHoldStart = now;
                }
                const pct = Math.min(100, Math.round(((now - state.gestureHoldStart) / state.gestureHoldDuration) * 100));
                const letters = ["A", "B", "C", "D"];
                updateGestureHUD(`${fingers} Jari → Pilihan ${letters[choiceIdx]}`, pct, choiceIdx);
                if (pct >= 100) {
                    state.currentGestureKey = null;
                    submitQuizAnswer(choiceIdx);
                }
            } else {
                state.currentGestureKey = null;
                updateGestureHUD("Angkat 1-4 Jari", 0);
            }
        }

        function handleGameFaceGesture(dir, now) {
            if (visionSuspended()) { state.currentGestureKey = null; return; }
            if (state.awaitNeutral) { if (dir.key === null) state.awaitNeutral = false; else { updateGestureHUD("Kembali ke wajah neutral", 0); return; } }
            if (state.questionLocked) {
                updateGestureHUD("Klik Seterusnya", 0);
                return;
            }
            if (dir.key !== null) {
                if (state.currentGestureKey !== dir.key) {
                    state.currentGestureKey = dir.key;
                    state.gestureHoldStart = now;
                }
                const pct = Math.min(100, Math.round(((now - state.gestureHoldStart) / state.gestureHoldDuration) * 100));
                updateGestureHUD(dir.label, pct, dir.key);
                if (pct >= 100) {
                    state.currentGestureKey = null;
                    submitQuizAnswer(dir.key);
                }
            } else {
                state.currentGestureKey = null;
                updateGestureHUD(dir.label, 0);
            }
        }

        function updateGestureHUD(label, pct, activeOptionIdx = -1) {
            const lblEl = document.getElementById("detected-gesture-label");
            const barEl = document.getElementById("gesture-hold-bar");
            const pctEl = document.getElementById("gesture-hold-pct");
            if (lblEl) lblEl.textContent = label;
            if (barEl) barEl.style.width = `${pct}%`;
            if (pctEl) pctEl.textContent = `${pct}%`;

            [0, 1, 2, 3].forEach((i) => {
                const fill = document.getElementById(`opt-fill-${i}`);
                if (fill) fill.style.width = i === activeOptionIdx ? `${pct}%` : "0%";
            });
        }

        function safeOn(id, event, handler) {
            const el = document.getElementById(id);
            if (el) el.addEventListener(event, handler);
        }

        safeOn("btn-start-game", "click", () => {
            const nameInput = document.getElementById("input-student-name");
            const classInput = document.getElementById("input-student-class");
            const rawName = nameInput ? nameInput.value.trim() : "";
            state.studentName = rawName || "JURUTERA MUDA SMK";
            state.studentClass = classInput && classInput.value.trim() ? classInput.value.trim() : "5 Sains Lestari SMK";

            const hudName = document.getElementById("hud-student-name");
            const hudClass = document.getElementById("hud-student-class");
            if (hudName) hudName.textContent = state.studentName;
            if (hudClass) hudClass.textContent = state.studentClass;

            state.stage = 1;
            state.questionIndex = 0;
            state.stage3MissionIndex = 0;
            state.score = 0;
            state.streak = 0;
            state.maxStreak = 0; state.answers = {}; state.missionCompleted = {}; state.sessionSaved = false;
            state.reactorBoostClicks = 0; state.reactorCooled = false; state.reactorNeutralized = false;
            state.selfieDataUrl = null; state.certPledgeIndex = 0;
            state.stageScores = { s1: 0, s2: 0, s3: 0 };

            playTone("fanfare");
            showScreen("game");
            renderCurrentQuestion();
            if (state.controlMode === "vision") startCameraAndAI();
        });

        safeOn("btn-next-question", "click", () => {
            playTone("tick");
            advanceToNextQuestion();
        });

        safeOn("btn-switch-stage-manual", "click", () => {
            playTone("tick");
            state.stage = state.stage === 1 ? 2 : state.stage === 2 ? 3 : 1;
            state.questionIndex = 0;
            state.stage3MissionIndex = 0;
            renderCurrentQuestion();
        });

        safeOn("btn-use-hint", "click", () => {
            if (state.hintUsedForQuestion || state.questionLocked) return;
            state.hintUsedForQuestion = true;
            playTone("tick");
            const list = state.stage === 1 ? QUESTIONS_STAGE_1 : QUESTIONS_STAGE_2;
            const qObj = list[state.questionIndex];
            if (!qObj) return;
            let hiddenCount = 0;
            document.querySelectorAll("#options-grid .option-card").forEach((card, idx) => {
                if (idx !== qObj.correct && hiddenCount < 2) {
                    card.classList.add("opacity-30", "pointer-events-none");
                    hiddenCount++;
                }
            });
        });

        safeOn("btn-open-simulator", "click", () => {
            const m = document.getElementById("modal-simulation");
            if (m) m.classList.remove("hidden");
        });
        safeOn("btn-close-simulator", "click", () => {
            const m = document.getElementById("modal-simulation");
            if (m) m.classList.add("hidden");
        });

        safeOn("btn-open-pedagogy", "click", () => {
            const m = document.getElementById("modal-pedagogy");
            if (m) m.classList.remove("hidden");
        });
        safeOn("btn-close-pedagogy", "click", () => {
            const m = document.getElementById("modal-pedagogy");
            if (m) m.classList.add("hidden");
        });

        safeOn("btn-test-camera", "click", () => {
            state.debugModeActive = true;
            const m = document.getElementById("modal-camera-debug");
            if (m) m.classList.remove("hidden");
            startCameraAndAI();
        });
        safeOn("btn-close-debug", "click", () => {
            state.debugModeActive = false;
            const m = document.getElementById("modal-camera-debug");
            if (m) m.classList.add("hidden");
        });
        safeOn("btn-debug-start-now", "click", () => {
            state.debugModeActive = false;
            const m = document.getElementById("modal-camera-debug");
            if (m) m.classList.add("hidden");
            const startBtn = document.getElementById("btn-start-game");
            if (startBtn) startBtn.click();
        });
        safeOn("btn-debug-mode-hand", "click", () => {
            state.debugTarget = "hand";
            const bHand = document.getElementById("btn-debug-mode-hand");
            const bFace = document.getElementById("btn-debug-mode-face");
            if (bHand) bHand.className = "flex-1 py-2 rounded-xl bg-cyan-500 text-navy-950 font-display font-bold text-xs";
            if (bFace) bFace.className = "flex-1 py-2 rounded-xl bg-navy-800 text-cyan-300 border border-cyan-500/30 font-display font-bold text-xs";
        });
        safeOn("btn-debug-mode-face", "click", () => {
            state.debugTarget = "face";
            state.faceAutoCalibrated = false;
            const bHand = document.getElementById("btn-debug-mode-hand");
            const bFace = document.getElementById("btn-debug-mode-face");
            if (bFace) bFace.className = "flex-1 py-2 rounded-xl bg-cyan-500 text-navy-950 font-display font-bold text-xs";
            if (bHand) bHand.className = "flex-1 py-2 rounded-xl bg-navy-800 text-cyan-300 border border-cyan-500/30 font-display font-bold text-xs";
        });
        safeOn("btn-debug-calibrate-face", "click", () => {
            state.faceAutoCalibrated = false;
            playTone("tick");
        });
        safeOn("btn-calibrate-face", "click", () => {
            state.faceAutoCalibrated = false;
            playTone("tick");
        });

        safeOn("ffb-slider", "input", (e) => {
            const ffb = parseInt(e.target.value, 10) || 60;
            const dailyFfb = ffb * 20;
            const pomeVol = Math.round(dailyFfb * 0.65);
            const biogasVol = Math.round(pomeVol * 28);
            const elecKwh = Math.round(biogasVol * 2.0);
            const roWater = Math.round(pomeVol * 0.7);

            const lbl = document.getElementById("ffb-val-label");
            const c1 = document.getElementById("calc-pome-vol");
            const c2 = document.getElementById("calc-biogas-vol");
            const c3 = document.getElementById("calc-elec-kwh");
            const c4 = document.getElementById("calc-ro-water");
            if (lbl) lbl.textContent = `${ffb} Tan FFB / Jam`;
            if (c1) c1.textContent = `${pomeVol.toLocaleString()} m³/hari`;
            if (c2) c2.textContent = `${biogasVol.toLocaleString()} m³/hari`;
            if (c3) c3.textContent = `${elecKwh.toLocaleString()} kWh/hari`;
            if (c4) c4.textContent = `${roWater.toLocaleString()} m³/hari`;
        });

        safeOn("btn-download-cert", "click", () => {
            const c = document.getElementById("certificate-canvas");
            if (!c) return;
            const link = document.createElement("a");
            link.download = `Sijil_POME_QUESTURE_${(state.studentName || "Jurutera").replace(/\s+/g, "_")}.png`;
            link.href = c.toDataURL("image/png");
            link.click();
        });

        safeOn("btn-replay-game", "click", () => {
            showScreen("welcome");
        });

        safeOn("btn-toggle-sound", "click", () => {
            state.soundEnabled = !state.soundEnabled;
            const icon = document.getElementById("sound-icon");
            if (icon) icon.className = state.soundEnabled ? "fa-solid fa-volume-high text-emerald-400 text-xs" : "fa-solid fa-volume-xmark text-slate-400 text-xs";
        });

        safeOn("btn-toggle-voice", "click", () => {
            state.voiceEnabled = !state.voiceEnabled;
            const lbl = document.getElementById("voice-label");
            if (lbl) lbl.textContent = state.voiceEnabled ? "Suara AI: Aktif" : "Suara AI: Mati";
        });

        safeOn("btn-toggle-bgm", "click", () => {
            state.bgmEnabled = !state.bgmEnabled;
            const lbl = document.getElementById("bgm-label");
            if (lbl) lbl.textContent = state.bgmEnabled ? "Muzik: Aktif" : "Muzik: Mati";
            if (state.bgmEnabled) {
                playTone("tick");
                bgmInterval = setInterval(() => {
                    if (state.bgmEnabled && state.soundEnabled) playTone("tick");
                }, 2800);
            } else if (bgmInterval) {
                clearInterval(bgmInterval);
                bgmInterval = null;
            }
        });

        // Bioluminescent Background Particles
        function initBioBackground() {
            const canvas = document.getElementById("bio-bg-canvas");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            let w = (canvas.width = window.innerWidth);
            let h = (canvas.height = window.innerHeight);

            window.addEventListener("resize", () => {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            });

            const particles = Array.from({ length: 28 }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 1.5 + Math.random() * 2.5,
                vy: -0.25 - Math.random() * 0.45,
                vx: (Math.random() - 0.5) * 0.3,
                color: Math.random() > 0.5 ? "#34d399" : "#22d3ee"
            }));

            function drawParticles() { if(document.hidden || document.documentElement.dataset.sceneActive === "true") { setTimeout(drawParticles,250); return; }
                ctx.clearRect(0, 0, w, h);
                particles.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.y < 0) p.y = h;
                    if (p.x < 0) p.x = w;
                    if (p.x > w) p.x = 0;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                });
                requestAnimationFrame(drawParticles);
            }
            drawParticles();
        }

        window.addEventListener("load", () => {
            initBioBackground();
            renderLeaderboardTable();
        });
    