"use client";
import CallList from '@/components/CallList'
import MeetingCard from '@/components/MeetingCard';
import { useGetCalls } from '@/hooks/useGetCalls';
import React from 'react'

const Previous = () => {
  const date = new Date();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Previous</h1>
      <CallList type='ended'/>
    </section>
  )
}

export default Previous