/**
 * PDFSwift - Monetization Ad Manager
 * Renders full-height stacked simulated Google AdSense / Ezoic advertisement units
 */

document.addEventListener('DOMContentLoaded', () => {
  const adSlots = document.querySelectorAll('.ad-slot-container');

  adSlots.forEach(slot => {
    const slotType = slot.getAttribute('data-ad-slot');

    if (slotType === 'skyscraper-left') {
      slot.innerHTML = `
        <div class="ad-simulated-skyscraper">
          <div class="ad-sim-tag">
            <span>Ad 1 of 2</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          
          <div class="ad-sim-content">
            <div class="ad-sim-icon">🚀</div>
            <div class="ad-sim-brand">CLOUDHOST AI</div>
            <h4 class="ad-sim-title">Ultra Fast Cloud Servers for Developers</h4>
            <p class="ad-sim-desc">Deploy high-performance NVMe cloud instances in under 10 seconds. Global low latency.</p>
            <div class="ad-sim-badge">$200 FREE CREDIT</div>
            <a href="#" class="ad-sim-btn" onclick="event.preventDefault(); alert('Simulated Google AdSense Click!');">Claim Free Credit →</a>
          </div>

          <div style="border-top: 1px dashed var(--border-color); margin: 0.85rem 0;"></div>

          <div class="ad-sim-content">
            <div class="ad-sim-icon" style="font-size: 2.2rem;">⚡</div>
            <div class="ad-sim-brand">DB-PRO ENTERPRISE</div>
            <h4 class="ad-sim-title" style="font-size: 0.95rem;">Managed PostgreSQL & Redis DB</h4>
            <p class="ad-sim-desc" style="font-size: 0.78rem;">99.999% Uptime with automated daily backups.</p>
            <a href="#" class="ad-sim-btn" onclick="event.preventDefault(); alert('Simulated Google AdSense Click!');">Start 14-Day Trial →</a>
          </div>

          <div class="ad-sim-footer">Ads by Google</div>
        </div>
      `;
    } else if (slotType === 'skyscraper-right') {
      slot.innerHTML = `
        <div class="ad-simulated-skyscraper">
          <div class="ad-sim-tag">
            <span>Ad 1 of 2</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          
          <div class="ad-sim-content">
            <div class="ad-sim-icon">🤖</div>
            <div class="ad-sim-brand">DEVAI STUDIO</div>
            <h4 class="ad-sim-title">Automate Your Code & RAG Pipelines</h4>
            <p class="ad-sim-desc">Build LLM powered agents with 1-click API integration. Trusted by 50,000+ teams.</p>
            <div class="ad-sim-badge">4.9 ★★★★★ (2.4k)</div>
            <a href="#" class="ad-sim-btn" onclick="event.preventDefault(); alert('Simulated Google AdSense Click!');">Try Free Trial →</a>
          </div>

          <div style="border-top: 1px dashed var(--border-color); margin: 0.85rem 0;"></div>

          <div class="ad-sim-content">
            <div class="ad-sim-icon" style="font-size: 2.2rem;">🔒</div>
            <div class="ad-sim-brand">CYBERGUARD 360</div>
            <h4 class="ad-sim-title" style="font-size: 0.95rem;">Real-Time Endpoint Protection</h4>
            <p class="ad-sim-desc" style="font-size: 0.78rem;">Zero-day malware prevention & SOC security.</p>
            <a href="#" class="ad-sim-btn" onclick="event.preventDefault(); alert('Simulated Google AdSense Click!');">Protect Now →</a>
          </div>

          <div class="ad-sim-footer">Ads by Google</div>
        </div>
      `;
    } else if (slotType === 'sidebar') {
      slot.innerHTML = `
        <div class="ad-simulated-rect">
          <div class="ad-sim-tag">
            <span>Ad</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <div class="ad-sim-rect-body">
            <div style="font-size: 2.2rem; margin-bottom: 0.4rem;">🔐</div>
            <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.3rem;">SECURE VPN PRO</h4>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 0.8rem;">Protect your online privacy with 256-bit military encryption.</p>
            <a href="#" class="ad-sim-btn" onclick="event.preventDefault(); alert('Simulated Ad Click!');">Get 70% Off Now</a>
          </div>
          <div class="ad-sim-footer">Ads by Google</div>
        </div>
      `;
    } else if (slotType === 'footer') {
      slot.innerHTML = `
        <div class="ad-simulated-banner">
          <div class="ad-sim-tag">
            <span>Ad</span>
          </div>
          <div class="ad-sim-banner-body">
            <div style="font-size: 1.6rem;">⚡</div>
            <div>
              <strong style="font-size: 0.9rem; display: block;">PROPASS MANAGER - Never Lose A Password Again</strong>
              <span style="font-size: 0.78rem; color: var(--text-secondary);">End-to-end zero-knowledge password vault for all your devices.</span>
            </div>
            <a href="#" class="ad-sim-btn" style="margin-left: auto;" onclick="event.preventDefault(); alert('Simulated Ad Click!');">Install Extension</a>
          </div>
        </div>
      `;
    }
  });
});
