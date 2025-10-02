const fs = require('fs')
const path = require('path')
const axios = require('axios')
const readline = require('readline')

const BASE_DIR = __dirname
let TOKEN_FILE = path.join(BASE_DIR, 'config', 'token.txt')
if (!fs.existsSync(TOKEN_FILE)) TOKEN_FILE = path.join(BASE_DIR, 'token.txt')

let PROXY_FILE = path.join(BASE_DIR, 'config', 'proxy.txt')
if (!fs.existsSync(PROXY_FILE)) PROXY_FILE = path.join(BASE_DIR, 'proxy.txt')

const URL = 'https://api.dawninternet.com/point'

const pink = "\x1b[95m"
const blue = "\x1b[94m"
const reset = "\x1b[0m"

function readLines(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    return raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  } catch {
    return []
  }
}

function maskToken(t) {
  if (!t) return '---'
  if (t.length <= 10) return '***' + t.slice(-4)
  return t.slice(0,4) + '...' + t.slice(-4)
}

function createAxiosInstance(token, proxyUrl) {
  const headers = {
    'User-Agent': 'AutoBotDawn/1.0',
    'Authorization': `Bearer ${token}`
  }
  if (!proxyUrl) return axios.create({ headers, timeout: 10000 })
  try {
    const u = new URL(proxyUrl)
    const proxyConfig = {
      host: u.hostname,
      port: u.port ? parseInt(u.port, 10) : (u.protocol === 'https:' ? 443 : 80),
      protocol: u.protocol.replace(':','')
    }
    if (u.username) {
      proxyConfig.auth = {
        username: decodeURIComponent(u.username),
        password: decodeURIComponent(u.password)
      }
    }
    return axios.create({ headers, timeout: 10000, proxy: proxyConfig })
  } catch {
    console.warn(`[WARN] Failed to parse proxy: "${proxyUrl}", running without proxy.`)
    return axios.create({ headers, timeout: 10000 })
  }
}

let stopped = false

function extractPoints(respData) {
  if (!respData) return null
  if (typeof respData === 'string') {
    try {
      respData = JSON.parse(respData)
    } catch {
      return null
    }
  }
  if (typeof respData !== 'object') return null
  return respData.points || respData.active_points || null
}

async function worker(index, token, proxyLines, proxyMode) {
  const id = `ACC${index+1}`
  console.log(`[INFO][${id}] Worker started for token ${maskToken(token)}`)

  function chooseProxy() {
    if (proxyMode !== 'with-proxy') return null
    if (proxyLines.length === 0) return null
    if (proxyLines.length === 1) return proxyLines[0]
    return proxyLines[Math.floor(Math.random() * proxyLines.length)]
  }

  while (!stopped) {
    const proxyToUse = chooseProxy()
    const axiosInst = createAxiosInstance(token, proxyToUse)

    try {
      const res = await axiosInst.get(URL)
      const points = extractPoints(res.data)
      const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
      if (proxyToUse) {
        console.log(`[INFO][${id}] Proxy active`)
      } else {
        console.log(`[INFO][${id}] No proxy`)
      }
      if (points !== null) {
        console.log(`[${now}][${id}] Active Points: ${points}`)
      } else {
        console.log(`[${now}][${id}] Active Points: (not found)`)
      }
    } catch (err) {
      const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
      console.log(`[${now}][${id}] Error: ${err.message || String(err)}`)
    }

    const delaySec = Math.random() * (35 - 25) + 25
    await new Promise(r => setTimeout(r, Math.round(delaySec * 1000)))
  }
}

async function startWorkers(tokens, proxyLines, proxyMode) {
  tokens.forEach((t, i) => {
    const startDelay = (i % 8) * 300
    setTimeout(() => worker(i, t, proxyLines, proxyMode), startDelay)
  })
}

async function askProxyChoice() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    console.log('Choose proxy mode:')
    console.log('  1) Enable proxy (use proxy.txt)')
    console.log('  2) No proxy')
    rl.question('Enter your choice (1 or 2): ', (answer) => {
      rl.close()
      resolve(answer.trim() === '1' ? 'with-proxy' : 'no-proxy')
    })
  })
}

async function main() {
  console.log("\n====================================")
  console.log(pink + "--- " + blue + "Auto Bot Dawn By Jabrik" + pink + " ---" + reset)
  console.log("====================================\n")

  const tokens = readLines(TOKEN_FILE)
  const proxyLines = readLines(PROXY_FILE)

  if (tokens.length === 0) {
    console.error(`[ERR] token.txt is empty or not found: ${TOKEN_FILE}`)
    process.exit(1)
  }

  const choice = await askProxyChoice()
  if (choice === 'with-proxy' && proxyLines.length === 0) {
    console.warn('[WARN] You selected proxy mode but proxy.txt is empty.')
  }

  process.on('SIGINT', () => {
    console.log('\n[INFO] Stopping all workers...')
    stopped = true
  })

  await startWorkers(tokens, proxyLines, choice)
}

main()
