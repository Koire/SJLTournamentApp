import { chromium } from "playwright"
import fs from "node:fs/promises"


const scrapePage = async () => {
    const browser = await chromium.launch({
        headless: true,
        defaultViewport: null
    })
    const page = await browser.newPage()
    await page.goto("https://marvelsnapzone.com/cards/")
    const cardData = await page.evaluate(() => {
        const cards = document.querySelectorAll(".simple-card")
        return Array.from(cards).map((card, idx) => {
            const ability = cards[idx].querySelector('.card-description').innerText.replace(/<\/?[^>]+(>|$)/g, "").replaceAll('\"', '')
            return { 
                ...card.dataset,
                ability
             }
        }) 
    })
    await fs.writeFile("resources/cardData.json", JSON.stringify(cardData, null, 4))
    await browser.close()
}

scrapePage()