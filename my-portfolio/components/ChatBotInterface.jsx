import { useState } from 'react';
import { MessageSquare, User, Gamepad2, Code2, Sparkles, Music, GraduationCap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBotInterface({ theme }) {
    const [activeAnswer, setActiveAnswer] = useState(null);

    const questions = [
        {
            id: 'intro',
            label: 'แนะนำตัวหน่อย',
            icon: User,
            color: 'emerald',
            answer: "สวัสดีครับ! ผมชื่อเล่น 'บุค' อายุ 19 ปี ตอนนี้กำลังศึกษาอยู่ชั้น ปวส.2 สาขาเทคโนโลยีสารสนเทศครับ"
        },
        {
            id: 'personality',
            label: 'นิสัยเป็นไง?',
            icon: Sparkles,
            color: 'purple',
            answer: "ผมเป็นคนเงียบๆ แต่ลึกๆ ก็อยากมีเพื่อนคุยนะ ชอบทำตัวเป็นผู้ใหญ่ แต่ข้างในก็ยังมีความเป็นเด็กอยู่ครับ 😅"
        },
        {
            id: 'hobby',
            label: 'ชอบอะไร?',
            icon: Gamepad2,
            color: 'cyan',
            answer: "ส่วนตัวชอบเล่นเกมเป็นชีวิตจิตใจครับ! 🎮 เรื่องเขียน Code นี่เป็นรอง... บั๊กไม่แก้ รอแก้เกมก่อนครับ หยอกๆ 🤣"
        },
        {
            id: 'music',
            label: 'ฟังเพลงแนวไหน?',
            icon: Music,
            color: 'rose',
            answer: "วงที่ชอบก็คงเป็นวง Three Man Down ไม่ก็ PUN ครับ 🎸 แต่ลึกๆ ก็แอบชอบ Billkin เหมือนกันนะ 🎤"
        },
        {
            id: 'sport',
            label: 'กีฬาที่ชอบ?',
            icon: Activity,
            color: 'red',
            answer: "ชอบตีแบดมินตันครับ! 🏸 เพราะได้โต้ลูกไปมา แถมยังได้คุยกับคู่ตีด้วย สนุกดีครับ!"
        },
        {
            id: 'education',
            label: 'การเรียนเป็นอย่างไร?',
            icon: GraduationCap,
            color: 'orange',
            answer: "ไม่ได้เก่งมากครับ พอประมาณครับ เเต่พร้อมที่จะเรียนรู้ ไม่ว่าจะมาจากอาจารย์หรือเพื่อนๆครับ 📚"
        }
    ];

    const colorMap = {
        emerald: 'hover:border-emerald-500/30 text-neutral-400 group-hover:text-emerald-400',
        purple: 'hover:border-purple-500/30 text-neutral-400 group-hover:text-purple-400',
        cyan: 'hover:border-cyan-500/30 text-neutral-400 group-hover:text-cyan-400',
        rose: 'hover:border-rose-500/30 text-neutral-400 group-hover:text-rose-400',
        red: 'hover:border-red-500/30 text-neutral-400 group-hover:text-red-400',
        orange: 'hover:border-orange-500/30 text-neutral-400 group-hover:text-orange-400'
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center min-h-[120px]">
                <AnimatePresence mode="wait">
                    {activeAnswer ? (
                        <motion.div
                            key={activeAnswer}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`border rounded-2xl p-4 text-sm leading-relaxed relative ${theme === 'dark'
                                    ? 'bg-white/5 border-white/10 text-neutral-300'
                                    : 'bg-white/80 border-neutral-200 text-neutral-800 shadow-sm'
                                }`}
                        >
                            <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full border flex items-center justify-center ${theme === 'dark'
                                    ? 'bg-neutral-800 border-white/10'
                                    : 'bg-white border-neutral-200 shadow-sm'
                                }`}>
                                <MessageSquare className="w-3 h-3 text-emerald-500" />
                            </div>
                            "{activeAnswer}"
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`text-sm flex flex-col items-center gap-2 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 animate-bounce ${theme === 'dark' ? 'bg-white/5' : 'bg-emerald-500/10'
                                }`}>
                                <MessageSquare className={`w-6 h-6 ${theme === 'dark' ? 'text-neutral-600' : 'text-emerald-600'
                                    }`} />
                            </div>
                            <p className="font-medium">อยากรู้อะไรเกี่ยวกับผม?</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-600' : 'text-neutral-500'
                                }`}>กดปุ่มด้านล่างได้เลยครับ 👇</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
                {questions.map((q) => (
                    <button
                        key={q.id}
                        onClick={() => setActiveAnswer(q.answer)}
                        className={`p-2 rounded-xl border transition-all flex flex-col items-center gap-1 group ${theme === 'dark'
                                ? `bg-white/5 border-white/5 hover:bg-white/10 ${colorMap[q.color].split(' ')[0]}`
                                : `bg-white border-neutral-200 hover:border-emerald-500/50 hover:shadow-md hover:bg-emerald-50/50`
                            }`}
                    >
                        <q.icon className={`w-4 h-4 transition-colors ${theme === 'dark'
                                ? colorMap[q.color].split(' ').slice(1).join(' ')
                                : 'text-neutral-500 group-hover:text-emerald-600'
                            }`} />
                        <span className={`text-[10px] transition-colors ${theme === 'dark'
                                ? 'text-neutral-400 group-hover:text-white'
                                : 'text-neutral-600 group-hover:text-neutral-900 font-medium'
                            }`}>{q.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
