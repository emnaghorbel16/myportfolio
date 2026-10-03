"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
export function SiteNav({name,cv}:{name:string;cv?:string|null}){const [open,setOpen]=useState(false);return <header className="site-nav"><div className="wrap nav-inner"><Link className="brand" href="/"><span className="brand-mark">{name.slice(0,1).toLowerCase()}.</span><span>{name}</span></Link><nav className={open?"nav-links open":"nav-links"}><Link href="/about" onClick={()=>setOpen(false)}>About</Link><Link href="/projects" onClick={()=>setOpen(false)}>Projects</Link><Link href="/experience" onClick={()=>setOpen(false)}>Experience</Link><Link href="/education" onClick={()=>setOpen(false)}>Education</Link><Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link><ThemeToggle/><a className="nav-cv" href={cv||"/contact"} target={cv?"_blank":undefined} rel="noreferrer">{cv?"Résumé":"Let’s talk"}<ArrowUpRight size={14}/></a></nav><button className="menu-button" onClick={()=>setOpen(!open)} aria-label={open?"Close menu":"Open menu"}>{open?<X/>:<Menu/>}</button></div></header>}
