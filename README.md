# 🚀 AutoBot Dawn

**Auto Bot Dawn By Jabrik** — A Node.js bot for automating point requests to the Dawn Internet API.  
Supports **multi-account tokens** and **optional proxy usage** with randomized delay for safer operation.  

---

## ✨ Features
- 🔑 Multiple account support (via `token.txt`)
- 🌍 Optional proxy support (`proxy.txt`)
- ⏱️ Random delay between requests (25–35s)
- 📊 Clean CLI output (time, account, active points)
- 🛑 Graceful stop with `CTRL + C`
- 🛡️ `.gitignore` included (tokens & proxies not tracked)

---

## 📂 Project Structure
autobot-dawn/
├── config/
│ ├── token.txt # put your bearer tokens here
│ └── proxy.txt # put your proxy list here (optional)
├── main.js # bot script
├── package.json # npm config
├── .gitignore # ignores sensitive files
└── README.md


---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jabriksky/autobot-dawn.git
cd autobot-dawn
npm install

🚀 Usage

Run the bot with:

npm start


You will be asked:

Choose proxy mode:
  1) Proxy active (use proxy.txt)
  2) No proxy (direct request)

📝 Config Files
config/token.txt

Put one Bearer token per line:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9....

config/proxy.txt

Optional: one proxy per line (HTTP/HTTPS):

http://username:password@proxyserver:port
http://proxyserver2:8080
📊 Example Output
====================================
--- Auto Bot Dawn By Jabrik ---
====================================

[2025-10-02 20:15:24][ACC1] Active Points: 15200
[INFO][ACC1] No proxy
[2025-10-02 20:15:59][ACC2] Active Points: 14980
[INFO][ACC2] Proxy: http://proxyserver:8080

🛑 Stop the Bot

Press:

CTRL + C


to stop all running workers.

📜 License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2025 Jabrik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
