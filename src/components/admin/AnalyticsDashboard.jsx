// src/components/admin/AnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Functions } from 'appwrite';
import { client } from '../../lib/appwrite';
import Spinner from '../Spinner';

const functions = new Functions(client);
const ANALYTICS_FUNCTION_ID = import.meta.env.VITE_APPWRITE_ANALYTICS_FUNCTION_ID;

// map for translating raw event names to pretty names
const eventNameMap = {
  'page_view': 'Page Views',
  'user_engagement': 'User Engagement',
  'session_start': 'Sessions Started',
  'first_visit': 'First Visits',
  'scroll': 'Scrolls',
  'form_start': 'Login Form Started', // added this
  'form_submit': 'Login Form Submitted', // added this
  'Click_resume': 'Resume Clicks',
  'Click_contact': 'Contact Clicks',
  'Click_learn_more': 'Learn More Clicks',
  'Click_live_link': 'Live Site Clicks',
  'Click_code_link': 'View Code Clicks',
  'Click_social': 'Social Media Clicks',
};

const getEventDisplayName = (rawName) => {
  return eventNameMap[rawName] || rawName; // return the pretty name, or the raw name if not found
};

const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!ANALYTICS_FUNCTION_ID) {
        setError("analytics function id is not configured in environment variables.");
        setIsLoading(false);
        return;
      }
      try {
        const result = await functions.createExecution(ANALYTICS_FUNCTION_ID);
        const responseData = JSON.parse(result.responseBody);
        setData(responseData);
      } catch (err) {
        console.error("failed to execute analytics function", err);
        setError("could not load analytics data. please ensure the function id is correct and the function has been deployed.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex-center" style={{ minHeight: '50vh' }}><Spinner /></div>;
  }

  if (error) {
    return <div className="flex-center" style={{ minHeight: '50vh' }}><p>{error}</p></div>;
  }
  
  const homepageData = data?.pageviews?.rows?.find(row => row.pagePath === '/');
  const homepageViews = homepageData?.screenPageViews || '0';
  const totalUsers = data?.pageviews?.rows?.reduce((sum, row) => sum + parseInt(row.activeUsers, 10), 0) || 0;

  return (
    <div className="analytics-dashboard">
      <h3>Last 30 Days Overview</h3>
      <div className="stats-grid">
        <StatCard label="Homepage Views" value={homepageViews} />
        <StatCard label="Total Users" value={totalUsers} />
        <StatCard label="Total Event Count" value={data?.events?.totals?.eventCount || '0'} />
      </div>
      
      <div className="data-tables-grid-single">
        <div className="data-table">
          <h4>Top Events by Count</h4>
          <ul>
            {data?.events?.rows.map((row, i) => (
               <li key={i}>
                <span>{getEventDisplayName(row.eventName)}</span>
                <span>{row.eventCount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;