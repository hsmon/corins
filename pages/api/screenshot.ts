import puppeteer from 'puppeteer-core'
import localPuppeteer from 'puppeteer'
import chrome from 'chrome-aws-lambda'
import { imageSize } from 'image-size'
import monitorSize, { MonitorSizeKey } from '~/assets/monitorSize'

const { PC, TB, SP } = monitorSize
const dev = process.env.NODE_ENV !== 'production'
const FONT_PATH = process.env.FONT_PATH

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

export type ScreenshotReturnType = {
  screenshot: string
  screenshotWidth: number
  screenshotHeight: number
  error: 'error' | null
}

export interface ScreenshotInterface {
  src: string
  username: string
  password: string
  monitorSize: MonitorSizeKey
}

export type ScreenshotProps = (
  src: string,
  username: string,
  password: string,
  monitorSize: MonitorSizeKey
) => Promise<Partial<ScreenshotReturnType> | undefined>

export type ScreenshotAllType = ScreenshotInterface | ScreenshotErrorType

const selectMonitorSize: (
  monitorSize: MonitorSizeKey
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

const argsOption = [
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--disable-setuid-sandbox',
  '--no-first-run',
  '--no-sandbox',
  '--no-zygote',
  '--single-process'
]

const screenshot: ScreenshotProps = async (
  src,
  username,
  password,
  monitorSize
) => {
  if (!src) {
    return { error: 'error' }
  }

  const { width, height } = selectMonitorSize(monitorSize)
  let data

  try {
    await chrome.font(FONT_PATH)
    const browser = dev
      ? await localPuppeteer.launch({
          args: argsOption
        })
      : await puppeteer.launch({
          args: [...chrome.args, ...argsOption],
          executablePath: await chrome.executablePath,
          headless: chrome.headless
        })
    const page = await browser.newPage()
    await page.emulateMediaType('screen')

    await Promise.allSettled([
      page.authenticate({
        username,
        password
      }),
      page.setViewport({ width, height }),
      page.goto(src),
      page.waitForNavigation({
        waitUntil: 'load',
        timeout: 0
      })
    ]).catch(() => new Error('screenshot　失敗'))

    let screenshot: Buffer | string = await page.screenshot({
      fullPage: true
    })
    await browser.close()

    const dimensions = imageSize(screenshot)
    const screenshotWidth = Number(dimensions.width)
    const screenshotHeight = Number(dimensions.height)

    screenshot = Buffer.from(screenshot).toString('base64')

    data = {
      screenshot,
      screenshotWidth,
      screenshotHeight
    }
  } catch (error) {
    console.error(error)
    data = {
      error
    }
  } finally {
    console.log('done')
  }

  return data
}

export default screenshot
