/**
 * data-track-click payload handled by /assets/analytics.js (same shape as the
 * old Twig templates). Shared between TrackedLink.astro and React islands.
 */
export function trackClickPayload(eventId: string, eventContext: string): string {
  return JSON.stringify({
    name: 'productEventTriggered',
    properties: {
      eventId,
      eventAction: 'clicked',
      eventContext,
    },
  });
}
