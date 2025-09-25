import { BetaAnalyticsDataClient } from '@google-analytics/data';

export default async ({ req, res, log, error }) => {
  // ensure this function can only be called by an authenticated user
  if (!req.headers['x-appwrite-user-id']) {
    error('user is not authenticated.');
    return res.json({ ok: false, message: 'unauthorized' }, 401);
  }

  // initialize the google analytics data client
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA_CLIENT_EMAIL,
      private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'), // format the private key
    },
    projectId: process.env.GA_PROJECT_ID,
  });

  const propertyId = process.env.GA_PROPERTY_ID;

  try {
    log('fetching analytics data...');

    // define the metrics and dimensions for our report
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'sessions' },
      ],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' }
      ],
    });

    log('successfully fetched analytics data.');

    // process the response into a more usable format
    const analyticsData = {
      totals: {},
      pages: [],
    };
    
    if (response.metricHeaders) {
        response.metricHeaders.forEach((header, index) => {
            const metricName = header.name;
            const totalValue = response.totals[0].metricValues[index].value;
            analyticsData.totals[metricName] = totalValue;
        });
    }

    if (response.rows) {
        analyticsData.pages = response.rows.map(row => {
            const pageData = {};
            response.dimensionHeaders.forEach((header, index) => {
                pageData[header.name] = row.dimensionValues[index].value;
            });
            response.metricHeaders.forEach((header, index) => {
                pageData[header.name] = row.metricValues[index].value;
            });
            return pageData;
        }).sort((a, b) => b.screenPageViews - a.screenPageViews).slice(0, 10); // top 10 pages
    }

    return res.json(analyticsData);

  } catch (err) {
    error('failed to fetch google analytics data:', err);
    return res.json({ ok: false, message: 'internal server error' }, 500);
  }
};