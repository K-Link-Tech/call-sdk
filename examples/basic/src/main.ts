import { KlinkCallSdk, type CallInfo } from '@klink.cloud/call-sdk'

// ──────────────────────── dom helpers ────────────────────────

const $ = <T extends HTMLElement>(id: string): T =>
	document.getElementById(id) as T

const apiBaseInput = $<HTMLInputElement>('api-base')
const emailInput = $<HTMLInputElement>('email')
const tokenInput = $<HTMLInputElement>('token')
const btnConnect = $<HTMLButtonElement>('btn-connect')
const btnDisconnect = $<HTMLButtonElement>('btn-disconnect')
const badgeSocket = $('badge-socket')
const badgeReg = $('badge-reg')

const dialNumberInput = $<HTMLInputElement>('dial-number')
const btnCall = $<HTMLButtonElement>('btn-call')

const incomingPanel = $('incoming-panel')
const incomingNumber = $('incoming-number')
const incomingName = $('incoming-name')
const btnAnswer = $<HTMLButtonElement>('btn-answer')
const btnReject = $<HTMLButtonElement>('btn-reject')

const activePanel = $('active-panel')
const activeNumber = $('active-number')
const activeStatus = $('active-status')
const btnHangup = $<HTMLButtonElement>('btn-hangup')
const btnMute = $<HTMLButtonElement>('btn-mute')
const btnHold = $<HTMLButtonElement>('btn-hold')
const dtmfInput = $<HTMLInputElement>('dtmf-input')
const btnDtmf = $<HTMLButtonElement>('btn-dtmf')

const logEl = $('log')
const remoteAudio = $<HTMLAudioElement>('remote-audio')

function log(message: string, payload?: unknown) {
	const time = new Date().toLocaleTimeString()
	const detail = payload !== undefined ? ` ${JSON.stringify(payload)}` : ''
	logEl.textContent += `[${time}] ${message}${detail}\n`
	logEl.scrollTop = logEl.scrollHeight
}

// ──────────────────────── app state ────────────────────────

let sdk: KlinkCallSdk | null = null
let activeCall: CallInfo | null = null
let incomingCall: CallInfo | null = null
let muted = false
let held = false

function render() {
	const ready = !!sdk && !sdk.isDestroyed
	btnConnect.disabled = ready
	btnDisconnect.disabled = !ready
	btnCall.disabled = !ready || !!activeCall

	incomingPanel.style.display = incomingCall ? 'block' : 'none'
	if (incomingCall) {
		incomingNumber.textContent = incomingCall.number
		incomingName.textContent = incomingCall.name ?? ''
	}

	activePanel.style.display = activeCall ? 'block' : 'none'
	if (activeCall) {
		activeNumber.textContent = activeCall.number
		activeStatus.textContent = `${activeCall.communicationType} · ${activeCall.callStatus}`
		btnMute.textContent = muted ? 'Unmute' : 'Mute'
		btnHold.textContent = held ? 'Unhold' : 'Hold'
	}
}

// ──────────────────────── connect / disconnect ────────────────────────

btnConnect.addEventListener('click', async () => {
	btnConnect.disabled = true
	log('init: fetching credentials + starting engine…')
	try {
		sdk = await KlinkCallSdk.init({
			userEmail: emailInput.value.trim(),
			accessToken: tokenInput.value.trim(),
			apiBaseUrl: apiBaseInput.value.trim() || undefined,
		})
	} catch (err) {
		log(`init failed: ${err instanceof Error ? err.message : String(err)}`)
		btnConnect.disabled = false
		return
	}

	sdk.on('ready', () => log('ready'))
	sdk.on('connected', () => {
		badgeSocket.textContent = 'socket: up'
		badgeSocket.classList.add('on')
		log('connected')
	})
	sdk.on('disconnected', () => {
		badgeSocket.textContent = 'socket: down'
		badgeSocket.classList.remove('on')
		log('disconnected')
	})
	sdk.on('registeredChange', ({ registered }) => {
		badgeReg.textContent = `extension: ${registered ? 'registered' : 'unregistered'}`
		badgeReg.classList.toggle('on', registered)
		log('registeredChange', { registered })
	})
	sdk.on('registrationFailed', ({ code, message }) => {
		log(`registrationFailed: ${code} ${message}`)
	})
	sdk.on('incoming', ({ call }) => {
		incomingCall = call
		log('incoming', { number: call.number, callId: call.callId })
		render()
	})
	sdk.on('sessionStarted', ({ call }) => {
		activeCall = call
		incomingCall = null
		muted = false
		held = false
		log('sessionStarted', { number: call.number, callId: call.callId })
		render()
	})
	sdk.on('sessionEnded', ({ callId, cause }) => {
		activeCall = null
		incomingCall = null
		log('sessionEnded', { callId, cause })
		render()
	})
	sdk.on('remoteStream', ({ callId }) => log('remoteStream', { callId }))

	// One call: the SDK pipes call audio into the element and releases
	// streams when calls end.
	sdk.attachAudio(remoteAudio)
	sdk.on('error', ({ scope, detail }) => log(`error (${scope})`, detail))
	sdk.on('destroyed', () => log('destroyed'))

	log('init ok — waiting for registration')
	render()
})

btnDisconnect.addEventListener('click', async () => {
	// destroy() also releases the attached audio element's stream.
	await sdk?.destroy()
	sdk = null
	activeCall = null
	incomingCall = null
	badgeSocket.textContent = 'socket: down'
	badgeSocket.classList.remove('on')
	badgeReg.textContent = 'extension: unregistered'
	badgeReg.classList.remove('on')
	render()
})

// ──────────────────────── call controls ────────────────────────

btnCall.addEventListener('click', async () => {
	const number = dialNumberInput.value.trim()
	if (!number || !sdk) return
	try {
		await sdk.call(number)
		log(`dialing ${number}…`)
	} catch (err) {
		log(`call failed: ${err instanceof Error ? err.message : String(err)}`)
	}
})

btnAnswer.addEventListener('click', async () => {
	if (!incomingCall || !sdk) return
	await sdk.answer(incomingCall.callId)
})

btnReject.addEventListener('click', () => {
	if (!incomingCall || !sdk) return
	sdk.reject(incomingCall.callId)
	incomingCall = null
	render()
})

btnHangup.addEventListener('click', () => {
	if (!activeCall || !sdk) return
	sdk.hangup(activeCall.callId)
})

btnMute.addEventListener('click', () => {
	if (!activeCall || !sdk) return
	muted ? sdk.unmute(activeCall.callId) : sdk.mute(activeCall.callId)
	muted = !muted
	render()
})

btnHold.addEventListener('click', () => {
	if (!activeCall || !sdk) return
	held ? sdk.unhold(activeCall.callId) : sdk.hold(activeCall.callId)
	held = !held
	render()
})

btnDtmf.addEventListener('click', () => {
	if (!activeCall || !sdk) return
	const tones = dtmfInput.value.trim()
	if (!tones) return
	sdk.dtmf(activeCall.callId, tones)
	log(`dtmf sent: ${tones}`)
	dtmfInput.value = ''
})

// Clean up the PBX session if the tab closes mid-call.
window.addEventListener('beforeunload', () => {
	void sdk?.destroy()
})

render()
log('example loaded — fill in credentials and press Connect')
