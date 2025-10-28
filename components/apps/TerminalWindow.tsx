import React, { useState, useRef, useEffect } from 'react';
import type { WindowComponentProps } from '../../types';
import * as geminiService from '../../services/geminiService';

const PROMPT = 'user@cybhack:~$';

const TerminalWindow: React.FC<WindowComponentProps> = () => {
    const [history, setHistory] = useState<string[]>(['Welcome to CybHack OS Terminal. Type "help" for a list of commands.']);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMonitorMode, setIsMonitorMode] = useState(false);
    const endOfHistoryRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        endOfHistoryRef.current?.scrollIntoView();
    }, [history, isLoading]);

    const handleCommand = async (command: string) => {
        const trimmedCommand = command.trim();

        setHistory(prev => [...prev, `${PROMPT} ${trimmedCommand}`]);

        if (!trimmedCommand) {
            return;
        }

        setIsLoading(true);

        let commandParts = trimmedCommand.split(/\s+/);
        if (commandParts[0] === 'sudo') {
            commandParts = commandParts.slice(1);
        }
        const [cmd, ...args] = commandParts;


        if (cmd === 'clear') {
            setHistory([]);
            setIsLoading(false);
            return;
        }

        let output = '';
        switch (cmd) {
            case 'help':
                output = [
                    'Available commands:',
                    '  help                    - Show this help message',
                    '  clear                   - Clear the terminal screen',
                    '  iwconfig                - Display wireless network information',
                    '  airmon-ng start wlan0   - Enable monitor mode on wlan0',
                    '  airodump-ng wlan0mon    - Scan for nearby networks',
                    '  aircrack-ng <file>      - Crack a password from a .cap file',
                    '  hcxpcapngtool ...       - Convert .cap file to hashcat format',
                    '  hashcat ...             - Crack password hash with hashcat',
                    '  nmap <options> <ip>     - Scan a target IP address',
                ].join('\n');
                break;
            case 'iwconfig':
                let iwconfigOutput = `wlan0     IEEE 802.11  ESSID:off/any  
Mode:Managed  Access Point: Not-Associated   Tx-Power=20 dBm   
Retry short limit:7   RTS thr:off   Fragment thr:off
Power Management:on
lo        no wireless extensions.
eth0      no wireless extensions.`;
                if (isMonitorMode) {
                    iwconfigOutput += `\n\nwlan0mon  IEEE 802.11  Mode:Monitor  Frequency:2.412 GHz  Tx-Power=20 dBm`;
                }
                output = iwconfigOutput;
                break;
            case 'airmon-ng':
                if (args[0] === 'start' && args[1] === 'wlan0') {
                    setIsMonitorMode(true);
                    output = `Found 1 processes that could cause trouble.
If airodump-ng, aireplay-ng or airtun-ng stops working after
a short period of time, you may want to kill (some of) them!
  PID Name
1234 NetworkManager
Interface        Chipset         Driver
wlan0            Atheros         ath9k - [phy0]
                (monitor mode enabled on wlan0mon)`;
                } else {
                    output = `Usage: airmon-ng <start|stop> <interface> [channel]`;
                }
                break;
            case 'airodump-ng':
                if (args.includes('wlan0mon') && !args.includes('--bssid')) {
                    output = await geminiService.simulateAirodump();
                } else if (args.includes('--bssid')) {
                     const getArgValue = (argName: string): string | null => {
                        const index = args.indexOf(argName);
                        if (index !== -1 && index + 1 < args.length) {
                            return args[index + 1].replace(/"/g, '');
                        }
                        return null;
                    };

                    const bssid = getArgValue('--bssid') || 'AA:BB:CC:DD:EE:FF';
                    const channel = getArgValue('-c') || '11';
                    const filename = getArgValue('--write') || 'handshake-01';

                    output = `CH ${channel} ][ Elapsed: 3 s ][ 2024-07-25 10:30\n\nBSSID              STATION            PWR   Rate    Lost    Frames  Probe\n${bssid.toUpperCase()}  11:22:33:44:55:66   -50  54.0e- 0       15       Client\n\nWPA handshake: ${bssid.toUpperCase()}\nSaved capture to ${filename}-01.cap`;
                }
                else {
                    output = 'Usage: airodump-ng wlan0mon or airodump-ng --bssid <BSSID> -c <channel> --write <file> wlan0mon';
                }
                break;
            case 'aircrack-ng':
                if (args[0]) {
                     output = await geminiService.simulateAircrack(args[0]);
                } else {
                    output = 'Usage: aircrack-ng <file.cap>';
                }
                break;
            case 'hcxpcapngtool':
                 output = `summary:
-=[ session info ]=-
network type.............: D-Link
essid....................: Vip
bssid....................: AA:BB:CC:DD:EE:FF
client...................: 11:22:33:44:55:66
-=[ hash info ]=-
file name................: hash.hccapx
hash type................: 22000
hash.....................: WPA*02*...
Written to hash.hccapx`;
                 break;
            case 'hashcat':
                if (args.includes('hash.hccapx')) {
                    output = await geminiService.simulateHashcat('hash.hccapx');
                } else {
                    output = 'Error: hashfile "hash.hccapx" not specified or not found.'
                }
                break;
            case 'nmap':
                const ipArg = args.find(arg => /^\d{1,3}(\.\d{1,3}){3}$/.test(arg));
                if (ipArg) {
                    output = await geminiService.simulateNmapScan(ipArg);
                } else {
                    output = 'Usage: nmap [options] <target_ip>';
                }
                break;
            default:
                output = `command not found: ${cmd}`;
        }
        
        setHistory(prev => [...prev, output]);
        setIsLoading(false);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoading) {
            handleCommand(inputValue);
            setInputValue('');
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-black p-2 font-fira-code text-sm" onClick={() => inputRef.current?.focus()}>
            <div className="flex-grow overflow-y-auto pr-2 text-white">
                {history.map((line, index) => (
                    <pre key={index} className="whitespace-pre-wrap">{line}</pre>
                ))}
                {isLoading && <div className="text-green-400">Executing...</div>}
                <div ref={endOfHistoryRef} />
            </div>
            <form onSubmit={handleFormSubmit} className="flex items-center">
                <span className="text-green-400 mr-2">{PROMPT}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    className="flex-grow bg-transparent text-white outline-none"
                    autoFocus
                />
            </form>
        </div>
    );
};

export default TerminalWindow;