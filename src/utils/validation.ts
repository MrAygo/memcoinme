export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

export function validateTitle(title: string): boolean {
  return title.length >= 3 && title.length <= 100
}

export function validateProjectDetails(project: ProjectDetails): string[] {
  const errors: string[] = []
  
  if (!project.tokenName) errors.push('Token name is required')
  if (!project.tokenSymbol) errors.push('Token symbol is required')
  if (!project.description) errors.push('Description is required')
  
  return errors
}