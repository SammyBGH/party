import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUp, Check, ChevronRight, Clock3, Flag, Gift, Heart, Magnet, MapPin, Shield, Vibrate, Volume2, VolumeX, X, Zap } from 'lucide-react'
import './styles.css'

const API = `${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}/api`
const TARGET = '2026-10-27T19:10:00+00:00' // Accra is UTC in October
const DEV_PREVIEW = import.meta.env.DEV && new URLSearchParams(window.location.search).get('preview') === '1'
const apiUrl = (path) => `${API}${path}${DEV_PREVIEW ? '?preview=1' : ''}`
const balanceStorageKey = DEV_PREVIEW ? 'ella-preview-balance' : 'ella-balance'
const fmtMoney = (n) => `GH₵${Number(n || 0).toFixed(2)}`

function SlimePortrait() {
  return <svg className="slime-portrait" viewBox="0 0 180 190" role="img" aria-label="A little green birthday slime">
    <ellipse cx="91" cy="169" rx="55" ry="9" fill="#1b102f" opacity=".22" />
    <path d="M38 160c-9-9-7-28-1-44l15-44c4-12 12-19 23-16 4-13 14-18 24-12 9-13 26-10 31 6 12-2 19 6 22 20l12 48c5 19 2 35-9 42-20 13-96 15-117 0Z" fill="#8edb62" stroke="#315f52" strokeWidth="5" strokeLinejoin="round" />
    <path d="M51 107c7-20 12-38 21-45 5-4 10-1 13 4 8-13 16-15 22-7 11-11 22-7 26 6 10-1 15 6 18 19" fill="none" stroke="#c5f29a" strokeWidth="7" strokeLinecap="round" opacity=".8" />
    <path d="m79 61 14-31 16 34" fill="#ee797f" stroke="#315f52" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="94" cy="31" r="5" fill="#ffd36f" stroke="#315f52" strokeWidth="3" />
    <ellipse cx="118" cy="100" rx="7" ry="10" fill="#fff6dc"/><ellipse cx="139" cy="103" rx="6" ry="9" fill="#fff6dc"/>
    <circle cx="120" cy="102" r="3.5" fill="#29253e"/><circle cx="141" cy="105" r="3" fill="#29253e"/>
    <path d="M121 123q10 11 20 0" fill="none" stroke="#315f52" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="111" cy="122" rx="6" ry="3" fill="#ef8d83" opacity=".8" />
  </svg>
}

function CatPortrait() {
  return <svg className="slime-portrait" viewBox="0 0 180 190" role="img" aria-label="Miso, the birthday street cat">
    <ellipse cx="91" cy="169" rx="55" ry="9" fill="#1b102f" opacity=".22" />
    <path d="M46 133c-22-13-18-36-4-40 10-3 18 8 16 18-3 11-1 22 5 28" fill="#cc7856" stroke="#493249" strokeWidth="5" strokeLinecap="round" />
    <path d="M47 144c-8-28 3-51 21-55 9-24 48-30 66-7 15 19 11 47 3 62-15 16-73 18-90 0Z" fill="#d99669" stroke="#493249" strokeWidth="5" strokeLinejoin="round" />
    <path d="m66 94 1-32 26 21m14-1 24-22 5 37" fill="#d99669" stroke="#493249" strokeWidth="5" strokeLinejoin="round" />
    <path d="m73 82 1-10 11 9m34-2 9-9 2 15" fill="#e7a5a0" />
    <path d="M77 121c8 10 32 14 45 1 8-8 3-20-6-23-12-5-34-3-43 5-6 5-3 13 4 17Z" fill="#f1d3b7" />
    <ellipse cx="116" cy="102" rx="5" ry="7" fill="#fff3dc"/><ellipse cx="133" cy="103" rx="4.5" ry="6.5" fill="#fff3dc"/>
    <circle cx="118" cy="103" r="2.5" fill="#29253e"/><circle cx="135" cy="104" r="2.3" fill="#29253e"/>
    <path d="m107 116 6-3 5 3-5 4Z" fill="#b96366"/><path d="M118 120q5 6 10 0" fill="none" stroke="#493249" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="m106 119-20-3m20 7-20 3m36-6 18-4m-18 8 18 3" stroke="#72544a" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M60 151q16 8 31 0m20 3q15 7 28-1" fill="none" stroke="#f1d3b7" strokeWidth="9" strokeLinecap="round"/>
    <path d="M94 139h20l-3 12-8 5-8-5Z" fill="#8eaaa0" stroke="#493249" strokeWidth="3"/><circle cx="104" cy="146" r="3" fill="#efc878"/>
  </svg>
}

function CrabPortrait() {
  return <svg className="slime-portrait" viewBox="0 0 180 190" role="img" aria-label="Boakye, a man and crab hybrid">
    <ellipse cx="90" cy="169" rx="56" ry="9" fill="#1b102f" opacity=".22" />
    {/* Crab legs and shell peek out around his upright human frame. */}
    <path d="m60 132-25 13m28-5-21 23m60-30 23 17m-17-22 28 8" fill="none" stroke="#ac624d" strokeWidth="7" strokeLinecap="round" />
    <path d="m38 143-7 2m12 17-8 6m101-20 8 4m-14 14 7 5" fill="none" stroke="#e88c68" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 124c0-22 15-36 40-36s42 14 42 36v23H50Z" fill="#e47d61" stroke="#493249" strokeWidth="5" />
    <path d="M59 119q29-19 62 0m-59 12q28-15 56 0m-48 13q20-8 39 0" fill="none" stroke="#f6ad78" strokeWidth="3.5" strokeLinecap="round" />
    {/* Shorts and two planted human legs make his stance read upright. */}
    <path d="M63 133h54l-5 22-19 4-6-15-7 15-19-4Z" fill="#263446" stroke="#493249" strokeWidth="4" strokeLinejoin="round" />
    <path d="m77 154-3 12m26-12 4 12" stroke="#9b5949" strokeWidth="7" strokeLinecap="round" />
    <path d="M65 168h16m23 0h16" stroke="#292b3a" strokeWidth="8" strokeLinecap="round" />
    {/* Broad human torso in a sleeveless beach jersey, backed by the carapace. */}
    <path d="M61 87q8-14 27-14t28 14l10 39H52Z" fill="#446e70" stroke="#493249" strokeWidth="5" strokeLinejoin="round" />
    <path d="m78 77 10 17 10-17m-10 18v35" fill="none" stroke="#efc878" strokeWidth="4" strokeLinejoin="round" />
    <path d="M59 96 45 112m73-16 15 16" fill="none" stroke="#9b5949" strokeWidth="9" strokeLinecap="round" />
    {/* His forearms end in crab pincers. */}
    <path d="m45 112-8 10m96-10 8 10" stroke="#ac624d" strokeWidth="7" strokeLinecap="round" />
    <path d="M37 119q-13-7-16 1-2 7 7 10l-6 8q9 3 15-5 8 4 13-2 5-7-3-12-5-3-10 0Zm104 0q13-7 16 1 2 7-7 10l6 8q-9 3-15-5-8 4-13-2-5-7 3-12 5-3 10 0Z" fill="#e88c68" stroke="#493249" strokeWidth="4" strokeLinejoin="round" />
    {/* Human face and curls, with the crab eyestalks kept above the hairline. */}
    <path d="M66 81c-5-20 5-38 24-38 20 0 31 17 26 39-8 8-42 9-50-1Z" fill="#a9614a" stroke="#493249" strokeWidth="4" />
    <path d="M67 58q20-23 48 0l-5-17q-20-18-39 0Z" fill="#23242c" stroke="#493249" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="76" cy="43" r="6" fill="#23242c"/><circle cx="88" cy="37" r="6" fill="#23242c"/><circle cx="101" cy="38" r="6" fill="#23242c"/><circle cx="111" cy="45" r="6" fill="#23242c"/>
    <path d="M75 62q7-4 13 0m10 0q7-4 13 0" fill="none" stroke="#382c31" strokeWidth="3.5" strokeLinecap="round" />
    <ellipse cx="83" cy="68" rx="2.5" ry="3.5" fill="#29253e"/><ellipse cx="105" cy="68" rx="2.5" ry="3.5" fill="#29253e"/>
    <path d="M86 78q8 8 16 0m-14-2q5-4 10 0" fill="none" stroke="#332a34" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M76 43Q72 33 68 26m31 17q7-10 17-17" fill="none" stroke="#493249" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="67" cy="23" rx="8" ry="9" fill="#fff3dc" stroke="#493249" strokeWidth="3"/><ellipse cx="117" cy="23" rx="8" ry="9" fill="#fff3dc" stroke="#493249" strokeWidth="3"/>
    <circle cx="69" cy="24" r="2.8" fill="#29253e"/><circle cx="119" cy="24" r="2.8" fill="#29253e"/>
    <path d="M88 131h17l-2 11-7 5-7-5Z" fill="#8eaaa0" stroke="#493249" strokeWidth="3"/><circle cx="96" cy="137" r="3" fill="#efc878"/>
  </svg>
}

function AketePortrait() {
  return <svg className="slime-portrait" viewBox="0 0 180 190" role="img" aria-label="Akete, smiling in blue and black">
    <ellipse cx="91" cy="169" rx="46" ry="8" fill="#1b102f" opacity=".22" />
    <path d="M53 160c2-28 13-48 38-51l4 22 8-22c25 3 38 23 40 51Z" fill="#246bc5" stroke="#202235" strokeWidth="5" />
    <path d="m64 123 27 12-14 24-20-14m68-22-26 12 14 24 19-14" fill="#347fdc" stroke="#202235" strokeWidth="4" strokeLinejoin="round" />
    <path d="m76 111 15 13 8 25 9-25 15-13-10-10H84Z" fill="#8f513d" stroke="#202235" strokeWidth="4" />
    <path d="M59 78c0-29 14-48 37-48 25 0 38 20 35 49l-8 29c-8 15-48 18-59 0Z" fill="#8f513d" stroke="#202235" strokeWidth="5" />
    <path d="M59 78c-3-31 7-55 34-57 28-3 46 18 43 51-10-6-15-17-18-26-12 14-33 20-59 18Z" fill="#171923" stroke="#202235" strokeWidth="5" strokeLinejoin="round" />
    <circle cx="64" cy="57" r="9" fill="#171923"/><circle cx="77" cy="35" r="8" fill="#171923"/><circle cx="97" cy="28" r="8" fill="#171923"/><circle cx="118" cy="35" r="8" fill="#171923"/><circle cx="132" cy="55" r="9" fill="#171923"/>
    <path d="M68 77c16 3 39 2 56-8" fill="none" stroke="#397fd1" strokeWidth="5" strokeLinecap="round" />
    <path d="M72 86q8-5 16 0m18 0q8-5 16 0" fill="none" stroke="#202235" strokeWidth="3.5" strokeLinecap="round" />
    <ellipse cx="81" cy="94" rx="3" ry="4" fill="#202235"/><ellipse cx="114" cy="94" rx="3" ry="4" fill="#202235"/>
    <path d="M89 103q10 15 21 0" fill="#fff0e1" stroke="#202235" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M70 101q-5 4-1 8m50-8q5 4 1 8" fill="none" stroke="#cc786e" strokeWidth="3" strokeLinecap="round" />
    <path d="m91 137 7 22m-26-12 18 8m21-8-13 8" fill="none" stroke="#9fc8ff" strokeWidth="4" strokeLinecap="round" />
    <path d="M56 163h27m20 0h29" stroke="#171923" strokeWidth="8" strokeLinecap="round" />
  </svg>
}

const CHARACTERS = [
  { id: 'slime', name: 'Bloop', detail: 'Double jump' },
  { id: 'cat', name: 'Miso', detail: 'Parcel magnet' },
  { id: 'crab', name: 'Boakye', detail: 'Blocks one hit' },
  { id: 'akete', name: 'Akete', detail: 'Speed burst + safe dash' },
]

const CHARACTER_POWERS = {
  slime: { label: 'Double jump', cooldown: 8, description: 'Bounce again in mid-air to clear a tricky cake stand.' },
  cat: { label: 'Parcel magnet', cooldown: 14, description: 'Pull nearby parcels in while you keep running.' },
  crab: { label: 'Shell guard', cooldown: 18, description: 'Block the next bump with Boakye’s shell.' },
  akete: { label: 'Smile dash', cooldown: 18, description: 'Dash through the next stretch without taking a hit.' },
}

function CharacterPortrait({ characterId }) {
  if (characterId === 'cat') return <CatPortrait />
  if (characterId === 'crab') return <CrabPortrait />
  if (characterId === 'akete') return <AketePortrait />
  return <SlimePortrait />
}

function ParcelIcon() {
  return <svg viewBox="0 0 48 48" aria-hidden="true" className="parcel-icon">
    <path d="M7 17h34v25H7z" fill="#d8a66c" stroke="#493249" strokeWidth="3" strokeLinejoin="round" />
    <path d="M7 17h34v8H7z" fill="#efcf91" stroke="#493249" strokeWidth="3" strokeLinejoin="round" />
    <path d="M21 17v25m6-25v25" stroke="#b96768" strokeWidth="4" />
    <path d="M24 17c-13 0-15-12-8-12 5 0 8 7 8 12Zm0 0c13 0 15-12 8-12-5 0-8 7-8 12Z" fill="#df8178" stroke="#493249" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
}

function HeroRunScene({ characterId }) {
  return <div className="hero-art" aria-label="A sunset run through a Takoradi street">
    <svg className="hero-route-art" viewBox="0 0 560 360" role="img" aria-label="A Takoradi street at sunset, with a runner, cake obstacle and parcel">
      <defs>
        <linearGradient id="route-sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#c8c4aa"/><stop offset="1" stopColor="#e0a17e"/></linearGradient>
        <linearGradient id="route-road" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#74616a"/><stop offset="1" stopColor="#342d3a"/></linearGradient>
      </defs>
      <rect x="4" y="8" width="552" height="344" rx="24" fill="url(#route-sky)"/>
      <circle cx="414" cy="99" r="40" fill="#f2d294" opacity=".82"/>
      <path d="M4 208q80-41 153-4t147-2 134-4 118 16v76H4Z" fill="#8b8580" opacity=".38"/>
      <path d="M4 231h552v71H4Z" fill="#85736d" opacity=".32"/>
      <g fill="#65545b">
        <path d="M25 181h65v76H25zM32 157h49v24H32zM107 164h71v93h-71zM117 145h50v19h-50zM200 178h63v79h-63zM270 154h74v103h-74zM281 136h52v18h-52zM365 171h70v86h-70zM446 151h80v106h-80z"/>
      </g>
      <g fill="#e5c18c" opacity=".85">
        <path d="M39 190h12v17H39zm25 0h12v17H64zm-25 28h12v17H39zm80-38h13v18h-13zm26 0h13v18h-13zm-26 28h13v18h-13zm94-17h14v18h-14zm27 0h14v18h-14zm-27 28h14v18h-14zm74-44h13v19h-13zm27 0h13v19h-13zm-27 29h13v19h-13zm85 0h13v18h-13zm27 0h13v18h-13zm52-27h14v19h-14zm28 0h14v19h-14z"/>
      </g>
      <path d="M4 269q102-22 183-7t173-5 196 2v93H4Z" fill="url(#route-road)"/>
      <path d="M5 269q100-21 182-7t173-5 196 2" fill="none" stroke="#efd6a2" strokeWidth="4"/>
      <path d="M18 318q90-20 169-7m26 4q64 5 120-4m28-3q70-13 126-4" fill="none" stroke="#d2aa7d" strokeWidth="4" strokeLinecap="round" strokeDasharray="30 21" opacity=".9"/>
      <path d="M499 252q-2-42-20-69m20 13q-28-31-50-24m48 26q13-33 35-35m-33 36q32-18 48-8" fill="none" stroke="#48534d" strokeWidth="5" strokeLinecap="round"/>
      <path d="M24 260h100" stroke="#f0cf90" strokeWidth="3" strokeDasharray="5 7" opacity=".7"/>
    </svg>
    <div className="hero-runner"><CharacterPortrait characterId={characterId}/></div>
    <div className="hero-route-parcel"><ParcelIcon/></div>
    <svg className="hero-route-cake" viewBox="0 0 64 76" aria-hidden="true">
      <path d="M9 37h46l-5 31H14Z" fill="#e8c782" stroke="#493c48" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M9 37q6-8 12 0t12 0 12 0 10 0" fill="none" stroke="#fff0d0" strokeWidth="5" strokeLinecap="round"/>
      <path d="M32 35V15" stroke="#493c48" strokeWidth="4" strokeLinecap="round"/>
      <path d="M32 14c-7-5 2-10 0-13 8 5 5 10 0 13Z" fill="#dc8378" stroke="#493c48" strokeWidth="2"/>
      <circle cx="23" cy="51" r="3" fill="#bd7275"/><circle cx="39" cy="57" r="3" fill="#bd7275"/>
      <path d="M17 69h30" stroke="#493c48" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  </div>
}

function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath(); ctx.roundRect(x, y, w, h, radius)
}

function createGame() {
  return { phase: 'intro', elapsed: 0, speed: 310, groundOffset: 0, playerY: 0, playerVY: 0, grounded: true, obstacles: [], gifts: [], powerups: [], particles: [], obstacleTimer: 1.25, giftTimer: 1.1, powerupTimer: 8, giftsCount: 0, lives: 3, shieldTimer: 0, magnetTimer: 0, abilityCooldown: 0, aketeBoostTimer: 0, powerupMessage: '', powerupMessageTimer: 0, invulnerableUntil: 0, resurrectionTimer: 0, deathEffectTimer: 0, overAt: 0 }
}

function drawSlime(ctx, x, groundY, jumpY, elapsed, vy, phase) {
  const airborne = jumpY > 2
  const runBounce = phase === 'playing' && !airborne ? Math.max(0, Math.sin(elapsed * 19)) * 2 : 0
  const w = 60, h = 54, base = groundY - jumpY - runBounce
  ctx.save()
  if (airborne) {
    const stretch = Math.min(.16, Math.abs(vy) / 420 * .16)
    ctx.translate(x + 30, base); ctx.scale(1 - stretch * .45, 1 + stretch); ctx.translate(-(x + 30), -base)
  } else if (runBounce > 0) {
    ctx.translate(x + 30, base); ctx.scale(1 + runBounce * .009, 1 - runBounce * .012); ctx.translate(-(x + 30), -base)
  }
  ctx.globalAlpha = .24
  ctx.fillStyle = '#170e36'
  ctx.beginPath(); ctx.ellipse(x + 30, groundY + 3, Math.max(15, 28 - jumpY * .08), 7, 0, 0, Math.PI * 2); ctx.fill()
  ctx.restore()

  ctx.save()
  const body = ctx.createLinearGradient(x, base - h, x + w, base)
  body.addColorStop(0, '#d4ff84'); body.addColorStop(.38, '#8de84f'); body.addColorStop(1, '#3fbd76')
  ctx.fillStyle = body
  ctx.beginPath()
  ctx.moveTo(x + 5, base)
  ctx.quadraticCurveTo(x - 2, base - 7, x + 5, base - 25)
  ctx.bezierCurveTo(x + 9, base - 43, x + 20, base - 51, x + 31, base - 47)
  ctx.bezierCurveTo(x + 37, base - 59, x + 54, base - 50, x + 56, base - 34)
  ctx.quadraticCurveTo(x + 65, base - 13, x + 57, base)
  ctx.closePath(); ctx.fill()
  ctx.strokeStyle = '#dcffae'; ctx.lineWidth = 2; ctx.stroke()
  ctx.fillStyle = '#ffffff80'; ctx.beginPath(); ctx.ellipse(x + 21, base - 39, 8, 3.5, -.6, 0, Math.PI * 2); ctx.fill()

  // Eyes and smile face the direction the slime runs: right.
  ctx.fillStyle = '#fffdf0'
  ctx.beginPath(); ctx.ellipse(x + 41, base - 32, 5, 7, -.12, 0, Math.PI * 2); ctx.ellipse(x + 51, base - 30, 4.4, 6, -.12, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#25304c'
  ctx.beginPath(); ctx.arc(x + 43.5, base - 31, 2.6, 0, Math.PI * 2); ctx.arc(x + 53, base - 29, 2.4, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = '#275443'; ctx.lineWidth = 2; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(x + 44, base - 17); ctx.quadraticCurveTo(x + 49, base - 12, x + 55, base - 17); ctx.stroke()
  ctx.fillStyle = '#ff8e9d'; ctx.globalAlpha = .8
  ctx.beginPath(); ctx.ellipse(x + 37, base - 19, 4.4, 2.6, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1

  // Tiny side nubs lift on takeoff and settle on the run.
  const armLift = airborne ? (vy > 0 ? 10 : 5) : Math.sin(elapsed * 19) * 2
  ctx.strokeStyle = '#73cc67'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath()
  ctx.moveTo(x + 9, base - 19); ctx.quadraticCurveTo(x - 1, base - 23 - armLift, x + 5, base - 29 - armLift)
  ctx.moveTo(x + 55, base - 19); ctx.quadraticCurveTo(x + 65, base - 24 - armLift, x + 59, base - 30 - armLift); ctx.stroke()

  // A tiny party hat makes the hero part of the birthday world.
  ctx.fillStyle = '#ff7098'; ctx.strokeStyle = '#fff2a8'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(x + 27, base - 49); ctx.lineTo(x + 36, base - 72); ctx.lineTo(x + 45, base - 48); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#ffdd72'; ctx.beginPath(); ctx.arc(x + 36, base - 72, 3.3, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawCat(ctx, x, groundY, jumpY, elapsed, vy, phase) {
  const airborne = jumpY > 2
  const falling = airborne && vy < -80
  const running = phase === 'playing'
  const stride = running ? Math.sin(elapsed * 19) : 0
  const base = groundY - jumpY - (!airborne && running ? Math.max(0, stride) * 3 : 0)
  ctx.save()
  ctx.globalAlpha = .22; ctx.fillStyle = '#17111f'; ctx.beginPath(); ctx.ellipse(x + 30, groundY + 3, Math.max(15, 27 - jumpY * .08), 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1
  // Paws cycle opposite each other on the ground, tuck in the jump, and reach on descent.
  const pawReach = falling ? 10 : airborne ? -7 : 0
  const legSwing = airborne ? (falling ? -2 : 3) : stride * 8
  ctx.strokeStyle = '#a85f49'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath()
  ctx.moveTo(x + 20, base - 13); ctx.lineTo(x + 18 - legSwing, base + pawReach)
  ctx.moveTo(x + 31, base - 13); ctx.lineTo(x + 30 + legSwing, base + pawReach)
  ctx.moveTo(x + 43, base - 13); ctx.lineTo(x + 42 + legSwing, base + pawReach)
  ctx.moveTo(x + 53, base - 13); ctx.lineTo(x + 55 - legSwing, base + pawReach); ctx.stroke()
  ctx.fillStyle = '#d99669'; ctx.beginPath()
  for (const paw of [[18 - legSwing, base + pawReach], [30 + legSwing, base + pawReach], [42 + legSwing, base + pawReach], [55 - legSwing, base + pawReach]]) ctx.ellipse(x + paw[0], paw[1], 4, 3, 0, 0, Math.PI * 2)
  ctx.fill()
  // Tail counter-swings during the run and streams behind during airtime.
  ctx.strokeStyle = '#a85f49'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x + 14, base - 20); ctx.quadraticCurveTo(x - 3, base - 32 - stride * 3, x + (airborne ? 1 : 7 + stride * 4), base - (falling ? 54 : 47)); ctx.stroke()
  ctx.save(); ctx.translate(x + 36, base - 26); ctx.rotate(airborne ? (falling ? -.2 : .13) : stride * .035); ctx.translate(-(x + 36), -(base - 26))
  ctx.fillStyle = '#d99669'; ctx.strokeStyle = '#493249'; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(x + 10, base - 4); ctx.quadraticCurveTo(x + 7, base - 31, x + 20, base - 43); ctx.lineTo(x + 22, base - 59); ctx.lineTo(x + 35, base - 47); ctx.quadraticCurveTo(x + 45, base - 51, x + 51, base - 45); ctx.lineTo(x + 61, base - 59); ctx.lineTo(x + 62, base - 39); ctx.quadraticCurveTo(x + 69, base - 21, x + 58, base - 4); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#e7a5a0'; ctx.beginPath(); ctx.moveTo(x + 24, base - 48); ctx.lineTo(x + 24, base - 54); ctx.lineTo(x + 30, base - 49); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + 54, base - 48); ctx.lineTo(x + 60, base - 54); ctx.lineTo(x + 59, base - 45); ctx.fill()
  ctx.fillStyle = '#fff3dc'; ctx.beginPath(); ctx.ellipse(x + 43, base - 32, 4.5, 6, 0, 0, Math.PI * 2); ctx.ellipse(x + 54, base - 31, 4, 5.5, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#29253e'; ctx.beginPath(); ctx.arc(x + 45, base - 31, 2.4, 0, Math.PI * 2); ctx.arc(x + 56, base - 30, 2.2, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#b96366'; ctx.beginPath(); ctx.moveTo(x + 48, base - 20); ctx.lineTo(x + 53, base - 23); ctx.lineTo(x + 57, base - 20); ctx.lineTo(x + 53, base - 17); ctx.fill()
  ctx.strokeStyle = '#493249'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 53, base - 17); ctx.quadraticCurveTo(x + 58, base - 13, x + 62, base - 17); ctx.stroke()
  ctx.strokeStyle = '#72544a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 48, base - 18); ctx.lineTo(x + 36, base - 15); ctx.moveTo(x + 55, base - 18); ctx.lineTo(x + 66, base - 14); ctx.stroke()
  ctx.fillStyle = '#8eaaa0'; ctx.beginPath(); ctx.moveTo(x + 21, base - 17); ctx.lineTo(x + 43, base - 17); ctx.lineTo(x + 39, base - 9); ctx.lineTo(x + 31, base - 6); ctx.lineTo(x + 23, base - 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#efc878'; ctx.beginPath(); ctx.arc(x + 32, base - 14, 2, 0, Math.PI * 2); ctx.fill()
  // A warm cheek mark and a small shoulder patch carry Miso's collar colors through the animation.
  ctx.fillStyle = '#df9b86'; ctx.beginPath(); ctx.ellipse(x + 42, base - 22, 3, 2, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#e5c27f'; ctx.beginPath(); ctx.arc(x + 18, base - 12, 2.2, 0, Math.PI * 2); ctx.fill()
  ctx.restore(); ctx.restore()
}

function drawCrab(ctx, x, groundY, jumpY, elapsed, vy, phase) {
  const airborne = jumpY > 2
  const falling = airborne && vy < -80
  const running = phase === 'playing'
  const stride = running ? Math.sin(elapsed * 15) : 0
  const base = groundY - jumpY - (!airborne && running ? Math.max(0, Math.sin(elapsed * 30)) * 1.5 : 0)
  const bob = !airborne && running ? Math.abs(Math.sin(elapsed * 30)) * 1.2 : 0
  const reach = airborne ? (falling ? 7 : -8) : 0
  ctx.save()
  ctx.globalAlpha = .22; ctx.fillStyle = '#17111f'; ctx.beginPath(); ctx.ellipse(x + 31, groundY + 3, Math.max(13, 28 - jumpY * .08), 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1

  // Four small side legs scuttle behind the upright runner.
  ctx.strokeStyle = '#a95743'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath()
  for (let i = 0; i < 2; i++) {
    const kick = airborne ? (falling ? 3 : -2) : stride * (i ? -4 : 4)
    const sy = base - 21 - i * 8
    ctx.moveTo(x + 16, sy); ctx.lineTo(x + 5 - kick, sy + 8 + reach)
    ctx.moveTo(x + 48, sy); ctx.lineTo(x + 59 + kick, sy + 8 + reach)
  }
  ctx.stroke()
  ctx.strokeStyle = '#e88c68'; ctx.lineWidth = 1.5; ctx.beginPath()
  ctx.moveTo(x + 5 - stride * 4, base - 13 + reach); ctx.lineTo(x + 2 - stride * 4, base - 10 + reach)
  ctx.moveTo(x + 59 + stride * 4, base - 13 + reach); ctx.lineTo(x + 62 + stride * 4, base - 10 + reach)
  ctx.stroke()

  // Human legs and shoes keep the silhouette upright; they tuck in the jump and reach on landing.
  const legs = airborne
    ? [{ phase: falling ? -.25 : .35, lift: falling ? 1 : 7 }, { phase: falling ? .25 : -.35, lift: falling ? 1 : 4 }]
    : [{ phase: stride, lift: Math.max(0, -stride) * 7 }, { phase: -stride, lift: Math.max(0, stride) * 7 }]
  ctx.lineCap = 'round'
  legs.forEach((leg, i) => {
    const hipX = x + (i ? 38 : 28)
    const kneeX = hipX + leg.phase * 5
    const ankleX = hipX + leg.phase * 10
    const kneeY = base - 4 - leg.lift * .35
    const ankleY = base + 1 - leg.lift
    ctx.strokeStyle = '#70463c'; ctx.lineWidth = 6; ctx.beginPath()
    ctx.moveTo(hipX, base - 15); ctx.lineTo(kneeX, kneeY); ctx.lineTo(ankleX, ankleY); ctx.stroke()
    ctx.fillStyle = '#a9614a'; ctx.beginPath(); ctx.arc(kneeX, kneeY, 2.4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#252b3a'; ctx.beginPath(); ctx.roundRect(ankleX - 6, ankleY - 2, 14, 6, 3); ctx.fill()
    ctx.fillStyle = '#f0c878'; ctx.fillRect(ankleX - 4, ankleY + 1, 7, 1.5)
  })

  ctx.save(); ctx.translate(x + 32, base - 35 - bob); ctx.rotate(airborne ? (falling ? -.1 : .1) : stride * .035); ctx.translate(-(x + 32), -(base - 35 - bob))
  // Shell carapace sits behind his shoulders and waist.
  ctx.fillStyle = '#d96c51'; ctx.strokeStyle = '#493249'; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(x + 15, base - 25); ctx.quadraticCurveTo(x + 9, base - 39, x + 17, base - 52); ctx.quadraticCurveTo(x + 31, base - 63, x + 47, base - 51); ctx.quadraticCurveTo(x + 55, base - 38, x + 49, base - 25); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.strokeStyle = '#f6ad78'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(x + 19, base - 48); ctx.lineTo(x + 45, base - 48); ctx.moveTo(x + 15, base - 38); ctx.lineTo(x + 50, base - 38); ctx.moveTo(x + 22, base - 28); ctx.lineTo(x + 43, base - 28); ctx.stroke()

  // Jersey and shorts give the crab a clear human torso.
  ctx.fillStyle = '#263446'; ctx.strokeStyle = '#493249'; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(x + 23, base - 25); ctx.lineTo(x + 41, base - 25); ctx.lineTo(x + 44, base - 14); ctx.lineTo(x + 32, base - 12); ctx.lineTo(x + 20, base - 14); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#477878'; ctx.beginPath(); ctx.moveTo(x + 22, base - 55); ctx.quadraticCurveTo(x + 31, base - 61, x + 41, base - 55); ctx.lineTo(x + 46, base - 27); ctx.quadraticCurveTo(x + 32, base - 22, x + 18, base - 27); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.strokeStyle = '#efc878'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 28, base - 57); ctx.lineTo(x + 32, base - 49); ctx.lineTo(x + 36, base - 57); ctx.moveTo(x + 32, base - 49); ctx.lineTo(x + 32, base - 29); ctx.stroke()

  // Arms swing against the legs. Pincers open slightly in mid-air.
  const armSwing = airborne ? (falling ? 3 : -8) : stride * 9
  ctx.strokeStyle = '#94543f'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath()
  const elbowLeft = x + 15 - armSwing * .3, elbowRight = x + 49 + armSwing * .3
  const handLeft = x + 12 - armSwing * .55, handRight = x + 52 + armSwing * .55
  const armDrop = airborne ? (falling ? 2 : -6) : 0
  ctx.moveTo(x + 22, base - 51); ctx.lineTo(elbowLeft, base - 43 - armDrop); ctx.lineTo(handLeft, base - 34 - armSwing * .25)
  ctx.moveTo(x + 42, base - 51); ctx.lineTo(elbowRight, base - 43 - armDrop); ctx.lineTo(handRight, base - 34 + armSwing * .25); ctx.stroke()
  ctx.strokeStyle = '#e88c68'; ctx.lineWidth = 4; ctx.beginPath()
  ctx.moveTo(handLeft, base - 34 - armSwing * .25); ctx.lineTo(handLeft - 4, base - 30 - armSwing * .25)
  ctx.moveTo(handRight, base - 34 + armSwing * .25); ctx.lineTo(handRight + 4, base - 30 + armSwing * .25); ctx.stroke()
  ctx.fillStyle = '#e88c68'; ctx.beginPath()
  const clawY1 = base - 30 - armSwing * .25, clawY2 = base - 30 + armSwing * .25
  ctx.arc(handLeft - 5, clawY1, 4.5, .2, Math.PI * 1.8); ctx.arc(handRight + 5, clawY2, 4.5, 1.3, Math.PI * 2.9); ctx.fill()
  ctx.strokeStyle = '#493249'; ctx.lineWidth = 1.5; ctx.beginPath()
  ctx.moveTo(handLeft - 8, clawY1 - 4); ctx.lineTo(handLeft - 3, clawY1 - 7)
  ctx.moveTo(handRight + 8, clawY2 - 4); ctx.lineTo(handRight + 3, clawY2 - 7); ctx.stroke()

  // A friendly human face framed by crab eyestalks and short curls.
  ctx.fillStyle = '#a9614a'; ctx.strokeStyle = '#493249'; ctx.lineWidth = 2.5
  ctx.beginPath(); ctx.roundRect(x + 22, base - 77, 20, 23, 8); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#23242c'; ctx.beginPath(); ctx.arc(x + 24, base - 75, 4, Math.PI, Math.PI * 2); ctx.arc(x + 30, base - 78, 4.5, Math.PI, Math.PI * 2); ctx.arc(x + 37, base - 76, 4.5, Math.PI, Math.PI * 2); ctx.arc(x + 41, base - 72, 3.5, Math.PI, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#fff3dc'; ctx.beginPath(); ctx.ellipse(x + 29, base - 66, 2.2, 3, 0, 0, Math.PI * 2); ctx.ellipse(x + 37, base - 66, 2.2, 3, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#29253e'; ctx.beginPath(); ctx.arc(x + 30, base - 66, 1.2, 0, Math.PI * 2); ctx.arc(x + 38, base - 66, 1.2, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = '#382c31'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 27, base - 69); ctx.lineTo(x + 31, base - 70); ctx.moveTo(x + 35, base - 70); ctx.lineTo(x + 39, base - 69); ctx.stroke()
  ctx.fillStyle = '#6d4038'; ctx.beginPath(); ctx.ellipse(x + 33, base - 61, 5, 2.2, 0, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = '#332a34'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 30, base - 59); ctx.quadraticCurveTo(x + 33, base - 56, x + 37, base - 59); ctx.stroke()
  ctx.strokeStyle = '#493249'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 27, base - 76); ctx.lineTo(x + 25, base - 82); ctx.moveTo(x + 38, base - 76); ctx.lineTo(x + 41, base - 82); ctx.stroke()
  ctx.fillStyle = '#fff3dc'; ctx.beginPath(); ctx.arc(x + 24, base - 83, 3.3, 0, Math.PI * 2); ctx.arc(x + 42, base - 83, 3.3, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#29253e'; ctx.beginPath(); ctx.arc(x + 25, base - 83, 1.2, 0, Math.PI * 2); ctx.arc(x + 43, base - 83, 1.2, 0, Math.PI * 2); ctx.fill()
  ctx.restore(); ctx.restore()
}

function drawAkete(ctx, x, groundY, jumpY, elapsed, vy, phase) {
  const airborne = jumpY > 2
  const falling = airborne && vy < -80
  const stride = phase === 'playing' ? Math.sin(elapsed * 19) : 0
  const base = groundY - jumpY - (!airborne ? Math.abs(stride) * 1.5 : 0)
  ctx.save()
  ctx.globalAlpha = .22; ctx.fillStyle = '#17111f'; ctx.beginPath(); ctx.ellipse(x + 31, groundY + 3, Math.max(14, 25 - jumpY * .08), 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1
  ctx.save(); ctx.translate(x + 30, base - 32); ctx.rotate(airborne ? (falling ? -.1 : .1) : stride * .025); ctx.translate(-(x + 30), -(base - 32))
  // Compact legs tuck on take-off and reach down as she lands.
  const legY = airborne ? (falling ? base + 1 : base - 7) : base + 1
  ctx.strokeStyle = '#292b3a'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath()
  ctx.moveTo(x + 24, base - 12); ctx.lineTo(x + 21 - stride * 5, legY)
  ctx.moveTo(x + 38, base - 12); ctx.lineTo(x + 40 + stride * 5, legY); ctx.stroke()
  ctx.fillStyle = '#151927'; ctx.beginPath(); ctx.roundRect(x + 12, base - 43, 38, 34, 10); ctx.fill()
  ctx.fillStyle = '#2876d5'; ctx.beginPath(); ctx.roundRect(x + 11, base - 42, 40, 28, 10); ctx.fill()
  ctx.fillStyle = '#4d95ed'; ctx.fillRect(x + 28, base - 39, 5, 24)
  ctx.fillStyle = '#151927'; ctx.beginPath(); ctx.roundRect(x + 8, base - 15, 17, 7, 3); ctx.roundRect(x + 38, base - 15, 17, 7, 3); ctx.fill()
  ctx.fillStyle = '#f1b28d'; ctx.beginPath(); ctx.roundRect(x + 25, base - 51, 12, 10, 4); ctx.arc(x + 31, base - 59, 18, 0, Math.PI * 2); ctx.fill()
  // Curls, blue headband and a broad smile keep Akete recognizable at runner size.
  ctx.fillStyle = '#171923'; ctx.beginPath(); ctx.arc(x + 30, base - 64, 19, Math.PI, Math.PI * 2); ctx.lineTo(x + 51, base - 54); ctx.quadraticCurveTo(x + 47, base - 47, x + 42, base - 54); ctx.quadraticCurveTo(x + 36, base - 48, x + 31, base - 54); ctx.quadraticCurveTo(x + 24, base - 48, x + 19, base - 55); ctx.closePath(); ctx.fill()
  for (const curl of [[15, -60], [22, -75], [34, -78], [46, -71], [51, -60]]) { ctx.beginPath(); ctx.arc(x + curl[0], base + curl[1], 5, 0, Math.PI * 2); ctx.fill() }
  ctx.strokeStyle = '#4b91e7'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 16, base - 66); ctx.quadraticCurveTo(x + 31, base - 72, x + 46, base - 66); ctx.stroke()
  ctx.fillStyle = '#211c2d'; ctx.beginPath(); ctx.arc(x + 25, base - 59, 1.8, 0, Math.PI * 2); ctx.arc(x + 37, base - 59, 1.8, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#d57e75'; ctx.globalAlpha = .8; ctx.beginPath(); ctx.arc(x + 20, base - 52, 3, 0, Math.PI * 2); ctx.arc(x + 42, base - 52, 3, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1
  ctx.fillStyle = '#fff0e1'; ctx.beginPath(); ctx.roundRect(x + 26, base - 51, 12, 4, 2); ctx.fill()
  ctx.strokeStyle = '#f1b28d'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 14, base - 35); ctx.lineTo(x + 7 - stride * 3, base - 22); ctx.moveTo(x + 48, base - 35); ctx.lineTo(x + 55 + stride * 3, base - 23); ctx.stroke()
  ctx.fillStyle = '#f1b28d'; ctx.beginPath(); ctx.arc(x + 7 - stride * 3, base - 22, 2.5, 0, Math.PI * 2); ctx.arc(x + 55 + stride * 3, base - 23, 2.5, 0, Math.PI * 2); ctx.fill()
  ctx.restore(); ctx.restore()
}

function drawCharacter(ctx, character, x, groundY, jumpY, elapsed, phase, playerVY) {
  if (character === 'cat') drawCat(ctx, x, groundY, jumpY, elapsed, playerVY, phase)
  else if (character === 'crab') drawCrab(ctx, x, groundY, jumpY, elapsed, playerVY, phase)
  else if (character === 'akete') drawAkete(ctx, x, groundY, jumpY, elapsed, playerVY, phase)
  else drawSlime(ctx, x, groundY, jumpY, elapsed, playerVY, phase)
}

function createArcadeAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  const context = new AudioContextClass()
  let musicTimer = null, noteIndex = 0
  const note = (frequency, duration = .14, volume = .04, delay = 0, wave = 'sine') => {
    if (context.state === 'closed') return
    const start = context.currentTime + delay, oscillator = context.createOscillator(), gain = context.createGain()
    oscillator.type = wave; oscillator.frequency.setValueAtTime(frequency, start)
    gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(volume, start + .018); gain.gain.exponentialRampToValueAtTime(.0001, start + duration)
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(start); oscillator.stop(start + duration + .02)
  }
  const play = (name) => {
    if (name === 'jump') { note(490, .09, .025, 0, 'triangle'); note(650, .1, .019, .045, 'triangle') }
    if (name === 'parcel') { note(740, .11, .035, 0, 'sine'); note(988, .16, .03, .07, 'sine') }
    if (name === 'shield') { note(587, .12, .025); note(784, .13, .025, .07); note(988, .16, .02, .14) }
    if (name === 'magnet') { note(440, .13, .022); note(554, .16, .022, .08) }
    if (name === 'hit') { note(185, .16, .045, 0, 'triangle'); note(138, .13, .03, .09, 'triangle') }
    if (name === 'revive') [440, 554, 659, 880].forEach((frequency, i) => note(frequency, .24, .025, i * .12, 'sine'))
    if (name === 'over') [392, 330, 262].forEach((frequency, i) => note(frequency, .24, .025, i * .17, 'triangle'))
  }
  const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46]
  return {
    resume: () => context.state === 'suspended' ? context.resume() : Promise.resolve(),
    play,
    startMusic() {
      if (musicTimer) return
      noteIndex = 0
      musicTimer = window.setInterval(() => {
        note(melody[noteIndex % melody.length], .19, .012, 0, 'triangle')
        noteIndex += 1
      }, 360)
    },
    stopMusic() { if (musicTimer) { window.clearInterval(musicTimer); musicTimer = null } },
    dispose() { this.stopMusic(); context.close() },
  }
}

function drawObstacle(ctx, item, groundY, elapsed) {
  const { x, type } = item
  ctx.save()
  ctx.translate(x, groundY)
  ctx.fillStyle = '#1f103d55'; ctx.beginPath(); ctx.ellipse(item.w / 2, 2, item.w * .55, 6, 0, 0, Math.PI * 2); ctx.fill()
  if (type === 'cupcake') {
    ctx.fillStyle = '#dd925a'; ctx.beginPath(); ctx.moveTo(7, -5); ctx.lineTo(12, -35); ctx.lineTo(item.w - 10, -35); ctx.lineTo(item.w - 4, -5); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = '#ffe2a3'; ctx.lineWidth = 2
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(14 + i * 10, -30); ctx.lineTo(16 + i * 10, -8); ctx.stroke() }
    ctx.fillStyle = '#ff94b0'; ctx.beginPath(); ctx.arc(item.w / 2, -38, 17, Math.PI, 0); ctx.lineTo(item.w - 1, -32); ctx.quadraticCurveTo(item.w - 7, -24, item.w - 12, -33); ctx.quadraticCurveTo(item.w / 2, -26, 9, -33); ctx.quadraticCurveTo(2, -25, 1, -34); ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#fff4ad'; ctx.beginPath(); ctx.arc(item.w / 2, -53, 3.5, 0, Math.PI * 2); ctx.fill()
  } else if (type === 'cake') {
    roundedRect(ctx, 2, -item.h, item.w - 4, item.h - 3, 9); ctx.fillStyle = '#ffb6c5'; ctx.fill()
    ctx.fillStyle = '#fff0be'; roundedRect(ctx, 4, -item.h + 16, item.w - 8, 7, 3); ctx.fill()
    ctx.fillStyle = '#e96f9e'
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(13 + i * 16, -item.h + 5, 3, 0, Math.PI * 2); ctx.fill() }
    ctx.strokeStyle = '#ffe585'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(item.w / 2, -item.h); ctx.lineTo(item.w / 2, -item.h - 13); ctx.stroke()
    ctx.fillStyle = '#ff9762'; ctx.beginPath(); ctx.ellipse(item.w / 2, -item.h - 15, 3, 5 + Math.sin(elapsed * 15) * 1.2, 0, 0, Math.PI * 2); ctx.fill()
  } else {
    ctx.strokeStyle = '#ffdc79'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(item.w / 2, -4); ctx.lineTo(item.w / 2, -item.h + 5); ctx.stroke()
    ctx.fillStyle = '#f779a4'; ctx.beginPath(); ctx.arc(item.w / 2, -item.h + 5, 15, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = '#fff0ba'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(item.w / 2, -item.h + 5, 9, elapsed * 2, elapsed * 2 + Math.PI * 1.55); ctx.stroke()
    ctx.fillStyle = '#ffe788'; ctx.beginPath(); ctx.arc(item.w / 2, -item.h - 11, 4, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

function drawGift(ctx, gift, elapsed) {
  const y = gift.y + Math.sin(elapsed * 5 + gift.phase) * 5
  ctx.save(); ctx.translate(gift.x, y)
  ctx.fillStyle = '#30273855'; ctx.beginPath(); ctx.ellipse(0, 15, 14, 3, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#d9ad78'; ctx.strokeStyle = '#493249'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(-12, -7); ctx.lineTo(0, -12); ctx.lineTo(12, -7); ctx.lineTo(12, 8); ctx.lineTo(0, 13); ctx.lineTo(-12, 8); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(0, 13); ctx.moveTo(-12, -7); ctx.lineTo(0, -2); ctx.lineTo(12, -7); ctx.stroke()
  ctx.fillStyle = '#e27e76'; ctx.fillRect(-2, -11, 4, 22)
  ctx.restore()
}

function drawPowerup(ctx, item, elapsed) {
  const y = item.y + Math.sin(elapsed * 4 + item.phase) * 4
  const color = item.type === 'shield' ? '#efc878' : '#91c6c5'
  ctx.save(); ctx.translate(item.x, y)
  ctx.fillStyle = '#211d2b55'; ctx.beginPath(); ctx.ellipse(0, 19, 17, 4, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#292431'; ctx.strokeStyle = color; ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color
  if (item.type === 'shield') {
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(8, -6); ctx.lineTo(7, 2); ctx.quadraticCurveTo(5, 8, 0, 10); ctx.quadraticCurveTo(-5, 8, -7, 2); ctx.lineTo(-8, -6); ctx.closePath(); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(-.5, 3); ctx.lineTo(4, -3); ctx.stroke()
  } else {
    ctx.beginPath(); ctx.moveTo(-7, -7); ctx.lineTo(-7, 1); ctx.quadraticCurveTo(-7, 8, 0, 8); ctx.quadraticCurveTo(7, 8, 7, 1); ctx.lineTo(7, -7); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(-10, -7); ctx.lineTo(-4, -7); ctx.moveTo(4, -7); ctx.lineTo(10, -7); ctx.stroke()
  }
  ctx.restore()
}

function drawPowerupAura(ctx, x, groundY, jumpY, game) {
  const cx = x + 31, cy = groundY - 27 - jumpY
  ctx.save()
  if (game.aketeBoostTimer > 0) {
    ctx.globalAlpha = .55 + Math.sin(game.elapsed * 20) * .18
    ctx.strokeStyle = '#75b8ff'; ctx.lineWidth = 4; ctx.setLineDash([7, 6])
    ctx.beginPath(); ctx.arc(cx, cy, 43 + Math.sin(game.elapsed * 14) * 3, -.9, 1.4); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx, cy, 51 + Math.sin(game.elapsed * 14) * 3, 2.1, 4.6); ctx.stroke()
  }
  if (game.magnetTimer > 0) {
    ctx.globalAlpha = .28 + Math.sin(game.elapsed * 7) * .08
    ctx.strokeStyle = '#91c6c5'; ctx.lineWidth = 2; ctx.setLineDash([5, 7])
    ctx.beginPath(); ctx.arc(cx, cy, 61, game.elapsed, game.elapsed + Math.PI * 1.75); ctx.stroke()
  }
  if (game.shieldTimer > 0) {
    ctx.globalAlpha = .58 + Math.sin(game.elapsed * 9) * .13
    ctx.strokeStyle = '#efc878'; ctx.lineWidth = 2.5; ctx.setLineDash([])
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.restore()
}

function drawResurrection(ctx, width, groundY, playerX, game) {
  const progress = Math.max(0, Math.min(1, 1 - game.resurrectionTimer / 1.8))
  const cx = playerX + 31, targetY = groundY - 74
  ctx.save()
  const fall = Math.min(1, progress / .68), ease = 1 - Math.pow(1 - fall, 3)
  const angelY = -48 + (targetY + 48) * ease
  const landing = Math.max(0, Math.min(1, (progress - .62) / .2))
  const glow = ctx.createRadialGradient(cx, targetY + 15, 3, cx, targetY + 15, 108)
  glow.addColorStop(0, `rgba(255, 235, 177, ${.48 * landing})`); glow.addColorStop(1, 'rgba(255, 235, 177, 0)')
  ctx.fillStyle = glow; ctx.fillRect(cx - 112, targetY - 92, 224, 130)

  // The angel drops in from above, flares its wings, and releases a pulse on landing.
  const flap = Math.sin(progress * 35) * 7
  const wing = (side) => {
    ctx.save(); ctx.translate(cx + side * 9, angelY + 2); ctx.scale(side, 1)
    ctx.fillStyle = '#fff7e7'; ctx.strokeStyle = '#d8c9ad'; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(2, 4); ctx.quadraticCurveTo(-12, -13 - flap, -29, -10 - flap); ctx.quadraticCurveTo(-25, 3, -7, 14); ctx.closePath(); ctx.fill(); ctx.stroke()
    ctx.strokeStyle = '#e4d6bc'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(-4, 6); ctx.quadraticCurveTo(-17, 1 - flap * .3, -24, -7 - flap); ctx.moveTo(-5, 9); ctx.quadraticCurveTo(-17, 8, -22, 1); ctx.stroke()
    ctx.restore()
  }
  wing(-1); wing(1)
  ctx.fillStyle = '#fff1d8'; ctx.strokeStyle = '#695467'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.ellipse(cx, angelY - 7, 8, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#695467'; ctx.beginPath(); ctx.arc(cx - 2.5, angelY - 7, 1, 0, Math.PI * 2); ctx.arc(cx + 2.5, angelY - 7, 1, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#f4ead8'; ctx.strokeStyle = '#695467'; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(cx - 7, angelY + 1); ctx.lineTo(cx + 7, angelY + 1); ctx.lineTo(cx + 10, angelY + 20); ctx.quadraticCurveTo(cx, angelY + 25, cx - 10, angelY + 20); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.strokeStyle = '#efc878'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.ellipse(cx, angelY - 20, 10, 3.5, 0, 0, Math.PI * 2); ctx.stroke()

  if (landing > 0) {
    ctx.globalAlpha = 1 - landing
    ctx.strokeStyle = '#fff0bc'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.ellipse(cx, groundY - 25, 9 + landing * 64, 6 + landing * 17, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.globalAlpha = 1
  }
  ctx.textAlign = 'center'; ctx.fillStyle = '#fff7df'; ctx.font = '700 11px Space Grotesk, sans-serif'; ctx.fillText(progress < .68 ? 'COMING DOWN…' : 'BACK AT IT', width / 2, 54)
  ctx.restore()
}

function drawDefeatPile(ctx, playerX, groundY, progress, elapsed) {
  const reveal = Math.max(0, Math.min(1, progress / .12))
  const fade = 1 - Math.max(0, Math.min(1, (progress - .68) / .16))
  if (fade <= 0) return
  const cx = playerX + 31, cy = groundY - 7
  ctx.save(); ctx.globalAlpha = fade
  ctx.translate(cx, cy); ctx.scale(.68 + reveal * .32, .68 + reveal * .32)
  // A soft dust puff marks the impact before the little bone pile settles.
  ctx.fillStyle = '#e9d9c2'
  for (let i = 0; i < 5; i++) {
    const drift = Math.sin(elapsed * 8 + i * 1.7) * 3
    const px = Math.cos(i * Math.PI * .4) * (12 + reveal * 5) + drift
    const py = -3 - Math.sin(i * Math.PI * .4) * 4 - reveal * ((i % 2) * 4)
    ctx.globalAlpha = fade * (.13 + .08 * (i % 3)); ctx.beginPath(); ctx.ellipse(px, py, 8 + (i % 2) * 2, 4 + (i % 3), 0, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = fade
  ctx.fillStyle = '#f1e8d7'; ctx.strokeStyle = '#6d5d5d'; ctx.lineWidth = 1.5
  // Skull and jaw.
  ctx.beginPath(); ctx.ellipse(0, -6, 9, 7, -.08, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#4d4352'; ctx.beginPath(); ctx.ellipse(-3, -6, 1.8, 2.3, 0, 0, Math.PI * 2); ctx.ellipse(3, -6, 1.8, 2.3, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#f1e8d7'; ctx.beginPath(); ctx.roundRect(-5, -1, 10, 4, 1.5); ctx.fill(); ctx.stroke()
  // A few small crossed bones make the gag readable at phone size.
  ctx.lineCap = 'round'; ctx.lineWidth = 4; ctx.strokeStyle = '#f1e8d7'
  ctx.beginPath(); ctx.moveTo(-17, 3); ctx.lineTo(16, -1); ctx.moveTo(-15, -1); ctx.lineTo(14, 4); ctx.stroke()
  ctx.lineWidth = 1.3; ctx.strokeStyle = '#6d5d5d'
  ctx.beginPath(); ctx.moveTo(-17, 3); ctx.lineTo(16, -1); ctx.moveTo(-15, -1); ctx.lineTo(14, 4); ctx.stroke()
  for (const [bx, by] of [[-17, 3], [16, -1], [-15, -1], [14, 4]]) {
    ctx.fillStyle = '#f1e8d7'; ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  }
  // A few motes drift away as the angel reaches the runner.
  ctx.fillStyle = '#ffe8a9'
  for (let i = 0; i < 4; i++) {
    const drift = Math.sin(elapsed * 5 + i * 2.1) * 2
    const rise = Math.min(12, progress * 22 + i * 2)
    ctx.globalAlpha = fade * (.25 + .25 * Math.sin(elapsed * 7 + i) ** 2)
    ctx.beginPath(); ctx.arc((i - 1.5) * 13 + drift, -9 - rise, 1.5, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

function drawReviveBurst(ctx, playerX, groundY, progress) {
  const amount = Math.max(0, Math.min(1, (progress - .64) / .3))
  if (!amount) return
  const cx = playerX + 31, cy = groundY - 31
  ctx.save()
  ctx.globalAlpha = (1 - amount * .48) * .8
  const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 62 + amount * 22)
  glow.addColorStop(0, 'rgba(255, 238, 184, .55)'); glow.addColorStop(1, 'rgba(255, 238, 184, 0)')
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, 85, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = '#fff0bc'; ctx.lineWidth = 2
  for (let ring = 0; ring < 2; ring++) {
    const ringProgress = Math.max(0, Math.min(1, amount * 1.45 - ring * .5))
    if (!ringProgress) continue
    ctx.globalAlpha = (1 - ringProgress) * .8
    ctx.beginPath(); ctx.ellipse(cx, groundY - 8, 12 + ringProgress * 48, 4 + ringProgress * 10, 0, 0, Math.PI * 2); ctx.stroke()
  }
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4 - Math.PI / 2
    const distance = 14 + amount * 34
    const px = cx + Math.cos(angle) * distance, py = cy + Math.sin(angle) * distance
    ctx.globalAlpha = (1 - amount) * .9
    ctx.fillStyle = i % 2 ? '#fff4cf' : '#f2c976'
    ctx.beginPath(); ctx.arc(px, py, i % 2 ? 2.1 : 1.6, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

const RUN_SCENES = [
  { name: 'HIGH STREET', kind: 'shops', sky: ['#332550', '#76526d', '#d88979'], buildings: ['#493b58', '#554258', '#43384f'], roof: '#70505f', windows: '#efbd83', awning: '#d77f78', road: ['#e9ab76', '#bd6e72', '#493249', '#28243b'] },
  { name: 'BEACH ROAD', kind: 'coast', sky: ['#293c55', '#657986', '#df9b7a'], buildings: ['#716254', '#5d645b', '#786a5b'], roof: '#957960', windows: '#f1d39a', awning: '#d98172', road: ['#e4b77b', '#c98271', '#534052', '#282b3d'] },
  { name: 'MARKET CIRCLE', kind: 'market', sky: ['#302644', '#755168', '#d58a74'], buildings: ['#584251', '#654956', '#493b4c'], roof: '#88604f', windows: '#f1c880', awning: '#df8b70', road: ['#e3a66f', '#bc7470', '#50364b', '#292438'] },
  { name: 'HARBOUR ROAD', kind: 'harbour', sky: ['#242c48', '#5d5269', '#ca857b'], buildings: ['#424452', '#4b4d59', '#3d414f'], roof: '#61606a', windows: '#ecc98c', awning: '#c87870', road: ['#dba477', '#ac6c70', '#403746', '#252735'] },
]

function drawScene(ctx, width, height, game, scene, alpha) {
  ctx.save()
  ctx.globalAlpha = alpha
  const groundY = height - 82
  const sky = ctx.createLinearGradient(0, 0, 0, groundY)
  sky.addColorStop(0, scene.sky[0]); sky.addColorStop(.62, scene.sky[1]); sky.addColorStop(1, scene.sky[2])
  ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height)
  const scroll = game.phase === 'playing' || game.phase === 'over' ? game.elapsed * game.speed : 0
  if (scene.kind === 'coast') {
    ctx.fillStyle = '#71858a'; ctx.fillRect(0, groundY - 112, width, 37)
    ctx.strokeStyle = '#f2d6a477'; ctx.lineWidth = 1
    for (let wave = 0; wave < 5; wave++) {
      const waveX = ((wave * 137 - scroll * .08) % (width + 100) + width + 100) % (width + 100)
      ctx.beginPath(); ctx.moveTo(waveX - 30, groundY - 102 + wave * 6); ctx.quadraticCurveTo(waveX, groundY - 106 + wave * 6, waveX + 30, groundY - 102 + wave * 6); ctx.stroke()
    }
  }
  const buildingGap = scene.kind === 'coast' ? 220 : scene.kind === 'market' ? 184 : 198
  const cityScroll = scroll * .16 % buildingGap
  for (let i = -1; i < Math.ceil(width / buildingGap) + 2; i++) {
    const variant = (i + 12) % 4
    const x = i * buildingGap - cityScroll
    if (scene.kind === 'coast') {
      // Open shoreline with small kiosks, so it reads differently from town streets.
      if (variant !== 1) continue
      const kioskY = groundY - 91 - (variant % 2) * 12
      ctx.fillStyle = scene.buildings[variant % 3]; ctx.fillRect(x + 22, kioskY, 105, groundY - kioskY - 39)
      ctx.fillStyle = scene.awning; ctx.beginPath(); ctx.moveTo(x + 13, kioskY + 4); ctx.lineTo(x + 137, kioskY + 4); ctx.lineTo(x + 124, kioskY - 13); ctx.lineTo(x + 27, kioskY - 13); ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#f3d5a1'; ctx.fillRect(x + 66, kioskY + 31, 18, groundY - kioskY - 70)
      continue
    }
    const widths = scene.kind === 'market' ? [112, 138, 104, 152] : [132, 154, 118, 145]
    const heights = scene.kind === 'harbour' ? [62, 85, 71, 94] : scene.kind === 'market' ? [76, 112, 83, 99] : [94, 72, 116, 84]
    const buildingWidth = widths[variant]
    const bh = heights[variant]
    const top = groundY - bh + (scene.kind === 'harbour' ? 17 : 0)
    ctx.fillStyle = scene.buildings[variant % scene.buildings.length]
    ctx.fillRect(x, top, buildingWidth, groundY - top)
    ctx.fillStyle = scene.roof
    if (scene.kind === 'market') {
      ctx.beginPath(); ctx.moveTo(x - 5, top + 4); ctx.lineTo(x + buildingWidth / 2, top - 13 - (variant % 2) * 5); ctx.lineTo(x + buildingWidth + 5, top + 4); ctx.closePath(); ctx.fill()
    } else if (variant === 1) {
      ctx.beginPath(); ctx.moveTo(x - 5, top + 2); ctx.lineTo(x + buildingWidth / 2, top - 11); ctx.lineTo(x + buildingWidth + 5, top + 2); ctx.closePath(); ctx.fill()
    } else ctx.fillRect(x - 4, top - 7, buildingWidth + 8, 9)
    if (scene.kind === 'market') {
      ctx.fillStyle = variant % 2 ? '#d88970' : scene.awning
      ctx.fillRect(x + 8, groundY - 40, buildingWidth - 16, 14)
      for (let stripe = 0; stripe < 5; stripe++) { ctx.fillStyle = stripe % 2 ? '#f2d0a1' : '#fff0cf'; ctx.fillRect(x + 12 + stripe * ((buildingWidth - 27) / 5), groundY - 40, 7, 14) }
      ctx.fillStyle = '#8a5948'; ctx.fillRect(x + 15, groundY - 26, 3, 26); ctx.fillRect(x + buildingWidth - 18, groundY - 26, 3, 26)
      ctx.fillStyle = '#efc878'; for (let fruit = 0; fruit < 3; fruit++) { ctx.beginPath(); ctx.arc(x + 35 + fruit * 15, groundY - 17, 4, 0, Math.PI * 2); ctx.fill() }
    } else if (scene.kind === 'harbour') {
      ctx.fillStyle = '#303342'; ctx.fillRect(x + 12, groundY - 31, buildingWidth - 24, 31)
      ctx.fillStyle = scene.awning; ctx.fillRect(x + 15, groundY - 29, (buildingWidth - 30) / 2 - 2, 27)
      ctx.fillStyle = '#d8a66c'; ctx.fillRect(x + buildingWidth / 2 + 1, groundY - 29, (buildingWidth - 30) / 2 - 2, 27)
    } else {
      ctx.fillStyle = scene.windows
      const panes = variant === 2 ? 2 : 3
      for (let pane = 0; pane < panes; pane++) {
        const wx = x + 13 + pane * ((buildingWidth - 42) / Math.max(1, panes - 1))
        ctx.fillRect(wx, top + 18, 14, 19); ctx.fillStyle = '#40384b'; ctx.fillRect(wx - 2, top + 39, 18, 2); ctx.fillStyle = scene.windows
      }
      if (variant !== 2) {
        ctx.fillStyle = scene.awning; ctx.fillRect(x + 17, groundY - 34, buildingWidth - 34, 10)
        for (let stripe = 0; stripe < 4; stripe++) { ctx.fillStyle = stripe % 2 ? '#f4d1a0' : scene.awning; ctx.fillRect(x + 18 + stripe * ((buildingWidth - 36) / 4), groundY - 34, (buildingWidth - 36) / 4, 10) }
      }
      ctx.fillStyle = '#51384b'; ctx.fillRect(x + buildingWidth / 2 - 6, groundY - 20, 12, 20)
    }
  }
  if (scene.kind === 'coast') {
    ctx.fillStyle = '#bda080'; ctx.fillRect(0, groundY - 45, width, 5)
    ctx.fillStyle = '#8e796c'; ctx.fillRect(0, groundY - 40, width, 4)
    // A few palms break the roofline as the run follows the shoreline.
    for (let palm = 0; palm < 3; palm++) {
      const px = ((palm * 240 + 90 - scroll * .12) % (width + 180) + width + 180) % (width + 180) - 50
      ctx.strokeStyle = '#4b584d'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px, groundY - 43); ctx.quadraticCurveTo(px + 4, groundY - 94, px + 17, groundY - 111); ctx.stroke()
      ctx.strokeStyle = '#4b584d'; ctx.lineWidth = 3
      for (let frond = 0; frond < 5; frond++) {
        const angle = Math.PI * .15 + frond * Math.PI * .34, tx = px + 17 + Math.cos(angle) * 24, ty = groundY - 111 + Math.sin(angle) * 18
        ctx.beginPath(); ctx.moveTo(px + 17, groundY - 111); ctx.quadraticCurveTo(px + 17 + Math.cos(angle) * 11, groundY - 111 + Math.sin(angle) * 8, tx, ty); ctx.stroke()
      }
    }
  }
  if (scene.kind === 'harbour') {
    const craneX = width * .72 - (scroll * .06 % (width * .6))
    ctx.strokeStyle = '#4b4a59'; ctx.lineWidth = 5
    ctx.beginPath(); ctx.moveTo(craneX, groundY - 88); ctx.lineTo(craneX, groundY - 164); ctx.lineTo(craneX + 90, groundY - 164); ctx.lineTo(craneX + 112, groundY - 145); ctx.moveTo(craneX + 70, groundY - 162); ctx.lineTo(craneX + 70, groundY - 115); ctx.stroke()
  }
  if (scene.kind === 'shops' || scene.kind === 'market') {
    // A strand of bunting marks the birthday route without covering the skyline.
    const buntingOffset = scroll * .08 % 58
    ctx.strokeStyle = '#e9c88b'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, groundY - 135); ctx.quadraticCurveTo(width / 2, groundY - 116, width, groundY - 135); ctx.stroke()
    for (let x = -58 - buntingOffset; x < width + 58; x += 58) {
      const y = groundY - 128 + Math.sin((x + buntingOffset) / width * Math.PI) * 15
      ctx.fillStyle = scene.kind === 'market' ? '#efc878' : '#e78278'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 13, y + 1); ctx.lineTo(x + 6, y + 12); ctx.closePath(); ctx.fill()
    }
  }
  const track = ctx.createLinearGradient(0, groundY, 0, height)
  track.addColorStop(0, scene.road[0]); track.addColorStop(.1, scene.road[1]); track.addColorStop(.11, scene.road[2]); track.addColorStop(1, scene.road[3])
  ctx.fillStyle = track; ctx.fillRect(0, groundY, width, height - groundY)
  ctx.fillStyle = '#f1cd86'; ctx.fillRect(0, groundY, width, 3)
  const dashOffset = scroll % 82
  for (let x = -82 - dashOffset; x < width; x += 82) {
    ctx.fillStyle = '#d9a56e'; roundedRect(ctx, x, groundY + 45, 42, 4, 2); ctx.fill()
  }
  ctx.fillStyle = '#f0d8bb'; ctx.font = '700 10px Space Grotesk, sans-serif'; ctx.textAlign = 'right'; ctx.fillText(`TAKORADI · ${scene.name}`, width - 18, groundY + 27)
  ctx.restore()
}

function drawWorld(ctx, width, height, game) {
  const sceneDuration = 20
  const transitionDuration = 2.5
  const sceneStep = Math.floor(game.elapsed / sceneDuration)
  const sceneIndex = sceneStep % RUN_SCENES.length
  const sceneTime = game.elapsed % sceneDuration
  ctx.clearRect(0, 0, width, height)
  if (sceneStep > 0 && sceneTime < transitionDuration) {
    const rawProgress = sceneTime / transitionDuration
    const blend = rawProgress * rawProgress * (3 - 2 * rawProgress)
    const previous = RUN_SCENES[(sceneIndex - 1 + RUN_SCENES.length) % RUN_SCENES.length]
    drawScene(ctx, width, height, game, previous, 1 - blend)
    drawScene(ctx, width, height, game, RUN_SCENES[sceneIndex], blend)
  } else {
    drawScene(ctx, width, height, game, RUN_SCENES[sceneIndex], 1)
  }
  return height - 82
}

function CanvasGame({ onFinish, onAbort, claimedAmount, character = 'slime' }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(createGame())
  const finishRef = useRef(false)
  const [phase, setPhase] = useState('intro')
  const [hud, setHud] = useState({ gifts: 0, points: 0, speed: 310, lives: 3, shield: false, magnet: 0, abilityCooldown: 0, grounded: true })
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('ella-sound') !== 'off')
  const hapticsSupported = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'
  const [hapticsEnabled, setHapticsEnabled] = useState(() => hapticsSupported && localStorage.getItem('ella-haptics') !== 'off')
  const audioRef = useRef(null)
  const soundEnabledRef = useRef(soundEnabled)
  const hapticsEnabledRef = useRef(hapticsEnabled)
  const jumpRef = useRef(() => {})
  const abilityRef = useRef(() => {})
  const endRef = useRef(() => {})
  const abortRef = useRef(() => {})
  const runnerName = CHARACTERS.find((runner) => runner.id === character)?.name || 'Bloop'
  const getAudio = () => {
    if (!audioRef.current) audioRef.current = createArcadeAudio()
    return audioRef.current
  }
  const playSound = (name) => {
    if (!soundEnabledRef.current) return
    const audio = getAudio()
    if (audio) { audio.resume().catch(() => {}); audio.play(name) }
  }
  const pulse = (pattern) => {
    if (hapticsEnabledRef.current && typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(pattern)
  }

  useEffect(() => {
    soundEnabledRef.current = soundEnabled
    if (soundEnabled && (phase === 'playing' || phase === 'resurrect')) getAudio()?.startMusic()
    else audioRef.current?.stopMusic()
  }, [soundEnabled, phase])
  useEffect(() => { hapticsEnabledRef.current = hapticsEnabled }, [hapticsEnabled])
  useEffect(() => () => audioRef.current?.dispose(), [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let width = 0, height = 0, raf, last = 0, hudTimer = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width; height = rect.height
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize()
    const frame = (now) => {
      const dt = Math.min((now - (last || now)) / 1000, .04); last = now
      const game = gameRef.current
      if (game.phase === 'countdown') {
        game.countIn -= dt
        if (game.countIn <= 0) { game.phase = 'playing'; setPhase('playing') }
      } else if (game.phase === 'resurrect') {
        game.resurrectionTimer -= dt
        if (game.resurrectionTimer <= 0) { playSound('revive'); pulse([14, 22, 14]); game.phase = 'playing'; game.resurrectionTimer = 0; setPhase('playing') }
      } else if (game.phase === 'over') {
        game.deathEffectTimer = Math.max(0, game.deathEffectTimer - dt)
      } else if (game.phase === 'playing') {
        game.elapsed += dt
        game.abilityCooldown = Math.max(0, game.abilityCooldown - dt)
        game.aketeBoostTimer = Math.max(0, game.aketeBoostTimer - dt)
        game.speed = 310 + Math.min(game.elapsed * 7, 300) + (game.aketeBoostTimer > 0 ? 145 : 0)
        game.shieldTimer = Math.max(0, game.shieldTimer - dt)
        game.magnetTimer = Math.max(0, game.magnetTimer - dt)
        game.powerupMessageTimer = Math.max(0, game.powerupMessageTimer - dt)
        game.groundOffset += game.speed * dt
        if (!game.grounded) {
          game.playerY += game.playerVY * dt
          game.playerVY -= 1750 * dt
          if (game.playerY <= 0) { game.playerY = 0; game.playerVY = 0; game.grounded = true }
        }
        game.obstacleTimer -= dt
        if (game.obstacleTimer <= 0) {
          const types = [{ type: 'cupcake', w: 47, h: 55 }, { type: 'cake', w: 52, h: 68 }, { type: 'lollipop', w: 38, h: 63 }]
          const hazard = types[Math.floor(Math.random() * types.length)]
          game.obstacles.push({ ...hazard, x: width + 36 })
          game.obstacleTimer = 1.18 + Math.random() * .62 + Math.min(game.speed / 1600, .2)
        }
        game.giftTimer -= dt
        if (game.giftTimer <= 0) {
          game.gifts.push({ x: width + 40, y: height - 82 - (91 + Math.random() * 42), phase: Math.random() * 6 })
          game.giftTimer = 1.65 + Math.random() * 1.1
        }
        game.powerupTimer -= dt
        if (game.powerupTimer <= 0) {
          const pickupX = width + 42
          const hasHazardAtPickup = game.obstacles.some((hazard) => pickupX + 20 > hazard.x - 12 && pickupX - 20 < hazard.x + hazard.w + 12)
          if (hasHazardAtPickup) {
            // Wait for a clear gap instead of placing the pickup inside an obstacle.
            game.powerupTimer = .35
          } else {
            game.powerups.push({ type: Math.random() < .5 ? 'shield' : 'magnet', x: pickupX, y: height - 82 - 44, phase: Math.random() * 6 })
            // Keep the next obstacle from appearing on top of this pickup.
            game.obstacleTimer = Math.max(game.obstacleTimer, 1.25)
            game.powerupTimer = 14 + Math.random() * 4
          }
        }
        game.obstacles.forEach((item) => { item.x -= game.speed * dt })
        game.gifts.forEach((item) => {
          item.x -= game.speed * dt
          if (game.magnetTimer > 0) {
            const targetX = Math.max(52, width * .17) + 31, targetY = height - 82 - 27 - game.playerY
            const dx = targetX - item.x, dy = targetY - item.y
            if (Math.hypot(dx, dy) < 190) {
              const pull = Math.min(1, dt * 4.2)
              item.x += dx * pull; item.y += dy * pull
            }
          }
        })
        game.powerups.forEach((item) => { item.x -= game.speed * dt })
        game.obstacles = game.obstacles.filter((item) => item.x + item.w > -20)
        game.gifts = game.gifts.filter((item) => item.x > -30)
        game.powerups = game.powerups.filter((item) => item.x > -30)

        const playerX = Math.max(52, width * .17), groundY = height - 82
        for (const item of game.obstacles) {
          const px = playerX + 9, pw = 43, py = groundY - 49 - game.playerY + 7, ph = 43
          const ox = item.x + 7, ow = item.w - 14, oy = groundY - item.h + 7, oh = item.h - 8
          if (game.elapsed >= game.invulnerableUntil && px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy) {
            if (game.shieldTimer > 0) {
              playSound('shield'); pulse(14)
              game.shieldTimer = 0
              game.invulnerableUntil = game.elapsed + 1.25
              game.powerupMessage = 'Shield absorbed the hit'
              game.powerupMessageTimer = 1.8
              game.obstacles = game.obstacles.filter((hazard) => hazard !== item)
              for (let i = 0; i < 14; i++) game.particles.push({ x: playerX + 30, y: groundY - 29 - game.playerY, vx: (Math.random() - .5) * 210, vy: (Math.random() - .5) * 210, life: .35 + Math.random() * .35, color: i % 2 ? '#efc878' : '#fff0c7' })
              setHud({ gifts: game.giftsCount, points: game.giftsCount * 100, speed: game.speed, lives: game.lives, shield: false, magnet: game.magnetTimer, abilityCooldown: game.abilityCooldown, grounded: game.grounded })
              break
            }
            playSound('hit'); pulse([24, 30, 24])
            game.lives -= 1
            setHud({ gifts: game.giftsCount, points: game.giftsCount * 100, speed: game.speed, lives: game.lives, shield: false, magnet: game.magnetTimer, abilityCooldown: game.abilityCooldown, grounded: game.grounded })
            game.playerY = 0; game.playerVY = 0; game.grounded = true
            game.obstacles = game.obstacles.filter((hazard) => hazard.x > playerX + 250)
            if (game.lives > 0) {
              game.phase = 'resurrect'; game.resurrectionTimer = 1.8
              game.invulnerableUntil = game.elapsed + 4
              game.obstacleTimer = 2.6
              setPhase('resurrect')
            } else {
              playSound('over')
              game.phase = 'over'; game.deathEffectTimer = 1.35; game.overAt = now; setPhase('over')
            }
            break
          }
        }
        if (game.phase === 'playing') {
          game.powerups = game.powerups.filter((item) => {
            const pickupX = item.x - 15, pickupY = item.y - 15, pickupSize = 30
            const playerLeft = playerX + 9, playerTop = groundY - 51 - game.playerY, playerWidth = 46, playerHeight = 51
            if (pickupX > playerLeft + playerWidth || pickupX + pickupSize < playerLeft || pickupY > playerTop + playerHeight || pickupY + pickupSize < playerTop) return true
            if (item.type === 'shield') {
              playSound('shield'); pulse(18)
              game.shieldTimer = 12
              game.powerupMessage = 'Shield ready · blocks one hit'
            } else {
              playSound('magnet'); pulse(12)
              game.magnetTimer = 7
              game.powerupMessage = 'Parcel magnet · 7 seconds'
            }
            game.powerupMessageTimer = 1.8
            for (let i = 0; i < 9; i++) game.particles.push({ x: item.x, y: item.y, vx: (Math.random() - .5) * 130, vy: -Math.random() * 145, life: .45 + Math.random() * .25, color: item.type === 'shield' ? '#efc878' : '#91c6c5' })
            return false
          })
          game.gifts = game.gifts.filter((item) => {
            const px = playerX + 4, py = groundY - 51 - game.playerY
            if (item.x > px + 65 || item.x + 24 < px || item.y > py + 59 || item.y + 22 < py) return true
            game.giftsCount += 1
            playSound('parcel'); pulse(10)
            for (let i = 0; i < 11; i++) game.particles.push({ x: item.x + 12, y: item.y + 5, vx: (Math.random() - .5) * 170, vy: -Math.random() * 155, life: .5 + Math.random() * .3, color: ['#ffe37b', '#ff91b3', '#a6ff83'][i % 3] })
            return false
          })
        }
        if (game.aketeBoostTimer > 0 && Math.random() < dt * 24) {
          game.particles.push({ x: Math.max(52, width * .17) + 7, y: height - 82 - game.playerY - 25 + (Math.random() - .5) * 32, vx: -90 - Math.random() * 90, vy: (Math.random() - .5) * 70, life: .28, color: Math.random() < .5 ? '#76baff' : '#e5f3ff' })
        }
        game.particles.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; p.life -= dt })
        game.particles = game.particles.filter((p) => p.life > 0)
        hudTimer += dt
        if (hudTimer > .12) { hudTimer = 0; setHud({ gifts: game.giftsCount, points: game.giftsCount * 100, speed: game.speed, lives: game.lives, shield: game.shieldTimer > 0, magnet: game.magnetTimer, abilityCooldown: game.abilityCooldown, grounded: game.grounded }) }
      }

      const groundY = drawWorld(ctx, width, height, game)
      game.gifts.forEach((gift) => drawGift(ctx, gift, game.elapsed))
      game.obstacles.forEach((item) => drawObstacle(ctx, item, groundY, game.elapsed))
      game.powerups.forEach((item) => drawPowerup(ctx, item, game.elapsed))
      game.particles.forEach((p) => { ctx.globalAlpha = Math.max(0, p.life * 1.6); ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1 })
      const playerX = Math.max(52, width * .17)
      if (game.phase === 'resurrect') {
        const reviveProgress = 1 - game.resurrectionTimer / 1.8
        drawDefeatPile(ctx, playerX, groundY, reviveProgress, game.elapsed)
        drawResurrection(ctx, width, groundY, playerX, game)
        drawReviveBurst(ctx, playerX, groundY, reviveProgress)
        // Keep every runner fully gone until the angel has landed. Then lift them
        // out of the dust with a short glow and settle them back onto the track.
        const reveal = Math.max(0, Math.min(1, (reviveProgress - .68) / .2))
        if (reveal > 0) {
          const eased = 1 - Math.pow(1 - reveal, 3)
          const alpha = Math.min(1, reveal * 2.2)
          const rise = (1 - eased) * 27
          const scale = .76 + eased * .24 + Math.sin(reveal * Math.PI) * .09
          ctx.save(); ctx.globalAlpha = alpha
          ctx.translate(playerX + 31, groundY - 35 - rise); ctx.scale(scale, scale); ctx.translate(-(playerX + 31), -(groundY - 35))
          drawPowerupAura(ctx, playerX, groundY, game.playerY, game)
          drawCharacter(ctx, character, playerX, groundY, game.playerY, game.elapsed, game.phase, game.playerVY)
          ctx.restore()
        }
      } else if (game.phase === 'over') {
        drawDefeatPile(ctx, playerX, groundY, 1 - game.deathEffectTimer / 1.35, game.elapsed + (now - game.overAt) / 1000)
      } else {
        const playerAlpha = game.elapsed < game.invulnerableUntil && Math.floor(game.elapsed * 12) % 2 === 0 ? .4 : 1
        ctx.save(); ctx.globalAlpha = playerAlpha
        drawPowerupAura(ctx, playerX, groundY, game.playerY, game)
        drawCharacter(ctx, character, playerX, groundY, game.playerY, game.elapsed, game.phase, game.playerVY)
        ctx.restore()
      }
      if (game.powerupMessageTimer > 0 && game.phase === 'playing') {
        const fade = Math.min(1, game.powerupMessageTimer * 2)
        ctx.save(); ctx.globalAlpha = fade; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.font = '700 11px Space Grotesk, sans-serif'
        const textWidth = ctx.measureText(game.powerupMessage).width + 28
        roundedRect(ctx, (width - textWidth) / 2, 82, textWidth, 30, 8)
        ctx.fillStyle = '#292431e8'; ctx.fill(); ctx.strokeStyle = '#f4ead84a'; ctx.lineWidth = 1; ctx.stroke()
        ctx.fillStyle = '#f4ead8'; ctx.fillText(game.powerupMessage, width / 2, 97)
        ctx.restore()
      }
      if (game.phase === 'countdown') {
        const number = Math.max(1, Math.ceil(game.countIn))
        ctx.fillStyle = '#1d103dcc'; ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = '#fff0a5'; ctx.font = `700 ${Math.min(90, height * .23)}px Space Grotesk, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(number, width / 2, height / 2)
        ctx.font = '700 12px Space Grotesk, sans-serif'; ctx.fillStyle = '#fff2e4'; ctx.fillText('GET READY TO RUN!', width / 2, height / 2 + 62)
      }
      if (game.phase === 'over') {
        ctx.fillStyle = '#21123dcc'; ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = '#f2d18d'; ctx.font = '700 28px Space Grotesk, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('THAT’S THE RUN', width / 2, height / 2 - 10)
        ctx.fillStyle = '#fff4e9'; ctx.font = '600 13px DM Sans, sans-serif'; ctx.fillText(`${game.giftsCount} gifts collected`, width / 2, height / 2 + 24)
        if (!finishRef.current && now - game.overAt > 1400) endRef.current()
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); observer.disconnect() }
  }, [])

  jumpRef.current = () => {
    const game = gameRef.current
    if (game.phase === 'playing' && game.grounded) { playSound('jump'); game.grounded = false; game.playerVY = 670; setHud((current) => ({ ...current, grounded: false })) }
  }
  abilityRef.current = () => {
    const game = gameRef.current
    if (game.phase !== 'playing' || game.abilityCooldown > 0) return
    const power = CHARACTER_POWERS[character] || CHARACTER_POWERS.slime
    if (character === 'slime') {
      if (game.grounded) {
        game.powerupMessage = 'Jump first, then use your extra hop'
        game.powerupMessageTimer = 1.5
        return
      }
      game.playerVY = 650
      game.abilityCooldown = power.cooldown
      game.powerupMessage = 'Bloop bounced again!'
      playSound('jump'); pulse(12)
    } else if (character === 'cat') {
      game.magnetTimer = 5
      game.abilityCooldown = power.cooldown
      game.powerupMessage = 'Miso magnet · parcels coming in'
      playSound('magnet'); pulse(12)
    } else if (character === 'crab') {
      game.shieldTimer = 9
      game.abilityCooldown = power.cooldown
      game.powerupMessage = 'Boakye’s shell is up'
      playSound('shield'); pulse(14)
    } else {
      game.aketeBoostTimer = 2.5
      game.invulnerableUntil = Math.max(game.invulnerableUntil, game.elapsed + 2.5)
      game.abilityCooldown = power.cooldown
      game.powerupMessage = 'Akete’s smile dash!'
      playSound('jump'); pulse([12, 20, 12])
    }
    game.powerupMessageTimer = 1.8
    setHud((current) => ({ ...current, abilityCooldown: game.abilityCooldown, grounded: game.grounded, shield: game.shieldTimer > 0, magnet: game.magnetTimer }))
  }
  endRef.current = () => {
    if (finishRef.current) return
    finishRef.current = true
    const game = gameRef.current
    onFinish({ gifts: game.giftsCount, score: game.giftsCount * 100, seconds: game.elapsed })
  }
  abortRef.current = () => {
    if (finishRef.current) return
    finishRef.current = true
    onAbort()
  }
  useEffect(() => {
    const keyDown = (event) => {
      if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'KeyW') { event.preventDefault(); jumpRef.current() }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight' || event.code === 'KeyE') { event.preventDefault(); abilityRef.current() }
      if (event.code === 'Escape') abortRef.current()
    }
    window.addEventListener('keydown', keyDown)
    return () => window.removeEventListener('keydown', keyDown)
  }, [])

  const beginRun = () => { if (soundEnabled) getAudio()?.resume().catch(() => {}); gameRef.current.phase = 'countdown'; gameRef.current.countIn = 3; setPhase('countdown') }
  const jump = (event) => { event?.stopPropagation(); jumpRef.current() }
  const finish = () => abortRef.current()
  const toggleSound = () => {
    const next = !soundEnabled
    localStorage.setItem('ella-sound', next ? 'on' : 'off')
    setSoundEnabled(next)
    if (next) getAudio()?.resume().catch(() => {})
  }
  const toggleHaptics = () => {
    if (!hapticsSupported) return
    const next = !hapticsEnabled
    localStorage.setItem('ella-haptics', next ? 'on' : 'off')
    setHapticsEnabled(next)
  }
  const runnerPower = CHARACTER_POWERS[character] || CHARACTER_POWERS.slime
  const powerIcon = character === 'cat' ? <Magnet size={19}/> : character === 'crab' ? <Shield size={19}/> : character === 'akete' ? <Zap size={19}/> : <ArrowUp size={19}/>
  const abilityReady = phase === 'playing' && hud.abilityCooldown <= 0 && (character !== 'slime' || !hud.grounded)
  const powerHint = character === 'slime' && hud.grounded ? 'Jump first to use your double jump' : hud.abilityCooldown > 0 ? `${runnerPower.label} recharges in ${Math.ceil(hud.abilityCooldown)} seconds` : `${runnerPower.label} ready`
  const powerProgress = Math.max(0, Math.min(1, 1 - hud.abilityCooldown / runnerPower.cooldown))
  return <div className="game-overlay dino-game">
    <div className="game-topline"><button className="game-exit" onClick={finish} aria-label="End run"><X size={19}/></button><div className="game-title">TAKORADI RUN</div><div className="dino-hud"><div className="dino-lives" aria-label={`${hud.lives} lives remaining`}>{[0, 1, 2].map((life) => <span key={life} className={life < hud.lives ? 'life-full' : 'life-lost'}>♥</span>)}</div><div className="powerup-status">{hud.shield && <span className="powerup-chip shield-chip" title="Shield: blocks one hit"><Shield size={13}/> SHIELD</span>}{hud.magnet > 0 && <span className="powerup-chip magnet-chip" title={`Magnet: ${Math.ceil(hud.magnet)} seconds remaining`}><Magnet size={13}/> {Math.ceil(hud.magnet)}s</span>}</div><div className="dino-score"><span className="gift-counter"><Gift size={14}/> {hud.gifts}</span><b>{hud.points.toLocaleString()} pts</b></div>{claimedAmount != null && <b className="claimed-chip">CLAIMED {fmtMoney(claimedAmount)}</b>}</div></div>
    <div className="dino-world"><canvas ref={canvasRef} className="dino-canvas" onPointerDown={jump} aria-label="Birthday runner game. Tap to jump over obstacles and collect floating gifts." />
      {phase === 'playing' && <button className={`ability-button power-${character} ${abilityReady ? 'ability-ready' : ''}`} style={{ '--power-charge': `${powerProgress * 360}deg` }} onClick={(event) => { event.stopPropagation(); abilityRef.current() }} disabled={!abilityReady} aria-label={powerHint} title={`${powerHint} · press Shift or E`}><span>{powerIcon}</span></button>}
      {phase === 'intro' && <div className="dino-intro"><span className="dino-badge">TAKORADI · GHANA</span><h2>{runnerName} is ready.</h2><p>Three lives. Jump the cakes, grab parcels, and watch for shields and magnets.</p><div className="dino-tip"><span className="desktop-game-tip"><span className="keycap">SPACE</span> or <span className="keycap">↑</span> to jump · <span className="keycap">SHIFT</span> or <span className="keycap">E</span> for power</span><span className="mobile-game-tip">Tap anywhere to jump · tap the glowing circle for your power</span></div><div className="runner-power-tip"><Zap size={14}/><span><b>{runnerPower.label}:</b> {runnerPower.description}</span></div><div className="pickup-legend"><span><Shield size={14}/> Blocks one hit</span><span><Magnet size={14}/> Pulls in parcels</span></div><button className="primary-btn dino-start" onClick={beginRun}><span>START RUN</span><ArrowUp size={17}/></button></div>}
      {phase === 'playing' && <div className="dino-speed"><span>RUN SPEED</span><i><b style={{ width: `${Math.min(100, ((hud.speed - 310) / 300) * 100)}%` }}/></i><strong>{Math.round(hud.speed)} km/h</strong></div>}
    </div>
    <div className={`dino-controls ${phase !== 'playing' ? 'dino-controls-idle' : ''}`}><span>{phase === 'playing' ? 'TAP TO JUMP' : 'THREE LIVES · ONE BIG RUN'}</span><div className="sensory-toggles"><button className={`sensory-toggle ${soundEnabled ? 'is-on' : ''}`} onClick={toggleSound} aria-label={soundEnabled ? 'Mute game sounds' : 'Enable game sounds'} aria-pressed={soundEnabled} title={soundEnabled ? 'Sound on' : 'Sound off'}>{soundEnabled ? <Volume2 size={16}/> : <VolumeX size={16}/>}</button><button className={`sensory-toggle ${hapticsEnabled ? 'is-on' : ''}`} onClick={toggleHaptics} disabled={!hapticsSupported} aria-label={hapticsSupported ? (hapticsEnabled ? 'Turn haptics off' : 'Turn haptics on') : 'Haptics are not supported on this device'} aria-pressed={hapticsEnabled} title={hapticsSupported ? (hapticsEnabled ? 'Haptics on' : 'Haptics off') : 'Haptics not supported'}><Vibrate size={16}/></button></div></div>
  </div>
}

function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [balance, setBalance] = useState({ points: 0, cashedOut: false })
  const [modal, setModal] = useState('')
  const [toast, setToast] = useState('')
  const [gameActive, setGameActive] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(() => { const saved = localStorage.getItem('ella-character'); return CHARACTERS.some((runner) => runner.id === saved) ? saved : 'slime' })
  const [claim, setClaim] = useState({ name: '', mobile: '', rating: '10' })
  const [busy, setBusy] = useState(false)
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [cashoutQuote, setCashoutQuote] = useState(null)
  const [savingRun, setSavingRun] = useState(false)
  const [lastRun, setLastRun] = useState({ score: 0, gifts: 0, seconds: 0 })
  const refresh = useCallback(async () => {
    try {
      const requests = [fetch(`${API}/config`), fetch(apiUrl('/account'))]
      const responses = await Promise.all(requests)
      const config = await responses[0].json()
      setUnlocked(config.unlocked || DEV_PREVIEW)
      setCountdown(DEV_PREVIEW ? 0 : config.remainingMs)
      setBalance(await responses[1].json())
    } catch {
      const left = new Date(TARGET).getTime() - Date.now()
      setUnlocked(DEV_PREVIEW || left <= 0); setCountdown(DEV_PREVIEW ? 0 : Math.max(0, left))
      const cached = JSON.parse(localStorage.getItem(balanceStorageKey) || '{}')
      setBalance({ points: cached.points || 0, cashedOut: cached.cashedOut || false, claimedAmount: cached.claimedAmount || null })
    }
  }, [])
  useEffect(() => { refresh(); const t = setInterval(refresh, 15000); return () => clearInterval(t) }, [refresh])
  useEffect(() => {
    if (unlocked && (DEV_PREVIEW || !localStorage.getItem('ella-welcomed'))) {
      setModal('welcome')
      if (!DEV_PREVIEW) localStorage.setItem('ella-welcomed', 'yes')
    }
  }, [unlocked])
  useEffect(() => {
    if (countdown === null || unlocked) return
    const t = setInterval(() => {
      const left = new Date(TARGET).getTime() - Date.now()
      setCountdown(Math.max(left, 0))
      if (left <= 0) { setUnlocked(true); refresh() }
    }, 1000)
    return () => clearInterval(t)
  }, [countdown, unlocked, refresh])

  const finishRun = useCallback(async (finalRun) => {
    setGameActive(false)
    setLastRun({ score: finalRun.score, gifts: finalRun.gifts, seconds: finalRun.seconds || 0 })
    setModal('round')
    setSavingRun(true)
    try {
      const res = await fetch(apiUrl('/runs'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ points: finalRun.score, gifts: finalRun.gifts, seconds: Math.min(120, Math.floor(finalRun.seconds || 0)) }) })
      if (!res.ok) throw new Error()
      const updated = await res.json(); setBalance(updated); localStorage.setItem(balanceStorageKey, JSON.stringify(updated))
    } catch { setToast('Could not save this run. Check the server and MongoDB connection.'); setTimeout(() => setToast(''), 3500) }
    finally { setSavingRun(false) }
  }, [])
  const startRun = () => { setModal(''); setGameActive(true) }
  const chooseCharacter = (id) => { setSelectedCharacter(id); localStorage.setItem('ella-character', id) }

  const openCashout = async () => {
    if (balance.cashedOut) return
    setModal('cashout'); setCashoutQuote(null)
    setQuoteLoading(true)
    try {
      const response = await fetch(apiUrl('/cashout/quote'))
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not load the birthday gift yet.')
      setCashoutQuote(data.amount)
    } catch (error) { setModal(''); setToast(error.message); setTimeout(() => setToast(''), 3500) }
    finally { setQuoteLoading(false) }
  }

  const cashout = async (e) => {
    e.preventDefault(); setBusy(true)
    try {
      const res = await fetch(apiUrl('/cashout'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(claim) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not submit just yet.')
      setBalance(data.account); localStorage.setItem(balanceStorageKey, JSON.stringify(data.account)); setModal('celebrate')
    } catch (err) { setToast(err.message); setTimeout(() => setToast(''), 3500) }
    finally { setBusy(false) }
  }

  const timeParts = countdown === null ? null : { days: Math.floor(countdown / 86400000), hours: Math.floor(countdown / 3600000) % 24, mins: Math.floor(countdown / 60000) % 60, secs: Math.floor(countdown / 1000) % 60 }
  const points = balance.points || 0

  return <main className="app-shell">
    <div className="grain" />
    <header className="topbar"><a className="brand" href="#top" aria-label="Ella's birthday run, October 27"><span className="brand-bib" aria-hidden="true"><small>OCT</small><strong>27</strong></span><span className="brand-lockup"><strong>ELLA'S RUN</strong><small>BIRTHDAY DASH · OCTOBER 27</small></span></a><div className="topbar-right"><span className="for-ella"><MapPin size={14}/><span>TAKORADI<small>GHANA</small></span></span></div></header>
    {!unlocked ? <section className="countdown-screen" id="top"><div className="countdown-copy"><span className="eyebrow"><Clock3 size={14} /> THE START LINE OPENS SOON</span><h1>Ella's<br /><span>birthday dash.</span></h1><p>Her route through Takoradi is almost ready.<br />The start line opens at 7:10 PM on October 27.</p><div className="clock-grid">{timeParts && Object.entries(timeParts).map(([unit, val]) => <div className="clock-card" key={unit}><strong>{String(val).padStart(2, '0')}</strong><span>{unit}</span></div>)}</div><div className="unlock-note"><Clock3 size={15} /> Opens October 27 at 7:10 PM · Ghana time</div>{import.meta.env.DEV && <button className="preview-link" onClick={() => { const url = new URL(window.location.href); url.searchParams.set('preview', '1'); window.location.href = url.toString() }}>Developer preview <ChevronRight size={14}/></button>}<div className="countdown-cake" aria-hidden="true"><SlimePortrait/></div></div><div className="countdown-footer">October 27 · Takoradi</div></section> : <>
      {DEV_PREVIEW && <div className="preview-banner">DEVELOPER PREVIEW · data is saved separately from the live game <button onClick={() => { const url = new URL(window.location.href); url.searchParams.delete('preview'); window.location.href = url.toString() }}>Exit preview</button></div>}
      <section className="hero" id="top"><div className="hero-copy"><h1>Ella's<br /><span>birthday dash.</span></h1><p>Run the streets, dodge the cakes, and collect parcels. How far can you get?</p><button className="primary-btn" onClick={startRun}><span>START A RUN</span><ChevronRight size={18} /></button><div className="control-hint"><span className="desktop-control-hint"><span>SPACE</span> or <span>↑</span> jump</span><span className="mobile-control-hint">Tap anywhere to jump</span></div></div><HeroRunScene characterId={selectedCharacter}/></section>
      <section className="dashboard"><div className="dashboard-head"><div><h2>Your run so far</h2></div></div><div className="character-picker"><div className="character-picker-head"><span className="eyebrow small">CHOOSE YOUR RUNNER</span></div><div className="character-options">{CHARACTERS.map((runner) => <button key={runner.id} className={`character-option ${selectedCharacter === runner.id ? 'is-selected' : ''}`} aria-pressed={selectedCharacter === runner.id} onClick={() => chooseCharacter(runner.id)}><span className="character-option-art"><CharacterPortrait characterId={runner.id} /></span><span className="character-option-copy"><strong>{runner.name}</strong><small>{runner.detail}</small></span>{selectedCharacter === runner.id && <Check size={15} />}</button>)}</div></div><div className="stat-grid"><div className="stat-card score-card"><div><span>YOUR POINTS</span><strong>{points.toLocaleString()}</strong><small>Collected on your runs</small></div><div className="score-spark">✦</div></div><div className="stat-card prize-card surprise-card"><div><span>{balance.cashedOut ? 'YOUR BIRTHDAY GIFT' : 'BIRTHDAY GIFT'}</span><strong>{balance.cashedOut ? fmtMoney(balance.claimedAmount) : '???'}</strong></div>{!balance.cashedOut && <div className="surprise-mark">✦</div>}</div></div><div className="game-panel"><div className="game-panel-icon"><Flag size={19} /></div><div className="game-panel-copy"><strong>Ready for another?</strong><span>Dodge cakes and collect parcels to add to your points.</span></div><button className="outline-btn" onClick={startRun}>Play a round <ChevronRight size={16} /></button></div><div className="cashout-strip"><div className="cashout-copy"><div className="cashout-gift"><Gift size={19} /></div><div><strong>{balance.cashedOut ? 'Gift claimed' : 'Your birthday gift'}</strong><span>{balance.cashedOut ? 'All sorted. Have the best birthday, Ella.' : 'Play a few runs, then cash out once when you’re ready.'}</span></div></div><button className="cashout-btn" disabled={balance.cashedOut} onClick={openCashout}>{balance.cashedOut ? <><Check size={16} /> Claimed</> : <>Cash out <ChevronRight size={16} /></>}</button></div></section>
    </>}

    {modal === 'welcome' && <div className="modal-backdrop welcome-backdrop" onClick={() => setModal('')}><div className="modal welcome-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal('')}><X size={18}/></button><div className="welcome-confetti" aria-hidden="true"><i/><i/><i/><SlimePortrait/></div><span className="eyebrow">OCTOBER 27 · YOUR DAY</span><h2>Happy Birthday,<br /><span>Ella.</span></h2><p>I made you a little game for your day. Take the long way through Takoradi, dodge the cakes, and see how many parcels you can bring back.</p><div className="welcome-signoff">Hope you have a really good day <Heart size={15} /></div><button className="primary-btn modal-cta" onClick={() => setModal('')}><span>TAKE A LOOK</span><ChevronRight size={18}/></button></div></div>}
    {modal === 'round' && <div className="modal-backdrop" onClick={() => setModal('')}><div className="modal round-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal('')}><X size={18}/></button><div className="celebrate-burst"><ParcelIcon/></div><span className="eyebrow">RUN SUMMARY</span><h2>Nice run, <span>Ella.</span></h2><div className="round-stats"><div><strong>{lastRun.score}</strong><span>POINTS</span></div><div><strong>{lastRun.gifts}</strong><span>PARCELS</span></div><div><strong>{lastRun.seconds}s</strong><span>TIME</span></div></div><p>That’s all three lives. Fancy another go, or ready to claim your gift?</p><button className="primary-btn modal-cta" onClick={startRun}><span>RUN AGAIN</span><ChevronRight size={18}/></button><button className="round-cashout" onClick={openCashout} disabled={savingRun || balance.cashedOut}>{savingRun ? 'Saving your run…' : balance.cashedOut ? 'Gift already claimed' : 'Claim your gift'}</button></div></div>}
        {modal === 'cashout' && <div className="modal-backdrop" onClick={() => setModal('')}><form className="modal cashout-modal" role="dialog" aria-modal="true" aria-labelledby="cashout-title" onSubmit={cashout} onClick={(e) => e.stopPropagation()}><button type="button" className="modal-close" aria-label="Close cash-out form" onClick={() => setModal('')}><X size={18}/></button><div className="cashout-heading"><div className="cashout-modal-icon"><Gift size={22}/></div><span className="eyebrow">YOUR BIRTHDAY GIFT</span><h2 id="cashout-title">You earned this.</h2><div className="cashout-ticket"><span>GIFT AMOUNT</span><strong>{quoteLoading || cashoutQuote === null ? '…' : fmtMoney(cashoutQuote)}</strong><small>Ready to send when you are.</small></div><p>Add your name and MoMo number, then give the run a quick rating. I’ll send your gift after that.</p></div><div className="cashout-fields"><label>Your name<input required autoComplete="name" value={claim.name} onChange={(e) => setClaim({ ...claim, name: e.target.value })} placeholder="What should I call you?" maxLength="80" /></label><label>MoMo number<input required autoComplete="tel" value={claim.mobile} onChange={(e) => setClaim({ ...claim, mobile: e.target.value })} placeholder="024 123 4567" inputMode="tel" maxLength="20" /></label><label className="rating-label">How was the run? <span className="rating-line" aria-live="polite">{claim.rating}/10</span><input className="rating-range" type="range" min="1" max="10" value={claim.rating} aria-label="Rate your run from 1 to 10" aria-valuetext={claim.rating + ' out of 10'} onChange={(e) => setClaim({ ...claim, rating: e.target.value })}/><span className="rating-ends"><span>Not great</span><span>Had a blast</span></span></label></div><button className="primary-btn submit-btn" type="submit" disabled={busy || quoteLoading || cashoutQuote === null}><span>{busy ? 'Sending…' : 'Send details'}</span><ChevronRight size={18}/></button><small className="privacy-note">I’ll use your number to send the gift.</small></form></div>}
    {modal === 'celebrate' && <div className="modal-backdrop" onClick={() => setModal('')}><div className="modal celebrate-modal" onClick={(e) => e.stopPropagation()}><div className="celebrate-photo" aria-hidden="true"/><button className="modal-close" onClick={() => setModal('')}><X size={18}/></button><div className="celebrate-burst"><Check size={35}/></div><span className="eyebrow">ALL YOURS</span><h2>It’s yours,<br /><span>Ella!</span></h2><p>You’ve got <strong className="claimed-reveal">{fmtMoney(balance.claimedAmount)}</strong> coming your way. Happy birthday!</p><button className="primary-btn modal-cta" onClick={() => setModal('')}><span>BACK TO THE GAME</span><ChevronRight size={18}/></button></div></div>}
    {gameActive && <CanvasGame onFinish={finishRun} onAbort={() => setGameActive(false)} claimedAmount={balance.cashedOut ? balance.claimedAmount : null} character={selectedCharacter} />}
    {toast && <div className="toast">{toast}</div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
