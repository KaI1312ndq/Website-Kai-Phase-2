import { BetaAnalyticsDataClient } from "@google-analytics/data";

// GA4 Data API client. Requires 2 env vars:
//   GA4_PROPERTY_ID         numeric (vd "350123456") - khác NEXT_PUBLIC_GA_ID (G-XXXXX)
//   GA4_SERVICE_ACCOUNT     full JSON string của service account key (paste vào Vercel env)

let cachedClient: BetaAnalyticsDataClient | null = null;

function getClient(): BetaAnalyticsDataClient | null {
  if (cachedClient) return cachedClient;
  const sa = process.env.GA4_SERVICE_ACCOUNT;
  if (!sa) return null;
  let credentials: { client_email: string; private_key: string };
  try {
    credentials = JSON.parse(sa);
  } catch {
    console.warn("[ga4] GA4_SERVICE_ACCOUNT invalid JSON");
    return null;
  }
  cachedClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/g, "\n"),
    },
  });
  return cachedClient;
}

function getProperty(): string | null {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) return null;
  return `properties/${id}`;
}

export type GA4Summary = {
  enabled: boolean;
  totalUsers: number;
  newUsers: number;
  sessions: number;
  pageviews: number;
  avgSessionDuration: number; // seconds
  bounceRate: number; // 0-1
  topPages: Array<{ path: string; views: number }>;
  topCountries: Array<{ country: string; users: number }>;
  topReferrers: Array<{ source: string; sessions: number }>;
  topDevices: Array<{ device: string; users: number }>;
  daily: Array<{ date: string; pageviews: number; users: number }>;
};

const EMPTY: GA4Summary = {
  enabled: false,
  totalUsers: 0,
  newUsers: 0,
  sessions: 0,
  pageviews: 0,
  avgSessionDuration: 0,
  bounceRate: 0,
  topPages: [],
  topCountries: [],
  topReferrers: [],
  topDevices: [],
  daily: [],
};

export async function getGA4Summary(days: number = 7): Promise<GA4Summary> {
  const client = getClient();
  const property = getProperty();
  if (!client || !property) return EMPTY;

  const startDate = `${days}daysAgo`;
  const endDate = "today";

  try {
    const [totals, daily, topPages, topCountries, topReferrers, topDevices] = await Promise.all([
      client.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: "totalUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 20,
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        limit: 10,
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "totalUsers" }],
        orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
      }),
    ]);

    const totalRow = totals[0].rows?.[0]?.metricValues ?? [];
    return {
      enabled: true,
      totalUsers: Number(totalRow[0]?.value || 0),
      newUsers: Number(totalRow[1]?.value || 0),
      sessions: Number(totalRow[2]?.value || 0),
      pageviews: Number(totalRow[3]?.value || 0),
      avgSessionDuration: Number(totalRow[4]?.value || 0),
      bounceRate: Number(totalRow[5]?.value || 0),
      daily: (daily[0].rows || []).map((r) => ({
        date: String(r.dimensionValues?.[0]?.value || ""),
        pageviews: Number(r.metricValues?.[0]?.value || 0),
        users: Number(r.metricValues?.[1]?.value || 0),
      })),
      topPages: (topPages[0].rows || []).map((r) => ({
        path: String(r.dimensionValues?.[0]?.value || ""),
        views: Number(r.metricValues?.[0]?.value || 0),
      })),
      topCountries: (topCountries[0].rows || []).map((r) => ({
        country: String(r.dimensionValues?.[0]?.value || ""),
        users: Number(r.metricValues?.[0]?.value || 0),
      })),
      topReferrers: (topReferrers[0].rows || []).map((r) => ({
        source: String(r.dimensionValues?.[0]?.value || ""),
        sessions: Number(r.metricValues?.[0]?.value || 0),
      })),
      topDevices: (topDevices[0].rows || []).map((r) => ({
        device: String(r.dimensionValues?.[0]?.value || ""),
        users: Number(r.metricValues?.[0]?.value || 0),
      })),
    };
  } catch (e) {
    console.warn("[ga4] runReport failed:", e instanceof Error ? e.message : e);
    return EMPTY;
  }
}
