import type { TeamMember } from '../types/team'
import { getMember, getTeam } from '../lib/team'

/**
 * Data access for team profiles. Pages call these, never the data file directly.
 * Today they read src/data/team.ts. When the Supabase `doctors` table exists
 * (booking system phase), only these two functions change, so no page or component does.
 */
export async function fetchTeam(): Promise<TeamMember[]> {
  return getTeam()
}

export async function fetchMember(slug: string): Promise<TeamMember | undefined> {
  return getMember(slug)
}
