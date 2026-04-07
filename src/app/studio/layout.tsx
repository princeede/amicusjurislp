/**
 * Studio layout — sets metadata/viewport and isolates the Studio from the
 * rest of the site's chrome (header/footer/fonts).
 */
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
