const getRgbFromString = (rgbStr: string): string[] =>
  /rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)/.exec(rgbStr) ?? []

const decToHex = (dec: number) => {
  return Math.max(0, Math.min(255, dec)).toString(16).padStart(2, '0')
}

const processRgb = (input: string) => {
  const rgbRes = getRgbFromString(input)
  const rgb = rgbRes.length < 4 ? [0, 0, 0] : rgbRes.slice(1, 4).map(v => parseInt(v, 10))

  return {
    hex: `#${rgb.map(v => decToHex(v)).join('')}`,
    rgb: {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
    },
  }
}

const cleanHex = (input: string) => {
  input = input.replace(/[^a-f\d]/g, '')
  if (input.length < 3) {
    return '000000'
  } else if (input.length < 6) {
    return Array.from(input)
      .map(h => h.repeat(2))
      .join('')
      .slice(0, 6)
  } else {
    return input.slice(0, 6)
  }
}

const hexToDec = (hex: string) => {
  const dec = parseInt(hex, 16)
  return Number.isNaN(dec) ? 0 : Math.max(0, Math.min(255, dec))
}

const processHex = (input: string) => {
  let output = cleanHex(input)
  let r = hexToDec(output.slice(0, 2))
  let g = hexToDec(output.slice(2, 4))
  let b = hexToDec(output.slice(4, 6))
  return {
    hex: `#${output}`,
    rgb: {
      r,
      g,
      b,
    },
  }
}

class ColorGenerator {
  rgb: { r: number; g: number; b: number }
  hex: string
  luma: number

  constructor(baseColor: string) {
    // rgb string
    const { hex, rgb } = baseColor.startsWith('rgb(')
      ? processRgb(baseColor)
      : processHex(baseColor)
    this.hex = hex
    this.rgb = rgb
    const { r, g, b } = rgb
    this.luma = 0.299 * r + 0.587 * g + 0.114 * b
  }

  contrast() {
    return new ColorGenerator(this.luma >= 128 ? '#000000' : '#ffffff')
  }
  mix(color: string, ratio = 0.5) {
    ratio = Math.max(0, Math.min(1, ratio))
    const mixColor = new ColorGenerator(color)
    const inverseratio = 1 - ratio
    return new ColorGenerator(
      `rgb(${Math.round(ratio * mixColor.rgb.r + inverseratio * this.rgb.r)},${Math.round(
        ratio * mixColor.rgb.g + inverseratio * this.rgb.g
      )},${Math.round(ratio * mixColor.rgb.b + inverseratio * this.rgb.b)})`
    )
  }
  shade(amount = 0.12) {
    return this.mix('#000000', amount)
  }
  tint(amount = 0.1) {
    return this.mix('#ffffff', amount)
  }
  toRgbList() {
    const { r, g, b } = this.rgb
    return `${r},${g},${b}`
  }
}

export default ColorGenerator
