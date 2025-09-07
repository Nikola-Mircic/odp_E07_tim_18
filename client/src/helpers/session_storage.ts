function SačuvajVrednostPoKljuču(key: string, value: string): boolean {
  try {
    sessionStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Грешка при чувању у localStorage за кључ '${key}':`, error)
    return false
  }
}

function PročitajVrednostPoKljuču(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error(`Грешка при читању из localStorage за кључ '${key}':`, error)
    return null
  }
}

function ObrišiVrednostPoKljuču(key: string): boolean {
  try {
    sessionStorage.removeItem(key);
    return true
  } catch (error) {
    console.error(`Грешка при брисању из localStorage за кључ '${key}':`, error)
    return false
  }
}

export { SačuvajVrednostPoKljuču, PročitajVrednostPoKljuču, ObrišiVrednostPoKljuču };