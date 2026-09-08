// Admin portal password is stored as a shared setting on each admin's profile
// under a custom field "portal_password". Default is "123456789".

export const DEFAULT_PORTAL_PASSWORD = "123456789";

export async function getPortalPassword(base44) {
  try {
    const me = await base44.auth.me();
    return me.portal_password || DEFAULT_PORTAL_PASSWORD;
  } catch {
    return DEFAULT_PORTAL_PASSWORD;
  }
}

export async function setPortalPassword(base44, newPassword) {
  await base44.auth.updateMe({ portal_password: newPassword });
}