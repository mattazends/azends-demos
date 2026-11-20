import { memo } from "react";

/* The Novus homepage markup. Behaviour lives in src/lib/novus-init.js and styles in src/styles/novus.css. */
export const NovusMarkup = memo(function NovusMarkup() {
  return (
    <div className="novus-root">
      {/* NAV */}
      <header className="nav" id="nav">
        <div className="nav-in">
          <a href="#top" className="logo" aria-label="Novus Maintenance home">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13" /><path d="M12.5 5.5 16 9l3.5-3.5M12.5 26.5 16 23l3.5 3.5" strokeWidth="1.8" /></svg>
            <span className="lt">Novus<small>Commercial snow &amp; ice</small></span>
          </a>
          <nav className="nav-links" aria-label="Main">
            <a href="#services">Services</a>
            <a href="#storm">How it works</a>
            <a href="#coverage">Coverage</a>
            <a href="#reviews">Clients</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-r">
            <a className="nav-tel" href="tel:+19179702960"><span className="pulse" />(917) 970-2960</a>
            <a className="btn btn-ice" href="#quote">Get a quote</a>
            <button className="burger" id="burger" aria-label="Open menu"><span /></button>
          </div>
        </div>
      </header>
      <div className="mmenu" id="mmenu">
        <a href="#services">Services</a>
        <a href="#storm">How it works</a>
        <a href="#coverage">Coverage</a>
        <a href="#reviews">Clients</a>
        <a href="#faq">FAQ</a>
        <a className="btn btn-ice" href="#quote">Get your snow plan</a>
      </div>
      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-bg">
          <img className="hero-img" src="https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/14aaee91a_novus-hero.png" alt="Snow plow truck clearing a snowy New York waterfront avenue at dawn" fetchPriority="high" />
          <video className="hero-vid" muted playsInline preload="auto" src="https://media.base44.com/videos/public/6b002b0a52f746ee078dd98f/77b017dd8_novus-hero.mp4" />
          <video className="hero-vid" muted playsInline preload="auto" src="https://media.base44.com/videos/public/6b002b0a52f746ee078dd98f/77b017dd8_novus-hero.mp4" />
        </div>
        <canvas id="snow" />
        <div className="hero-stack">
          <div className="wrap hero-in">
            <div className="hero-l">
              <div className="chip rv"><span className="pulse" />Crews on standby 24/7 across all five boroughs</div>
              <h1>
                <span className="kw rv d1">Commercial snow removal in New York City</span>
                <span className="big plow" id="plow">Open on time.<br /><b>Every storm.</b><i className="blade" /></span>
              </h1>
              <p className="sub rv d2">Plowing, de-icing, sidewalks and hauling for businesses across Manhattan, Brooklyn, Queens, the Bronx and Staten Island. Commercial only. Snow only.</p>
              <div className="hero-ctas rv d3">
                <a className="btn btn-white" href="#quote">Get your snow plan <span className="arr">→</span></a>
                <a className="btn btn-glass" href="tel:+19179702960"><span>Call 24/7<span className="hide-s"> · (917) 970-2960</span></span></a>
              </div>
            </div>
            <div className="hero-r rv d3">
              <div className="qcard">
                <h3>Price your site in <b>60 seconds</b></h3>
                <p>Two taps here, the rest on the next screen.</p>
                <label>What are we clearing?</label>
                <div className="opts" data-hero="type">
                  <button className="opt" type="button">Retail / storefront</button>
                  <button className="opt" type="button">Office</button>
                  <button className="opt" type="button">Parking lot</button>
                  <button className="opt" type="button">Construction site</button>
                  <button className="opt" type="button">Multi-site portfolio</button>
                </div>
                <label>How many locations?</label>
                <div className="opts" data-hero="locs">
                  <button className="opt" type="button">1</button>
                  <button className="opt" type="button">2–5</button>
                  <button className="opt" type="button">6–20</button>
                  <button className="opt" type="button">20+</button>
                </div>
                <a className="btn btn-ice" href="#quote" id="heroGo">Continue <span className="arr">→</span></a>
                <div className="fine">Commercial properties only · No obligation</div>
              </div>
            </div>
          </div>
          <div className="hero-trust">
            <div className="wrap">
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>Fully licensed, registered &amp; insured</span>
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={9} /><path d="M12 7v5l3 2" /></svg>Available 24/7, every day of the season</span>
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx={12} cy={10} r="2.5" /></svg>6 offices &amp; yards across NYC and NJ</span>
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" /></svg>Associated with SIMA</span>
            </div>
          </div>
        </div>
      </section>
      {/* LOGOS */}
      <div className="logos">
        <p>Trusted through New York winters by teams at</p>
        <div className="mask">
          <div className="marq" id="marq">
            <span className="lg" role="img" aria-label="Target" style={{width: 36, height: 50, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/5afcd59f5_logo-target.png)', backgroundSize: '90.5px 50.9px', backgroundPosition: '-27.2px -0.4px'}} />
            <span className="lg" role="img" aria-label="Verizon" style={{width: 135, height: 30, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/a61fd5309_logo-verizon.png)', backgroundSize: '135.3px 30.0px', backgroundPosition: '-0.1px 0.0px'}} />
            <span className="lg" role="img" aria-label="Charles Schwab" style={{width: 99, height: 44, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/275fc890b_logo-schwab.png)', backgroundSize: '98.7px 44.0px', backgroundPosition: '0.0px 0.0px'}} />
            <span className="lg" role="img" aria-label="Patagonia" style={{width: 131, height: 26, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/1280b5a52_logo-patagonia.png)', backgroundSize: '132.5px 74.5px', backgroundPosition: '-0.8px -24.2px'}} />
            <span className="lg" role="img" aria-label="Puma" style={{width: 89, height: 44, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/b7756ef5b_logo-puma.png)', backgroundSize: '88.5px 44.0px', backgroundPosition: '0.0px 0.0px'}} />
            <span className="lg" role="img" aria-label="TD Ameritrade" style={{width: 151, height: 30, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/ec889f328_logo-tdameritrade.png)', backgroundSize: '154.4px 38.7px', backgroundPosition: '-1.1px -5.6px'}} />
            <span className="lg" role="img" aria-label="The Frick Collection" style={{width: 79, height: 50, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/f9441abd5_logo-frick.png)', backgroundSize: '88.5px 51.5px', backgroundPosition: '-5.1px 0.0px'}} />
            <span className="lg" role="img" aria-label="Triton Construction" style={{width: 100, height: 32, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/20d41fe47_logo-triton.png)', backgroundSize: '99.9px 32.0px', backgroundPosition: '0.0px 0.0px'}} />
            <span className="lg" role="img" aria-label="NakeFit" style={{width: 63, height: 54, backgroundImage: 'url(https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/25a8ec7fd_logo-nakefit.webp)', backgroundSize: '63.1px 54.0px', backgroundPosition: '0.0px 0.0px'}} />
          </div>
        </div>
      </div>
      {/* CLOCK */}
      <section className="sec" id="clock" data-rail="The rule">
        <div className="wrap clock-grid">
          <div>
            <span className="eyebrow rv"><span className="dot" />The NYC sidewalk rule</span>
            <h2 className="h2 words" data-words style={{marginTop: 18}}>In New York, the clock starts <b>when the snow stops.</b></h2>
            <p className="lead rv d1" style={{marginTop: 22}}>City law gives every business a set window to clear the sidewalk outside its door. Miss it and you're looking at DSNY fines, slip-and-fall claims and customers who can't get in. Drag the slider to see your deadline.</p>
            <div className="facts">
              <div className="fact rv d1"><div className="n"><b>4</b> hrs</div><div className="t">to clear if snow stops in the daytime</div></div>
              <div className="fact rv d2"><div className="n">up to <b>$350</b></div><div className="t">per DSNY violation for repeat misses</div></div>
              <div className="fact rv d3"><div className="n"><b>4</b> ft</div><div className="t">minimum clear path for pedestrians</div></div>
            </div>
          </div>
          <div className="clock-card rv d2">
            <div className="cc-top"><span>Sidewalk deadline calculator</span><span className="cc-tag">NYC Admin Code §16-123</span></div>
            <div className="cc-q">When did the snow stop?</div>
            <div className="cc-time" id="ccTime"><b>2:00</b> PM</div>
            <input type="range" id="ccRange" min={0} max={1425} step={15} defaultValue={840} aria-label="Time the snow stopped" />
            <div className="cc-scale"><span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span></div>
            <div className="cc-out">
              <div><div className="k">Your sidewalk must be clear by</div><div className="v" id="ccDue"><b>6:00 PM</b> today</div></div>
              <div className="cc-win"><div className="k">Window</div><div className="v" id="ccWin"><b>4</b> hrs</div></div>
              <div className="cc-bar"><i id="ccBar" /></div>
            </div>
            <p className="cc-note">Based on DSNY guidance. Novus crews work during the storm, so you're not racing the clock after it.</p>
          </div>
        </div>
      </section>
      {/* SERVICES */}
      <section className="sec svc" id="services" data-rail="Services">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow rv"><span className="dot" />Services</span>
              <h2 className="h2 words" data-words>Everything a commercial site needs. <b>Nothing it doesn't.</b></h2>
            </div>
            <p className="lead rv d1">One team for the whole storm, from the first flake on the lot to the last pile hauled away.</p>
          </div>
          <div className="svc-grid">
            <div className="svc-list" id="svcList">
              <div className="svc-item on" data-i={0}>
                <span className="no">01</span>
                <div><h3>Snow plowing</h3></div>
                <span className="plus"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 1v12M1 7h12" /></svg></span>
                <div className="svc-body"><div><p>Lots, loading bays and access roads pushed clear to a staging area on site or off site, so deliveries and staff keep moving.</p><div className="tags"><span>Parking lots</span><span>Loading bays</span><span>Access roads</span></div></div></div>
              </div>
              <div className="svc-item" data-i={1}>
                <span className="no">02</span>
                <div><h3>De-icing</h3></div>
                <span className="plus"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 1v12M1 7h12" /></svg></span>
                <div className="svc-body"><div><p>Premium, less corrosive de-icing on lots, walkways and entrances. It stops ice building up and keeps surfaces from refreezing after the storm.</p><div className="tags"><span>Pre-treatment</span><span>Anti-refreeze</span><span>Less corrosive</span></div></div></div>
              </div>
              <div className="svc-item" data-i={2}>
                <span className="no">03</span>
                <div><h3>Sidewalk clearing</h3></div>
                <span className="plus"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 1v12M1 7h12" /></svg></span>
                <div className="svc-body"><div><p>Frontages cleared to a safe, passable path inside the city's window, so customers and staff walk straight in and your liability stays low.</p><div className="tags"><span>Storefronts</span><span>Corners &amp; curb cuts</span><span>Entrances</span></div></div></div>
              </div>
              <div className="svc-item" data-i={3}>
                <span className="no">04</span>
                <div><h3>Shoveling</h3></div>
                <span className="plus"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 1v12M1 7h12" /></svg></span>
                <div className="svc-body"><div><p>Fully trained hand crews for the tight spots machines can't reach. Your first line of defence for stairs, ramps, doorways and fire exits.</p><div className="tags"><span>Stairs &amp; ramps</span><span>Fire exits</span><span>Tight spaces</span></div></div></div>
              </div>
              <div className="svc-item" data-i={4}>
                <span className="no">05</span>
                <div><h3>Snow hauling</h3></div>
                <span className="plus"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 1v12M1 7h12" /></svg></span>
                <div className="svc-body"><div><p>No room to stack it, or piles getting dangerous? We load it and haul it off site and manage every step, so you keep every parking space.</p><div className="tags"><span>Off-site removal</span><span>Pile management</span><span>Full project handled</span></div></div></div>
              </div>
            </div>
            <div className="svc-vis rv" id="svcVis">
              <img className="on" src="https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/78d19799b_svc-plowing.jpeg" alt="Snowplow truck clearing a snowy city street" />
              <img src="https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/032ea3244_svc-deicing.jpeg" alt="Snow covered city street with traffic lights" loading="lazy" />
              <img src="https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/72acc718c_svc-sidewalks.jpeg" alt="People walking on a snowy New York City street" loading="lazy" />
              <img src="https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/aa9a7f76b_svc-shoveling.jpeg" alt="Snow covered New York City street" loading="lazy" />
              <img src="https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/2dda683dd_svc-hauling.jpeg" alt="Orange snow plow truck clearing city streets" loading="lazy" />
              <div className="svc-cap"><div className="t" id="svcCap">Lots and roads, <b>pushed clear</b></div><div className="pill"><span className="pulse" />24/7 dispatch</div></div>
            </div>
          </div>
        </div>
      </section>
      {/* STORM */}
      <section className="sec storm" id="storm" data-rail="How it works">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow rv"><span className="dot" />How it works</span>
              <h2 className="h2 words" data-words>How a storm runs <b>with Novus.</b></h2>
            </div>
            <p className="lead rv d1">You don't chase anyone at 3 AM. Here's what happens at your site from the forecast to the final pass.</p>
          </div>
          <div className="storm-grid">
            <div className="storm-sticky">
              <div className="status" id="status">
                <div className="st-top"><span>Example site · Midtown storefront</span><span className="st-pill" id="stPill"><i /><span>Pre-season</span></span></div>
                <div className="st-title" id="stTitle">Site <b>mapped &amp; planned</b></div>
                <div className="gauge">
                  <div className="row"><span>Snow on site</span><span id="stDepth">0″</span></div>
                  <div className="bar"><div className="fill" id="stFill" /><div className="clear" id="stClear" /></div>
                </div>
                <div className="checks" id="checks">
                  <div className="ck"><span className="b"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span>Site walked &amp; priorities set</div>
                  <div className="ck"><span className="b"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span>Borough crew on standby</div>
                  <div className="ck"><span className="b"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span>Surfaces pre-treated</div>
                  <div className="ck"><span className="b"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span>Lot plowed, sidewalks cleared</div>
                  <div className="ck"><span className="b"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span>Re-treated &amp; signed off</div>
                </div>
              </div>
            </div>
            <div className="steps" id="steps">
              <div className="prog" id="prog" />
              <div className="step on" data-s={0}>
                <div className="when">Before the season</div>
                <h3>We walk your site and <b>build the plan.</b></h3>
                <p>Entrances, lots, loading bays, stacking areas and what matters most to you, mapped before the first flake so nobody's guessing mid-storm.</p>
              </div>
              <div className="step" data-s={1}>
                <div className="when">Storm on the forecast</div>
                <h3>Your borough crew is <b>already on standby.</b></h3>
                <p>Teams are stationed across all five boroughs and on call 24/7. Off-season training and local route knowledge mean wider, quicker coverage when it hits.</p>
              </div>
              <div className="step" data-s={2}>
                <div className="when">Snow starts falling</div>
                <h3>Surfaces get <b>treated early.</b></h3>
                <p>De-icing goes down on walkways, entrances and lots to stop ice bonding to the surface. Less ice now means a faster, cleaner clear later.</p>
              </div>
              <div className="step" data-s={3}>
                <div className="when">During &amp; after the storm</div>
                <h3>Lots plowed. <b>Sidewalks clear.</b></h3>
                <p>Plows push the lot to your staging area while hand crews clear frontages, stairs and ramps, working to the city's deadline, not after it.</p>
              </div>
              <div className="step" data-s={4}>
                <div className="when">The morning after</div>
                <h3>Re-treated, hauled if needed, <b>open on time.</b></h3>
                <p>We re-treat against refreeze, haul piles off site if space is tight and make sure the site is safe before your doors open.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* COVERAGE */}
      <section className="sec" id="coverage" data-rail="Coverage">
        <div className="wrap">
          <div className="cov-top">
            <div>
              <span className="eyebrow rv"><span className="dot" />Coverage</span>
              <h2 className="h2 words" data-words style={{marginTop: 18}}>Crews in <b>every borough.</b></h2>
              <p className="lead rv d1" style={{marginTop: 22}}>Local teams mean shorter routes and faster response. Whether it's one storefront or locations across the city, we're already nearby.</p>
              <div className="boros rv d2">
                <span className="boro"><i />Manhattan</span>
                <span className="boro"><i />Brooklyn</span>
                <span className="boro"><i />Queens</span>
                <span className="boro"><i />The Bronx</span>
                <span className="boro"><i />Staten Island</span>
                <span className="boro"><i />Long Island City</span>
              </div>
            </div>
            <div className="cov-img rv d1">
              <img src="https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/86d5460df_coverage.jpeg" alt="Snowy night street in New York City framing the Manhattan Bridge" loading="lazy" />
              <div className="cov-badge">
                <div><div className="n"><b>5</b></div><div className="t">boroughs covered</div></div>
                <div><div className="n"><b>6</b></div><div className="t">offices &amp; yards</div></div>
                <div><div className="n"><b>24/7</b></div><div className="t">dispatch</div></div>
              </div>
            </div>
          </div>
          <div className="locs">
            <a className="loc rv" href="https://www.google.com/maps/search/?api=1&query=434+West+33rd+Street+New+York+NY+10001" target="_blank" rel="noopener"><span className="k">Headquarters</span><span className="nm">Midtown West</span><span className="ad">434 West 33rd Street, PH Floor, New York, NY 10001</span><span className="go">→</span></a>
            <a className="loc rv" href="https://www.google.com/maps/search/?api=1&query=405+Lexington+Ave+New+York+NY+10174" target="_blank" rel="noopener"><span className="k">Office</span><span className="nm">Chrysler Building</span><span className="ad">405 Lexington Ave, 9th Floor, New York, NY 10174</span><span className="go">→</span></a>
            <a className="loc rv" href="https://www.google.com/maps/search/?api=1&query=222+Broadway+New+York+NY+10038" target="_blank" rel="noopener"><span className="k">Office</span><span className="nm">Downtown</span><span className="ad">222 Broadway, New York, NY 10038</span><span className="go">→</span></a>
            <a className="loc rv" href="https://www.google.com/maps/search/?api=1&query=869+St+Marks+Ave+Brooklyn+NY+11213" target="_blank" rel="noopener"><span className="k">Office</span><span className="nm">Brooklyn</span><span className="ad">869 St. Marks Ave, Brooklyn, NY 11213</span><span className="go">→</span></a>
            <a className="loc rv" href="https://www.google.com/maps/search/?api=1&query=52-10+35th+Street+Long+Island+City+NY+11101" target="_blank" rel="noopener"><span className="k">Warehouse</span><span className="nm">Long Island City</span><span className="ad">52-10 35th Street, Long Island City, NY 11101</span><span className="go">→</span></a>
            <a className="loc rv" href="https://www.google.com/maps/search/?api=1&query=708+Hartle+Street+Sayreville+NJ+08872" target="_blank" rel="noopener"><span className="k">Warehouse</span><span className="nm">Sayreville, NJ</span><span className="ad">708 Hartle Street, Sayreville, NJ 08872</span><span className="go">→</span></a>
          </div>
        </div>
      </section>
      {/* WHY */}
      <section className="sec why" id="why" data-rail="Why Novus">
        <div className="wrap">
          <span className="eyebrow rv"><span className="dot" />Why Novus</span>
          <p className="why-big words" data-words style={{marginTop: 18}}>Snow is <b>all we do.</b> <span className="m">So when it isn't snowing,</span> we train for it.</p>
          <div className="why-grid">
            <div className="wcard rv"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" /></svg></div><h4>Snow only</h4><p>No landscaping side-line pulling crews away. Every truck, tool and person is built for winter.</p></div>
            <div className="wcard rv d1"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x={3} y={7} width={18} height={14} rx={2} /><path d="M8 7V4h8v3M3 12h18" /></svg></div><h4>Commercial only</h4><p>We don't take residential jobs, so business sites never wait behind someone's driveway.</p></div>
            <div className="wcard rv d2"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19V9l8-5 8 5v10" /><path d="M9 19v-6h6v6" /></svg></div><h4>Trained off-season</h4><p>Equipment and strict safety training before the season starts, so crews are sharp on night one.</p></div>
            <div className="wcard rv d3"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg></div><h4>Fully insured</h4><p>Licensed, registered and insured, and associated with the Snow &amp; Ice Management Association.</p></div>
          </div>
          <p className="inds rv"><b>Who we clear for:</b> retail chains and storefronts, corporate offices, property and facilities managers, construction sites, banks, museums and cultural venues, gyms and fitness studios.</p>
        </div>
      </section>
      {/* REVIEWS */}
      <section className="sec" id="reviews" data-rail="Clients">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow rv"><span className="dot" />Clients</span>
              <h2 className="h2 words" data-words>The businesses we clear <b>keep coming back.</b></h2>
            </div>
            <a className="btn btn-ink rv d1" href="#quote">Join them this winter <span className="arr">→</span></a>
          </div>
          <div className="tst rv">
            <div className="tst-q" id="tstQ">
              <blockquote className="on"><span className="mark">“</span>Professional servicing of <b>all our locations nationwide.</b> Very reliable.</blockquote>
              <blockquote><span className="mark">“</span>Always on time and <b>available during every snow storm.</b></blockquote>
              <blockquote><span className="mark">“</span>We've used them <b>for years.</b> Always on time and always correct.</blockquote>
              <blockquote><span className="mark">“</span>Never any issues. <b>Responsive, prompt</b> and easy to work with.</blockquote>
            </div>
            <div className="tst-tabs" id="tstTabs">
              <button className="tst-tab on" type="button"><strong>NakeFit USA</strong><small>Multi-location client</small><i /></button>
              <button className="tst-tab" type="button"><strong>Cristina M.</strong><small>Client</small><i /></button>
              <button className="tst-tab" type="button"><strong>Yasin W.</strong><small>Client for years</small><i /></button>
              <button className="tst-tab" type="button"><strong>Kevin K.</strong><small>Client</small><i /></button>
            </div>
          </div>
        </div>
      </section>
      {/* QUOTE */}
      <section className="sec quote" id="quote" data-rail="Get a quote">
        <div className="wrap q-grid">
          <div className="q-side">
            <span className="eyebrow rv"><span className="dot" />Get a quote</span>
            <h2 className="h2 words" data-words style={{marginTop: 18}}>Get your snow plan <b>before the first storm.</b></h2>
            <p className="lead">Tell us about your site in under a minute. A Novus manager comes back with a plan and a price for the season.</p>
            <div className="q-contact">
              <a href="tel:+19179702960"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg></span><span><small>Call or text, 24/7</small><strong>(917) 970-2960</strong></span></a>
              <a href="mailto:sales@novusmaintenance.com"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x={3} y={5} width={18} height={14} rx={2} /><path d="m3 7 9 6 9-6" /></svg></span><span><small>Email the sales team</small><strong>sales@novusmaintenance.com</strong></span></a>
            </div>
          </div>
          <div className="form rv d1" id="form">
            <div id="fWrap">
              <div className="f-prog"><span id="fStep">Step 1 of 5</span><span>Commercial properties only</span></div>
              <div className="f-bar"><i id="fBar" /></div>
              <div className="fs on" data-step={0} data-key="type" data-mode="single">
                <h3>What kind of <b>property</b> is it?</h3>
                <p className="hint">Pick the closest match.</p>
                <div className="cards">
                  <button type="button" className="cardopt">Retail / storefront<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Office<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Parking lot<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Construction site<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Multi-site portfolio<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Something else<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                </div>
              </div>
              <div className="fs" data-step={1} data-key="locs" data-mode="single">
                <h3>How many <b>locations?</b></h3>
                <p className="hint">Multi-site contracts are welcome.</p>
                <div className="cards">
                  <button type="button" className="cardopt">1 location<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">2–5 locations<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">6–20 locations<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">20+ locations<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                </div>
              </div>
              <div className="fs" data-step={2} data-key="where" data-mode="multi">
                <h3>Where are your <b>sites?</b></h3>
                <p className="hint">Select all that apply.</p>
                <div className="cards c3">
                  <button type="button" className="cardopt">Manhattan<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Brooklyn<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Queens<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">The Bronx<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Staten Island<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Outside NYC<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                </div>
              </div>
              <div className="fs" data-step={3} data-key="needs" data-mode="multi">
                <h3>What do you <b>need covered?</b></h3>
                <p className="hint">Not sure? Pick what you know and we'll fill the gaps.</p>
                <div className="cards">
                  <button type="button" className="cardopt">Snow plowing<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">De-icing<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Sidewalk clearing<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Shoveling<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Snow hauling<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                  <button type="button" className="cardopt">Full season cover<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>
                </div>
              </div>
              <div className="fs" data-step={4} data-key="contact" data-mode="form">
                <h3>Where should we <b>send your plan?</b></h3>
                <p className="hint">A manager will call to confirm the details.</p>
                <div className="fields">
                  <div className="fld"><label htmlFor="fName">Your name</label><input id="fName" autoComplete="name" placeholder="Jane Smith" /></div>
                  <div className="fld"><label htmlFor="fCo">Company</label><input id="fCo" autoComplete="organization" placeholder="Company name" /></div>
                  <div className="fld"><label htmlFor="fEmail">Work email</label><input id="fEmail" type="email" autoComplete="email" placeholder="jane@company.com" /></div>
                  <div className="fld"><label htmlFor="fPhone">Phone</label><input id="fPhone" type="tel" autoComplete="tel" placeholder="(212) 555-0123" /></div>
                  <input id="fHp" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0}} />
                  <div className="fld full"><label htmlFor="fNotes">Site address or notes (optional)</label><textarea id="fNotes" rows={3} placeholder="e.g. 3 storefronts in Midtown, loading bay at the back" defaultValue={""} /></div>
                </div>
              </div>
              <div className="f-nav">
                <button type="button" className="f-back" id="fBack">← Back</button>
                <button type="button" className="btn btn-ice" id="fNext">Continue <span className="arr">→</span></button>
              </div>
            </div>
            <div className="f-done" id="fDone" hidden>
              <div className="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m5 12 5 5 9-10" /></svg></div>
              <h3 className="h2" style={{fontSize: 'clamp(28px,3vw,40px)'}}>Thanks<span id="fDoneName" />. <b>You're on our list.</b></h3>
              <p className="lead" style={{margin: '14px auto 0'}}>A Novus manager will be in touch shortly. Need us now? Call (917) 970-2960, any time.</p>
              <div className="f-sum" id="fSum" />
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="sec" id="faq" data-rail="FAQ" style={{background: '#fff'}}>
        <div className="wrap faq-grid">
          <div>
            <span className="eyebrow rv"><span className="dot" />FAQ</span>
            <h2 className="h2 words" data-words style={{marginTop: 18}}>Questions facility managers <b>ask us.</b></h2>
            <p className="lead rv d1" style={{marginTop: 22}}>Anything else, call the team on (917) 970-2960. Someone picks up 24/7.</p>
          </div>
          <div className="faq rv d1">
            <details open><summary>Do you clear residential properties?<span className="pl"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg></span></summary><div className="ans">No. Novus is commercial only. Our crews and equipment are dedicated to business sites, so you're never waiting behind someone's driveway.</div></details>
            <details><summary>Which areas do you cover?<span className="pl"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg></span></summary><div className="ans">All five boroughs: Manhattan, Brooklyn, Queens, the Bronx and Staten Island, with teams stationed locally and a warehouse in Long Island City. Have sites further out? Tell us and we'll talk it through.</div></details>
            <details><summary>Can you handle multiple locations under one contract?<span className="pl"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg></span></summary><div className="ans">Yes. We look after businesses with several sites, including clients with locations nationwide. One point of contact, one plan, every site covered.</div></details>
            <details><summary>How fast do crews arrive in a storm?<span className="pl"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg></span></summary><div className="ans">Crews are on standby 24/7 through the season and stationed across the boroughs, so they're close to your site before the storm starts. Your plan sets out exactly what gets done and in what order.</div></details>
            <details><summary>What does the NYC sidewalk law require?<span className="pl"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg></span></summary><div className="ans">If snow stops between 7 AM and 4:59 PM you have 4 hours. Between 5 PM and 8:59 PM you have 14 hours. Overnight, between 9 PM and 6:59 AM, it must be clear by 11 AM. Fines run from $100 up to $350 for repeat violations.</div></details>
            <details><summary>What de-icing products do you use?<span className="pl"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg></span></summary><div className="ans">Premium, less corrosive de-icing materials that limit ice build-up and stop refreezing, while being kinder to your paving, entrances and flooring.</div></details>
            <details><summary>Are you licensed and insured?<span className="pl"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v10M1 6h10" /></svg></span></summary><div className="ans">Yes. Novus Maintenance Corp is fully licensed, registered and insured, and associated with the Snow &amp; Ice Management Association (SIMA).</div></details>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="cta">
        <canvas className="snowc" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none'}} />
        <img src="https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/c287c1b70_cta.jpeg" alt="Snowy New York City street at night" loading="lazy" />
        <div className="wrap">
          <h2 className="words" data-words>Be ready <b>before it snows.</b></h2>
          <p className="rv d1">Lock in your snow plan now and spend this winter not thinking about it.</p>
          <div className="hero-ctas rv d2">
            <a className="btn btn-white" href="#quote">Get your snow plan <span className="arr">→</span></a>
            <a className="btn btn-glass" href="tel:+19179702960"><span>Call 24/7<span className="hide-s"> · (917) 970-2960</span></span></a>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="f-grid">
            <div>
              <a href="#top" className="logo">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13" /><path d="M12.5 5.5 16 9l3.5-3.5M12.5 26.5 16 23l3.5 3.5" strokeWidth="1.8" /></svg>
                <span className="lt">Novus<small>Commercial snow &amp; ice</small></span>
              </a>
              <p style={{marginTop: 18, maxWidth: 300, fontWeight: 300}}>New York's commercial-only snow and ice management team. All five boroughs, 24/7.</p>
            </div>
            <div>
              <h5>Services</h5>
              <ul><li><a href="#services">Snow plowing</a></li><li><a href="#services">De-icing</a></li><li><a href="#services">Sidewalk clearing</a></li><li><a href="#services">Shoveling</a></li><li><a href="#services">Snow hauling</a></li></ul>
            </div>
            <div>
              <h5>Offices</h5>
              <ul><li>434 W 33rd St, NY 10001</li><li>405 Lexington Ave, NY 10174</li><li>222 Broadway, NY 10038</li><li>869 St. Marks Ave, Brooklyn</li><li>52-10 35th St, Long Island City</li></ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul><li><a href="tel:+19179702960">(917) 970-2960</a></li><li><a href="mailto:sales@novusmaintenance.com">sales@novusmaintenance.com</a></li><li>Open 24/7, Sunday to Saturday</li><li><a href="https://www.instagram.com/novussnow/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.facebook.com/novusmaintenance/" target="_blank" rel="noopener">Facebook</a></li></ul>
            </div>
          </div>
          <div className="f-bot"><span>© 2026 Novus Maintenance Corp. All rights reserved.</span><span>Commercial snow removal · New York City</span></div>
        </div>
      </footer>
      <div className="rail" id="rail"><div className="rail-line"><i className="rail-fill" id="railFill" /></div><div id="railTicks" /><div className="rail-flake" id="railFlake"><div className="rf-spin" id="railSpin"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13" /><path d="M12.5 5.5 16 9l3.5-3.5M12.5 26.5 16 23l3.5 3.5M5 14.5l4.4 1.5L8.5 20.5M27 17.5l-4.4-1.5.9-4.5" strokeWidth="1.6" /></svg></div><span className="rail-lbl" id="railLbl" /></div></div>
      <div className="mprog" id="mprog"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13" /><path d="M12.5 5.5 16 9l3.5-3.5M12.5 26.5 16 23l3.5 3.5M5 14.5l4.4 1.5L8.5 20.5M27 17.5l-4.4-1.5.9-4.5" strokeWidth="1.6" /></svg></div>
      <div className="mbar" id="mbar">
        <a className="btn btn-glass" href="tel:+19179702960">Call 24/7</a>
        <a className="btn btn-ice" href="#quote">Get a quote</a>
      </div>
    </div>
  );
});
