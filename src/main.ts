import './style.css'

class Proposal {
    private currentScreen: number = 0
    private app: HTMLElement
    private screens = [
        {
            type: 'question',
            title: 'Hi Pinno Raani Meri❤️',
            image: 'https://media.tenor.com/_biwL4sYf6MAAAAj/panda-hello.gif',
            text: 'I have something very important to ask you...',
            question: 'Will you be my Valentine?',
            yesText: 'Yes!',
            noText: 'No'
        },
        {
            type: 'question',
            title: 'You make me so happy...',
            text: 'Every moment with you feels like a dream.',
            question: 'Will you walk through every sunset with me?',
            yesText: 'Always!',
            noText: 'Maybe...'
        },
        {
            type: 'question',
            title: 'Forever & Always',
            text: 'I want to be the reason for your smile every single day.',
            question: 'Will you be mine forever?',
            yesText: 'YES!',
            noText: 'Wait...'
        },
        {
            type: 'gallery',
            title: 'Some of my favorite memories of you... ❤️',
            text: 'Every picture tells a story of how much I love you.',
            photos: [
                '/WhatsApp Image 2026-02-08 at 23.32.33.jpeg',
                '/WhatsApp Image 2026-02-08 at 23.32.34 (1).jpeg',
                '/WhatsApp Image 2026-02-08 at 23.32.34.jpeg'
            ],
            btnText: 'Move to the final surprise...'
        },
        {
            type: 'final',
            title: 'For You, Pinno Raani ❤️',
            text: 'Please place your finger on the hand below...',
            instruction: 'A symbol of my forever love...'
        }
    ]

    constructor() {
        this.app = document.getElementById('app')!
        this.render()
        this.initHearts()
    }

    private initHearts() {
        const container = document.createElement('div')
        container.className = 'heart-bg'
        document.body.appendChild(container)

        const emojis = ['❤️', '🌹', '🍃', '🌸', '✨']

        setInterval(() => {
            const el = document.createElement('div')
            el.className = 'falling-element'
            el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]
            el.style.left = Math.random() * 100 + 'vw'
            el.style.fontSize = Math.random() * 20 + 15 + 'px'
            el.style.animationDuration = Math.random() * 5 + 3 + 's' // Slower fall
            container.appendChild(el)

            // Clean up
            setTimeout(() => el.remove(), 8000)
        }, 200)
    }

    private render() {
        this.app.innerHTML = ''

        this.screens.forEach((screen, index) => {
            const div = document.createElement('div')
            div.className = `screen ${index === this.currentScreen ? 'active' : ''}`
            div.id = `screen-${index}`

            if (screen.type === 'question') {
                const imageHtml = screen.image ? `<img src="/panda-wave.gif" class="question-img" alt="Cute Panda">` : ''
                div.innerHTML = `
          ${imageHtml}
          <h1>${screen.title}</h1>
          <p>${screen.text}</p>
          <p><strong>${screen.question}</strong></p>
          <div class="btn-container">
            <button class="btn-yes" data-index="${index}"> ${screen.yesText} </button>
            <button class="btn-no" data-index="${index}"> ${screen.noText} </button>
          </div>
        `
            } else if (screen.type === 'gallery') {
                const photosHtml = screen.photos?.map((photo: string, i: number) => `
                    <div class="polaroid" style="--i: ${i}">
                        <img src="${photo}" alt="Memory ${i}">
                        <div class="caption">Memory #${i + 1}</div>
                    </div>
                `).join('') || ''

                div.innerHTML = `
                    <h1>${screen.title}</h1>
                    <p>${screen.text}</p>
                    <div class="gallery-container">
                        ${photosHtml}
                    </div>
                    <button class="btn-yes gallery-btn" data-index="${index}">${screen.btnText}</button>
                `
            } else {
                div.innerHTML = `
          <h1>${screen.title}</h1>
          <div id="final-prompt" class="final-prompt">
            <p><strong>Will you accept this promise, Pinno Raani? ❤️</strong></p>
            <div class="btn-container">
              <button class="btn-yes" id="final-confirm-yes">Yes!</button>
              <button class="btn-no" id="final-confirm-no">No</button>
            </div>
          </div>
          <div id="final-action-container" style="display: none;">
              <p>${screen.text}</p>
              <p><em>${screen.instruction}</em></p>
              <div class="canvas-container" id="final-container">
                 <img src="/hand.png" class="hand-image" id="hand-img">
                 <div class="ring-overlay" id="real-ring">
                    <img src="/ring.png" alt="ring">
                 </div>
              </div>
          </div>
        `
            }

            this.app.appendChild(div)
        })

        this.attachEvents()
    }

    private attachEvents() {
        this.app.onclick = (e) => {
            const target = e.target as HTMLElement

            if (target.classList.contains('btn-yes')) {
                if (target.id === 'final-confirm-yes') {
                    const prompt = document.getElementById('final-prompt')
                    const actionContainer = document.getElementById('final-action-container')
                    if (prompt) prompt.style.display = 'none'
                    if (actionContainer) actionContainer.style.display = 'block'
                    this.startRingAnimation()
                } else {
                    this.nextScreen()
                }
            }

            if (target.classList.contains('btn-no')) {
                if (target.id === 'final-confirm-no') {
                    target.innerText = 'pinno rani yes kro'
                    target.classList.remove('btn-no')
                    target.classList.add('btn-yes')
                    target.id = 'final-confirm-yes'
                } else {
                    this.showNoPopup()
                }
            }
        }
    }

    private showNoPopup() {
        let popup = document.querySelector('.popup') as HTMLElement
        if (!popup) {
            popup = document.createElement('div')
            popup.className = 'popup'
            document.body.appendChild(popup)
        }
        popup.innerHTML = 'bacch k kaha jaogi! Pinno raani'
        popup.classList.add('active')

        setTimeout(() => {
            popup.classList.remove('active')
        }, 3000)
    }

    private nextScreen() {
        if (this.currentScreen < this.screens.length - 1) {
            const current = document.getElementById(`screen-${this.currentScreen}`)
            current?.classList.remove('active')
            this.currentScreen++
            const next = document.getElementById(`screen-${this.currentScreen}`)
            setTimeout(() => {
                next?.classList.add('active')
                // Auto-start animation removed: handled by final confirmation buttons
            }, 800)
        }
    }

    private processRingImage() {
        const ringImg = document.querySelector('#real-ring img') as HTMLImageElement
        if (!ringImg) return

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = ringImg.src
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            // Key out black (#000000)
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i]
                const g = data[i + 1]
                const b = data[i + 2]
                // If pixel is very dark, make it transparent
                if (r < 40 && g < 40 && b < 40) {
                    data[i + 3] = 0
                }
            }
            ctx.putImageData(imageData, 0, 0)
            ringImg.src = canvas.toDataURL()
        }
    }

    private startRingAnimation() {
        const ring = document.getElementById('real-ring') as HTMLElement
        if (!ring) return

        this.processRingImage()

        // Wait for hand image and message to be seen
        setTimeout(() => {
            ring.classList.add('animate')

            // Trigger confetti after animation ends
            setTimeout(() => {
                this.triggerConfetti()
            }, 4000)
        }, 3000)
    }

    private triggerConfetti() {
        const container = document.body
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div')
            confetti.className = 'confetti'
            confetti.style.left = Math.random() * 100 + 'vw'
            confetti.style.backgroundColor = ['#ff4d6d', '#ff758f', '#ffb703', '#ffffff'][Math.floor(Math.random() * 4)]
            confetti.style.width = Math.random() * 10 + 5 + 'px'
            confetti.style.height = confetti.style.width
            confetti.style.animationDuration = Math.random() * 2 + 1 + 's'
            confetti.style.animationDelay = Math.random() * 2 + 's'
            container.appendChild(confetti)
            setTimeout(() => confetti.remove(), 4000)
        }
    }
}

new Proposal()
