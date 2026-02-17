# M.A.M.Inc — Deployment & Hosting Reference Document

> Last updated: February 2026
> Document covers: current infrastructure state + hosting platform decision + server configuration + deployment strategy

---

## HOSTING DECISION SUMMARY

**Recommended: DigitalOcean Basic Droplet — $6/month**

Reasons:
- Stable, not a free/trial tier — server runs 24/7 permanently
- Industry-standard production setup used by thousands of companies
- Full control — no platform lock-in
- Handles 100 users with massive headroom (capable of 1,000–5,000+ concurrent users for static content)
- One-click vertical scaling when traffic grows
- 99.99% uptime SLA

**Software stack on the server:** Ubuntu 22.04 LTS + Nginx + Node.js + PM2 + Certbot (free SSL)

---

---

## 1. Current Live Website — maminc.net

### 1.1 Domain Details

| Property | Details |
|---|---|
| Domain | `maminc.net` |
| Registrar | GoDaddy.com, LLC |
| WHOIS Server | whois.godaddy.com |
| Registered On | June 20, 2007 |
| Last Updated | October 10, 2022 |
| Expires On | **June 20, 2031** |
| Domain Privacy | Enabled (contact info hidden) |
| DNSSEC | Unsigned |

### 1.2 DNS / Nameservers

DNS is managed by GoDaddy. These are GoDaddy's default nameservers:

| Nameserver | IP Address |
|---|---|
| ns59.domaincontrol.com | 97.74.100.31 |
| ns60.domaincontrol.com | 173.201.68.31 |

**Server IP (current host):** `160.153.0.137`

> To check DNS records at any time: https://who.is/whois/maminc.net

### 1.3 Current Hosting

| Property | Details |
|---|---|
| Hosting Provider | GoDaddy (Shared Hosting) |
| Server Region | US West 2 (pod: c20-prod-p3-us-west-2) |
| Server IP | 160.153.0.137 |
| PHP Version | 8.2.30 |
| Domain manages DNS via | GoDaddy nameservers (domaincontrol.com) |

### 1.4 Current Technology Stack (Live Site)

| Layer | Technology |
|---|---|
| CMS | WordPress 6.9.1 |
| Theme | TwentyTwenty |
| E-Commerce | WooCommerce |
| Payment Gateway | Poynt |
| Language | PHP 8.2 |
| Database | MySQL (managed by GoDaddy) |

> **Note:** The current live site is a WordPress site. The local project being developed is a new Node.js/Express site that will **replace** the WordPress site.

---

## 2. New Site Being Developed (This Repository)

### 2.1 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Frontend | Vanilla HTML / CSS |
| 3D Rendering | Three.js r128 (GLTFLoader, OrbitControls) |
| 3D Assets | .glb model files |
| Database | None |
| Entry Point | `server.js` |
| Default Port | 8080 |

### 2.2 Pages

| File | Route | Description |
|---|---|---|
| `index.html` | `/` | Landing page with 3D carousel |
| `transformers.html` | `/transformers.html` | Transformers product page |
| `chokers.html` | `/chokers.html` | Chokers product page |
| `filters.html` | `/filters.html` | Filters product page |
| `additive-magnetics.html` | `/additive-magnetics.html` | Additive magnetics product page |
| `enquiry.html` | `/enquiry.html` | Enquiry / contact form |

### 2.3 Run Locally

```bash
npm install
npm start
# Site available at http://localhost:8080
```

---

## 3. Hosting Platform Comparison

### 3.0 Why Not the Others

| Platform | Issue |
|---|---|
| GoDaddy Shared Hosting (current) | PHP only — cannot run Node.js |
| Render Free | Sleeps after 15 min inactivity — not suitable for production |
| Railway Hobby | Credit-based system — app stops when credits run out |
| Heroku | No free tier, more expensive, worse performance per dollar |
| Vercel / Netlify | Primarily for serverless/static — not ideal for Express server |

### 3.1 Final Comparison — Stable Options Only

| | DigitalOcean Droplet | DigitalOcean App Platform | Render Starter |
|---|---|---|---|
| **Cost/month** | **$6** | $12 | $7 |
| **Control** | Full root access | Managed | Managed |
| **Sleep/downtime** | Never | Never | Never |
| **Setup effort** | Medium (one-time) | Low | Low |
| **Auto-deploy from Git** | Manual or via webhook | Yes | Yes |
| **Scaling** | Resize droplet | Add instances | Add instances |
| **SSL** | Free (Certbot) | Free | Free |
| **Traffic (100 users)** | Handles easily | Handles easily | Handles easily |
| **Long-term stability** | Best | Best | Good |
| **Recommended for** | Best overall | Managed + stability | Managed simplicity |

### Winner: DigitalOcean Basic Droplet ($6/month)

Best price, best stability, full control, industry-proven. The one-time setup (Nginx + PM2) is worth it for a production business site.

---

## 5. Deployment Strategy

### 3.1 Overview

Since the domain (`maminc.net`) is already registered and paid through 2031 at GoDaddy, there is no need to move the domain. The strategy is:

1. Deploy the new Node.js app to a hosting platform
2. Update the DNS A record in GoDaddy to point to the new host's IP
3. The domain stays at GoDaddy — only the destination IP changes

```
User browser
    |
    v
maminc.net  (GoDaddy DNS — nameservers stay the same)
    |
    v
New Host IP  (Render / Railway / VPS)
    |
    v
Node.js Express Server → serves HTML pages + 3D models
```

---

### 3.2 Recommended Hosting Options

#### Option A — Render (Recommended to Start)

| Property | Details |
|---|---|
| Cost | Free tier / $7/month (Starter, always on) |
| Setup effort | Low |
| Auto SSL | Yes (free via Let's Encrypt) |
| Custom domain | Yes |
| Sleep on inactivity | Yes (free tier only) |
| Best for | Getting live fast with minimal cost |

**Steps:**
1. Push code to GitHub
2. Sign up at https://render.com
3. New → Web Service → connect GitHub repo
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add custom domain `maminc.net` in Render dashboard
7. Render gives you a CNAME or A record — update GoDaddy DNS accordingly

---

#### Option B — Railway

| Property | Details |
|---|---|
| Cost | ~$5/month (Hobby plan) |
| Setup effort | Low |
| Auto SSL | Yes |
| Custom domain | Yes |
| Sleep on inactivity | No |
| Best for | Always-on with predictable pricing |

---

#### Option C — DigitalOcean Droplet (VPS, Most Control)

| Property | Details |
|---|---|
| Cost | $6/month (1 vCPU, 1GB RAM) |
| Setup effort | Medium (manual server setup) |
| Auto SSL | Via Certbot / Let's Encrypt (manual) |
| Custom domain | Yes |
| Full root access | Yes |
| Best for | Long-term hosting, multiple projects |

**Stack on VPS:**
- Ubuntu 22.04 LTS
- Node.js + PM2 (process manager — keeps app running on restart)
- Nginx (reverse proxy from port 80/443 → 8080)
- Certbot for free SSL

---

### 3.3 DNS Change Process (GoDaddy)

When the new host is ready, update the DNS A record in GoDaddy:

1. Log in to GoDaddy → My Products → DNS
2. Find the `A` record for `@` (root domain)
3. Change the IP value to the new host's IP address
4. Set TTL to 600 seconds (10 min) before migration, revert to 3600 after
5. DNS propagation takes 5 minutes to 48 hours globally

> Nameservers (ns59/ns60.domaincontrol.com) do NOT need to change.

---

### 3.4 SSL Certificate

The current GoDaddy hosting provides SSL. On the new host:

| Host | SSL Method |
|---|---|
| Render | Automatic (free, no action needed) |
| Railway | Automatic (free, no action needed) |
| DigitalOcean VPS | Certbot + Let's Encrypt (free, manual once) |

---

## 4. Server Configuration — DigitalOcean Droplet

### 4.1 Droplet Specs (Starting Configuration)

| Property | Value |
|---|---|
| Provider | DigitalOcean |
| Plan | Basic — Regular Intel |
| **vCPU** | 1 vCPU |
| **RAM** | 1 GB |
| **Storage** | 25 GB SSD |
| **Bandwidth** | 1 TB outbound/month |
| **OS** | Ubuntu 22.04 LTS |
| **Region** | New York 1 (or closest to target users) |
| **Monthly Cost** | $6/month |

> This spec handles 100 concurrent users with significant headroom. Node.js is event-driven and non-blocking — it handles concurrent connections extremely efficiently.

---

### 4.2 Software Stack on Server

```
Internet (HTTPS :443)
        |
      Nginx          ← handles SSL, compression, caching, static files
        |
  Node.js :8080      ← Express app (managed by PM2)
        |
  Static Files       ← HTML, CSS, JS, GLB models
```

| Software | Purpose | Version |
|---|---|---|
| Ubuntu | Operating system | 22.04 LTS |
| Node.js | App runtime | 20 LTS (stable) |
| PM2 | Process manager — keeps app alive, auto-restart on crash/reboot | Latest |
| Nginx | Reverse proxy, SSL termination, static file caching, gzip | Latest stable |
| Certbot | Free SSL certificate from Let's Encrypt | Latest |
| UFW | Firewall — only allow ports 22, 80, 443 | Built-in |

---

### 4.3 Server Setup Steps (One-Time)

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2 globally
sudo npm install -g pm2

# 4. Install Nginx
sudo apt install -y nginx

# 5. Install Certbot for free SSL
sudo apt install -y certbot python3-certbot-nginx

# 6. Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# 7. Clone your repo on the server
cd /var/www
sudo git clone https://github.com/yourusername/mam-inc.git maminc
cd maminc
sudo npm install --production

# 8. Start app with PM2
pm2 start server.js --name "maminc"
pm2 startup           # auto-start PM2 on server reboot
pm2 save              # save current process list
```

---

### 4.4 Nginx Configuration

Create file: `/etc/nginx/sites-available/maminc`

```nginx
server {
    listen 80;
    server_name maminc.net www.maminc.net;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name maminc.net www.maminc.net;

    # SSL — managed by Certbot
    ssl_certificate     /etc/letsencrypt/live/maminc.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/maminc.net/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;
    gzip_comp_level 6;

    # Cache static assets (CSS, JS, images)
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://localhost:8080;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Cache GLB 3D model files (large — cache aggressively)
    location ~* \.glb$ {
        proxy_pass http://localhost:8080;
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    # All other requests → Node.js app
    location / {
        proxy_pass         http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/maminc /etc/nginx/sites-enabled/
sudo nginx -t                  # test config — must say "ok"
sudo systemctl reload nginx

# Issue free SSL certificate
sudo certbot --nginx -d maminc.net -d www.maminc.net
# Certbot auto-renews every 90 days — no manual action needed
```

---

### 4.5 server.js Change Required

Change the PORT line so the app works correctly on the server:

```js
// Change this:
const PORT = 8080;

// To this:
const PORT = process.env.PORT || 8080;
```

---

### 4.6 Traffic Capacity — What This Setup Handles

| Metric | Capacity |
|---|---|
| Concurrent users (HTML pages) | ~1,000–3,000 |
| Concurrent users (with 3D model loads) | ~200–500 (GLB files are large) |
| Requests per second (static content) | ~500–1,000 RPS |
| Monthly bandwidth (1TB included) | ~2 million page views |
| **Your starting target: 100 users** | Handled with ease |

> The bottleneck for this site is the GLB 3D model file size, not the server. Nginx caches these aggressively, so repeat visitors load from browser cache.

---

### 4.7 Scaling Path (When Needed)

| Traffic Level | Action | Cost |
|---|---|---|
| 0–500 concurrent users | $6/month Droplet (current spec) | $6/mo |
| 500–2,000 concurrent users | Resize to 2 vCPU / 2GB RAM | $12/mo |
| 2,000–10,000 concurrent users | Add DigitalOcean CDN (Spaces) for GLB files | +$5/mo |
| 10,000+ concurrent users | Add Load Balancer + multiple Droplets | Custom |

Scaling is one click in the DigitalOcean dashboard — no migration needed.

---

## 6. Pre-Deployment Checklist

### Code Readiness
- [ ] All 3D model `.glb` files present in `images/` directory
- [ ] Enquiry form has a working email backend (currently missing — see Section 5)
- [ ] `server.js` PORT uses environment variable: `process.env.PORT || 8080`
- [ ] No hardcoded `localhost` URLs in HTML files
- [ ] Test all pages locally with `npm start`

### Deployment
- [ ] Code pushed to GitHub (private repo recommended)
- [ ] Environment variables configured on host (if any)
- [ ] Custom domain added and verified on host platform
- [ ] SSL certificate active (HTTPS working)
- [ ] DNS A record updated in GoDaddy pointing to new host IP

### Post-Deployment
- [ ] Visit https://maminc.net — verify new site loads
- [ ] Test all 5 product pages
- [ ] Test 3D model loading in carousel
- [ ] Test enquiry form end-to-end
- [ ] Submit sitemap to Google Search Console
- [ ] Verify mobile responsiveness on real device

---

## 7. Known Gaps — Action Required

### 7.1 Enquiry Form — EmailJS Setup Required

The enquiry form now uses EmailJS. The code is integrated but needs your EmailJS account credentials before emails will send.

**Step-by-step EmailJS setup (one-time, ~10 minutes):**

1. Sign up free at https://www.emailjs.com
2. Go to **Email Services** → Add Service → choose Gmail or Outlook → connect your inbox
3. Go to **Email Templates** → Create Template. Use these variables in the template body:

```
From: {{contact_name}} <{{contact_email}}>
Phone: {{contact_phone}}
Company: {{contact_company}}

Application: {{application}}
Product Category: {{product_category}}
Frequency: {{frequency}}
Power Rating: {{power_rating}}
Voltage: {{voltage}}
Temperature: {{temperature}}

Additional Requirements:
{{additional_specs}}
```

4. Copy your **Public Key** from Account → General
5. Copy the **Service ID** and **Template ID**
6. Open `enquiry.html` and replace the three placeholder values at the top of the script:

```js
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← replace
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace
```

**Free tier limit:** 200 emails/month — sufficient for a business enquiry form.

### 5.2 PORT Must Use Environment Variable

Change `server.js` line 5 from:
```js
const PORT = 8080;
```
to:
```js
const PORT = process.env.PORT || 8080;
```
This is required for Render, Railway, and most cloud hosts.

### 5.3 New Launch 3D Models Missing

The carousel on `index.html` references 3D models that do not exist yet:
- `images/new-launches/planar-transformer.glb`
- `images/new-launches/printed-inductor.glb`
- `images/new-launches/liquid-reactor.glb`

The code falls back to placeholder shapes, but real models should be added before launch.

---

## 8. Cost Summary

| Item | Provider | Cost |
|---|---|---|
| Domain (maminc.net) | GoDaddy | Paid through 2031 — no action needed |
| Hosting | DigitalOcean Basic Droplet | **$6/month** |
| SSL Certificate | Let's Encrypt via Certbot | Free |
| Email (enquiry form) | EmailJS Free tier | Free (200 emails/mo) |
| **Total monthly** | | **$6/month** |
| **Total annual** | | **~$72/year** |

**Scaling cost (only when needed):**

| Upgrade | When | Added Cost |
|---|---|---|
| 2 vCPU / 2GB RAM Droplet | 500+ concurrent users | +$6/mo ($12 total) |
| DigitalOcean CDN / Spaces | High 3D model traffic | +$5/mo |
| Load Balancer | 10,000+ users | +$12/mo |

---

## 9. Quick Reference

| Item | Value |
|---|---|
| Live URL | https://maminc.net |
| Domain Registrar | GoDaddy |
| DNS Provider | GoDaddy (domaincontrol.com) |
| Current Host | GoDaddy Shared Hosting |
| Current CMS | WordPress 6.9.1 |
| Server IP (current) | 160.153.0.137 |
| Domain Expiry | June 20, 2031 |
| New App Stack | Node.js + Express |
| New App Port | 8080 (or `process.env.PORT`) |
| Repo Entry Point | `server.js` |
| Start Command | `node server.js` |
| Build Command | `npm install` |
