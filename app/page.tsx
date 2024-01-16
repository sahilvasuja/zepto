'use client'
import Image from 'next/image'
import React from 'react'
import Chips from './components/chips';
import { options } from './constants';
export default function Home() {
 
  
 
  return (
    
    <Chips  items={options}/>
  )
}
