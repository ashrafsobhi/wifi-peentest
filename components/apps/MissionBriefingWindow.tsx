import React from 'react';
import type { WindowComponentProps } from '../../types';

const CommandBlock: React.FC<{ command: string }> = ({ command }) => {
    const [copied, setCopied] = React.useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="font-mono text-sm bg-slate-800/70 p-3 my-2 rounded-md flex items-center justify-between">
            <pre className="text-lime-300 whitespace-pre-wrap flex-grow">{command}</pre>
            <button
                onClick={copyToClipboard}
                className="ml-4 p-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-xs"
                title="Copy command"
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
            </button>
        </div>
    );
};


const MissionBriefingWindow: React.FC<WindowComponentProps> = () => {
    return (
        <div className="p-4 md:p-6 font-sans text-gray-200 h-full overflow-y-auto">
            <h1 className="text-2xl font-bold text-cyan-400 mb-4 border-b-2 border-cyan-400/50 pb-2">
                دليل مهمة CybHack
            </h1>
            <p className="mb-4">
                أهلاً بيك يا بطل في CybHack! النهاردة هنتعلم مع بعض إزاي بنعمل اختبار أمان لشبكات الواي فاي. مهمتك هي إنك تلاقي كلمة سر شبكة اسمها "Vip" وتتصل بيها. جاهز؟ يلا بينا نستخدم الـ Terminal خطوة بخطوة.
            </p>
            
            {/* Step 1 */}
            <h3 className="text-md font-semibold text-yellow-400 mt-4 mb-1">
                الخطوة الأولى: اتأكد من كارت الشبكة
            </h3>
            <p className="text-sm text-gray-300 mb-2">
                ده أول أمر بنبدأ بيه. وظيفته إنه يعرض لك كل كروت الشبكة اللاسلكية اللي عندك. في العادي، اسم كارت الواي فاي بيكون wlan0. بنستخدمه عشان نتأكد إن الكارت موجود وشغال.
            </p>
            <CommandBlock command="iwconfig" />
            
            {/* Step 2 */}
            <h3 className="text-md font-semibold text-yellow-400 mt-4 mb-1">
                الخطوة التانية: شغل وضع المراقبة (Monitor Mode)
            </h3>
            <p className="text-sm text-gray-300 mb-2">
                الأمر ده بيحوّل كارت الواي فاي بتاعك لوضع المراقبة. في الوضع العادي، الكارت بيستقبل بس البيانات اللي جاية له هو. لكن في وضع المراقبة، بيبقى عامل زي "الرادار"، بيشوف ويسجل كل حاجة بتعدي في الهوا حواليه، وده أساسي عشان نجمع معلومات عن الشبكات التانية.
            </p>
            <CommandBlock command="airmon-ng start wlan0" />

            {/* Step 3 */}
            <h3 className="text-md font-semibold text-yellow-400 mt-4 mb-1">
                الخطوة التالتة: اعمل سكان وشوف الشبكات اللي حواليك
            </h3>
            <p className="text-sm text-gray-300 mb-2">
                 بعد ما شغلنا وضع المراقبة (اللي عمل لنا واجهة جديدة اسمها wlan0mon)، الأمر ده بيبدأ يعمل مسح شامل ويعرض لك كل شبكات الواي فاي اللي قريبة منك، وتفاصيل مهمة زي اسمها (ESSID) ونوع التشفير بتاعها.
            </p>
            <CommandBlock command="airodump-ng wlan0mon" />

            {/* Step 4 */}
            <h3 className="text-md font-semibold text-yellow-400 mt-4 mb-1">
                الخطوة الرابعة: ركز على شبكة "Vip" عشان تجيب الـ Handshake
            </h3>
            <p className="text-sm text-gray-300 mb-2">
                من القايمة اللي فاتت، حدد شبكة "Vip" وركز المراقبة عليها بس. الأمر ده بيحفظ كل البيانات اللي بينها وبين أي جهاز بيحاول يتصل بيها في ملف. أهم حاجة عايزينها هي "الـ Handshake"، ودي اللي فيها نسخة مشفرة من كلمة السر. (المحاكاة دي هتجيب الـ Handshake على طول).
            </p>
            <CommandBlock command="airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 --write handshake-01 wlan0mon" />
            
            {/* Step 5 */}
             <h3 className="text-md font-semibold text-yellow-400 mt-4 mb-1">
                الخطوة الخامسة: جهّز ملف الهاش للتكسير
            </h3>
            <p className="text-sm text-gray-300 mb-2">
                الملف اللي فيه الـ Handshake بيكون بصيغة .cap، وأداة تكسير الباسوورد (hashcat) مش بتفهم الصيغة دي. فالأمر ده بيحوّل الملف لصيغة جديدة (.hccapx) عشان hashcat تعرف تشتغل عليه.
            </p>
            <CommandBlock command="hcxpcapngtool -o hash.hccapx handshake-01.cap" />

            {/* Step 6 */}
            <h3 className="text-md font-semibold text-yellow-400 mt-4 mb-1">
                الخطوة السادسة: اكسر الباسوورد!
            </h3>
            <p className="text-sm text-gray-300 mb-2">
                 دي آخر خطوة في الـ Terminal. هنا بنستخدم الأداة الجبارة hashcat عشان تجرب تخمينات كتير لحد ما تلاقي كلمة السر الصح. كلمة السر في المحاكاة دي هي <code className="text-lime-300">password123</code>.
            </p>
            <CommandBlock command="hashcat -m 22000 hash.hccapx" />

            {/* Final Step */}
            <div className="mt-6 text-green-400 font-bold border-t-2 border-green-500/50 pt-3">
                <h3 className="text-lg mb-2">الخطوة الأخيرة: اتصل بالشبكة</h3>
                <p className="font-sans text-gray-200 text-sm">
                    مبروك! دلوقتي معاك كلمة السر. روح على علامة الواي فاي في شريط المهام تحت، اختار شبكة "Vip"، اكتب كلمة السر اللي لقيتها، ودوس اتصال.
                </p>
            </div>
        </div>
    );
};

export default MissionBriefingWindow;
