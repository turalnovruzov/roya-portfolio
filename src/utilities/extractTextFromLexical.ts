import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

/**
 * Extract plain text from Lexical editor state for meta descriptions
 */
export function extractTextFromLexical(editorState: DefaultTypedEditorState): string {
  if (!editorState?.root?.children) return ''

  const extractFromNode = (node: Record<string, unknown>): string => {
    let text = ''

    // Handle text nodes
    if (node.type === 'text' && typeof node.text === 'string') {
      text += node.text
    }

    // Handle paragraph nodes and other containers
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        text += extractFromNode(child)
      }
    }

    return text
  }

  let fullText = ''
  for (const child of editorState.root.children) {
    fullText += extractFromNode(child) + ' '
  }

  return fullText.trim()
}

/**
 * Create a meta description from Lexical content
 * Limits to ~160 characters for optimal SEO
 */
export function createMetaDescription(editorState: DefaultTypedEditorState): string {
  const text = extractTextFromLexical(editorState)

  if (text.length <= 160) {
    return text
  }

  // Find the last complete sentence within 160 characters
  const truncated = text.substring(0, 157)
  const lastSentence = truncated.lastIndexOf('.')
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSentence > 120) {
    return text.substring(0, lastSentence + 1)
  } else if (lastSpace > 120) {
    return text.substring(0, lastSpace) + '...'
  }

  return truncated + '...'
}
