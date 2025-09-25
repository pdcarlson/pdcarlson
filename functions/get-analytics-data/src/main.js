import { BetaAnalyticsDataClient } from '@google-analytics/data';

// helper function to process a report from the ga api
const processReport = (response) => {
  const result = {
    totals: {},
    rows: [],
  };

  if (response.metricHeaders && response.totals && response.totals.length > 0) {
    response.metricHeaders.forEach((header, index) => {
      const metricName = header.name;
      const totalValue = response.totals[0].metricValues[index]?.value || '0';
      result.totals[metricName] = totalValue;
    });
  }

  if (response.rows && response.rows.length > 0) {
    result.rows = response.rows.map(row => {
      const rowData = {};
      response.dimensionHeaders.forEach((header, index) => {
        rowData[header.name] = row.dimensionValues[index].value;
      });
      response.metricHeaders.forEach((header, index) => {
        rowData[header.name] = row.metricValues[index].value;
      });
      return rowData;
    });
  }
  return result;
};


export default async ({ req, res, log, error }) => {
  log('function execution started.');

  if (!req.headers['x-appwrite-user-id']) {
    error('authentication check failed: user is not authenticated.');
    return res.json({ ok: false, message: 'unauthorized' }, 401);
  }

  const { GA_CLIENT_EMAIL, GA_PRIVATE_KEY, GA_PROJECT_ID, GA_PROPERTY_ID } = process.env;

  if (!GA_CLIENT_EMAIL || !GA_PRIVATE_KEY || !GA_PROJECT_ID || !GA_PROPERTY_ID) {
    error('missing one or more required environment variables.');
    return res.json({ ok: false, message: 'server configuration error' }, 500);
  }

  const credentials = {
    client_email: GA_CLIENT_EMAIL,
    private_key: GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
  
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials,
    projectId: GA_PROJECT_ID,
  });

  try {
    log(`fetching analytics reports for property id: ${GA_PROPERTY_ID}`);

    const commonConfig = {
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    };

    // run two reports in parallel: one for pageviews, one for events
    const [pageviewResponse, eventResponse] = await Promise.all([
      // report #1: top pages
      analyticsDataClient.runReport({
        ...commonConfig,
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),
      // report #2: top events
      analyticsDataClient.runReport({
        ...commonConfig,
        metrics: [{ name: 'eventCount' }],
        dimensions: [{ name: 'eventName' }],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 15,
      }),
    ]);
    
    log('successfully fetched analytics data from google.');
    
    const pageviews = processReport(pageviewResponse[0]);
    const events = processReport(eventResponse[0]);

    // combine the results into a single object
    const analyticsData = {
      pageviews,
      events,
    };

    log('successfully processed analytics data. sending response.');
    return res.json(analyticsData);

  } catch (err) {
    error('error during google analytics api call:', err);
    return res.json({ ok: false, message: 'internal server error', error: err.message }, 500);
  }
};