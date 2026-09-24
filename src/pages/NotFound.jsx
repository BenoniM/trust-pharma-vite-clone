import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){return <section className="not-found"><div><span>404</span><h1>Page not found</h1><p>The page you requested does not exist in this build.</p><Link className="btn primary" to="/">Back home</Link></div></section>}
