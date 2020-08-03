import puppeteer from 'puppeteer-core'
import localPuppeteer from 'puppeteer'
import chrome from 'chrome-aws-lambda'
import { imageSize } from 'image-size'
import monitorSize from '~/assets/monitorSize'

const { PC, TB, SP } = monitorSize
const dev = process.env.NODE_ENV !== 'production'

export type ScreenshotType = {
  screenshot: Buffer | string | undefined | null
  screenshotWidth: number | undefined | null
  screenshotHeight: number | undefined | null
  username?: string | null
  password?: string | null
  monitorSize?: string | null
}
export type ScreenshotErrorType = {
  error?: string | undefined | null
}

type ReturnType = {
  screenshot?: string
  screenshotWidth?: number
  screenshotHeight?: number
  error?: 'error'
}

export type ScreenshotAllType = ScreenshotType | ScreenshotErrorType

const selectMonitorSize: (
  monitorSize: string
) => {
  width: number
  height: number
} = (monitorSize = 'PC') => {
  switch (monitorSize) {
    case 'PC':
      return { width: PC.width, height: PC.height }
    case 'TB':
      return { width: TB.width, height: TB.height }
    case 'SP':
      return { width: SP.width, height: SP.height }
    default:
      return { width: PC.width, height: PC.height }
  }
}

export default async (
  src: string,
  username: string,
  password: string,
  monitorSize: string
): Promise<ReturnType> => {
  if (!src) {
    return { error: 'error' }
  }

  const { width, height } = await selectMonitorSize(monitorSize)

  const browser = dev
    ? await localPuppeteer.launch()
    : await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      })
  const page = await browser.newPage()

  await Promise.all([
    page.authenticate({
      username,
      password
    }),
    page.setViewport({ width, height }),
    page.goto(src),
    page
      .waitForNavigation({
        waitUntil: 'load',
        timeout: 0
      })
      .catch(() => console.log('timeout exceed.'))
  ])

  let screenshot: Buffer | string = await page.screenshot({
    fullPage: true
  })
  await browser.close()

  const dimensions = await imageSize(screenshot)
  const screenshotWidth = dimensions.width
  const screenshotHeight = dimensions.height

  screenshot = Buffer.from(screenshot).toString('base64')

  return {
    screenshot,
    screenshotWidth,
    screenshotHeight
  }
}
