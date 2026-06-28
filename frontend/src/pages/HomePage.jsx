import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
            {/* Minimalist Header */}
            <header style={{ 
                padding: '24px 48px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid var(--hairline)',
                background: 'color-mix(in oklab, var(--surface) 90%, transparent)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(12px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="logo-icon"></div>
                    <h1 className="ims" style={{ margin: 0, padding: 0, color: 'var(--foreground)' }}>LogiFlow</h1>
                    <span className="version" style={{ marginLeft: '12px', padding: '2px 6px', background: 'var(--surface-muted)', borderRadius: '4px' }}>v2.4</span>
                </div>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div className="system-status">
                        <span className="status-dot"></span>
                        ALL SYSTEMS OPERATIONAL
                    </div>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button style={{ padding: '10px 24px', background: 'var(--brand)', color: 'var(--surface)', fontWeight: 600 }}>Access Terminal ➔</button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{ padding: '120px 24px', textAlign: 'center', background: 'linear-gradient(180deg, var(--surface) 0%, var(--background) 100%)', borderBottom: '1px solid var(--hairline)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ 
                        fontFamily: 'JetBrains Mono, monospace', 
                        fontSize: '12px', 
                        color: 'var(--brand)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        marginBottom: '24px'
                    }}>
                        Enterprise Logistics Platform
                    </div>
                    
                    <h2 style={{ 
                        fontSize: '4.5rem', 
                        fontWeight: 800, 
                        lineHeight: 1.05, 
                        letterSpacing: '-0.04em',
                        marginBottom: '32px',
                        color: 'var(--foreground)'
                    }}>
                        The High-Density <br/>
                        <span style={{ color: 'var(--muted-foreground)' }}>Command Center.</span>
                    </h2>
                    
                    <p style={{ 
                        fontSize: '1.25rem', 
                        color: 'var(--muted-foreground)', 
                        marginBottom: '48px',
                        maxWidth: '600px',
                        margin: '0 auto 48px auto',
                        lineHeight: 1.6
                    }}>
                        Take absolute control of your supply chain. Manage inventory, orchestrate global shipments, and process orders with tactical precision from one unified dashboard.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <button style={{ padding: '16px 32px', fontSize: '1rem', background: 'var(--foreground)', color: 'var(--background)', fontWeight: 600, borderRadius: '8px' }}>
                                Initialize Dashboard
                            </button>
                        </Link>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <button className="ghost-btn" style={{ padding: '16px 32px', fontSize: '1rem', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--foreground)', fontWeight: 600, borderRadius: '8px' }}>
                                Create Account
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Highlights Grid */}
            <section style={{ padding: '96px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Everything you need to scale operations.</h2>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem' }}>Built for high-volume warehouses and global distribution networks.</p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '24px'
                }}>
                    <div className="metric-card" style={{ padding: '32px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'color-mix(in oklab, var(--brand) 12%, transparent)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        </div>
                        <h3 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '12px' }}>Intelligent Inventory</h3>
                        <p style={{ color: 'var(--muted-foreground)', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', lineHeight: 1.6 }}>Track thousands of SKUs in real-time. Automated alerts notify you the moment stock drops below critical thresholds, preventing stockouts before they happen.</p>
                    </div>
                    
                    <div className="metric-card" style={{ padding: '32px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'color-mix(in oklab, var(--accent-blue) 12%, transparent)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                        </div>
                        <h3 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '12px' }}>Global Shipping Network</h3>
                        <p style={{ color: 'var(--muted-foreground)', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', lineHeight: 1.6 }}>Generate tracking numbers and monitor dispatch status across multiple carriers. Give your customers complete visibility into their order's journey.</p>
                    </div>
                    
                    <div className="metric-card" style={{ padding: '32px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'color-mix(in oklab, var(--accent-emerald) 12%, transparent)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-emerald)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                        </div>
                        <h3 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '12px' }}>Advanced Analytics</h3>
                        <p style={{ color: 'var(--muted-foreground)', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', lineHeight: 1.6 }}>Make data-driven decisions with a unified dashboard. Instantly view your total revenue, pending orders, and high-performing categories at a glance.</p>
                    </div>

                    <div className="metric-card" style={{ padding: '32px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'color-mix(in oklab, var(--accent-amber) 12%, transparent)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-amber)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <h3 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '12px' }}>Supplier Management</h3>
                        <p style={{ color: 'var(--muted-foreground)', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', lineHeight: 1.6 }}>Maintain a digital rolodex of your entire supply chain. Easily track manufacturer details and streamline your procurement workflow.</p>
                    </div>

                    <div className="metric-card" style={{ padding: '32px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'color-mix(in oklab, var(--accent-rose) 12%, transparent)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-rose)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <h3 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '12px' }}>Role-Based Access</h3>
                        <p style={{ color: 'var(--muted-foreground)', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', lineHeight: 1.6 }}>Secure your logistics data with strict role hierarchies. Admins have full structural control while operational staff see exactly what they need.</p>
                    </div>

                    <div className="metric-card" style={{ padding: '32px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'color-mix(in oklab, var(--accent-violet) 12%, transparent)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-violet)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </div>
                        <h3 style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '12px' }}>Financial Transactions</h3>
                        <p style={{ color: 'var(--muted-foreground)', textTransform: 'none', letterSpacing: 'normal', fontSize: '14px', lineHeight: 1.6 }}>Keep a detailed ledger of all purchases and revenue. Every order automatically syncs with the transaction ledger for flawless accounting.</p>
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section style={{ padding: '96px 24px', background: 'var(--surface)', borderTop: '1px solid var(--hairline)' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ 
                        fontFamily: 'JetBrains Mono, monospace', 
                        fontSize: '12px', 
                        color: 'var(--accent-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        marginBottom: '16px'
                    }}>
                        Operational Flow
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '64px' }}>From warehouse shelf to customer door.</h2>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', textAlign: 'left' }}>
                        <div style={{ flex: '1 1 250px', padding: '24px', borderLeft: '2px solid var(--hairline)' }}>
                            <div style={{ color: 'var(--foreground)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '8px' }}>01. Procurement</div>
                            <p style={{ color: 'var(--muted-foreground)' }}>Source products from verified suppliers and log them into the inventory catalog.</p>
                        </div>
                        <div style={{ flex: '1 1 250px', padding: '24px', borderLeft: '2px solid var(--hairline)' }}>
                            <div style={{ color: 'var(--foreground)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '8px' }}>02. Order Capture</div>
                            <p style={{ color: 'var(--muted-foreground)' }}>Customer orders drop directly into the dashboard. Stock is automatically reserved.</p>
                        </div>
                        <div style={{ flex: '1 1 250px', padding: '24px', borderLeft: '2px solid var(--brand)' }}>
                            <div style={{ color: 'var(--brand)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '8px' }}>03. Dispatch</div>
                            <p style={{ color: 'var(--muted-foreground)' }}>Generate shipment tracking numbers and mark the order as delivered. Ledger updates instantly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '120px 24px', textAlign: 'center', background: 'var(--foreground)', color: 'var(--background)' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--background)', marginBottom: '24px', letterSpacing: '-0.02em' }}>Ready to modernize your operations?</h2>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px auto' }}>
                    Join the thousands of logistics companies orchestrating their supply chains with LogiFlow.
                </p>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '16px 40px', fontSize: '1.1rem', background: 'var(--brand)', color: 'var(--surface)', fontWeight: 700, borderRadius: '8px', border: 'none' }}>
                        Deploy LogiFlow Today
                    </button>
                </Link>
            </section>

            {/* Footer */}
            <footer style={{ padding: '32px 48px', borderTop: '1px solid var(--hairline)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="logo-icon" style={{ width: '16px', height: '16px', borderRadius: '4px' }}></div>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>LogiFlow</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
                    © 2026 LogiFlow Systems. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
