import puppeteer from "puppeteer"
import fs from "node:fs/promises"

const scrapePage = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null
    })
    const page = await browser.newPage()
    await page.goto("https://marvelsnapzone.com/cards/")
    const cardData = await page.evaluate(() => {
        const cards = document.querySelectorAll(".simple-card")
        return Array.from(cards).map(card => ({...card.dataset})) 
    })
    await fs.writeFile("resources/cardData.json", JSON.stringify(cardData, null, 4))

    browser.close()
}

scrapePage()