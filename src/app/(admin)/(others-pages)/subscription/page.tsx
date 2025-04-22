import PricingPlans from '@/components/subscription/PricingPlans';
import React from 'react'

const page = () => {
  return (
    <div className='bg-white'>
      <p className='font-bold text-2xl md:text-3xl lg:text-4xl px-2 sm:px-4 pt-6'>Subscription Plans</p>
        <PricingPlans />
    </div>
  )
}

export default page;