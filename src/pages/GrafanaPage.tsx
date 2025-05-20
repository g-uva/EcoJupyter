import React from 'react';

export default function GrafanaPage() {
  return (
    <iframe
      src="http://localhost:3000/d/abcd1234/my-dashboard?orgId=1&kiosk"
      width="100%"
      height="600"
      style={{ border: 'none', overflow: 'hidden' }}
    ></iframe>
  );
}
