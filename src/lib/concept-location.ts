/** Only same-origin content editor paths may enter the workspace iframe. */
export function conceptEditorLocation(value: string | null) {
  if (
    !value ||
    !/^\/keystatic\/(?:branch\/[^/?#]+\/)?collection\/(?:articles|logs|pages)(?:Zh|En|De)\/item\/[a-z0-9-]+(?:#concept-[a-z0-9-]+)?$/.test(
      value,
    )
  )
    return null;
  return value;
}

export function conceptWorkspaceHref(editorHref: string) {
  const path = conceptEditorLocation(editorHref);
  return path ? `/keystatic/workspace?editor=${encodeURIComponent(path)}` : undefined;
}
