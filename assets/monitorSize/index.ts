const monitorSize = {
  PC: {
    width: 1200,
    height: 800
  },
  TB: {
    width: 980,
    height: 1080
  },
  SP: {
    width: 375,
    height: 667
  }
}

export type MonitorSizeType = typeof monitorSize
export type MonitorSizeKey = keyof MonitorSizeType
export default monitorSize
