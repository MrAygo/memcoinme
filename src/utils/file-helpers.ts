export async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize
}

export function validateFileType(file: File, types: string[]): boolean {
  return types.some(type => file.type.startsWith(type))
}