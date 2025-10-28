import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI with apiKey directly from process.env.API_KEY as per coding guidelines.
// Removed explicit API_KEY variable and checks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = "gemini-2.5-flash";

const generateContent = async (prompt: string) => {
    // Fix: Removed check for API_KEY as per coding guidelines, which state to assume it's always available.
    try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return `Error: Could not get response from Gemini API. ${error instanceof Error ? error.message : String(error)}`;
    }
}

export const simulateNmapScan = (targetIp: string) => {
    const prompt = `Act as a cybersecurity expert running the Nmap tool on a Kali Linux machine. Generate a realistic but entirely fictional Nmap scan result for the IP address ${targetIp}. The output should look exactly like it would in a real terminal, starting with 'Starting Nmap...'. Include a variety of open and closed ports (like 22/tcp, 80/tcp, 443/tcp, 3306/tcp, 8080/tcp), service versions, and OS detection. Do not include any explanations, markdown formatting, or anything other than the raw command output. The command run was 'nmap -sV -A ${targetIp}'.`;
    return generateContent(prompt);
};

export const simulateAirodump = () => {
    const prompt = `Act as the airodump-ng tool. Generate a realistic but fictional list of nearby Wi-Fi networks. The output should be formatted exactly like the airodump-ng terminal UI, including the header with CH, Elapsed, BSSID, PWR, Beacons, #Data, CH, MB, ENC, CIPHER, AUTH, ESSID. Include 5-10 networks with a mix of WPA2, WPA, and OPN security. Create fictional BSSIDs, ESSIDs, channels, and power levels. One of the networks must be named 'MyHomeWiFi' and another 'Vip'. Do not include any explanations, markdown formatting, or anything other than the raw tool output.`;
    return generateContent(prompt);
};

export const simulateAircrack = (file: string) => {
    const prompt = `Act as the aircrack-ng tool attempting to crack a password from a .cap file. After a few seconds of simulated work, display a success message. The output should look exactly like the aircrack-ng terminal UI. The final output must be 'KEY FOUND! [ a-secret-password-123 ]'. Make up some statistics like 'Tested 12456 keys/s'. The command run was 'aircrack-ng ${file}'. Do not include any explanations, markdown formatting, or anything other than the raw tool output.`;
    return generateContent(prompt);
};

export const simulateMetasploit = (targetIp: string, vulnerability: string) => {
    const prompt = `Act as the Metasploit Framework console. A user is running an exploit against ${targetIp} using the '${vulnerability}' module. Generate a realistic but fictional output showing the exploit being configured with RHOSTS=${targetIp}, run, and successfully opening a meterpreter session. The final line must be 'meterpreter >'. Do not include any explanations, markdown formatting, or anything other than the raw console output.`;
    return generateContent(prompt);
};

export const simulateHashcat = (hashfile: string) => {
    const prompt = `Act as the hashcat tool cracking a WPA2 hash. The password is 'password123'. Generate a realistic but fictional output showing the cracking process starting, some status updates, and finally succeeding. The output should look exactly like it would in a real hashcat session. The final lines must include a 'Status' line showing progress and a 'Recovered' line, and then on a new line, the hash followed by the password 'password123'. Do not include any explanations, markdown formatting, or anything other than the raw tool output.`;
    return generateContent(prompt);
};
