I've made page audit via Google Chrome DevTools, here are some results:
**Performance: 100%**
 - First Contentful Paint: 930 ms 
 - Speed Index: 930 ms 
 - Time to Interactive: 1110 ms 
 - First Meaningful Paint: 930 ms 
 - First CPU Idle: 1110 ms 
 - Estimated Input Latency: 16 ms

Network tab shows that page loads 10.2KB within ~985ms with cache enabled, and 966KB within ~1.09s with cache disabled - not bad for an image gallery, right? 

With gzip, cdn and http2 results should be even better, but that's a back-end part.

Notes:
- I assume that normalize.css and jquery.js are popular libraries, and they might be downloaded and cached on user's computer, so I don't include them into vendor.min files
- Looks like project contains both vendor and custom css, so I didn't combine them into a single min.css file