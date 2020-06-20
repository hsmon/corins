import puppeteer from 'puppeteer'
import { imageSize } from 'image-size'

const dev = process.env.NODE_ENV !== 'production'

export type ScreenshotType = {
  screenshot: Buffer | string | undefined | null
  screenshotWidth: number | undefined | null
  screenshotHeight: number | undefined | null
}
export type ScreenshotErrorType = {
  error?: string | undefined | null
}

export type ScreenshotAllType = ScreenshotType | ScreenshotErrorType

export default async (src: string): Promise<ScreenshotAllType> => {
  if (!src) {
    return { error: 'error' }
  }

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({ width: 1200, height: 800 })
  await page.goto(src)
  await page
    .waitForNavigation({
      waitUntil: dev ? 'networkidle2' : 'networkidle0',
      timeout: 5000
    })
    .catch(() => console.log('timeout exceed.'))

  let screenshot: Buffer | string = await page.screenshot({
    fullPage: true
  })
  await browser.close()

  const dimensions = await imageSize(screenshot)
  const screenshotWidth = dimensions.width
  const screenshotHeight = dimensions.height

  screenshot = screenshot.toString('base64')

  return {
    screenshot,
    screenshotWidth,
    screenshotHeight
  }
}
