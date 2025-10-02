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


---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jabriksky/autobot-dawn.git

cd autobot-dawn

npm install
```bash

🚀 Usage

Run the bot with:

npm start

Optional: one proxy per line (HTTP/HTTPS):

http://username:password@proxyserver:port
http://proxyserver2:8080
