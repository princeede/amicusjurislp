"use client";

/**
 * Mounts the full Sanity Studio inside the Next.js app as a client component.
 *
 * Partners access it at https://amicusjurislp.com/studio. The Studio manages
 * its own auth. Remember to add the production origin to the allowed CORS
 * origins in the Sanity project dashboard:
 *   https://www.sanity.io/manage/project/g2qcvcoe/api
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
